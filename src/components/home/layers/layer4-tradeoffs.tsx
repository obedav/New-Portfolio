'use client';

import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface Layer4TradeoffsProps {
  project: Project;
  onPrev: () => void;
  onClose: () => void;
}

export function Layer4Tradeoffs({
  project,
  onPrev,
  onClose,
}: Layer4TradeoffsProps) {
  return (
    <div className="mt-8 space-y-6 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          Trade-offs & Constraints
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Honest reflection on constraints and future improvements
        </p>
      </div>

      {/* Constraints */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Project Constraints
        </h3>
        <div className="space-y-2">
          {project.tradeoffs.constraints.map((constraint, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-400" />
              {constraint}
            </div>
          ))}
        </div>
      </div>

      {/* Would Change */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          What I Would Change
        </h3>
        <div className="space-y-2">
          {project.tradeoffs.wouldChange.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-lg bg-orange-50 p-3 text-sm text-orange-900 dark:bg-orange-900/20 dark:text-orange-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Known Limitations */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Known Limitations
        </h3>
        <div className="space-y-2">
          {project.tradeoffs.knownLimitations.map((limitation, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-900 dark:bg-red-900/20 dark:text-red-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
              {limitation}
            </div>
          ))}
        </div>
      </div>

      {/* Scaling Considerations */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Scaling Considerations
        </h3>
        <div className="space-y-2">
          {project.tradeoffs.scalingConsiderations.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-900 dark:bg-blue-900/20 dark:text-blue-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Final Reflection */}
      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-300">
          Reflection
        </h3>
        <p className="text-sm leading-relaxed text-blue-800 dark:text-blue-300">
          This project demonstrates senior-level engineering thinking: not just
          solving problems, but understanding trade-offs, acknowledging
          constraints, and planning for scale. Every decision was made with
          intention, considering cost, performance, security, and user
          experience.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Button variant="outline" onClick={onPrev} className="flex-1 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous Layer
        </Button>
        <Button onClick={onClose} variant="default" className="flex-1">
          Close Project
        </Button>
      </div>
    </div>
  );
}
