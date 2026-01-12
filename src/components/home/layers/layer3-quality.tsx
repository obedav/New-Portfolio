'use client';

import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Layer3QualityProps {
  project: Project;
  onNext: () => void;
  onPrev: () => void;
}

export function Layer3Quality({
  project,
  onNext,
  onPrev,
}: Layer3QualityProps) {
  const getLighthouseColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="mt-8 space-y-6 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
          Quality & Performance
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">Testing, performance, and security</p>
      </div>

      {/* Testing */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Testing
        </h3>
        <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-800">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Code Coverage
            </span>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {project.quality.testing.coverage}%
            </span>
          </div>
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
            <div
              className="h-full bg-green-600 transition-all"
              style={{ width: `${project.quality.testing.coverage}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.quality.testing.frameworks.map((framework, index) => (
              <Badge key={index} variant="secondary">
                {framework}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Lighthouse Scores */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Lighthouse Scores
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Object.entries(project.quality.performance.lighthouse).map(
            ([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-neutral-200 bg-white p-4 text-center dark:border-neutral-800 dark:bg-neutral-800"
              >
                <div
                  className={`text-3xl font-bold ${getLighthouseColor(value)}`}
                >
                  {value}
                </div>
                <div className="mt-1 text-xs capitalize text-neutral-600 dark:text-neutral-400">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Performance Optimizations
        </h3>
        <div className="space-y-2">
          {project.quality.performance.optimizations.map((opt, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
              {opt}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Bundle Size</div>
            <div className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">
              {project.quality.performance.bundleSize.after}
            </div>
            {project.quality.performance.bundleSize.before && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                from {project.quality.performance.bundleSize.before}
              </div>
            )}
          </div>
          <div className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
            <div className="text-xs text-neutral-600 dark:text-neutral-400">TTFB</div>
            <div className="mt-1 text-lg font-bold text-neutral-900 dark:text-white">
              {project.quality.performance.ttfb}
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Security Measures
        </h3>
        <div className="space-y-2">
          {project.quality.security.measures.map((measure, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600" />
              {measure}
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
            View Trade-offs
          </span>
          <ChevronRight className="h-5 w-5 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400" />
        </button>
      </div>
    </div>
  );
}
