export interface DocSection {
  title: string;
  content: string;
  codeSnippet?: string;
  language?: string;
}

export interface CourseDoc {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  sections: DocSection[];
}

export const courseDocs: CourseDoc[] = [
  {
    id: 'week-1-2-review',
    title: 'Rust & Solana Account Model',
    subtitle: 'Phase 1 Weeks 1-2 Summary Study Notes',
    overview: 'A deep dive review into Rust memory management fundamentals and how it integrates with the unique account-based execution runtime of Solana.',
    sections: [
      {
        title: 'Rust Ownership, References & Lifetimes',
        content: 'Rust manages memory without a garbage collector using Ownership, Borrowing, and Lifetimes. The core rules of Ownership are:\n1. Each value in Rust has an owner.\n2. There can only be one owner at a time.\n3. When the owner goes out of scope, the value is dropped.\n\nBorrowing permits referencing a value without taking ownership. You can have either one mutable reference (`&mut T`) OR any number of immutable references (`&T`) in a scope, but never both. Lifetimes (`\'a`) ensure references do not outlive the data they point to, preventing dangling pointers.',
        language: 'rust',
        codeSnippet: `fn process_account<\'a>(data: &\'a mut [u8], key: &Pubkey) -> Result<(), MyError> {
    // \'a is a lifetime indicating data references remain valid
    if data.len() < 32 {
        return Err(MyError::DataTooSmall);
    }
    // Perform mutable borrow checks
    Ok(())
}`
      },
      {
        title: 'The Solana Account Model vs EVM',
        content: 'Ethereum EVM uses an instance-based model where contract storage is coupled inside the smart contract code. Solana separates logic from state. A Solana smart contract (Program) is read-only and stateless. State is stored in separate, data-carrying entities called Accounts.\n\nEvery Solana account has:\n- `lamports`: Lamport balance (fee & rent exemption).\n- `data`: Raw byte array storing custom struct fields.\n- `owner`: Pubkey of the program permitted to write to the account data.\n- `executable`: Boolean indicating if the account holds executable program bytecode.'
      },
      {
        title: 'Program Derived Addresses (PDAs)',
        content: 'PDAs are account addresses derived deterministically from seeds and a program ID, but they do not possess a corresponding private key. They are off-the-curve ed25519 public keys. They allow Solana programs to programmatically sign on behalf of accounts without requiring private keys, executing vaults and locks safely.',
        language: 'rust',
        codeSnippet: `// PDA Derivation example on-chain
let (pda_address, bump_seed) = Pubkey::find_program_address(
    &[b"vault", user.key().as_ref()],
    program_id
);`
      }
    ]
  },
  {
    id: 'week-3-review',
    title: 'Anchor Framework Essentials',
    subtitle: 'Phase 2 Week 3 Summary Study Notes',
    overview: 'Review of the industry-standard Anchor framework, detailing program macros, account constraints, custom errors, and unit testing scripts.',
    sections: [
      {
        title: 'Anchor Macros & Attributes',
        content: 'Anchor uses Rust procedural macros to automate account serialization and boilerplates:\n- `#[program]`: Defines the entrypoint module containing instructions.\n- `#[derive(Accounts)]`: Marks a struct defining accounts required for an instruction.\n- `#[account]`: Marks data structs to implement custom serialization (Borsh).\n- `#[instruction(...)]`: Maps instruction arguments directly inside the account context structure.',
        language: 'rust',
        codeSnippet: `#[program]
pub mod my_anchor_program {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        ctx.accounts.my_account.value = data;
        Ok(())
    }
}`
      },
      {
        title: 'Account Validation & Constraints',
        content: 'Anchor provides declarative constraints in the `#[account(...)]` attribute to secure entry points:\n- `mut`: Marks the account mutable (writes are saved to ledger).\n- `init`: Allocates the account, pays rent, and initializes state.\n- `signer`: Asserts the account signed the transaction.\n- `seeds`/`bump`: Resolves and validates a PDA seed sequence.\n- `has_one`: Asserts a field in the target account matches an account in the context (e.g. `has_one = owner`).',
        language: 'rust',
        codeSnippet: `#[derive(Accounts)]
pub struct Initialize<\'info> {
    #[account(mut)]
    pub user: Signer<\'info>,
    #[account(
        init,
        payer = user,
        space = 8 + 8, // anchor discriminator + data field size
        seeds = [b"state", user.key().as_ref()],
        bump
    )]
    pub my_account: Account<\'info, MyAccount>,
    pub system_program: Program<\'info, System>,
}`
      },
      {
        title: 'Anchor Unit Testing',
        content: 'Unit tests run against a local test validator. Anchor compiles IDL schemas and generates TypeScript clients to invoke transactions easily.',
        language: 'typescript',
        codeSnippet: `describe("my_anchor_program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.MyAnchorProgram;

  it("Initializes state successfully", async () => {
    const tx = await program.methods
      .initialize(new anchor.BN(42))
      .rpc();
    console.log("Transaction signature", tx);
  });
});`
      }
    ]
  },
  {
    id: 'week-4-review',
    title: 'SPL Tokens & CPI Swaps',
    subtitle: 'Phase 2 Week 4 Summary Study Notes',
    overview: 'Review of SPL Token Standard, mint/transfer mechanics, Metaplex metadata, and executing Cross-Program Invocations (CPI) for swap escrows.',
    sections: [
      {
        title: 'SPL Token Standard & Vaults',
        content: 'Solana Program Library (SPL) manages fungible tokens. The Token Program holds standard minting, burning, and transferring instructions. Programs own associated token accounts (ATAs) to lock assets inside vault PDAs.',
        language: 'rust',
        codeSnippet: `// Token account layout inside derive accounts context
#[account(
    init_if_needed,
    payer = user,
    associated_token::mint = token_mint,
    associated_token::authority = vault_pda
)]
pub struct vault_token_account: Account<\'info, TokenAccount>,`
      },
      {
        title: 'Cross-Program Invocations (CPI)',
        content: 'CPI allows one Solana program to invoke instructions on another program directly. This is executed using `invoke` or `invoke_signed`. `invoke_signed` is used when a PDA must sign the CPI transaction on behalf of the program using its seed inputs.',
        language: 'rust',
        codeSnippet: `use anchor_spl::token::{self, Transfer};

// Execute CPI token transfer from vault PDA
let cpi_program = ctx.accounts.token_program.to_account_info();
let cpi_accounts = Transfer {
    from: ctx.accounts.vault_token_account.to_account_info(),
    to: ctx.accounts.receiver_token_account.to_account_info(),
    authority: ctx.accounts.vault_pda.to_account_info(),
};

let seeds = &[
    b"vault",
    &[ctx.bumps.vault_pda],
];
let signer_seeds = &[&seeds[..]];

token::transfer(
    CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds),
    amount
)?;`
      },
      {
        title: 'Metaplex Metadata',
        content: 'Metaplex assigns metadata to tokens (NFTs). An NFT on Solana is simply an SPL Mint account with a supply of exactly `1` decimal point `0`, paired with a Metadata PDA owned by the Metaplex Token Metadata program.'
      }
    ]
  },
  {
    id: 'week-5-review',
    title: 'Solana On-Chain Security',
    subtitle: 'Phase 2 Week 5 Summary Study Notes',
    overview: 'Comprehensive security checklist reviewing common vulnerability vectors (Reentrancy, missing ownership bounds, signers validation) and program upgrades.',
    sections: [
      {
        title: 'Reentrancy Vulnerability & Prevention',
        content: 'Unlike EVM where contract execution loops dynamically, Solana programs prevent standard call stack reentrancy by prohibiting dynamic code compilation during runtime. However, logic-level reentrancy remains a threat. Always follow the **Checks-Effects-Interactions** pattern: modify internal state registers (e.g. mark listing inactive, deduct vault balances) *before* invoking external transfers.',
        language: 'rust',
        codeSnippet: `// SECURE ORDER OF OPERATIONS
pub fn buy_nft(ctx: Context<Buy>) -> Result<()> {
    let listing = &mut ctx.accounts.listing;
    
    // 1. Checks
    require!(listing.is_active, MyError::InactiveListing);
    
    // 2. Effects (Change state first!)
    listing.is_active = false;
    
    // 3. Interactions (CPI transfer second!)
    execute_token_transfer(&ctx.accounts.vault, &ctx.accounts.buyer)?;
    Ok(())
}`
      },
      {
        title: 'Essential Validation Checks',
        content: 'To prevent exploits, every on-chain instruction must enforce:\n1. **Signer Checks**: Assert `ctx.accounts.signer.is_signer` (ensured automatically by `Signer<\'info>` type in Anchor).\n2. **Account Ownership**: Assert target accounts are owned by the program ID (ensured by `Account<\'info, T>` in Anchor).\n3. **PDA Validations**: Verify seeds and bumps match the derived address to prevent address spoofing.'
      },
      {
        title: 'Program Upgrade Safety',
        content: 'Upgradeable programs use the BPF Upgradeable Loader. Global configuration authorities represent high value targets. Safeguard update authorities using multisig wallets (like Squads) to prevent single-point of failure exploits.'
      }
    ]
  },
  {
    id: 'week-6-review',
    title: 'Web3 Client Integration',
    subtitle: 'Phase 3 Week 6 Summary Study Notes',
    overview: 'Review of Solana client libraries, connecting react frontends to programs, configuring connection networks, and managing RPC subscriptions.',
    sections: [
      {
        title: 'Wallet Adapter & Connection Provider',
        content: 'Integrate the standard Solana Wallet Adapter to allow users to sign transactions using browser extension wallets (Phantom, Solflare, etc.). Wrap your root app inside connection providers:',
        language: 'typescript',
        codeSnippet: `import { WalletProvider, ConnectionProvider } from \'@solana/wallet-adapter-react\';
import { WalletModalProvider } from \'@solana/wallet-adapter-react-ui\';

export const Web3Provider = ({ children }) => {
  const endpoint = "https://api.devnet.solana.com";
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};`
      },
      {
        title: 'Building & Sending Transactions',
        content: 'Transactions group multiple instructions. You fetch a recent blockhash, append instructions, request a wallet signature, and send it to the cluster RPC.',
        language: 'typescript',
        codeSnippet: `const tx = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: destinationKey,
    lamports: LAMPORTS_PER_SOL * 0.1,
  })
);
const signature = await sendTransaction(tx, connection);
await connection.confirmTransaction(signature, "confirmed");`
      },
      {
        title: 'Account Real-Time Listeners',
        content: 'Instead of polling RPC nodes continually, subscribe to account state changes using web sockets for instant UI updates.',
        language: 'typescript',
        codeSnippet: `const listenerId = connection.onAccountChange(
  myAccountPubkey,
  (accountInfo) => {
    console.log("Account data updated", accountInfo.data);
  },
  "confirmed"
);
// Cleanup listener
// connection.removeAccountChangeListener(listenerId);`
      }
    ]
  },
  {
    id: 'week-7-review',
    title: 'Backend Services & Webhooks',
    subtitle: 'Phase 3 Week 7 Summary Study Notes',
    overview: 'Indexing chain events using Helius webhooks, Express backend API endpoints, and database caching setups.',
    sections: [
      {
        title: 'Helius Webhook Triggers',
        content: 'RPC limits prevent client apps from directly querying complex queries. We set up Helius Webhooks to listen to program ID transactions and post event logs directly to our backend server.',
        language: 'typescript',
        codeSnippet: `app.post("/webhook", (req, res) => {
  const transactions = req.body;
  for (const tx of transactions) {
    console.log("Parsed transaction event:", tx.description);
    // Parse accounts and write to DB
  }
  res.status(200).send("Logged");
});`
      },
      {
        title: 'Data Aggregation & Caching API',
        content: 'Implement Express REST APIs that query a database (like PostgreSQL/MongoDB) loaded from your indexer webhook. This serves instant listings, histories, and analytics without overloading RPC providers.',
        language: 'typescript',
        codeSnippet: `app.get("/api/listings", async (req, res) => {
  const activeListings = await db.collection("listings")
    .find({ is_active: true })
    .toArray();
  res.json(activeListings);
});`
      }
    ]
  },
  {
    id: 'week-8-review',
    title: 'dApp Optimization & Next.js',
    subtitle: 'Phase 3 Week 8 Summary Study Notes',
    overview: 'Review of Next.js configurations, frontend state management, error monitoring, and deploying static builds on vercel.',
    sections: [
      {
        title: 'Vercel Deployment Architecture',
        content: 'Vite React apps deploy on Vercel as lightning-fast static assets. Since client-side routing is handled locally, we must configure `vercel.json` to redirect all resource fetches back to `index.html` to avoid 404 errors on browser page reloads.',
        language: 'json',
        codeSnippet: `{
  "outputDirectory": "dist/public",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`
      },
      {
        title: 'Centralized State Management (Zustand)',
        content: 'Use Zustand or Context to store shared variables (wallet addresses, account balances, listing arrays) across components to avoid props drilling.',
        language: 'typescript',
        codeSnippet: `import { create } from \'zustand\';

interface WalletStore {
  balance: number;
  setBalance: (bal: number) => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance }),
}));`
      }
    ]
  },
  {
    id: 'week-9-review',
    title: 'Advanced Testing & Fuzzing',
    subtitle: 'Phase 4 Week 9 Summary Study Notes',
    overview: 'Testing programs using fuzzing engines, validating invariant properties, and secure Switchboard/Pyth oracle configurations.',
    sections: [
      {
        title: 'Fuzzing & Invariant Validation',
        content: 'Fuzzing generates hundreds of thousands of random transaction sequences to break program logic. Invariant testing asserts that critical protocol properties (e.g. `Total supplied >= Total borrowed`, or `Vault balances >= User deposits`) remain true under all circumstances.',
        language: 'rust',
        codeSnippet: `// Invariant check inside a fuzz target loop
assert!(
    pool_state.total_supplied >= pool_state.total_borrowed,
    "Invariant Violated: Borrowed value exceeds supply reserves!"
);`
      },
      {
        title: 'Oracle Stale-Price Verification',
        content: 'Defi lending systems must reject oracle prices older than 60 seconds to prevent frontrunning. Also evaluate Pyth confidence intervals to avoid price manipulation attacks.',
        language: 'rust',
        codeSnippet: `// Assert oracle price timestamp is current
let diff = current_timestamp.checked_sub(price_timestamp).ok_or(LendingError::MathError)?;
require!(diff < 60, LendingError::StaleOraclePrice);`
      }
    ]
  },
  {
    id: 'week-10-review',
    title: 'Compute Budget & Performance',
    subtitle: 'Phase 4 Week 10 Summary Study Notes',
    overview: 'Review of compute unit constraints, memory allocation optimizations, and batching transactions.',
    sections: [
      {
        title: 'Compute Unit Optimization',
        content: 'Solana limits transaction execution resources (200k compute units by default). Exceeding this triggers a runtime error. Optimizations include:\n- Use low footprint types (u8/u16 instead of u64 where applicable).\n- Use references instead of cloning structs.\n- Avoid unnecessary string formatting or log statements.',
        language: 'rust',
        codeSnippet: `// OPTIMIZED ACCOUNT PARSING
// Avoid cloning entire account info structs
let source_info = &ctx.accounts.source.to_account_info();
msg!("Remaining CU: {}", solana_program::log::sol_log_compute_units_remaining());`
      },
      {
        title: 'Transaction Batching & Serialization',
        content: 'Consolidate multiple instructions into a single transaction (up to 1232 bytes) to minimize network roundtrips and lower fee overlays.'
      }
    ]
  },
  {
    id: 'week-11-review',
    title: 'Modular Architecture & Scaling',
    subtitle: 'Phase 4 Week 11 Summary Study Notes',
    overview: 'Review of monolithic vs modular architectures, governance DAOs, and cross-chain integrations.',
    sections: [
      {
        title: 'Modular On-Chain Architecture',
        content: 'Break large protocols into multiple smaller programs. This preserves compute budgets and simplifies upgrades. Inter-program calls occur via Cross-Program Invocations (CPI).'
      },
      {
        title: 'On-Chain Governance & DAOs',
        content: 'Implement governance programs where token holders lock assets in voter vaults to draft, vote on, and execute proposals programmatically on-chain.',
        language: 'rust',
        codeSnippet: `#[account]
pub struct Proposal {
    pub creator: Pubkey,
    pub title: String,
    pub votes_for: u64,
    pub votes_against: u64,
    pub end_ts: i64,
    pub executed: bool,
}`
      }
    ]
  },
  {
    id: 'week-12-review',
    title: 'Mainnet Launch Readiness',
    subtitle: 'Phase 4 Week 12 Summary Study Notes',
    overview: 'Launch protocols successfully using pre-deployment checklists, testnet staging, and multisig governance controls.',
    sections: [
      {
        title: 'Pre-Deployment Audit Checklist',
        content: 'Before launching on Mainnet-Beta, execute a comprehensive review:\n- Confirm all update authorities point to secure ledger hardware or multisigs.\n- Verify all account bounds and vector sizing allocations are restricted.\n- Confirm fee parameters are bounded.\n- Test deployment upgrade sequences on Devnet.'
      },
      {
        title: 'Multisig Governance Vaults',
        content: 'Never deploy a protocol with administrative controls assigned to a single key. Migrate authority to multi-signature programs (like Squads) to secure protocol assets.',
        language: 'typescript',
        codeSnippet: `// Example flow details:
// 1. Program update authority -> Squads Multisig PDA.
// 2. Upgrading program requires M-of-N signers approval.
// 3. Treasury transfers require proposal votes.`
      }
    ]
  }
];
