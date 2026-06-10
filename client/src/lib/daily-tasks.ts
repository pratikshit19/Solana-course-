export interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'video' | 'course' | 'tool' | 'exercise';
}

export interface DailyTask {
  day: number;
  title: string;
  goal: string;
  study: Resource[];
  practice: Resource[];
  deliverable: string;
  timeHours: number;
  deadline: string;
  phase: number;
  week: number;
}

export const dailyTasks: DailyTask[] = [
  {
    "day": 1,
    "title": "Ownership Basics",
    "goal": "Understand how Rust manages memory without garbage collection",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapters 4.1-4.2 (Ownership concept",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      },
      {
        "title": "what is ownership)",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete Rustlings exercises `move_semantics/move_semantics1.rs` through `move_semantics4.rs`",
        "url": "https://github.com/rust-lang/rustlings",
        "type": "exercise"
      }
    ],
    "deliverable": "Write a 200-word explanation of ownership vs borrowing in your own words",
    "timeHours": 3,
    "deadline": "End of Day 1",
    "phase": 1,
    "week": 1
  },
  {
    "day": 2,
    "title": "Borrowing & References",
    "goal": "Master mutable and immutable references",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapters 4.3-4.5 (References",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      },
      {
        "title": "borrowing",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "mutable references)",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete Rustlings exercises `move_semantics/move_semantics5.rs` through `move_semantics6.rs`",
        "url": "https://github.com/rust-lang/rustlings",
        "type": "exercise"
      },
      {
        "title": "all `borrow_*` exercises",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a Rust program that demonstrates 3 different borrowing scenarios (immutable borrow, mutable borrow, multiple immutable borrows)",
    "timeHours": 3,
    "deadline": "End of Day 2",
    "phase": 1,
    "week": 1
  },
  {
    "day": 3,
    "title": "Structs & Pattern Matching",
    "goal": "Learn how to structure data and destructure it",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapters 5.1-5.3 (Structs",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      },
      {
        "title": "method syntax)",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete all Rustlings `structs/` exercises",
        "url": "https://github.com/rust-lang/rustlings",
        "type": "exercise"
      }
    ],
    "deliverable": "Build a `BankAccount` struct with methods for deposit, withdraw, and balance check. Include pattern matching for transaction types",
    "timeHours": 3,
    "deadline": "End of Day 3",
    "phase": 1,
    "week": 1
  },
  {
    "day": 4,
    "title": "Enums & Error Handling",
    "goal": "Use enums for type-safe error handling",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapters 6.1-6.3 (Enums",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      },
      {
        "title": "match control flow)",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete all Rustlings `enums/` exercises",
        "url": "https://github.com/rust-lang/rustlings",
        "type": "exercise"
      }
    ],
    "deliverable": "Refactor your BankAccount to return `Result<T, E>` types for operations. Handle insufficient funds and invalid amounts",
    "timeHours": 3,
    "deadline": "End of Day 4",
    "phase": 1,
    "week": 1
  },
  {
    "day": 5,
    "title": "Traits & Generics",
    "goal": "Write reusable, generic code with trait bounds",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapters 10.1-10.3 (Generics",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      },
      {
        "title": "traits)",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete all Rustlings `traits/` exercises",
        "url": "https://github.com/rust-lang/rustlings",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a generic `Vault<T>` struct that works with any type implementing a `Storable` trait. Implement for Account and Token types",
    "timeHours": 3,
    "deadline": "End of Day 5",
    "phase": 1,
    "week": 1
  },
  {
    "day": 6,
    "title": "Lifetimes & Advanced Ownership",
    "goal": "Understand lifetime annotations and complex ownership scenarios",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapters 10.4 (Lifetimes)",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete all Rustlings `lifetimes/` exercises",
        "url": "https://github.com/rust-lang/rustlings",
        "type": "exercise"
      }
    ],
    "deliverable": "Write a function that takes two references and returns the longer one, with proper lifetime annotations. Document why lifetimes matter",
    "timeHours": 3,
    "deadline": "End of Day 6",
    "phase": 1,
    "week": 1
  },
  {
    "day": 7,
    "title": "Macros & Procedural Concepts",
    "goal": "Understand macros (essential for Anchor framework)",
    "study": [
      {
        "title": "Read \"The Rust Book\" chapter 19.5 (Macros)",
        "url": "https://doc.rust-lang.org/book/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Study Anchor's `#[program]`",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "`#[derive(Accounts)]` macros by reading their documentation",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Write a simple macro that generates a struct with getter/setter methods. Document how it works",
    "timeHours": 3,
    "deadline": "End of Day 7",
    "phase": 1,
    "week": 1
  },
  {
    "day": 8,
    "title": "Solana vs Ethereum Mental Model",
    "goal": "Understand why Solana's architecture is fundamentally different",
    "study": [
      {
        "title": "Read Solana docs \"Core Concepts\" - Programs vs Accounts",
        "url": "https://solana.com/docs",
        "type": "documentation"
      },
      {
        "title": "Transaction Model",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Compare EVM storage model with Solana accounts using RareSkills tutorial Module 1",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "deliverable": "Create a comparison table: EVM contracts vs Solana programs (state storage, execution, fees, upgrades)",
    "timeHours": 3,
    "deadline": "End of Day 8",
    "phase": 1,
    "week": 2
  },
  {
    "day": 9,
    "title": "Accounts, Rent & PDAs",
    "goal": "Master the Account model and Program Derived Addresses",
    "study": [
      {
        "title": "Read Solana docs \"Accounts\"",
        "url": "https://solana.com/docs",
        "type": "documentation"
      },
      {
        "title": "\"Rent\"",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "\"PDAs\" sections",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete RareSkills Module 4.1-4.2 (Initializing Accounts",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      },
      {
        "title": "Counter Tutorial)",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Write a detailed explanation with diagrams: How a PDA is derived, why it's deterministic, and why it matters for security",
    "timeHours": 3,
    "deadline": "End of Day 9",
    "phase": 1,
    "week": 2
  },
  {
    "day": 10,
    "title": "Transaction Structure & Signers",
    "goal": "Understand how transactions are built and executed",
    "study": [
      {
        "title": "Read Solana docs \"Transactions\"",
        "url": "https://solana.com/docs",
        "type": "documentation"
      },
      {
        "title": "\"Signers\"",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Use Solana CLI to inspect a real transaction on devnet",
        "url": "https://docs.solana.com/cli",
        "type": "tool"
      }
    ],
    "deliverable": "Build a transaction manually using web3.js that transfers SOL. Explain each component (instruction, accounts, signers)",
    "timeHours": 3,
    "deadline": "End of Day 10",
    "phase": 1,
    "week": 2
  },
  {
    "day": 11,
    "title": "Program Execution & Compute Units",
    "goal": "Learn how programs execute and optimize for compute",
    "study": [
      {
        "title": "Read Solana docs \"Compute Budget\"",
        "url": "https://solana.com/docs",
        "type": "documentation"
      },
      {
        "title": "\"Program Execution\"",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Set up local Solana validator",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "run a test program",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a simple Rust program that logs compute units used. Run it and document the output",
    "timeHours": 3,
    "deadline": "End of Day 11",
    "phase": 1,
    "week": 2
  },
  {
    "day": 12,
    "title": "Cross-Program Invocation (CPI) Basics",
    "goal": "Understand how programs call other programs",
    "study": [
      {
        "title": "Read Solana Cookbook \"CPI\" section",
        "url": "https://solanacookbook.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Study RareSkills Module 4.18 (Cross Program Invocation)",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "deliverable": "Write pseudocode for a program that calls the Token Program to transfer tokens",
    "timeHours": 3,
    "deadline": "End of Day 12",
    "phase": 1,
    "week": 2
  },
  {
    "day": 13,
    "title": "Security Checks & Account Validation",
    "goal": "Learn essential security patterns",
    "study": [
      {
        "title": "Read Solana Security Workshop \"Account Validation\" section",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Review common vulnerabilities in RareSkills security module",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "deliverable": "List 5 critical security checks every Solana program must perform. Explain why each matters",
    "timeHours": 3,
    "deadline": "End of Day 13",
    "phase": 1,
    "week": 2
  },
  {
    "day": 14,
    "title": "Week 2 Project - Build a Counter Program",
    "goal": "Apply all Week 2 concepts in a complete program",
    "study": [
      {
        "title": "Review all previous days' materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a counter program in native Rust that increments a PDA-based account",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A working counter program with proper account validation, error handling, and documentation",
    "timeHours": 4,
    "deadline": "End of Day 14",
    "phase": 1,
    "week": 2
  },
  {
    "day": 15,
    "title": "Anchor Setup & Project Structure",
    "goal": "Set up Anchor development environment",
    "study": [
      {
        "title": "Read Anchor Book \"Getting Started\"",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      },
      {
        "title": "\"Project Structure\"",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Run `anchor init solana_counter`",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "explore the generated files",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a new Anchor project and document each file's purpose",
    "timeHours": 2,
    "deadline": "End of Day 15",
    "phase": 2,
    "week": 3
  },
  {
    "day": 16,
    "title": "Anchor Macros & Attributes",
    "goal": "Master `#[program]`, `#[derive(Accounts)]`, and instruction macros",
    "study": [
      {
        "title": "Read Anchor Book \"Defining Programs\"",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      },
      {
        "title": "\"Accounts\"",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete Anchor examples for basic program structure",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Write a program with 3 instructions using different account types (signer, mut, init)",
    "timeHours": 3,
    "deadline": "End of Day 16",
    "phase": 2,
    "week": 3
  },
  {
    "day": 17,
    "title": "Account Validation & Constraints",
    "goal": "Use Anchor's constraint system for security",
    "study": [
      {
        "title": "Read Anchor Book \"Constraints\" section",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Implement accounts with `#[account(mut)]`",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "`#[account(init)]`",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "`#[account(seeds",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "bump)]`",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Build an account struct with 5 different constraints. Explain what each prevents",
    "timeHours": 3,
    "deadline": "End of Day 17",
    "phase": 2,
    "week": 3
  },
  {
    "day": 18,
    "title": "Error Handling in Anchor",
    "goal": "Implement proper error handling",
    "study": [
      {
        "title": "Read Anchor Book \"Error Handling\"",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Create custom error types",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "use them in instructions",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Refactor previous programs to return custom errors instead of panicking",
    "timeHours": 2,
    "deadline": "End of Day 18",
    "phase": 2,
    "week": 3
  },
  {
    "day": 19,
    "title": "Testing Anchor Programs",
    "goal": "Write comprehensive tests",
    "study": [
      {
        "title": "Read Anchor Book \"Testing\" section",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Run `anchor test`",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "write unit tests for your programs",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Write 10 test cases for a simple program (happy path, error cases, edge cases)",
    "timeHours": 3,
    "deadline": "End of Day 19",
    "phase": 2,
    "week": 3
  },
  {
    "day": 20,
    "title": "IDL & Client Generation",
    "goal": "Understand IDL and automatic client generation",
    "study": [
      {
        "title": "Read Anchor Book \"IDL\" section",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Generate",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "inspect IDL from your programs",
        "url": "https://www.anchor-lang.com/",
        "type": "exercise"
      }
    ],
    "deliverable": "Generate TypeScript client from your program's IDL and use it to call instructions",
    "timeHours": 2,
    "deadline": "End of Day 20",
    "phase": 2,
    "week": 3
  },
  {
    "day": 21,
    "title": "Week 3 Project - Todo List Program",
    "goal": "Build a complete Anchor program with multiple features",
    "study": [
      {
        "title": "Review all Week 3 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a todo list program with add",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "complete",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "delete operations",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A fully tested Anchor program with TypeScript client and comprehensive documentation",
    "timeHours": 4,
    "deadline": "End of Day 21",
    "phase": 2,
    "week": 3
  },
  {
    "day": 22,
    "title": "SPL Token Standard",
    "goal": "Understand how tokens work on Solana",
    "study": [
      {
        "title": "Read SPL Token documentation",
        "url": "https://spl.solana.com/token",
        "type": "documentation"
      },
      {
        "title": "RareSkills Module 5.1",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Use Solana CLI to create a test token",
        "url": "https://docs.solana.com/cli",
        "type": "tool"
      }
    ],
    "deliverable": "Create a token, mint tokens, and transfer them using CLI. Document each step",
    "timeHours": 3,
    "deadline": "End of Day 22",
    "phase": 2,
    "week": 4
  },
  {
    "day": 23,
    "title": "Token Transfers with Anchor",
    "goal": "Interact with the Token Program from Anchor",
    "study": [
      {
        "title": "Read RareSkills Module 5.2 (Transferring SPL Tokens)",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Build an Anchor program that transfers tokens",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program with a `transfer_tokens` instruction that properly handles token accounts",
    "timeHours": 3,
    "deadline": "End of Day 23",
    "phase": 2,
    "week": 4
  },
  {
    "day": 24,
    "title": "Token Minting & Burning",
    "goal": "Implement token creation and destruction",
    "study": [
      {
        "title": "Read SPL Token docs \"Minting\"",
        "url": "https://spl.solana.com/token",
        "type": "documentation"
      },
      {
        "title": "\"Burning\" sections",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a program that mints",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "burns tokens",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a token vending machine program that mints tokens when SOL is received",
    "timeHours": 3,
    "deadline": "End of Day 24",
    "phase": 2,
    "week": 4
  },
  {
    "day": 25,
    "title": "Metaplex & NFT Metadata",
    "goal": "Add metadata to tokens (NFTs)",
    "study": [
      {
        "title": "Read Metaplex documentation",
        "url": "https://developers.metaplex.com/",
        "type": "documentation"
      },
      {
        "title": "RareSkills Module 5.5-5.6",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Create an NFT with metadata using Metaplex",
        "url": "https://developers.metaplex.com/",
        "type": "exercise"
      }
    ],
    "deliverable": "Create an NFT with image, name, symbol, and description",
    "timeHours": 3,
    "deadline": "End of Day 25",
    "phase": 2,
    "week": 4
  },
  {
    "day": 26,
    "title": "Cross-Program Invocation (CPI)",
    "goal": "Call other programs from your program",
    "study": [
      {
        "title": "Read Anchor Book \"CPI\"",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      },
      {
        "title": "RareSkills Module 4.18",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Build a program that calls the Token Program via CPI",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program that uses CPI to transfer tokens from a vault",
    "timeHours": 3,
    "deadline": "End of Day 26",
    "phase": 2,
    "week": 4
  },
  {
    "day": 27,
    "title": "Escrow Pattern",
    "goal": "Implement secure escrow logic",
    "study": [
      {
        "title": "Read Solana Cookbook \"Escrow\" pattern",
        "url": "https://solanacookbook.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build an escrow program for token swaps",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a complete escrow program with deposit, cancel, and exchange instructions",
    "timeHours": 4,
    "deadline": "End of Day 27",
    "phase": 2,
    "week": 4
  },
  {
    "day": 28,
    "title": "Week 4 Project - Token Swap Program",
    "goal": "Build a complete token swapping system",
    "study": [
      {
        "title": "Review all Week 4 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a program that allows users to swap Token A for Token B",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A fully functional token swap program with proper validation and testing",
    "timeHours": 5,
    "deadline": "End of Day 28",
    "phase": 2,
    "week": 4
  },
  {
    "day": 29,
    "title": "Common Vulnerabilities",
    "goal": "Identify and prevent security issues",
    "study": [
      {
        "title": "Read Solana Security Workshop",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "audit reports",
        "url": "#",
        "type": "exercise"
      }
    ],
    "practice": [
      {
        "title": "Review vulnerable code examples",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "identify issues",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document 10 common Solana vulnerabilities with examples and fixes",
    "timeHours": 3,
    "deadline": "End of Day 29",
    "phase": 2,
    "week": 5
  },
  {
    "day": 30,
    "title": "Account Ownership & Authority Patterns",
    "goal": "Implement proper authorization",
    "study": [
      {
        "title": "Read RareSkills Module 4.14 (Owner vs Authority)",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Build programs with different authorization schemes",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program with role-based access control (admin, user, guest)",
    "timeHours": 3,
    "deadline": "End of Day 30",
    "phase": 2,
    "week": 5
  },
  {
    "day": 31,
    "title": "Reentrancy Prevention",
    "goal": "Prevent reentrancy attacks",
    "study": [
      {
        "title": "Read security best practices on reentrancy",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a vulnerable program",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "then fix it",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program that demonstrates reentrancy vulnerability and its fix",
    "timeHours": 3,
    "deadline": "End of Day 31",
    "phase": 2,
    "week": 5
  },
  {
    "day": 32,
    "title": "Program Upgrades & Authority",
    "goal": "Understand program upgrade mechanisms",
    "study": [
      {
        "title": "Read Solana docs \"Program Upgrades\"",
        "url": "https://solana.com/docs",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Deploy an upgradeable program",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "upgrade it",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Deploy a program with upgrade authority and perform an upgrade",
    "timeHours": 3,
    "deadline": "End of Day 32",
    "phase": 2,
    "week": 5
  },
  {
    "day": 33,
    "title": "Instruction Introspection",
    "goal": "Inspect instructions at runtime",
    "study": [
      {
        "title": "Read RareSkills Module 6.1 (Instruction Introspection)",
        "url": "https://www.rareskills.io/solana-tutorial",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Build a program that validates instruction sequence",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program that uses instruction introspection for security",
    "timeHours": 3,
    "deadline": "End of Day 33",
    "phase": 2,
    "week": 5
  },
  {
    "day": 34,
    "title": "Compute Optimization",
    "goal": "Optimize programs for compute efficiency",
    "study": [
      {
        "title": "Read Solana docs \"Compute Budget\" optimization tips",
        "url": "https://solana.com/docs",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Profile your programs",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "optimize hot paths",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Reduce compute usage of a program by 30% and document optimizations",
    "timeHours": 3,
    "deadline": "End of Day 34",
    "phase": 2,
    "week": 5
  },
  {
    "day": 35,
    "title": "Week 5 Project - Secure Vault Program",
    "goal": "Build a production-ready vault program",
    "study": [
      {
        "title": "Review all Week 5 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a vault with multiple security layers",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A secure vault program with comprehensive security checks and documentation",
    "timeHours": 5,
    "deadline": "End of Day 35",
    "phase": 2,
    "week": 5
  },
  {
    "day": 36,
    "title": "Web3.js Basics",
    "goal": "Connect to Solana from JavaScript",
    "study": [
      {
        "title": "Read Web3.js documentation \"Getting Started\"",
        "url": "https://solana-labs.github.io/solana-web3.js/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Create a simple Node.js script that queries the blockchain",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Write a script that fetches account info and SOL balance",
    "timeHours": 2,
    "deadline": "End of Day 36",
    "phase": 3,
    "week": 6
  },
  {
    "day": 37,
    "title": "Wallet Connection",
    "goal": "Integrate wallet adapter for user authentication",
    "study": [
      {
        "title": "Read Solana Wallet Adapter documentation",
        "url": "https://github.com/solana-labs/wallet-adapter",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Set up wallet adapter in a React app",
        "url": "https://github.com/solana-labs/wallet-adapter",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a React component with \"Connect Wallet\" button",
    "timeHours": 3,
    "deadline": "End of Day 37",
    "phase": 3,
    "week": 6
  },
  {
    "day": 38,
    "title": "Transaction Building & Signing",
    "goal": "Build and sign transactions from the frontend",
    "study": [
      {
        "title": "Read Web3.js \"Transactions\" documentation",
        "url": "https://solana-labs.github.io/solana-web3.js/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a transaction that transfers SOL",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a React component that sends SOL to an address",
    "timeHours": 3,
    "deadline": "End of Day 38",
    "phase": 3,
    "week": 6
  },
  {
    "day": 39,
    "title": "Calling Your Programs",
    "goal": "Call your Anchor programs from React",
    "study": [
      {
        "title": "Read Anchor \"Client Generation\"",
        "url": "https://docs.solana.com/cli",
        "type": "tool"
      },
      {
        "title": "Web3.js \"Instructions\"",
        "url": "https://solana-labs.github.io/solana-web3.js/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Use generated TypeScript client to call program instructions",
        "url": "https://docs.solana.com/cli",
        "type": "tool"
      }
    ],
    "deliverable": "Create a React component that calls your todo list program",
    "timeHours": 3,
    "deadline": "End of Day 39",
    "phase": 3,
    "week": 6
  },
  {
    "day": 40,
    "title": "Account Monitoring & Subscriptions",
    "goal": "Listen to account changes in real-time",
    "study": [
      {
        "title": "Read Web3.js \"Subscriptions\" documentation",
        "url": "https://solana-labs.github.io/solana-web3.js/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Subscribe to account changes",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "update UI",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a component that displays real-time balance updates",
    "timeHours": 3,
    "deadline": "End of Day 40",
    "phase": 3,
    "week": 6
  },
  {
    "day": 41,
    "title": "Error Handling & UX",
    "goal": "Implement proper error handling and user feedback",
    "study": [
      {
        "title": "Review Web3.js error types",
        "url": "https://solana-labs.github.io/solana-web3.js/",
        "type": "documentation"
      },
      {
        "title": "best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Add error boundaries",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "loading states",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Refactor previous components with comprehensive error handling",
    "timeHours": 3,
    "deadline": "End of Day 41",
    "phase": 3,
    "week": 6
  },
  {
    "day": 42,
    "title": "Week 6 Project - Todo List Frontend",
    "goal": "Build a complete frontend for your todo program",
    "study": [
      {
        "title": "Review all Week 6 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a full React app for todo management",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A complete React app connected to your Anchor todo program",
    "timeHours": 4,
    "deadline": "End of Day 42",
    "phase": 3,
    "week": 6
  },
  {
    "day": 43,
    "title": "RPC Providers & Helius",
    "goal": "Use professional RPC infrastructure",
    "study": [
      {
        "title": "Read Helius documentation",
        "url": "https://docs.helius.dev/",
        "type": "documentation"
      },
      {
        "title": "setup guide",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Sign up for Helius",
        "url": "https://docs.helius.dev/",
        "type": "exercise"
      },
      {
        "title": "configure your app to use it",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Migrate your app to use Helius RPC with API key",
    "timeHours": 2,
    "deadline": "End of Day 43",
    "phase": 3,
    "week": 7
  },
  {
    "day": 44,
    "title": "Indexing & Parsing Events",
    "goal": "Index blockchain data efficiently",
    "study": [
      {
        "title": "Read Helius \"Parsed Transactions\"",
        "url": "https://docs.helius.dev/",
        "type": "documentation"
      },
      {
        "title": "\"Webhooks\" documentation",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Set up webhook to receive transaction notifications",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a webhook endpoint that logs transaction events",
    "timeHours": 3,
    "deadline": "End of Day 44",
    "phase": 3,
    "week": 7
  },
  {
    "day": 45,
    "title": "Building an Indexer",
    "goal": "Create a simple indexer for your program",
    "study": [
      {
        "title": "Review indexing patterns",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "databases",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a Node.js script that indexes your program's events",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create an indexer that stores program events in a database",
    "timeHours": 4,
    "deadline": "End of Day 45",
    "phase": 3,
    "week": 7
  },
  {
    "day": 46,
    "title": "Backend API Design",
    "goal": "Design a backend API for your dApp",
    "study": [
      {
        "title": "Read API design best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Design REST endpoints for your dApp",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document API endpoints with request/response examples",
    "timeHours": 3,
    "deadline": "End of Day 46",
    "phase": 3,
    "week": 7
  },
  {
    "day": 47,
    "title": "Building Backend with Express",
    "goal": "Implement your backend API",
    "study": [
      {
        "title": "Read Express.js documentation",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build API endpoints for your dApp",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a working Express API with 5+ endpoints",
    "timeHours": 4,
    "deadline": "End of Day 47",
    "phase": 3,
    "week": 7
  },
  {
    "day": 48,
    "title": "Database Integration",
    "goal": "Store and retrieve data efficiently",
    "study": [
      {
        "title": "Read PostgreSQL or MongoDB basics",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Connect your API to a database",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Implement database models and queries for your dApp",
    "timeHours": 3,
    "deadline": "End of Day 48",
    "phase": 3,
    "week": 7
  },
  {
    "day": 49,
    "title": "Week 7 Project - Full Backend",
    "goal": "Build a complete backend for your dApp",
    "study": [
      {
        "title": "Review all Week 7 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a production-ready backend",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A complete backend with API, database, and indexing",
    "timeHours": 5,
    "deadline": "End of Day 49",
    "phase": 3,
    "week": 7
  },
  {
    "day": 50,
    "title": "Next.js Setup",
    "goal": "Use Next.js for better frontend architecture",
    "study": [
      {
        "title": "Read Next.js documentation",
        "url": "https://solana.com/docs/frontend/nextjs-solana",
        "type": "documentation"
      },
      {
        "title": "Solana integration guide",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Create a Next.js app with Solana integration",
        "url": "https://solana.com/docs/frontend/nextjs-solana",
        "type": "exercise"
      }
    ],
    "deliverable": "Set up a Next.js project with wallet adapter",
    "timeHours": 3,
    "deadline": "End of Day 50",
    "phase": 3,
    "week": 8
  },
  {
    "day": 51,
    "title": "State Management",
    "goal": "Implement proper state management",
    "study": [
      {
        "title": "Read about Context API",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "Zustand",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "or Redux",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Implement state management in your app",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Refactor your app to use centralized state management",
    "timeHours": 3,
    "deadline": "End of Day 51",
    "phase": 3,
    "week": 8
  },
  {
    "day": 52,
    "title": "Testing dApp Flows",
    "goal": "Write comprehensive tests",
    "study": [
      {
        "title": "Read testing best practices for dApps",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Write unit",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "integration tests",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create test suite with 20+ test cases",
    "timeHours": 4,
    "deadline": "End of Day 52",
    "phase": 3,
    "week": 8
  },
  {
    "day": 53,
    "title": "Devnet Deployment",
    "goal": "Deploy your program to devnet",
    "study": [
      {
        "title": "Read Solana devnet deployment guide",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Deploy your program",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "frontend to devnet",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Deployed program on devnet with working frontend",
    "timeHours": 3,
    "deadline": "End of Day 53",
    "phase": 3,
    "week": 8
  },
  {
    "day": 54,
    "title": "Monitoring & Analytics",
    "goal": "Monitor your dApp's performance",
    "study": [
      {
        "title": "Read monitoring",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "analytics best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Set up error tracking",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "analytics",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Implement Sentry or similar for error tracking",
    "timeHours": 3,
    "deadline": "End of Day 54",
    "phase": 3,
    "week": 8
  },
  {
    "day": 55,
    "title": "Documentation & Cleanup",
    "goal": "Document your complete dApp",
    "study": [
      {
        "title": "Review documentation best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Write comprehensive documentation",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Complete README with setup, usage, and architecture docs",
    "timeHours": 3,
    "deadline": "End of Day 55",
    "phase": 3,
    "week": 8
  },
  {
    "day": 56,
    "title": "Week 8 Project - Complete dApp",
    "goal": "Finalize your complete dApp",
    "study": [
      {
        "title": "Review all previous materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Polish",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "finalize your dApp",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A production-ready dApp deployed on devnet",
    "timeHours": 5,
    "deadline": "End of Day 56",
    "phase": 3,
    "week": 8
  },
  {
    "day": 57,
    "title": "Security Audit Preparation",
    "goal": "Prepare your program for audit",
    "study": [
      {
        "title": "Read audit checklists",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Review your code against security checklist",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document all security measures in your program",
    "timeHours": 3,
    "deadline": "End of Day 57",
    "phase": 4,
    "week": 9
  },
  {
    "day": 58,
    "title": "Fuzzing & Property-Based Testing",
    "goal": "Find edge cases with automated testing",
    "study": [
      {
        "title": "Read about fuzzing",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "property-based testing",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Set up fuzzing for your program",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Run fuzzing and document any issues found",
    "timeHours": 4,
    "deadline": "End of Day 58",
    "phase": 4,
    "week": 9
  },
  {
    "day": 59,
    "title": "Formal Verification Basics",
    "goal": "Understand formal verification concepts",
    "study": [
      {
        "title": "Read about formal verification in Rust",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Study formal verification examples",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document critical invariants in your program",
    "timeHours": 3,
    "deadline": "End of Day 59",
    "phase": 4,
    "week": 9
  },
  {
    "day": 60,
    "title": "Signature Verification",
    "goal": "Implement advanced signature schemes",
    "study": [
      {
        "title": "Read about Ed25519",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "secp256k1 in Solana",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Implement signature verification in a program",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program that verifies external signatures",
    "timeHours": 3,
    "deadline": "End of Day 60",
    "phase": 4,
    "week": 9
  },
  {
    "day": 61,
    "title": "Oracle Integration",
    "goal": "Safely integrate external data",
    "study": [
      {
        "title": "Read Switchboard",
        "url": "https://pyth.network/",
        "type": "documentation"
      },
      {
        "title": "Pyth oracle documentation",
        "url": "https://pyth.network/",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Integrate an oracle into your program",
        "url": "https://pyth.network/",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program that uses oracle data safely",
    "timeHours": 3,
    "deadline": "End of Day 61",
    "phase": 4,
    "week": 9
  },
  {
    "day": 62,
    "title": "Access Control Patterns",
    "goal": "Implement advanced access control",
    "study": [
      {
        "title": "Read about role-based",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "attribute-based access control",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a program with complex permissions",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a multi-role access control system",
    "timeHours": 3,
    "deadline": "End of Day 62",
    "phase": 4,
    "week": 9
  },
  {
    "day": 63,
    "title": "Week 9 Project - Secure Protocol",
    "goal": "Build a production-grade secure protocol",
    "study": [
      {
        "title": "Review all Week 9 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a secure protocol with all learned patterns",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A secure, auditable protocol ready for mainnet",
    "timeHours": 5,
    "deadline": "End of Day 63",
    "phase": 4,
    "week": 9
  },
  {
    "day": 64,
    "title": "Profiling & Benchmarking",
    "goal": "Measure and optimize performance",
    "study": [
      {
        "title": "Read Solana profiling tools documentation",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Profile your program",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "identify bottlenecks",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create performance report with optimization recommendations",
    "timeHours": 3,
    "deadline": "End of Day 64",
    "phase": 4,
    "week": 10
  },
  {
    "day": 65,
    "title": "Compute Unit Optimization",
    "goal": "Reduce compute usage",
    "study": [
      {
        "title": "Read compute optimization techniques",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Optimize your program's hot paths",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Reduce compute usage by 40% and document changes",
    "timeHours": 4,
    "deadline": "End of Day 65",
    "phase": 4,
    "week": 10
  },
  {
    "day": 66,
    "title": "Memory Optimization",
    "goal": "Optimize memory usage",
    "study": [
      {
        "title": "Read Solana memory constraints",
        "url": "https://www.anchor-lang.com/",
        "type": "documentation"
      },
      {
        "title": "optimization",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Optimize account sizes",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "data layouts",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Reduce account sizes by 30% without losing functionality",
    "timeHours": 3,
    "deadline": "End of Day 66",
    "phase": 4,
    "week": 10
  },
  {
    "day": 67,
    "title": "Parallel Processing",
    "goal": "Implement parallel processing patterns",
    "study": [
      {
        "title": "Read about Solana's parallel transaction processing",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Design programs that benefit from parallelization",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a program optimized for parallel execution",
    "timeHours": 3,
    "deadline": "End of Day 67",
    "phase": 4,
    "week": 10
  },
  {
    "day": 68,
    "title": "Batch Processing",
    "goal": "Implement efficient batch operations",
    "study": [
      {
        "title": "Read batch processing patterns",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a program that handles batch operations",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a batching system that reduces transaction count",
    "timeHours": 3,
    "deadline": "End of Day 68",
    "phase": 4,
    "week": 10
  },
  {
    "day": 69,
    "title": "Fee Optimization",
    "goal": "Minimize transaction costs",
    "study": [
      {
        "title": "Read Solana fee structure",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "optimization",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Optimize your dApp for minimal fees",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document fee optimization strategies used",
    "timeHours": 3,
    "deadline": "End of Day 69",
    "phase": 4,
    "week": 10
  },
  {
    "day": 70,
    "title": "Week 10 Project - High-Performance dApp",
    "goal": "Build an optimized, production-ready dApp",
    "study": [
      {
        "title": "Review all Week 10 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a high-performance dApp",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A dApp optimized for performance and cost",
    "timeHours": 5,
    "deadline": "End of Day 70",
    "phase": 4,
    "week": 10
  },
  {
    "day": 71,
    "title": "Monolithic vs Modular Architecture",
    "goal": "Design scalable program architecture",
    "study": [
      {
        "title": "Read about program architecture patterns",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Design a modular program structure",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document architecture of a complex protocol",
    "timeHours": 3,
    "deadline": "End of Day 71",
    "phase": 4,
    "week": 11
  },
  {
    "day": 72,
    "title": "Program Composition",
    "goal": "Build programs that work together",
    "study": [
      {
        "title": "Read about composable protocols",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build multiple programs that interact",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create 2-3 programs that compose together",
    "timeHours": 4,
    "deadline": "End of Day 72",
    "phase": 4,
    "week": 11
  },
  {
    "day": 73,
    "title": "State Management at Scale",
    "goal": "Handle large amounts of state",
    "study": [
      {
        "title": "Read about state management patterns",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Design systems for large-scale state",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Design a state management system for 1M+ users",
    "timeHours": 3,
    "deadline": "End of Day 73",
    "phase": 4,
    "week": 11
  },
  {
    "day": 74,
    "title": "Upgrade Strategies",
    "goal": "Plan for program upgrades",
    "study": [
      {
        "title": "Read upgrade patterns",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "migrations",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Design upgrade paths for your programs",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document upgrade strategy for your protocol",
    "timeHours": 3,
    "deadline": "End of Day 74",
    "phase": 4,
    "week": 11
  },
  {
    "day": 75,
    "title": "Governance & DAO Patterns",
    "goal": "Implement decentralized governance",
    "study": [
      {
        "title": "Read about DAO",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "governance patterns",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a simple DAO program",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Create a governance system with voting",
    "timeHours": 4,
    "deadline": "End of Day 75",
    "phase": 4,
    "week": 11
  },
  {
    "day": 76,
    "title": "Cross-Chain Considerations",
    "goal": "Design for potential cross-chain deployment",
    "study": [
      {
        "title": "Read about cross-chain protocols",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Design protocol-agnostic architecture",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Document how your protocol could work on other chains",
    "timeHours": 3,
    "deadline": "End of Day 76",
    "phase": 4,
    "week": 11
  },
  {
    "day": 77,
    "title": "Week 11 Project - Scalable Protocol",
    "goal": "Build a scalable, production-grade protocol",
    "study": [
      {
        "title": "Review all Week 11 materials",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Build a complete scalable protocol",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "A production-ready, scalable protocol",
    "timeHours": 5,
    "deadline": "End of Day 77",
    "phase": 4,
    "week": 11
  },
  {
    "day": 78,
    "title": "Mainnet Deployment Checklist",
    "goal": "Prepare for mainnet launch",
    "study": [
      {
        "title": "Read mainnet deployment checklist",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Complete all pre-deployment tasks",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Completed mainnet readiness checklist",
    "timeHours": 3,
    "deadline": "End of Day 78",
    "phase": 4,
    "week": 12
  },
  {
    "day": 79,
    "title": "Audit & Code Review",
    "goal": "Get professional code review",
    "study": [
      {
        "title": "Review audit reports",
        "url": "#",
        "type": "exercise"
      },
      {
        "title": "best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Conduct thorough self-audit",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Comprehensive audit report of your code",
    "timeHours": 4,
    "deadline": "End of Day 79",
    "phase": 4,
    "week": 12
  },
  {
    "day": 80,
    "title": "Testnet Deployment",
    "goal": "Deploy to testnet before mainnet",
    "study": [
      {
        "title": "Read testnet deployment guide",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Deploy program to testnet",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Working program on testnet with documentation",
    "timeHours": 3,
    "deadline": "End of Day 80",
    "phase": 4,
    "week": 12
  },
  {
    "day": 81,
    "title": "Mainnet Deployment",
    "goal": "Deploy to mainnet",
    "study": [
      {
        "title": "Review mainnet deployment procedures",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Deploy your program to mainnet",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Deployed program on mainnet with verification",
    "timeHours": 3,
    "deadline": "End of Day 81",
    "phase": 4,
    "week": 12
  },
  {
    "day": 82,
    "title": "Launch & Monitoring",
    "goal": "Monitor your mainnet program",
    "study": [
      {
        "title": "Read monitoring",
        "url": "#",
        "type": "documentation"
      },
      {
        "title": "alerting best practices",
        "url": "#",
        "type": "documentation"
      }
    ],
    "practice": [
      {
        "title": "Set up comprehensive monitoring",
        "url": "#",
        "type": "exercise"
      }
    ],
    "deliverable": "Monitoring dashboard and alert system",
    "timeHours": 3,
    "deadline": "End of Day 82",
    "phase": 4,
    "week": 12
  },
  {
    "day": 83,
    "title": "Community & Documentation",
    "goal": "Build community and document everything",
    "study": [
      {
        "title": "Solana Mastery Hub Capstone Projects Walkthrough",
        "url": "/projects",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Build DeFi Lending Protocol or NFT Marketplace",
        "url": "/projects",
        "type": "exercise"
      }
    ],
    "deliverable": "Complete docs, guides, and community resources",
    "timeHours": 3,
    "deadline": "End of Day 83",
    "phase": 4,
    "week": 12
  },
  {
    "day": 84,
    "title": "Week 12 Project - Production dApp",
    "goal": "Finalize your production dApp",
    "study": [
      {
        "title": "Solana Mastery Hub Capstone Projects Walkthrough",
        "url": "/projects",
        "type": "course"
      }
    ],
    "practice": [
      {
        "title": "Build DeFi Lending Protocol or NFT Marketplace",
        "url": "/projects",
        "type": "exercise"
      }
    ],
    "deliverable": "A complete, production-grade dApp on mainnet",
    "timeHours": 5,
    "deadline": "End of Day 84",
    "phase": 4,
    "week": 12
  }
];

// Helper functions
export function getTasksByPhase(phase: number): DailyTask[] {
  return dailyTasks.filter((task) => task.phase === phase);
}

export function getTasksByWeek(week: number): DailyTask[] {
  return dailyTasks.filter((task) => task.week === week);
}

export function getTaskByDay(day: number): DailyTask | undefined {
  return dailyTasks.find((task) => task.day === day);
}

export function getTasksRange(startDay: number, endDay: number): DailyTask[] {
  return dailyTasks.filter((task) => task.day >= startDay && task.day <= endDay);
}
