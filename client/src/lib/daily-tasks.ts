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
  // Phase 1, Week 1
  {
    day: 1,
    title: "Ownership Basics",
    goal: "Understand how Rust manages memory without garbage collection",
    study: [
      {
        title: "The Rust Book - Chapter 4.1-4.2 (Ownership concept, what is ownership)",
        url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Rustlings - move_semantics exercises (1-4)",
        url: "https://github.com/rust-lang/rustlings/tree/main/exercises/move_semantics",
        type: "exercise",
      },
    ],
    deliverable:
      "Write a 200-word explanation of ownership vs borrowing in your own words",
    timeHours: 3,
    deadline: "End of Day 1",
    phase: 1,
    week: 1,
  },
  {
    day: 2,
    title: "Borrowing & References",
    goal: "Master mutable and immutable references",
    study: [
      {
        title: "The Rust Book - Chapter 4.3-4.5 (References and borrowing, mutable references)",
        url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Rustlings - move_semantics exercises (5-6) and borrow exercises",
        url: "https://github.com/rust-lang/rustlings/tree/main/exercises",
        type: "exercise",
      },
    ],
    deliverable:
      "Create a Rust program that demonstrates 3 different borrowing scenarios (immutable borrow, mutable borrow, multiple immutable borrows)",
    timeHours: 3,
    deadline: "End of Day 2",
    phase: 1,
    week: 1,
  },
  {
    day: 3,
    title: "Structs & Pattern Matching",
    goal: "Learn how to structure data and destructure it",
    study: [
      {
        title: "The Rust Book - Chapter 5.1-5.3 (Structs, method syntax)",
        url: "https://doc.rust-lang.org/book/ch05-00-structs.html",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Rustlings - structs exercises",
        url: "https://github.com/rust-lang/rustlings/tree/main/exercises/structs",
        type: "exercise",
      },
    ],
    deliverable:
      "Build a BankAccount struct with methods for deposit, withdraw, and balance check. Include pattern matching for transaction types",
    timeHours: 3,
    deadline: "End of Day 3",
    phase: 1,
    week: 1,
  },
  {
    day: 4,
    title: "Enums & Error Handling",
    goal: "Use enums for type-safe error handling",
    study: [
      {
        title: "The Rust Book - Chapter 6.1-6.3 (Enums, match control flow)",
        url: "https://doc.rust-lang.org/book/ch06-00-enums.html",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Rustlings - enums exercises",
        url: "https://github.com/rust-lang/rustlings/tree/main/exercises/enums",
        type: "exercise",
      },
    ],
    deliverable:
      "Refactor your BankAccount to return Result<T, E> types for operations. Handle insufficient funds and invalid amounts",
    timeHours: 3,
    deadline: "End of Day 4",
    phase: 1,
    week: 1,
  },
  {
    day: 5,
    title: "Traits & Generics",
    goal: "Write reusable, generic code with trait bounds",
    study: [
      {
        title: "The Rust Book - Chapter 10.1-10.3 (Generics, traits)",
        url: "https://doc.rust-lang.org/book/ch10-00-generics.html",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Rustlings - traits exercises",
        url: "https://github.com/rust-lang/rustlings/tree/main/exercises/traits",
        type: "exercise",
      },
    ],
    deliverable:
      "Create a generic Vault<T> struct that works with any type implementing a Storable trait. Implement for Account and Token types",
    timeHours: 3,
    deadline: "End of Day 5",
    phase: 1,
    week: 1,
  },
  {
    day: 6,
    title: "Lifetimes & Advanced Ownership",
    goal: "Understand lifetime annotations and complex ownership scenarios",
    study: [
      {
        title: "The Rust Book - Chapter 10.4 (Lifetimes)",
        url: "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Rustlings - lifetimes exercises",
        url: "https://github.com/rust-lang/rustlings/tree/main/exercises/lifetimes",
        type: "exercise",
      },
    ],
    deliverable:
      "Write a function that takes two references and returns the longer one, with proper lifetime annotations. Document why lifetimes matter",
    timeHours: 3,
    deadline: "End of Day 6",
    phase: 1,
    week: 1,
  },
  {
    day: 7,
    title: "Macros & Procedural Concepts",
    goal: "Understand macros (essential for Anchor framework)",
    study: [
      {
        title: "The Rust Book - Chapter 19.5 (Macros)",
        url: "https://doc.rust-lang.org/book/ch19-06-macros.html",
        type: "documentation",
      },
      {
        title: "Anchor Book - Macros Documentation",
        url: "https://www.anchor-lang.com/docs/macro-reference",
        type: "documentation",
      },
    ],
    practice: [],
    deliverable:
      "Write a simple macro that generates a struct with getter/setter methods. Document how it works",
    timeHours: 3,
    deadline: "End of Day 7",
    phase: 1,
    week: 1,
  },
  // Phase 1, Week 2
  {
    day: 8,
    title: "Solana vs Ethereum Mental Model",
    goal: "Understand why Solana's architecture is fundamentally different",
    study: [
      {
        title: "Solana Docs - Core Concepts",
        url: "https://solana.com/docs/core/clusters",
        type: "documentation",
      },
      {
        title: "RareSkills - Solana Tutorial Module 1",
        url: "https://www.rareskills.io/solana-tutorial",
        type: "course",
      },
    ],
    practice: [
      {
        title: "Compare EVM vs Solana architecture",
        url: "https://www.rareskills.io/solana-tutorial",
        type: "tutorial",
      },
    ],
    deliverable:
      "Create a comparison table: EVM contracts vs Solana programs (state storage, execution, fees, upgrades)",
    timeHours: 3,
    deadline: "End of Day 8",
    phase: 1,
    week: 2,
  },
  {
    day: 9,
    title: "Accounts, Rent & PDAs",
    goal: "Master the Account model and Program Derived Addresses",
    study: [
      {
        title: "Solana Docs - Accounts",
        url: "https://solana.com/docs/core/accounts",
        type: "documentation",
      },
      {
        title: "Solana Docs - Rent",
        url: "https://solana.com/docs/core/fees#rent",
        type: "documentation",
      },
      {
        title: "Solana Docs - PDAs",
        url: "https://solana.com/docs/core/pda",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "RareSkills - Module 4.1-4.2 (Initializing Accounts, Counter Tutorial)",
        url: "https://www.rareskills.io/solana-tutorial",
        type: "course",
      },
    ],
    deliverable:
      "Write a detailed explanation with diagrams: How a PDA is derived, why it's deterministic, and why it matters for security",
    timeHours: 3,
    deadline: "End of Day 9",
    phase: 1,
    week: 2,
  },
  {
    day: 10,
    title: "Transaction Structure & Signers",
    goal: "Understand how transactions are built and executed",
    study: [
      {
        title: "Solana Docs - Transactions",
        url: "https://solana.com/docs/core/transactions",
        type: "documentation",
      },
      {
        title: "Solana Docs - Signers",
        url: "https://solana.com/docs/core/signers",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Solana CLI - Inspect transactions on devnet",
        url: "https://docs.solana.com/cli",
        type: "tool",
      },
    ],
    deliverable:
      "Build a transaction manually using web3.js that transfers SOL. Explain each component (instruction, accounts, signers)",
    timeHours: 3,
    deadline: "End of Day 10",
    phase: 1,
    week: 2,
  },
  {
    day: 11,
    title: "Program Execution & Compute Units",
    goal: "Learn how programs execute and optimize for compute",
    study: [
      {
        title: "Solana Docs - Compute Budget",
        url: "https://solana.com/docs/core/fees#compute-budget",
        type: "documentation",
      },
      {
        title: "Solana Docs - Program Execution",
        url: "https://solana.com/docs/core/programs",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Set up local Solana validator",
        url: "https://docs.solana.com/running-validator/validator-start",
        type: "tutorial",
      },
    ],
    deliverable:
      "Create a simple Rust program that logs compute units used. Run it and document the output",
    timeHours: 3,
    deadline: "End of Day 11",
    phase: 1,
    week: 2,
  },
  {
    day: 12,
    title: "Cross-Program Invocation (CPI) Basics",
    goal: "Understand how programs call other programs",
    study: [
      {
        title: "Solana Cookbook - CPI",
        url: "https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation",
        type: "documentation",
      },
      {
        title: "RareSkills - Module 4.18 (Cross Program Invocation)",
        url: "https://www.rareskills.io/solana-tutorial",
        type: "course",
      },
    ],
    practice: [],
    deliverable:
      "Write pseudocode for a program that calls the Token Program to transfer tokens",
    timeHours: 3,
    deadline: "End of Day 12",
    phase: 1,
    week: 2,
  },
  {
    day: 13,
    title: "Security Checks & Account Validation",
    goal: "Learn essential security patterns",
    study: [
      {
        title: "Solana Security Workshop - Account Validation",
        url: "https://www.rareskills.io/solana-security-course",
        type: "course",
      },
    ],
    practice: [
      {
        title: "RareSkills - Security Module",
        url: "https://www.rareskills.io/solana-security-course",
        type: "course",
      },
    ],
    deliverable:
      "List 5 critical security checks every Solana program must perform. Explain why each matters",
    timeHours: 3,
    deadline: "End of Day 13",
    phase: 1,
    week: 2,
  },
  {
    day: 14,
    title: "Week 1-2 Project: Build a Counter Program",
    goal: "Apply all Week 1-2 concepts in a complete program",
    study: [
      {
        title: "Review all previous days materials",
        url: "#",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Build a counter program in native Rust",
        url: "https://github.com/solana-labs/solana-program-library",
        type: "tutorial",
      },
    ],
    deliverable:
      "A working counter program with proper account validation, error handling, and documentation",
    timeHours: 4,
    deadline: "End of Day 14",
    phase: 1,
    week: 2,
  },
  // Phase 2, Week 3
  {
    day: 15,
    title: "Anchor Setup & Project Structure",
    goal: "Set up Anchor development environment",
    study: [
      {
        title: "Anchor Book - Getting Started",
        url: "https://www.anchor-lang.com/docs/getting-started",
        type: "documentation",
      },
      {
        title: "Anchor Book - Project Structure",
        url: "https://www.anchor-lang.com/docs/workspace",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Run anchor init and explore generated files",
        url: "https://www.anchor-lang.com/docs/getting-started",
        type: "tutorial",
      },
    ],
    deliverable:
      "Create a new Anchor project and document each file's purpose",
    timeHours: 2,
    deadline: "End of Day 15",
    phase: 2,
    week: 3,
  },
  {
    day: 16,
    title: "Anchor Macros & Attributes",
    goal: "Master #[program], #[derive(Accounts)], and instruction macros",
    study: [
      {
        title: "Anchor Book - Defining Programs",
        url: "https://www.anchor-lang.com/docs/the-program-macro",
        type: "documentation",
      },
      {
        title: "Anchor Book - Accounts",
        url: "https://www.anchor-lang.com/docs/accounts",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Anchor Examples - Basic Program Structure",
        url: "https://github.com/coral-xyz/anchor/tree/master/examples",
        type: "tutorial",
      },
    ],
    deliverable:
      "Write a program with 3 instructions using different account types (signer, mut, init)",
    timeHours: 3,
    deadline: "End of Day 16",
    phase: 2,
    week: 3,
  },
  {
    day: 17,
    title: "Account Validation & Constraints",
    goal: "Use Anchor's constraint system for security",
    study: [
      {
        title: "Anchor Book - Constraints",
        url: "https://www.anchor-lang.com/docs/constraints",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Implement accounts with different constraints",
        url: "https://www.anchor-lang.com/docs/constraints",
        type: "tutorial",
      },
    ],
    deliverable:
      "Build an account struct with 5 different constraints. Explain what each prevents",
    timeHours: 3,
    deadline: "End of Day 17",
    phase: 2,
    week: 3,
  },
  {
    day: 18,
    title: "Error Handling in Anchor",
    goal: "Implement proper error handling",
    study: [
      {
        title: "Anchor Book - Error Handling",
        url: "https://www.anchor-lang.com/docs/errors",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Create custom error types",
        url: "https://www.anchor-lang.com/docs/errors",
        type: "tutorial",
      },
    ],
    deliverable:
      "Refactor previous programs to return custom errors instead of panicking",
    timeHours: 2,
    deadline: "End of Day 18",
    phase: 2,
    week: 3,
  },
  {
    day: 19,
    title: "Testing Anchor Programs",
    goal: "Write comprehensive tests",
    study: [
      {
        title: "Anchor Book - Testing",
        url: "https://www.anchor-lang.com/docs/testing",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Run anchor test and write unit tests",
        url: "https://www.anchor-lang.com/docs/testing",
        type: "tutorial",
      },
    ],
    deliverable:
      "Write 10 test cases for a simple program (happy path, error cases, edge cases)",
    timeHours: 3,
    deadline: "End of Day 19",
    phase: 2,
    week: 3,
  },
  {
    day: 20,
    title: "IDL & Client Generation",
    goal: "Understand IDL and automatic client generation",
    study: [
      {
        title: "Anchor Book - IDL",
        url: "https://www.anchor-lang.com/docs/idl",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Generate TypeScript client from IDL",
        url: "https://www.anchor-lang.com/docs/idl",
        type: "tutorial",
      },
    ],
    deliverable:
      "Generate TypeScript client from your program's IDL and use it to call instructions",
    timeHours: 2,
    deadline: "End of Day 20",
    phase: 2,
    week: 3,
  },
  {
    day: 21,
    title: "Week 3 Project: Todo List Program",
    goal: "Build a complete Anchor program with multiple features",
    study: [
      {
        title: "Review all Week 3 materials",
        url: "#",
        type: "documentation",
      },
    ],
    practice: [
      {
        title: "Build a todo list program",
        url: "https://www.anchor-lang.com/docs/getting-started",
        type: "tutorial",
      },
    ],
    deliverable:
      "A fully tested Anchor program with TypeScript client and comprehensive documentation",
    timeHours: 4,
    deadline: "End of Day 21",
    phase: 2,
    week: 3,
  },
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
