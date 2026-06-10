import { useState } from 'react';
import { Link } from 'wouter';
import { curriculum, tools } from '@/lib/curriculum';
import Header from '@/components/Header';
import { PhaseCard } from '@/components/PhaseCard';
import { ModuleDetail } from '@/components/ModuleDetail';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, Zap, Target, BookOpen, ExternalLink, Trophy } from 'lucide-react';

export default function Home() {
  const [selectedPhase, setSelectedPhase] = useState(curriculum[0]);
  const [selectedModule, setSelectedModule] = useState(curriculum[0].modules[0]);
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);

  const togglePhaseCompletion = (phaseId: string) => {
    setCompletedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const totalHours = curriculum.reduce(
    (sum, phase) =>
      sum + phase.modules.reduce((moduleSum, mod) => moduleSum + mod.estimatedHours, 0),
    0
  );

  const completionPercentage = Math.round(
    (completedPhases.length / curriculum.length) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663717484499/SsfVEzW2U9DhL6qezTvtYQ/hero-background-VMRVA6L3dwN8vUHTL6YEoS.webp)',
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="space-y-2">
              <Badge className="mx-auto" variant="secondary">
                <Zap className="w-3 h-3 mr-1" />
                Complete Learning Path
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Master Solana & Web3
              </h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                From zero to architect in 12 weeks. A structured curriculum covering Rust, Solana
                Runtime, Smart Contracts, and full-stack Web2+Web3 systems.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">{curriculum.length}</div>
                <div className="text-sm text-foreground/60">Phases</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-accent">
                  {curriculum.reduce((sum, p) => sum + p.modules.length, 0)}
                </div>
                <div className="text-sm text-foreground/60">Modules</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-destructive">{totalHours}h</div>
                <div className="text-sm text-foreground/60">Total</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 w-full sm:w-auto">
                  View Daily Schedule
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Capstone Portfolio Projects
                  <Trophy className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 space-y-12">
        {/* Progress Overview */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Progress</h2>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
                <div className="text-sm text-foreground/60">Complete</div>
              </div>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-sm text-foreground/70">
              {completedPhases.length} of {curriculum.length} phases completed
            </p>
          </Card>
        </div>

        {/* Phases Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Learning Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculum.map((phase) => (
              <div key={phase.id} className="space-y-2">
                <PhaseCard
                  phase={phase}
                  isCompleted={completedPhases.includes(phase.id)}
                  isActive={selectedPhase.id === phase.id}
                  onClick={() => setSelectedPhase(phase)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Phase Details */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Phase Details</h2>
          <Card className="p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-foreground">
                    {selectedPhase.title}
                  </h3>
                  <p className="text-lg text-foreground/60 mt-2">
                    {selectedPhase.subtitle}
                  </p>
                </div>
                <Button
                  variant={
                    completedPhases.includes(selectedPhase.id) ? 'default' : 'outline'
                  }
                  onClick={() => togglePhaseCompletion(selectedPhase.id)}
                >
                  {completedPhases.includes(selectedPhase.id) ? 'Completed' : 'Mark Complete'}
                </Button>
              </div>

              <p className="text-foreground/70 leading-relaxed">
                {selectedPhase.description}
              </p>

              {/* Objectives */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  Learning Objectives
                </h4>
                <ul className="space-y-2">
                  {selectedPhase.objectives.map((objective, idx) => (
                    <li key={idx} className="flex gap-3 text-foreground/80">
                      <span className="text-accent font-bold">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Modules ({selectedPhase.modules.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPhase.modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      setSelectedModule(module);
                      setModuleDialogOpen(true);
                    }}
                    className="text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <h5 className="font-semibold text-foreground mb-1">
                      {module.title}
                    </h5>
                    <p className="text-sm text-foreground/60 mb-2">
                      {module.description}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {module.estimatedHours}h
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {module.keyTopics.length} topics
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Capstone Projects Promo Section */}
        <div className="max-w-4xl mx-auto py-4">
          <Card className="p-8 relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/50 to-accent/10 border-primary/20 shadow-lg group">
            {/* Visual background accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 flex-1 text-center md:text-left">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs py-1 px-3 mb-1">
                  <Trophy className="w-3.5 h-3.5 mr-1 text-primary inline" />
                  Portfolio Enhancers
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Ready to get hired? Build Capstone Projects
                </h3>
                <p className="text-sm text-foreground/75 leading-relaxed max-w-xl">
                  Apply your knowledge by building a production-grade **DeFi Lending Protocol** and an **NFT Marketplace with Royalties** on Solana. Includes step-by-step guidance, code previews, and technical interview guides.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link href="/projects">
                  <Button size="lg" className="bg-primary hover:bg-primary/95 text-white shadow-md hover:scale-105 active:scale-95 transition-all">
                    Start Capstone Projects
                    <ChevronDown className="w-4 h-4 ml-2 -rotate-90" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* Toolbox Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">The Toolbox</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="framework">Framework</TabsTrigger>
              <TabsTrigger value="sdk">SDK</TabsTrigger>
              <TabsTrigger value="tool">Tool</TabsTrigger>
              <TabsTrigger value="provider">Provider</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="h-full p-4 hover:shadow-lg hover:border-primary/50 transition-all">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {tool.name}
                          </h4>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                        <Badge variant="secondary" className="text-xs inline-block">
                          {tool.category}
                        </Badge>
                        <p className="text-sm text-foreground/70">
                          {tool.description}
                        </p>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </TabsContent>

            {['Framework', 'SDK', 'Tool', 'Provider'].map((category) => (
              <TabsContent key={category} value={category.toLowerCase()} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools
                    .filter((t) => t.category === category)
                    .map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <Card className="h-full p-4 hover:shadow-lg hover:border-primary/50 transition-all">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {tool.name}
                              </h4>
                              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                            </div>
                            <Badge variant="secondary" className="text-xs inline-block">
                              {tool.category}
                            </Badge>
                            <p className="text-sm text-foreground/70">
                              {tool.description}
                            </p>
                          </div>
                        </Card>
                      </a>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Module Detail Dialog */}
      <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedModule.title}</DialogTitle>
          </DialogHeader>
          <ModuleDetail module={selectedModule} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
