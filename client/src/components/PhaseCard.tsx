import { Phase } from '@/lib/curriculum';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock } from 'lucide-react';

interface PhaseCardProps {
  phase: Phase;
  isCompleted?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function PhaseCard({
  phase,
  isCompleted = false,
  isActive = false,
  onClick,
}: PhaseCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isActive ? 'ring-2 ring-primary' : ''
      } ${isCompleted ? 'opacity-75' : ''}`}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${phase.color} 0%, transparent 100%)`,
        }}
      />

      <div className="relative p-6 space-y-4">
        {/* Header with icon and status */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: `${phase.color}15` }}
            >
              {phase.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Phase {phase.number}
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {phase.title}
              </h3>
            </div>
          </div>
          {isCompleted && (
            <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
          )}
        </div>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground">{phase.subtitle}</p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-foreground/80">
          {phase.description}
        </p>

        {/* Duration and modules */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {phase.estimatedWeeks} weeks
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {phase.modules.length} modules
            </Badge>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: isCompleted ? '100%' : '0%',
              backgroundColor: phase.color,
            }}
          />
        </div>
      </div>
    </Card>
  );
}
