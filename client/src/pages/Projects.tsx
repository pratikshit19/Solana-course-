import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { capstoneProjects, CapstoneProject, ProjectStep } from "@/lib/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Clock, 
  ShieldAlert, 
  Code, 
  Terminal, 
  CheckCircle2, 
  Clipboard, 
  Play, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Briefcase, 
  FileText, 
  HelpCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState<string>(capstoneProjects[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileLogs, setCompileLogs] = useState<string[]>([]);
  const [compileSuccess, setCompileSuccess] = useState<boolean>(false);
  const [revealedQuestions, setRevealedQuestions] = useState<number[]>([]);

  const activeProject = capstoneProjects.find((p) => p.id === activeProjectId) || capstoneProjects[0];
  const activeStep = activeProject.steps[activeStepIndex] || activeProject.steps[0];

  // Load completed steps from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("capstone_completed_steps");
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save completed steps to localStorage
  const toggleStepCompletion = (projectId: string, stepIdx: number) => {
    const projectCompleted = completedSteps[projectId] || [];
    const newCompleted = projectCompleted.includes(stepIdx)
      ? projectCompleted.filter((i) => i !== stepIdx)
      : [...projectCompleted, stepIdx];

    const updated = {
      ...completedSteps,
      [projectId]: newCompleted
    };

    setCompletedSteps(updated);
    localStorage.setItem("capstone_completed_steps", JSON.stringify(updated));

    if (!projectCompleted.includes(stepIdx)) {
      toast.success(`Step ${stepIdx + 1} marked as completed!`);
    }
  };

  const copyToClipboard = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Code snippet copied to clipboard!");
  };

  const simulateCompilation = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileSuccess(false);
    setCompileLogs([]);

    const logs = [
      `$ anchor build --program-name ${activeProject.id}`,
      "Cargo.toml: Parsing program configuration...",
      "cargo-build-sbf: Running compiler toolchain...",
      "Compiling anchor-attribute-program v0.29.0...",
      "Compiling anchor-lang v0.29.0...",
      "Compiling defi-lending v1.0.0...",
      "cargo-build-sbf: Linking program target/deploy/program.so...",
      "cargo-build-sbf: Verifying transaction footprint...",
      "SUCCESS: Program built successfully. Size: 184 KB (Max 10 MB)",
      `$ anchor test --run tests/${activeProject.id}.ts`,
      "Local ledger: Starting validator node...",
      "Validator: Active. Cluster Genesis Hash: 4uhW..., Port: 8899",
      "Testing: Initializing test environment variables...",
      "  ✔ Initialize protocol accounts (42ms)",
      "  ✔ Process first user deposit transaction (58ms)",
      "  ✔ Verify internal state ledger and PDA updates (31ms)",
      "  ✔ Accrue interest rates correctly under load tests (84ms)",
      "  ✔ Trigger liquidations within security limits (67ms)",
      "TEST RESULTS: 5/5 tests passed successfully.",
      "DEPLOY: Uploading program ID to Solana devnet...",
      "SUCCESS: Devnet deployment completed! Program ID: DeFiLend11111111111111111111111111111"
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setCompileLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
        setCompileSuccess(true);
        toast.success("Build and test suite compiled successfully!");
      }
    }, 450);
  };

  const toggleQuestionReveal = (idx: number) => {
    setRevealedQuestions((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const currentProjectCompletedCount = completedSteps[activeProject.id]?.length || 0;
  const currentProjectProgressPercent = Math.round(
    (currentProjectCompletedCount / activeProject.steps.length) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-12 border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container px-4">
          <div className="max-w-4xl space-y-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs py-1 px-3">
              <Trophy className="w-3.5 h-3.5 mr-1 text-primary inline" />
              Capstone Portfolio Projects
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Industry-Level Capstone Projects
            </h1>
            <p className="text-lg text-foreground/75 max-w-2xl">
              Complete these high-level, production-ready projects to demonstrate your practical Web3 knowledge, master advanced Anchor patterns, and build an outstanding hiring portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Dashboard Tabs */}
      <section className="container px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row gap-4 border-b border-border pb-4 items-center justify-between">
          <div className="flex rounded-xl bg-secondary p-1">
            {capstoneProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProjectId(project.id);
                  setActiveStepIndex(0);
                  setCompileLogs([]);
                  setCompileSuccess(false);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  activeProjectId === project.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-foreground/60">
              Project Progress: {currentProjectCompletedCount}/{activeProject.steps.length} Steps
            </span>
            <div className="w-36 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${currentProjectProgressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-primary">
              {currentProjectProgressPercent}%
            </span>
          </div>
        </div>

        {/* Project Intro Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 space-y-4 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground">{activeProject.title}</h2>
            <p className="text-foreground/80 leading-relaxed">{activeProject.overview}</p>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground flex items-center gap-1.5">
                <Code className="w-4 h-4 text-accent" />
                Key Technical Concepts covered:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-foreground/75 list-disc pl-5">
                {activeProject.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card className="p-6 space-y-4 bg-card border-border">
            <h3 className="text-lg font-bold text-foreground">Project Specs</h3>
            <div className="space-y-3 divide-y divide-border text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-foreground/60">Difficulty</span>
                <Badge 
                  variant="outline" 
                  className={
                    activeProject.difficulty === "Expert" 
                      ? "text-red-500 border-red-500/30 bg-red-500/10" 
                      : "text-accent border-accent/30 bg-accent/10"
                  }
                >
                  {activeProject.difficulty}
                </Badge>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-foreground/60">Estimated Time</span>
                <span className="font-medium text-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" />
                  {activeProject.estimatedHours} Hours
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-foreground/60">Category</span>
                <span className="font-medium text-foreground">{activeProject.category}</span>
              </div>
              <div className="flex flex-col gap-1.5 py-1.5">
                <span className="text-foreground/60">Tech Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.technologies.map((t, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Walkthrough Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Steps Navigation Stepper & Step Description */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Step-by-Step Walkthrough
            </h3>

            {/* Steps Timeline Grid */}
            <div className="space-y-3">
              {activeProject.steps.map((step, idx) => {
                const isStepCompleted = (completedSteps[activeProject.id] || []).includes(idx);
                const isStepActive = activeStepIndex === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setCompileLogs([]);
                      setCompileSuccess(false);
                    }}
                    className={`w-full flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isStepActive
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-foreground/30 bg-card"
                    }`}
                  >
                    <div className="flex items-center h-5 mr-3">
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStepCompletion(activeProject.id, idx);
                        }}
                        className="cursor-pointer"
                      >
                        {isStepCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-accent fill-accent/15" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-muted-foreground/60 hover:border-primary transition-colors" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">
                          Step {idx + 1}
                        </span>
                        {step.fileLabel && (
                          <Badge variant="outline" className="text-[10px] py-0 font-mono text-foreground/50">
                            {step.fileLabel.split("/").pop()}
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {step.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Step Description Card */}
            <Card className="p-6 space-y-4 bg-card border-border shadow-md">
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary uppercase">Current Step Detail</span>
                <h3 className="text-xl font-bold text-foreground">
                  {activeStepIndex + 1}. {activeStep.title}
                </h3>
                {activeStep.fileLabel && (
                  <div className="text-xs font-mono text-foreground/60 bg-secondary px-2 py-1 rounded w-fit">
                    File: {activeStep.fileLabel}
                  </div>
                )}
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed">
                {activeStep.description}
              </p>

              {activeStep.deliverable && (
                <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                  <span className="text-xs font-bold text-foreground block mb-1">🎯 DELIVERABLE</span>
                  <p className="text-xs text-foreground/75">{activeStep.deliverable}</p>
                </div>
              )}

              {activeStep.tip && (
                <div className="p-3.5 bg-accent/5 border border-accent/20 rounded-lg flex gap-2.5 items-start">
                  <ShieldAlert className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-accent uppercase">Security & Code Tip</span>
                    <p className="text-xs text-foreground/85 mt-0.5 leading-relaxed">{activeStep.tip}</p>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveStepIndex(Math.max(0, activeStepIndex - 1));
                    setCompileLogs([]);
                    setCompileSuccess(false);
                  }}
                  disabled={activeStepIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStepCompletion(activeProject.id, activeStepIndex)}
                  className="border-accent text-accent hover:bg-accent/10"
                >
                  {(completedSteps[activeProject.id] || []).includes(activeStepIndex) 
                    ? "Completed ✓" 
                    : "Mark Complete"}
                </Button>

                <Button
                  size="sm"
                  onClick={() => {
                    setActiveStepIndex(Math.min(activeProject.steps.length - 1, activeStepIndex + 1));
                    setCompileLogs([]);
                    setCompileSuccess(false);
                  }}
                  disabled={activeStepIndex === activeProject.steps.length - 1}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>

          </div>

          {/* Right Panel: Code Snippet Viewer & Simulated Compilation Console */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Code Block Header and Viewer */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold font-mono text-foreground/80">
                    {activeStep.fileLabel || "code_reference"}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(activeStep.codeSnippet)}
                  className="flex items-center gap-1 text-xs text-foreground/60 hover:text-primary transition-colors cursor-pointer"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  Copy
                </button>
              </div>

              {/* Syntax Highlighted Code Mock */}
              <div className="p-4 overflow-x-auto max-h-[480px] bg-[#0A0E27] text-white">
                <pre className="font-mono text-xs leading-relaxed">
                  <code>
                    {activeStep.codeSnippet ? (
                      activeStep.codeSnippet.split("\n").map((line, idx) => {
                        // Very simple syntax coloring replacement for rendering preview
                        let styledLine = line
                          .replace(/(pub struct|pub fn|fn|struct|use|let|let mut|const|pub|return)/g, '<span class="text-[#FF6B35]">$1</span>')
                          .replace(/(#[account]|#[program]|#[derive\(.*?\)]|#[instruction\(.*?\)])/g, '<span class="text-[#9945FF]">$1</span>')
                          .replace(/(\/\/.*)/g, '<span class="text-[#6B6B7F] italic">$1</span>')
                          .replace(/(Result|Context|Pubkey|u64|u8|u128|i64|Vec|Option|Signer|Account|TokenAccount|Token|System|SystemAccount|GlobalMarketConfig|PoolState|UserPosition|NFTListing|MarketplaceState)/g, '<span class="text-[#00D4AA]">$1</span>');

                        return (
                          <div key={idx} className="table-row">
                            <span className="table-cell select-none text-right pr-4 text-muted-foreground/45 w-6">{idx + 1}</span>
                            <span className="table-cell" dangerouslySetInnerHTML={{ __html: styledLine || " " }} />
                          </div>
                        );
                      })
                    ) : (
                      "// No code snippet for this step."
                    )}
                  </code>
                </pre>
              </div>
            </div>

            {/* Simulated Compilation / Test Run Console */}
            <div className="rounded-xl border border-border bg-[#0B0F19] overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 bg-[#131926] border-b border-border">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-xs font-semibold text-white/80">Anchor Sandbox Compilation</span>
                </div>
                <div className="flex items-center gap-2">
                  {compileSuccess && (
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-[10px]">
                      Build Success
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    onClick={simulateCompilation}
                    disabled={isCompiling}
                    className="h-7 text-xs bg-primary hover:bg-primary/95 text-white"
                  >
                    <Play className="w-3.5 h-3.5 mr-1" />
                    {isCompiling ? "Compiling..." : "Compile & Test"}
                  </Button>
                </div>
              </div>

              {/* Console Logs Terminal */}
              <div className="p-4 h-64 overflow-y-auto bg-black text-green-400 font-mono text-[11px] space-y-1.5 select-text">
                {compileLogs.length === 0 ? (
                  <div className="text-gray-500 italic">
                    {"// Click \"Compile & Test\" to compile the smart contract and run test suites in the browser emulator console..."}
                  </div>
                ) : (
                  compileLogs.map((log, i) => {
                    let logClass = "text-gray-300";
                    if (log.startsWith("$")) logClass = "text-primary font-semibold";
                    else if (log.startsWith("SUCCESS") || log.includes("✔")) logClass = "text-accent";
                    else if (log.includes("TEST RESULTS") || log.startsWith("Validator")) logClass = "text-yellow-400";
                    
                    return (
                      <div key={i} className={logClass}>
                        {log}
                      </div>
                    );
                  })
                )}
                {isCompiling && (
                  <div className="flex items-center gap-1.5 text-primary text-xs font-bold animate-pulse mt-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    Executing build cycle...
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Get Hired & Portfolio Guide Card */}
        <Card className="p-8 space-y-8 bg-card border-border shadow-lg">
          <div className="border-b border-border pb-4 space-y-2">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Get Hired Portfolio Guide
            </h3>
            <p className="text-sm text-foreground/70">
              How to present this project on your Resume, GitHub, and in Technical Interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Resume Bullets and Readme guide */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-bold text-foreground flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-accent" />
                  Add to your Resume:
                </h4>
                <div className="bg-secondary/40 rounded-lg p-4 space-y-3">
                  {activeProject.getHiredTips.resumeBullets.map((bullet, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs text-foreground/80 leading-relaxed">
                      <span className="text-primary font-bold">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-foreground flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-primary" />
                  Take it further to stand out:
                </h4>
                <ul className="space-y-2 text-xs text-foreground/75 list-disc pl-5 leading-relaxed">
                  {activeProject.getHiredTips.extensions.map((ext, idx) => (
                    <li key={idx}>
                      <span className="font-medium text-foreground">{ext.split(" ")[0]} {ext.split(" ")[1]}</span>
                      {ext.substring(ext.indexOf(ext.split(" ")[1]) + ext.split(" ")[1].length)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interview Q&A Toggles */}
            <div className="space-y-4">
              <h4 className="font-bold text-foreground flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-accent" />
                Technical Interview Prep (Click to reveal):
              </h4>
              <div className="space-y-3">
                {activeProject.getHiredTips.interviewQuestions.map((qa, idx) => {
                  const isRevealed = revealedQuestions.includes(idx);
                  return (
                    <div key={idx} className="rounded-lg border border-border bg-secondary/20 overflow-hidden transition-all">
                      <button
                        onClick={() => toggleQuestionReveal(idx)}
                        className="w-full flex items-center justify-between p-4 font-semibold text-xs text-foreground text-left cursor-pointer hover:bg-secondary/40 transition-colors"
                      >
                        <span>Q: {qa.question}</span>
                        {isRevealed ? (
                          <EyeOff className="w-4 h-4 text-foreground/50 flex-shrink-0" />
                        ) : (
                          <Eye className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </button>
                      {isRevealed && (
                        <div className="p-4 border-t border-border bg-card text-xs text-foreground/80 leading-relaxed">
                          <span className="font-bold text-accent block mb-1">REVEALED ANSWER:</span>
                          {qa.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </Card>

      </section>
    </div>
  );
}
