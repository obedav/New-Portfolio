import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';

interface CaseStudyHeaderProps {
  project: Project;
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <header className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="secondary">{project.category}</Badge>
        <Badge variant="outline">{project.keyMetric}</Badge>
      </div>

      <div>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
          {project.name}
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600">
          {project.oneLiner}
        </p>
      </div>
    </header>
  );
}
