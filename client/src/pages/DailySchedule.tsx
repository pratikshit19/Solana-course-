import { useState } from 'react';
import Header from '@/components/Header';
import { dailyTasks, getTaskByDay, getTasksByWeek } from '@/lib/daily-tasks';
import { DailyTaskDetail } from '@/components/DailyTaskDetail';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Calendar, Zap } from 'lucide-react';

export default function DailySchedule() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const currentTask = getTaskByDay(selectedDay);
  const totalDays = dailyTasks.length;
  const completionPercentage = Math.round((completedDays.length / totalDays) * 100);

  const toggleDayCompletion = (day: number) => {
    setCompletedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const getPhaseColor = (phase: number): string => {
    const colors = ['#9945FF', '#00D4AA', '#FF6B35', '#9945FF'];
    return colors[phase - 1] || '#9945FF';
  };

  const getPhaseLabel = (phase: number): string => {
    const labels = [
      'Rust & Runtime',
      'Anchor & Programs',
      'Web2+Web3',
      'Security & Production',
    ];
    return labels[phase - 1] || 'Phase ' + phase;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Header */}
      <section className="border-b border-border py-8">
        <div className="container mx-auto px-4 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              84-Day Learning Schedule
            </h1>
            <p className="text-lg text-foreground/70">
              Day-by-day breakdown with exact tasks, deliverables, and deadlines
            </p>
          </div>

          {/* Overall Progress */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Your Progress
              </h2>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {completionPercentage}%
                </div>
                <div className="text-sm text-foreground/60">
                  {completedDays.length} of {totalDays} days
                </div>
              </div>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Day Navigator */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Days
            </h3>

            {/* Phase Tabs */}
            <Tabs defaultValue="phase-1" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                {[1, 2, 3, 4].map((phase) => (
                  <TabsTrigger key={phase} value={`phase-${phase}`}>
                    P{phase}
                  </TabsTrigger>
                ))}
              </TabsList>

              {[1, 2, 3, 4].map((phase) => (
                <TabsContent key={phase} value={`phase-${phase}`} className="space-y-2">
                  {dailyTasks
                    .filter((task) => task.phase === phase)
                    .map((task) => (
                      <div
                        key={task.day}
                        onClick={() => {
                          setSelectedDay(task.day);
                          setTaskDialogOpen(true);
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                          selectedDay === task.day
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        } ${completedDays.includes(task.day) ? 'opacity-60' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm text-foreground">
                              Day {task.day}
                            </div>
                            <div className="text-xs text-foreground/60 truncate">
                              {task.title}
                            </div>
                          </div>
                          {completedDays.includes(task.day) && (
                            <div className="text-primary text-lg">✓</div>
                          )}
                        </div>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Main Content - Current Task */}
          <div className="lg:col-span-2">
            {currentTask ? (
              <div className="space-y-6">
                <DailyTaskDetail
                  task={currentTask}
                  isCompleted={completedDays.includes(currentTask.day)}
                  onToggleComplete={(completed) => {
                    if (completed) {
                      setCompletedDays((prev) => [...prev, currentTask.day]);
                    } else {
                      setCompletedDays((prev) =>
                        prev.filter((d) => d !== currentTask.day)
                      );
                    }
                  }}
                />

                {/* Navigation */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                    disabled={selectedDay === 1}
                  >
                    ← Previous Day
                  </Button>
                  <Button
                    onClick={() =>
                      setSelectedDay(Math.min(totalDays, selectedDay + 1))
                    }
                    disabled={selectedDay === totalDays}
                  >
                    Next Day →
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-foreground/60">Select a day to view tasks</p>
              </Card>
            )}
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Weekly Overview</h2>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((week) => {
            const weekTasks = getTasksByWeek(week);
            if (weekTasks.length === 0) return null;

            const phase = weekTasks[0].phase;
            const weekCompleted = weekTasks.filter((t) =>
              completedDays.includes(t.day)
            ).length;

            return (
              <Card key={week} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getPhaseColor(phase) }}
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      Week {week}: {getPhaseLabel(phase)}
                    </h3>
                  </div>
                  <Badge variant="secondary">
                    {weekCompleted}/{weekTasks.length} days
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {weekTasks.map((task) => (
                    <div
                      key={task.day}
                      onClick={() => {
                        setSelectedDay(task.day);
                        setTaskDialogOpen(true);
                      }}
                      className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        completedDays.includes(task.day)
                          ? 'border-primary/30 bg-primary/10 opacity-60'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            Day {task.day}: {task.title}
                          </div>
                          <div className="text-xs text-foreground/60 mt-1">
                            {task.timeHours}h • {task.goal.substring(0, 50)}...
                          </div>
                        </div>
                        {completedDays.includes(task.day) && (
                          <div className="text-primary text-lg flex-shrink-0">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${Math.round((weekCompleted / weekTasks.length) * 100)}%`,
                      backgroundColor: getPhaseColor(phase),
                    }}
                  />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="p-6 space-y-4 bg-accent/5 border-accent/30">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Keys to Success
          </h3>
          <ul className="space-y-2 text-foreground/80">
            <li className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <span>
                Stick to the schedule. Each day builds on the previous one.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span>
                Complete the deliverables. They prove you learned and build your
                portfolio.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span>
                Don't skip days. If you fall behind, catch up the next day.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">4.</span>
              <span>
                Share your progress. The community is supportive and you'll learn
                from others.
              </span>
            </li>
          </ul>
        </Card>
      </section>

      {/* Task Detail Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Day {selectedDay} Task</DialogTitle>
          </DialogHeader>
          {currentTask && (
            <DailyTaskDetail
              task={currentTask}
              isCompleted={completedDays.includes(currentTask.day)}
              onToggleComplete={(completed) => {
                if (completed) {
                  setCompletedDays((prev) => [...prev, currentTask.day]);
                } else {
                  setCompletedDays((prev) =>
                    prev.filter((d) => d !== currentTask.day)
                  );
                }
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
