import { DailyTask, Resource } from '@/lib/daily-tasks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Target, BookOpen, Code, CheckCircle2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface DailyTaskDetailProps {
  task: DailyTask;
  isCompleted?: boolean;
  onToggleComplete?: (completed: boolean) => void;
}

const resourceTypeIcons: Record<Resource['type'], string> = {
  documentation: '📚',
  tutorial: '🎓',
  video: '🎬',
  course: '🏫',
  tool: '🛠️',
  exercise: '💻',
};

const resourceTypeColors: Record<Resource['type'], string> = {
  documentation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  tutorial: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  video: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  course: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  tool: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
  exercise: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
};

export function DailyTaskDetail({
  task,
  isCompleted = false,
  onToggleComplete,
}: DailyTaskDetailProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'goal',
    'study',
    'practice',
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Day {task.day}</Badge>
              <Badge variant="secondary">Phase {task.phase}</Badge>
              <Badge variant="secondary">Week {task.week}</Badge>
            </div>
            <h2 className="text-3xl font-bold text-foreground">{task.title}</h2>
          </div>
          <Button
            variant={isCompleted ? 'default' : 'outline'}
            size="lg"
            onClick={() => onToggleComplete?.(!isCompleted)}
            className="flex items-center gap-2"
          >
            <span className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              isCompleted
                ? 'bg-primary border-primary'
                : 'border-muted-foreground'
            }`}>
              {isCompleted && <span className="text-primary-foreground text-sm">✓</span>}
            </span>
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-semibold">{task.timeHours}h</span>
            </div>
            <div className="text-xs text-muted-foreground">Estimated Time</div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-accent" />
              <span className="font-semibold">{task.deadline}</span>
            </div>
            <div className="text-xs text-muted-foreground">Deadline</div>
          </Card>
          <Card className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-destructive" />
              <span className="font-semibold">1 Deliverable</span>
            </div>
            <div className="text-xs text-muted-foreground">Output</div>
          </Card>
        </div>
      </div>

      {/* Goal Section */}
      <Card className="p-4 space-y-3">
        <button
          onClick={() => toggleSection('goal')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Learning Goal
          </h3>
          <span className="text-muted-foreground">
            {expandedSections.includes('goal') ? '−' : '+'}
          </span>
        </button>
        {expandedSections.includes('goal') && (
          <p className="text-foreground/80 leading-relaxed">{task.goal}</p>
        )}
      </Card>

      {/* Study Section */}
      <Card className="p-4 space-y-3">
        <button
          onClick={() => toggleSection('study')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            What to Study ({task.study.length})
          </h3>
          <span className="text-muted-foreground">
            {expandedSections.includes('study') ? '−' : '+'}
          </span>
        </button>
        {expandedSections.includes('study') && (
          <div className="space-y-3">
            {task.study.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
                  <span className="text-lg flex-shrink-0">
                    {resourceTypeIcons[resource.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                    <Badge
                      variant="secondary"
                      className={`text-xs capitalize ${
                        resourceTypeColors[resource.type]
                      }`}
                    >
                      {resource.type}
                    </Badge>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </Card>

      {/* Practice Section */}
      <Card className="p-4 space-y-3">
        <button
          onClick={() => toggleSection('practice')}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Code className="w-4 h-4 text-accent" />
            How to Practice ({task.practice.length})
          </h3>
          <span className="text-muted-foreground">
            {expandedSections.includes('practice') ? '−' : '+'}
          </span>
        </button>
        {expandedSections.includes('practice') && (
          <div className="space-y-3">
            {task.practice.length > 0 ? (
              task.practice.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-all">
                    <span className="text-lg flex-shrink-0">
                      {resourceTypeIcons[resource.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                          {resource.title}
                        </span>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-xs capitalize ${
                          resourceTypeColors[resource.type]
                        }`}
                      >
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-muted-foreground italic">
                No specific practice exercises for this day.
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Deliverable Section */}
      <Card className="p-4 space-y-3 border-2 border-destructive/30 bg-destructive/5">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-destructive" />
          Your Deliverable
        </h3>
        <p className="text-foreground/80 leading-relaxed font-medium">
          {task.deliverable}
        </p>
        <div className="pt-2 border-t border-destructive/20">
          <p className="text-sm text-muted-foreground">
            This is what you must complete and show as proof of learning. Save it
            to your portfolio or GitHub.
          </p>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-4 space-y-3 bg-primary/5">
        <h3 className="font-semibold text-foreground">💡 Tips for Success</h3>
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Time yourself to stay on schedule. If you exceed the estimated time,
              review what slowed you down.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Don't skip the deliverable. It's the proof that you learned the
              concept.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              If you get stuck, take a 15-minute break, then try a different
              approach.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            <span>
              Share your deliverables on GitHub or Twitter. Get feedback from the
              community.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
