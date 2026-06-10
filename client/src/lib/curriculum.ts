export interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'video' | 'course' | 'tool';
  duration?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  keyTopics: string[];
  estimatedHours: number;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  modules: Module[];
  estimatedWeeks: number;
  color: string;
  icon: string;
  objectives: string[];
}

export const curriculum: Phase[] = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Rust & The Solana Runtime',
    subtitle: 'The Foundation',
    description:
      'Master the Rust language and understand the unique Account-based architecture that makes Solana fundamentally different from Ethereum.',
    estimatedWeeks: 3,
    color: '#9945FF',
    icon: '⚙️',
    objectives: [
      'Understand Rust ownership, borrowing, and memory management',
      'Learn the Solana Account Model and how it differs from the EVM',
      'Master Program Derived Addresses (PDAs) and account ownership',
      'Understand the Solana Runtime and transaction execution model',
    ],
    modules: [
      {
        id: 'module-1-1',
        title: 'Rust Fundamentals',
        description: 'Core Rust concepts essential for Solana development',
        estimatedHours: 20,
        keyTopics: [
          'Ownership and Borrowing',
          'Structs and Enums',
          'Traits and Generics',
          'Pattern Matching',
          'Error Handling',
        ],
        resources: [
          {
            title: 'The Rust Book',
            url: 'https://doc.rust-lang.org/book/',
            type: 'documentation',
            duration: '20-30 hours',
          },
          {
            title: 'Rust by Example',
            url: 'https://doc.rust-lang.org/rust-by-example/',
            type: 'tutorial',
          },
          {
            title: 'Rustlings Exercises',
            url: 'https://github.com/rust-lang/rustlings',
            type: 'course',
          },
        ],
      },
      {
        id: 'module-1-2',
        title: 'Solana Architecture',
        description: 'Understanding the Account Model and Runtime',
        estimatedHours: 15,
        keyTopics: [
          'Account Model vs EVM',
          'Programs and Accounts',
          'Program Derived Addresses (PDAs)',
          'Rent and Account Lifecycle',
          'Transaction Structure',
        ],
        resources: [
          {
            title: 'Solana Documentation',
            url: 'https://solana.com/docs',
            type: 'documentation',
          },
          {
            title: 'Solana Cookbook',
            url: 'https://solanacookbook.com/',
            type: 'documentation',
          },
          {
            title: 'RareSkills - Solana Architecture',
            url: 'https://www.rareskills.io/solana-tutorial',
            type: 'course',
          },
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Programs & Smart Contracts',
    subtitle: 'On-Chain Logic',
    description:
      'Build, test, and deploy secure on-chain programs using the Anchor framework. Master the patterns that power production Solana applications.',
    estimatedWeeks: 4,
    color: '#00D4AA',
    icon: '🔗',
    objectives: [
      'Master the Anchor framework and its macros',
      'Implement secure account validation patterns',
      'Build and test Solana programs locally',
      'Understand Cross-Program Invocation (CPI)',
      'Implement token and NFT interactions',
    ],
    modules: [
      {
        id: 'module-2-1',
        title: 'Anchor Framework Essentials',
        description: 'Building programs with Anchor macros and patterns',
        estimatedHours: 18,
        keyTopics: [
          'Anchor Macros (#[program], #[derive(Accounts)])',
          'Instruction Data and Account Validation',
          'Error Handling in Anchor',
          'Program State Management',
          'Anchor IDL (Interface Definition Language)',
        ],
        resources: [
          {
            title: 'Anchor Book',
            url: 'https://www.anchor-lang.com/',
            type: 'documentation',
          },
          {
            title: 'Anchor Examples',
            url: 'https://github.com/coral-xyz/anchor/tree/master/examples',
            type: 'tutorial',
          },
          {
            title: 'RareSkills - Anchor Deep Dive',
            url: 'https://www.rareskills.io/solana-tutorial',
            type: 'course',
          },
        ],
      },
      {
        id: 'module-2-2',
        title: 'Tokens, NFTs & SPL Programs',
        description: 'Interacting with the Solana Program Library',
        estimatedHours: 16,
        keyTopics: [
          'SPL Token Standard',
          'Token Minting and Transfers',
          'Token Metadata and Metaplex',
          'NFT Creation and Management',
          'Token Extensions (Token 2022)',
        ],
        resources: [
          {
            title: 'SPL Token Documentation',
            url: 'https://spl.solana.com/token',
            type: 'documentation',
          },
          {
            title: 'Metaplex Documentation',
            url: 'https://developers.metaplex.com/',
            type: 'documentation',
          },
          {
            title: 'RareSkills - Tokens on Solana',
            url: 'https://www.rareskills.io/solana-tutorial',
            type: 'course',
          },
        ],
      },
      {
        id: 'module-2-3',
        title: 'Advanced Patterns & Security',
        description: 'Cross-Program Invocation and secure program design',
        estimatedHours: 14,
        keyTopics: [
          'Cross-Program Invocation (CPI)',
          'Escrow and Vaulting Patterns',
          'Security Checks and Validations',
          'Reentrancy Prevention',
          'Program Upgrades',
        ],
        resources: [
          {
            title: 'Solana Cookbook - CPI',
            url: 'https://solanacookbook.com/core-concepts/cpi.html',
            type: 'documentation',
          },
          {
            title: 'Anchor Security Best Practices',
            url: 'https://www.anchor-lang.com/docs/security',
            type: 'documentation',
          },
          {
            title: 'Solana Security Workshop',
            url: 'https://github.com/solana-labs/solana-security-workshop',
            type: 'course',
          },
        ],
      },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Web2 + Web3 Systems',
    subtitle: 'Full-Stack Integration',
    description:
      'Connect on-chain programs to modern frontends and backend indexing services. Build complete user-facing applications.',
    estimatedWeeks: 3,
    color: '#FF6B35',
    icon: '🌐',
    objectives: [
      'Build React frontends with Solana Wallet Adapter',
      'Use Web3.js and Umi libraries for blockchain interaction',
      'Integrate RPC providers and indexing services',
      'Implement user authentication and wallet management',
      'Build complete dApp flows from frontend to blockchain',
    ],
    modules: [
      {
        id: 'module-3-1',
        title: 'Frontend Integration with Web3.js',
        description: 'Building React dApps with Solana Web3 libraries',
        estimatedHours: 14,
        keyTopics: [
          'Solana Web3.js Library',
          'Wallet Adapter and Connection',
          'Transaction Building and Signing',
          'Account Querying and Monitoring',
          'Error Handling in Web3 Apps',
        ],
        resources: [
          {
            title: 'Web3.js Documentation',
            url: 'https://solana-labs.github.io/solana-web3.js/',
            type: 'documentation',
          },
          {
            title: 'Solana Wallet Adapter',
            url: 'https://github.com/solana-labs/wallet-adapter',
            type: 'documentation',
          },
          {
            title: 'Complete Guide to Full-Stack Solana Development',
            url: 'https://dev.to/edge-and-node/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291',
            type: 'tutorial',
          },
        ],
      },
      {
        id: 'module-3-2',
        title: 'Backend Services & Indexing',
        description: 'RPC providers, indexers, and data aggregation',
        estimatedHours: 12,
        keyTopics: [
          'RPC Provider Selection (Helius, QuickNode)',
          'Solana Indexers and Parsers',
          'Event Monitoring and Webhooks',
          'Data Aggregation and Caching',
          'Backend API Design for dApps',
        ],
        resources: [
          {
            title: 'Helius RPC Documentation',
            url: 'https://docs.helius.dev/',
            type: 'documentation',
          },
          {
            title: 'QuickNode Guides',
            url: 'https://www.quicknode.com/guides',
            type: 'documentation',
          },
          {
            title: 'Solana Cookbook - Indexing',
            url: 'https://solanacookbook.com/',
            type: 'documentation',
          },
        ],
      },
      {
        id: 'module-3-3',
        title: 'Building Complete dApps',
        description: 'End-to-end dApp development and deployment',
        estimatedHours: 12,
        keyTopics: [
          'Next.js + Solana Integration',
          'State Management for dApps',
          'User Experience Patterns',
          'Testing dApp Flows',
          'Deployment and Monitoring',
        ],
        resources: [
          {
            title: 'Next.js + Solana Guide',
            url: 'https://solana.com/docs/frontend/nextjs-solana',
            type: 'documentation',
          },
          {
            title: 'dApp Scaffold',
            url: 'https://github.com/solana-labs/dapp-scaffold',
            type: 'tool',
          },
          {
            title: 'Solana Developer Bootcamp',
            url: 'https://solana.com/developers/bootcamp',
            type: 'course',
          },
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Security, Performance & Architecture',
    subtitle: 'Production Readiness',
    description:
      'Audit programs for vulnerabilities, optimize for high-throughput production, and architect scalable systems.',
    estimatedWeeks: 2,
    color: '#9945FF',
    icon: '🔒',
    objectives: [
      'Identify and prevent common Solana vulnerabilities',
      'Optimize programs for compute efficiency',
      'Implement monitoring and alerting',
      'Design scalable dApp architectures',
      'Prepare for mainnet deployment',
    ],
    modules: [
      {
        id: 'module-4-1',
        title: 'Security Auditing & Best Practices',
        description: 'Identifying and preventing vulnerabilities',
        estimatedHours: 12,
        keyTopics: [
          'Common Solana Vulnerabilities',
          'Account Validation Patterns',
          'Signer Checks and Authorization',
          'Integer Overflow/Underflow',
          'Program Upgrade Security',
        ],
        resources: [
          {
            title: 'Solana Security Workshop',
            url: 'https://github.com/solana-labs/solana-security-workshop',
            type: 'course',
          },
          {
            title: 'Anchor Security Guide',
            url: 'https://www.anchor-lang.com/docs/security',
            type: 'documentation',
          },
          {
            title: 'Audit Reports (Neodyme, Zellic)',
            url: 'https://github.com/neodyme-labs',
            type: 'documentation',
          },
        ],
      },
      {
        id: 'module-4-2',
        title: 'Performance & Optimization',
        description: 'Compute efficiency and transaction optimization',
        estimatedHours: 10,
        keyTopics: [
          'Compute Unit Optimization',
          'Transaction Size Limits',
          'Batch Processing',
          'Parallel Processing',
          'Monitoring and Profiling',
        ],
        resources: [
          {
            title: 'Solana Compute Budget',
            url: 'https://solana.com/docs/core/fees#compute-budget',
            type: 'documentation',
          },
          {
            title: 'RareSkills - Advanced Topics',
            url: 'https://www.rareskills.io/solana-tutorial',
            type: 'course',
          },
          {
            title: 'Solana Cookbook - Performance',
            url: 'https://solanacookbook.com/',
            type: 'documentation',
          },
        ],
      },
    ],
  },
];

export const tools = [
  {
    name: 'Anchor',
    category: 'Framework',
    url: 'https://www.anchor-lang.com/',
    description: 'Industry-standard framework for Solana program development',
  },
  {
    name: 'Solana CLI',
    category: 'Tool',
    url: 'https://docs.solana.com/cli',
    description: 'Command-line interface for Solana development',
  },
  {
    name: 'Web3.js',
    category: 'SDK',
    url: 'https://solana-labs.github.io/solana-web3.js/',
    description: 'JavaScript library for interacting with Solana',
  },
  {
    name: 'Umi',
    category: 'SDK',
    url: 'https://github.com/metaplex-foundation/umi',
    description: 'Modern JavaScript framework for Solana development',
  },
  {
    name: 'Helius',
    category: 'RPC Provider',
    url: 'https://helius.dev/',
    description: 'High-performance RPC provider with enhanced APIs',
  },
  {
    name: 'QuickNode',
    category: 'RPC Provider',
    url: 'https://www.quicknode.com/',
    description: 'Reliable RPC infrastructure for Solana',
  },
  {
    name: 'Solana Explorer',
    category: 'Tool',
    url: 'https://explorer.solana.com/',
    description: 'Official Solana blockchain explorer',
  },
  {
    name: 'SolanaFM',
    category: 'Tool',
    url: 'https://solana.fm/',
    description: 'Advanced Solana blockchain explorer',
  },
  {
    name: 'Metaplex',
    category: 'Framework',
    url: 'https://www.metaplex.com/',
    description: 'NFT and token standards for Solana',
  },
  {
    name: 'Phantom Wallet',
    category: 'Wallet',
    url: 'https://phantom.app/',
    description: 'Popular Solana wallet for development and testing',
  },
];
