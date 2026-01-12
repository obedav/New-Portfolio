'use client';

import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Layer2EngineeringProps {
  project: Project;
  onNext: () => void;
  onPrev: () => void;
}

export function Layer2Engineering({
  project,
  onNext,
  onPrev,
}: Layer2EngineeringProps) {
  return (
    <div className="mt-8 space-y-6 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          Engineering Details
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Technical decisions and architecture
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.engineering.techStack.map((tech, index) => (
            <Badge key={index} variant="outline" className="dark:border-neutral-700 dark:text-neutral-300">
              {tech.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Architecture
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300">
          {project.engineering.architecture.description}
        </p>
      </div>

      {/* Key Engineering Decisions */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Key Engineering Decisions
        </h3>
        <div className="space-y-4">
          {project.engineering.keyDecisions.map((decision, index) => (
            <div
              key={index}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800"
            >
              <h4 className="mb-2 font-semibold text-neutral-900 dark:text-white">
                {decision.title}
              </h4>
              <div className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="font-medium">Decision:</span>{' '}
                {decision.decision}
              </div>
              <div className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="font-medium">Rationale:</span>{' '}
                {decision.rationale}
              </div>
              {decision.impact && (
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  <span className="font-medium">Impact:</span>{' '}
                  {decision.impact}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Button variant="outline" onClick={onPrev} className="flex-1 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Layer
        </Button>
        <button
          onClick={onNext}
          className="group flex flex-1 items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 transition-all hover:from-blue-100 hover:to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50"
        >
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">
            View Quality & Performance
          </span>
          <ChevronRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400" />
        </button>
      </div>
    </div>
  );
}
