import { useState } from "react";
import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import { courseDocs, CourseDoc, DocSection } from "@/lib/docs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ArrowLeft, 
  Clipboard, 
  Code,
  Sparkles,
  Bookmark
} from "lucide-react";
import { toast } from "sonner";
import NotFound from "@/pages/NotFound";

export default function DocsViewer() {
  const [, params] = useRoute("/docs/:docId");
  const docId = params?.docId;

  // Retrieve the target document
  const currentDoc = courseDocs.find((doc) => doc.id === docId);

  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

  if (!currentDoc) {
    return <NotFound />;
  }

  const activeSection = currentDoc.sections[activeSectionIndex] || currentDoc.sections[0];

  const copyToClipboard = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Code snippet copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Header */}
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Link href="/schedule">
                  <span className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Schedule
                  </span>
                </Link>
                <span className="text-foreground/40 text-xs">/</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                  Study Guide
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {currentDoc.title}
              </h1>
              <p className="text-sm md:text-base text-foreground/70 max-w-2xl">
                {currentDoc.subtitle}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Link href="/schedule">
                <Button variant="outline" className="border-border hover:bg-secondary flex items-center gap-1.5">
                  <ArrowLeft className="w-4 h-4" />
                  Return to Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Layout */}
      <section className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Sidebar Document Navigation Index */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
            <Card className="p-4 bg-card border-border shadow-sm">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-3">
                <Bookmark className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground/80 uppercase tracking-wider">Document Index</span>
              </div>
              
              <div className="space-y-1.5">
                {currentDoc.sections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSectionIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-start gap-2 cursor-pointer ${
                      activeSectionIndex === idx
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="font-bold text-primary/70">{idx + 1}.</span>
                    <span className="flex-1">{section.title}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Quick Context Card */}
            <Card className="p-5 bg-gradient-to-br from-accent/5 to-primary/5 border-border space-y-3">
              <div className="flex items-center gap-1.5 text-accent">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Guide Overview</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {currentDoc.overview}
              </p>
            </Card>
          </div>

          {/* Right Panel: Content Section and Code Block */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-6 md:p-8 bg-card border-border shadow-md space-y-6">
              
              {/* Section Header */}
              <div className="space-y-2 border-b border-border pb-4">
                <span className="text-xs font-bold text-primary uppercase">Section {activeSectionIndex + 1}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {activeSection.title}
                </h2>
              </div>

              {/* Section Description */}
              <div className="text-foreground/80 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line">
                {activeSection.content}
              </div>

              {/* Fira Code Snippet Block (if present) */}
              {activeSection.codeSnippet && (
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg mt-6">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-secondary/50 border-b border-border">
                    <div className="flex items-center gap-2">
                      <Code className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[10px] font-semibold font-mono text-foreground/70">
                        {activeSection.language || "rust"}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(activeSection.codeSnippet)}
                      className="flex items-center gap-1 text-[10px] text-foreground/60 hover:text-primary transition-colors cursor-pointer"
                    >
                      <Clipboard className="w-3.5 h-3.5" />
                      Copy
                    </button>
                  </div>

                  {/* Code Snippet Container */}
                  <div className="p-4 overflow-x-auto max-h-[380px] bg-[#0A0E27] text-white">
                    <pre className="font-mono text-xs leading-relaxed">
                      <code>
                        {activeSection.codeSnippet.split("\n").map((line, idx) => {
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
                        })}
                      </code>
                    </pre>
                  </div>
                </div>
              )}

            </Card>

            {/* Stepper Footer Controls */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveSectionIndex(Math.max(0, activeSectionIndex - 1))}
                disabled={activeSectionIndex === 0}
              >
                Previous Section
              </Button>
              
              <span className="text-xs text-foreground/60">
                Section {activeSectionIndex + 1} of {currentDoc.sections.length}
              </span>

              <Button
                onClick={() => setActiveSectionIndex(Math.min(currentDoc.sections.length - 1, activeSectionIndex + 1))}
                disabled={activeSectionIndex === currentDoc.sections.length - 1}
              >
                Next Section
              </Button>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
