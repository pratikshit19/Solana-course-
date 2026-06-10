import { Module, Resource } from '@/lib/curriculum';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, BookOpen } from 'lucide-react';

interface ModuleDetailProps {
  module: Module;
}

const resourceTypeColors: Record<Resource['type'], string> = {
  documentation: 'bg-blue-100 text-blue-800',
  tutorial: 'bg-purple-100 text-purple-800',
  video: 'bg-red-100 text-red-800',
  course: 'bg-green-100 text-green-800',
  tool: 'bg-orange-100 text-orange-800',
};

const resourceTypeIcons: Record<Resource['type'], string> = {
  documentation: '📚',
  tutorial: '🎓',
  video: '🎬',
  course: '🏫',
  tool: '🛠️',
};

export function ModuleDetail({ module }: ModuleDetailProps) {
  return (
    <div className="space-y-6">
      {/* Module header */}
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">{module.title}</h3>
        <p className="text-foreground/70">{module.description}</p>
        <div className="flex gap-2 pt-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {module.estimatedHours}h
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {module.keyTopics.length} topics
          </Badge>
        </div>
      </div>

      {/* Key topics */}
      <Card className="p-4 space-y-3">
        <h4 className="font-semibold text-foreground">Key Topics</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {module.keyTopics.map((topic) => (
            <div
              key={topic}
              className="flex items-center gap-2 text-sm text-foreground/80"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {topic}
            </div>
          ))}
        </div>
      </Card>

      {/* Resources */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Recommended Resources</h4>
        <div className="space-y-2">
          {module.resources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="p-4 transition-all hover:shadow-md hover:border-primary/50">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {resourceTypeIcons[resource.type]}
                      </span>
                      <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </h5>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={`text-xs capitalize ${
                          resourceTypeColors[resource.type]
                        }`}
                      >
                        {resource.type}
                      </Badge>
                      {resource.duration && (
                        <span className="text-xs text-muted-foreground">
                          {resource.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
