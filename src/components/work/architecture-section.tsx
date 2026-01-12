import { TechStackItem } from '@/types/project';
import { ArchitectureDiagram } from './architecture-diagram';

interface ArchitectureSectionProps {
  architecture: {
    diagram: string;
    description: string;
  };
  projectName: string;
  projectSlug: string;
  techStack: TechStackItem[];
}

export function ArchitectureSection({
  architecture,
  projectSlug,
  techStack,
}: ArchitectureSectionProps) {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        System Architecture
      </h3>

      <ArchitectureDiagram
        projectSlug={projectSlug}
        techStack={techStack}
        description={architecture.description}
      />
    </div>
  );
}
