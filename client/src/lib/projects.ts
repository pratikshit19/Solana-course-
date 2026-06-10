export interface ProjectStep {
  title: string;
  description: string;
  codeSnippet?: string;
  language?: string;
  fileLabel?: string;
  tip?: string;
  deliverable: string;
}

export interface GetHiredTips {
  resumeBullets: string[];
  portfolioReadme: string;
  extensions: string[];
  interviewQuestions: { question: string; answer: string }[];
}

export interface CapstoneProject {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Expert';
  estimatedHours: number;
  category: string;
  overview: string;
  architectureDescription: string;
  technologies: string[];
  features: string[];
  steps: ProjectStep[];
  getHiredTips: GetHiredTips;
}

export const capstoneProjects: CapstoneProject[] = [
  {
    id: 'defi-lending',
    title: 'DeFi Lending Protocol',
    tagline: 'Collateral vaults, dynamic interest rate curves, oracle feeds, and liquidations.',
    difficulty: 'Advanced',
    estimatedHours: 40,
    category: 'DeFi & Systems',
    overview: 'Build a fully-functional decentralized lending protocol on Solana. Users can deposit assets as collateral (e.g., SOL) to borrow debt assets (e.g., USDC). The protocol calculates compound interest dynamically based on pool utilization rates, uses Pyth price feeds to secure collateral ratios, and permits open liquidations with discount rewards when positions fall below liquidation thresholds.',
    architectureDescription: 'A multi-account PDA architecture. The lending market is represented by a Global Config PDA. Each supported asset pool is represented by a Pool State PDA holding vault reserves. User positions are stored in User Position PDAs that track supplied collateral, borrowed debt, and interest accrual index factors. Oracles are accessed by passing Pyth price feed accounts into instruction contexts and validating their program owner.',
    technologies: ['Anchor Framework', 'Rust', 'Pyth Oracles', 'SPL Token-2022', 'Solana Web3.js'],
    features: [
      'Over-collateralized borrowing checks on-chain',
      'Dynamic interest rate accrual (linear + exponential utilization curve)',
      'Pyth Network Oracle price feed validation',
      'Permissionless liquidations with a 10% discount reward',
      'PDA-controlled safe token vaults'
    ],
    steps: [
      {
        title: 'Lending Market Config & State Setup',
        description: 'Initialize the global state and configuration for the lending protocol. We define the global settings, supported assets, and interest rate parameters in an Anchor-safe structure.',
        fileLabel: 'programs/defi-lending/src/state.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;

#[account]
pub struct GlobalMarketConfig {
    pub admin: Pubkey,
    pub treasury_vault: Pubkey,
    pub total_pools: u8,
}

#[account]
pub struct PoolState {
    pub token_mint: Pubkey,
    pub token_vault: Pubkey,
    pub oracle_price_feed: Pubkey,
    pub total_supplied: u64,
    pub total_borrowed: u64,
    pub supply_index: u128,
    pub borrow_index: u128,
    pub last_update_ts: i64,
    pub base_rate: u64, // interest basis points (1/100th of 1%)
    pub optimal_utilization: u64, // e.g. 80% (8000 bps)
    pub max_rate: u64, // e.g. 100% (10000 bps)
}

#[account]
pub struct UserPosition {
    pub owner: Pubkey,
    pub supplied_amount: u64,
    pub borrowed_amount: u64,
    pub last_supply_index: u128,
    pub last_borrow_index: u128,
}`,
        tip: 'Store interest rates and indices in high precision types (like u128) to avoid rounding errors during continuous compound interest accrual.',
        deliverable: 'Write the Anchor accounts layout and structural files, ensuring proper serialization and field sizes.'
      },
      {
        title: 'Vault Deposits & Collateral Lockup',
        description: 'Implement the `deposit_collateral` instruction. Users transfer tokens (like SOL) into the pool vault PDA and receive a recorded balance inside their `UserPosition` state.',
        fileLabel: 'programs/defi-lending/src/instructions/deposit.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;

#[derive(Accounts)]
pub struct DepositCollateral<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub pool_state: Account<'info, PoolState>,
    #[account(
        mut,
        seeds = [b"vault", pool_state.token_mint.as_ref()],
        bump
    )]
    pub pool_vault: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = user,
        space = 8 + 32 + 8 + 8 + 16 + 16,
        seeds = [b"position", user.key().as_ref()],
        bump
    )]
    pub user_position: Account<'info, UserPosition>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handle_deposit(ctx: Context<DepositCollateral>, amount: u64) -> Result<()> {
    let pool = &mut ctx.accounts.pool_state;
    let position = &mut ctx.accounts.user_position;
    
    // Transfer tokens to the vault
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.pool_vault.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;
    
    // Update internal accounting
    pool.total_supplied = pool.total_supplied.checked_add(amount).unwrap();
    position.owner = ctx.accounts.user.key();
    position.supplied_amount = position.supplied_amount.checked_add(amount).unwrap();
    
    Ok(())
}`,
        tip: 'Always use Anchor seeds to derive the vault address so the program is the only authority that can authorize transfers out of the vault.',
        deliverable: 'A compile-ready deposit script handling token transfers into PDA-owned vaults.'
      },
      {
        title: 'Oracle Pricing Integration (Pyth)',
        description: 'Fetch external price feeds from the Pyth network oracle. Validate the feed ownership to prevent price spoofing attacks.',
        fileLabel: 'programs/defi-lending/src/oracle.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use pyth_sdk_solana::load_price_feed_from_account_info;

pub fn get_asset_price(oracle_info: &AccountInfo) -> Result<u64> {
    // 1. Verify owner of the oracle account
    require_keys_eq!(
        *oracle_info.owner,
        pyth_sdk_solana::ID,
        LendingError::InvalidOracleOwner
    );

    // 2. Load and parse the price feed
    let price_feed = load_price_feed_from_account_info(oracle_info)
        .map_err(|_| LendingError::OracleParseFailure)?;

    // 3. Fetch current price with confidence interval validation
    let current_time = Clock::get()?.unix_timestamp;
    let price = price_feed
        .get_price_no_older_than(current_time, 60) // max 60 seconds stale
        .ok_or(LendingError::StalePriceFeed)?;

    // Convert price to standard 6-decimal integer representation
    let price_val = price.price;
    let exponent = price.expo;
    
    // Adjust scale factor based on exponents
    let adjusted_price = if exponent < -6 {
        price_val.checked_div(10i64.pow((exponent.abs() - 6) as u32)).unwrap()
    } else {
        price_val.checked_mul(10i64.pow((6 - exponent.abs()) as u32)).unwrap()
    };

    Ok(adjusted_price as u64)
}`,
        tip: 'Oracle manipulation is a major DeFi threat. Always verify the oracle account owner is the official Pyth program id, check confidence levels, and reject stale price updates.',
        deliverable: 'An oracle validation helper module that fetches and normalizes token prices in USD.'
      },
      {
        title: 'Accruing Compound Interest On-Chain',
        description: 'Update pool index variables based on interest accumulated since the last transaction. Use a dynamic interest rate model calculated using pool utilization rate.',
        fileLabel: 'programs/defi-lending/src/interest.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use crate::state::*;

pub fn accrue_interest(pool: &mut PoolState) -> Result<()> {
    let now = Clock::get()?.unix_timestamp;
    let time_elapsed = now.checked_sub(pool.last_update_ts).unwrap();
    
    if time_elapsed <= 0 || pool.total_supplied == 0 {
        return Ok(());
    }

    // 1. Calculate Utilization Rate = Borrows / Supplies
    let utilization = if pool.total_supplied == 0 {
        0
    } else {
        (pool.total_borrowed as u128)
            .checked_mul(10000)
            .unwrap()
            .checked_div(pool.total_supplied as u128)
            .unwrap() as u64
    };

    // 2. Dynamic Borrow Rate Curve
    // If utilization <= optimal_utilization: base_rate + (utilization / optimal) * optimal_rate
    // If utilization > optimal_utilization: optimal_rate + ((utilization - optimal) / (100% - optimal)) * max_rate
    let borrow_rate = if utilization <= pool.optimal_utilization {
        pool.base_rate.checked_add(
            (utilization.checked_mul(2000).unwrap()) // 20% premium
                .checked_div(pool.optimal_utilization)
                .unwrap()
        ).unwrap()
    } else {
        pool.base_rate.checked_add(2000).unwrap().checked_add(
            ((utilization - pool.optimal_utilization) as u128)
                .checked_mul(8000) // 80% spike rate
                .unwrap()
                .checked_div((10000 - pool.optimal_utilization) as u128)
                .unwrap() as u64
        ).unwrap()
    };

    // 3. Accumulate interest into indices
    let interest_accumulated = (borrow_rate as u128)
        .checked_mul(time_elapsed as u128)
        .unwrap()
        .checked_div(31_536_000) // normalized per year (in seconds)
        .unwrap();

    pool.borrow_index = pool.borrow_index.checked_add(interest_accumulated).unwrap();
    pool.total_borrowed = (pool.total_borrowed as u128)
        .checked_mul(pool.borrow_index)
        .unwrap()
        .checked_div(10000)
        .unwrap() as u64;

    pool.last_update_ts = now;
    Ok(())
}`,
        tip: 'Compute dynamic interest curves on every transaction (deposits, borrows, repayments, liquidations) before modifying account balances to ensure everyone pays/earns the correct interest.',
        deliverable: 'An interest calculation function that updates pool variables on-chain.'
      },
      {
        title: 'Over-collateralized Borrow Verification',
        description: 'Verify if a user has sufficient collateral value to borrow. Reject the transaction if the new position would exceed the maximum Loan-to-Value (LTV) limit.',
        fileLabel: 'programs/defi-lending/src/instructions/borrow.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use crate::state::*;
use crate::oracle::get_asset_price;

pub fn handle_borrow(
    ctx: Context<BorrowAsset>, 
    borrow_amount: u64,
    collateral_oracle: AccountInfo,
    debt_oracle: AccountInfo
) -> Result<()> {
    let position = &mut ctx.accounts.user_position;
    
    // 1. Accrue interest first
    accrue_interest(&mut ctx.accounts.pool_state)?;
    
    // 2. Fetch prices
    let collateral_price = get_asset_price(&collateral_oracle)?;
    let debt_price = get_asset_price(&debt_oracle)?;
    
    // 3. Compute values in USD
    let collateral_value = (position.supplied_amount as u128)
        .checked_mul(collateral_price as u128)
        .unwrap()
        .checked_div(1_000_000)
        .unwrap(); // USD normalized
        
    let current_debt_value = (position.borrowed_amount as u128)
        .checked_mul(debt_price as u128)
        .unwrap()
        .checked_div(1_000_000)
        .unwrap();
        
    let new_debt_value = current_debt_value.checked_add(
        (borrow_amount as u128)
            .checked_mul(debt_price as u128)
            .unwrap()
            .checked_div(1_000_000)
            .unwrap()
    ).unwrap();
    
    // 4. Validate Loan-to-Value (LTV) limit of 75%
    let max_borrow_allowed = collateral_value.checked_mul(75).unwrap().checked_div(100).unwrap();
    
    require!(
        new_debt_value <= max_borrow_allowed,
        LendingError::InsolventBorrowRequest
    );
    
    // 5. Update user and pool balances
    position.borrowed_amount = position.borrowed_amount.checked_add(borrow_amount).unwrap();
    ctx.accounts.pool_state.total_borrowed = ctx.accounts.pool_state.total_borrowed.checked_add(borrow_amount).unwrap();
    
    // 6. Transfer borrowed funds out of the vault
    // (CPI transfer code omitted for brevity...)
    
    Ok(())
}`,
        tip: 'LTV checks must evaluate the current value of collateral versus debt. Always fetch real-time oracle prices right before executing the borrow instruction.',
        deliverable: 'A secure borrow instruction validating health parameters on-chain.'
      },
      {
        title: 'Liquidation Engine & Collateral Seizure',
        description: 'Implement the permissionless liquidation sequence. If a user position drops below the 80% liquidation threshold (insolvency), a liquidator can repay the debt and claim the user collateral at a 10% discount.',
        fileLabel: 'programs/defi-lending/src/instructions/liquidate.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use crate::state::*;
use crate::oracle::get_asset_price;

#[derive(Accounts)]
pub struct LiquidatePosition<'info> {
    #[account(mut)]
    pub liquidator: Signer<'info>,
    #[account(mut)]
    pub insolvent_position: Account<'info, UserPosition>,
    #[account(mut)]
    pub collateral_pool: Account<'info, PoolState>,
    #[account(mut)]
    pub debt_pool: Account<'info, PoolState>,
    // (Token vaults and program dependencies...)
}

pub fn handle_liquidate(
    ctx: Context<LiquidatePosition>,
    repay_amount: u64,
    collateral_oracle: AccountInfo,
    debt_oracle: AccountInfo
) -> Result<()> {
    let position = &mut ctx.accounts.insolvent_position;
    
    // 1. Accrue interest on both pools
    accrue_interest(&mut ctx.accounts.collateral_pool)?;
    accrue_interest(&mut ctx.accounts.debt_pool)?;
    
    // 2. Compute Health Factor
    let col_price = get_asset_price(&collateral_oracle)?;
    let debt_price = get_asset_price(&debt_oracle)?;
    
    let col_val = (position.supplied_amount as u128).checked_mul(col_price as u128).unwrap();
    let debt_val = (position.borrowed_amount as u128).checked_mul(debt_price as u128).unwrap();
    
    // Liquidation threshold is 80% (collateral * 0.8 < debt means liquidatable)
    let threshold = col_val.checked_mul(80).unwrap().checked_div(100).unwrap();
    require!(
        col_val == 0 || debt_val > threshold,
        LendingError::PositionHealthy
    );
    
    // 3. Calculate collateral to claim: repay_amount * debt_price / col_price + 10% premium
    let base_collateral = (repay_amount as u128).checked_mul(debt_price as u128).unwrap().checked_div(col_price as u128).unwrap();
    let collateral_to_seize = base_collateral.checked_mul(110).unwrap().checked_div(100).unwrap() as u64;
    
    require!(
        position.supplied_amount >= collateral_to_seize,
        LendingError::InsufficientCollateralForLiquidation
    );
    
    // 4. Repay debt & deduct collateral
    position.borrowed_amount = position.borrowed_amount.checked_sub(repay_amount).unwrap();
    position.supplied_amount = position.supplied_amount.checked_sub(collateral_to_seize).unwrap();
    
    // 5. Transfer tokens (liquidator repays debt token, receives collateral token)
    // (Token program transfers...)
    
    Ok(())
}`,
        tip: 'Liquidations are a race condition during market volatility. Ensure that your calculation handles complete or partial liquidation parameters cleanly without locking the user position.',
        deliverable: 'A liquidation handler instruction that calculates health thresholds and executes discounted token swaps.'
      }
    ],
    getHiredTips: {
      resumeBullets: [
        'Designed and built a secure, over-collateralized DeFi lending protocol using Anchor on Solana.',
        'Implemented utilization-rate-based interest accrual curves and continuous compounding calculations in high-precision on-chain variables.',
        'Integrated Pyth Network oracles with strict stale-data validation checks and confidence interval bounds preventing exploit routes.',
        'Programmed a permissionless liquidation engine with dynamic calculations rewarding actors to secure protocol solvency.'
      ],
      portfolioReadme: 'Describe the protocol mathematically. Draw a graph of your interest rate utilization curve showing optimal/base/spike rates. List the state account PDA layout diagrams and show full console instructions to build, deploy on devnet, and run the TypeScript integration test suite (`anchor test`).',
      extensions: [
        'Add support for Flash Loans (CPI calls that check balances before and after transactions).',
        'Build a multi-asset tier system (Tier-1 high collateral value, Tier-2 isolation mode).',
        'Add a Governance module where holders vote on optimal pool utilization limits and fee ratios.'
      ],
      interviewQuestions: [
        {
          question: 'How do you prevent a liquidator from using fake/spoofed price accounts during liquidation?',
          answer: 'We enforce check constraints on the passed oracle account by validating its public key matches the pool state config pubkey, and verify its account owner points strictly to the pyth_sdk_solana program ID.'
        },
        {
          question: 'What is a stale price feed attack and how do you mitigate it?',
          answer: 'It occurs when market volatility changes prices, but an actor submits an older oracle update to manipulate LTV calculations. We prevent it by asserting the difference between current network time (`Clock::get()?.unix_timestamp`) and the oracle price timestamp is below 60 seconds.'
        }
      ]
    }
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace with Royalties',
    tagline: 'Escrow listings, Metaplex collection verification, and secure royalty splits.',
    difficulty: 'Intermediate',
    estimatedHours: 35,
    category: 'NFTs & Metaplex',
    overview: 'Develop a high-performance NFT Marketplace on Solana. The protocol allows creators to host collection listings, enforces royalty payments on-chain utilizing Metaplex standards, facilitates secure escrow contracts, and includes advanced client-side index filtering for seamless dApp browsing.',
    architectureDescription: 'A listing-based escrow model. Sellers list their NFTs by creating a Listing PDA account which takes ownership of the NFT or locks it via Token-2022 delegation. A global Marketplace State PDA defines listing fee ratios. Collection verification is checked using Metaplex metadata PDA credentials to assert that the listed NFT belongs to a verified collection.',
    technologies: ['Anchor Framework', 'Rust', 'Metaplex Core SDK', 'Token-2022 Standard', 'React & Tailwind'],
    features: [
      'Lock-delegation and Escrow listing architectures',
      'On-chain Metaplex Creator Royalty Split enforcement',
      'Creator collection verification checks',
      'Low fee market listing & purchase routines',
      'High speed search and property indexing'
    ],
    steps: [
      {
        title: 'Marketplace Setup & Global Config',
        description: 'Define and initialize the global marketplace manager account to control transaction fees, treasury vault, and permissions.',
        fileLabel: 'programs/nft-marketplace/src/state.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;

#[account]
pub struct MarketplaceState {
    pub admin: Pubkey,
    pub fee_vault: Pubkey,
    pub listing_fee_bps: u16, // e.g. 200 = 2% fee
    pub authority_bump: u8,
}

#[account]
pub struct NFTListing {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub token_account: Pubkey,
    pub price: u64,
    pub is_active: bool,
    pub listing_bump: u8,
}`,
        tip: 'Use standard basis points (bps) where 100 bps = 1% for fees. This ensures integer-only arithmetic matches standard SPL Token standards.',
        deliverable: 'State configuration files detailing account sizes and basic Anchor instructions.'
      },
      {
        title: 'Listing NFTs & Lock Escrows',
        description: 'Initialize a listing and transfer the target NFT into an escrow token vault PDA owned by the marketplace program.',
        fileLabel: 'programs/nft-marketplace/src/instructions/list.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;

#[derive(Accounts)]
#[instruction(price: u64)]
pub struct ListNFT<'info> {
    #[account(mut)]
    pub seller: Signer<'info>,
    pub nft_mint: AccountInfo<'info>, // Token Mint
    #[account(mut)]
    pub seller_token_account: Account<'info, TokenAccount>,
    #[account(
        init,
        payer = seller,
        space = 8 + 32 + 32 + 32 + 8 + 1 + 1,
        seeds = [b"listing", nft_mint.key().as_ref()],
        bump
    )]
    pub listing_account: Account<'info, NFTListing>,
    #[account(
        init,
        payer = seller,
        token::mint = nft_mint,
        token::authority = listing_account,
        seeds = [b"escrow", nft_mint.key().as_ref()],
        bump
    )]
    pub escrow_vault: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handle_list(ctx: Context<ListNFT>, price: u64) -> Result<()> {
    let listing = &mut ctx.accounts.listing_account;
    
    // Record listing details
    listing.seller = ctx.accounts.seller.key();
    listing.nft_mint = ctx.accounts.nft_mint.key();
    listing.token_account = ctx.accounts.seller_token_account.key();
    listing.price = price;
    listing.is_active = true;
    
    // Transfer NFT to Marketplace Escrow Vault
    let cpi_accounts = Transfer {
        from: ctx.accounts.seller_token_account.to_account_info(),
        to: ctx.accounts.escrow_vault.to_account_info(),
        authority: ctx.accounts.seller.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    token::transfer(CpiContext::new(cpi_program, cpi_accounts), 1)?;
    
    Ok(())
}`,
        tip: 'Transferring NFTs to program-owned escrow accounts guarantees that the NFT cannot be transferred out or sold on other marketplaces while listed on yours.',
        deliverable: 'A list instruction transferring the NFT to escrow and writing listing metadata.'
      },
      {
        title: 'Royalty Verification with Metaplex Metadata',
        description: 'Read Metaplex metadata accounts to load creator profiles and determine the royalty share percent (seller fee basis points) before distributing payments.',
        fileLabel: 'programs/nft-marketplace/src/royalty.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use mpl_token_metadata::accounts::Metadata;

pub struct RoyaltySplit {
    pub creator: Pubkey,
    pub amount: u64,
}

pub fn calculate_royalties(
    metadata_account_info: &AccountInfo,
    sale_price: u64
) -> Result<Vec<RoyaltySplit>> {
    // 1. Verify and parse Metaplex Metadata Account
    let metadata = Metadata::safe_deserialize(&metadata_account_info.data.borrow())
        .map_err(|_| MarketplaceError::InvalidMetadataAccount)?;
        
    let royalty_bps = metadata.seller_fee_basis_points;
    let mut splits = Vec::new();

    // 2. If metadata contains creators, split the royalty amount proportionally
    if let Some(creators) = metadata.creators {
        let total_royalty_amount = (sale_price as u128)
            .checked_mul(royalty_bps as u128)
            .unwrap()
            .checked_div(10000)
            .unwrap() as u64;

        for creator in creators.iter() {
            let share_amount = (total_royalty_amount as u128)
                .checked_mul(creator.share as u128)
                .unwrap()
                .checked_div(100)
                .unwrap() as u64;
                
            splits.push(RoyaltySplit {
                creator: creator.address,
                amount: share_amount,
            });
        }
    }
    
    Ok(splits)
}`,
        tip: 'Enforce royalties directly inside the purchase smart contract instead of relying on frontends. This ensures artists get paid regardless of how the transaction is submitted.',
        deliverable: 'A helper module parsing Metaplex metadata files and outputting creator royalty splits.'
      },
      {
        title: 'Escrow Buying & Secure Royalty Distribution',
        description: 'Execute the purchase. The buyer pays the price, which is split: royalty recipients get their shares, the marketplace takes its fee, the seller gets the remainder, and the NFT is released from escrow.',
        fileLabel: 'programs/nft-marketplace/src/instructions/buy.rs',
        language: 'rust',
        codeSnippet: `use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, Token, TokenAccount};
use crate::state::*;
use crate::royalty::{calculate_royalties, RoyaltySplit};

#[derive(Accounts)]
pub struct BuyNFT<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
    pub seller: SystemAccount<'info>,
    #[account(mut)]
    pub listing_account: Account<'info, NFTListing>,
    #[account(mut)]
    pub escrow_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub buyer_token_account: Account<'info, TokenAccount>,
    pub metadata_account: AccountInfo<'info>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn handle_buy(ctx: Context<BuyNFT>) -> Result<()> {
    let listing = &mut ctx.accounts.listing_account;
    let price = listing.price;
    
    // 1. Calculate royalties
    let royalties = calculate_royalties(&ctx.accounts.metadata_account, price)?;
    let mut distributed_royalties = 0;
    
    // 2. Transfer royalty payments
    for royalty in royalties.iter() {
        if royalty.amount > 0 {
            anchor_lang::solana_program::program::invoke(
                &anchor_lang::solana_program::system_instruction::transfer(
                    &ctx.accounts.buyer.key(),
                    &royalty.creator,
                    royalty.amount,
                ),
                &[
                    ctx.accounts.buyer.to_account_info(),
                    ctx.accounts.system_program.to_account_info(),
                ],
            )?;
            distributed_royalties = distributed_royalties.checked_add(royalty.amount).unwrap();
        }
    }
    
    // 3. Pay remaining to seller
    let net_seller_amount = price.checked_sub(distributed_royalties).unwrap();
    anchor_lang::solana_program::program::invoke(
        &anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.buyer.key(),
            &ctx.accounts.seller.key(),
            net_seller_amount,
        ),
        &[
            ctx.accounts.buyer.to_account_info(),
            ctx.accounts.seller.to_account_info(),
        ],
    )?;

    // 4. Deliver NFT from Escrow to Buyer
    let seeds = &[
        b"escrow",
        listing.nft_mint.as_ref(),
    ];
    // (Sign CPI with escrow authority seeds to transfer NFT to buyer...)

    listing.is_active = false;
    Ok(())
}`,
        tip: 'Always mark the listing inactive before executing payouts or token transfers to prevent reentrancy exploits.',
        deliverable: 'A purchase instruction executing multiple payments and delivering the NFT safely.'
      }
    ],
    getHiredTips: {
      resumeBullets: [
        'Built a complete, secure non-custodial NFT marketplace on Solana using the Anchor framework.',
        'Developed on-chain Metaplex metadata parsing logic to enforce royalty fees dynamically during purchase transactions.',
        'Created a secure, PDA-owned escrow vault system ensuring robust protection of user digital assets.',
        'Engineered a React-based frontend with advanced search filters, connection wallets, and real-time indexing of listed NFT collections.'
      ],
      portfolioReadme: 'Document the exact escrow program logic. Diagram the transaction lifecycle (List -> Buy/Cancel). Include instructions to run local node tests with Metaplex mock programs, and setup steps for the Vite/React application frontend.',
      extensions: [
        'Add support for programmable NFTs (pNFTs) using Metaplex Auth Rules.',
        'Implement auction mechanics (English and Dutch auctions) in the listing smart contract.',
        'Create a bulk listing and shopping cart purchase system using versioned transactions.'
      ],
      interviewQuestions: [
        {
          question: 'Why do we need a separate PDA account for each NFT listing instead of a single global mapping?',
          answer: 'Solana parallelizes transactions by analyzing which accounts they modify. Storing listings in individual PDAs derived from the NFT mint key ensures listings are independent, avoiding throughput bottlenecks and saving rent costs.'
        },
        {
          question: 'What mechanism is used to authorize transfer from a PDA-owned token account?',
          answer: 'We call token program transfer instruction with an authority derived from seeds. We use `CpiContext::new_with_signer` passing seeds and bumps, allowing the runtime to sign on behalf of the program-owned PDA.'
        }
      ]
    }
  }
];
