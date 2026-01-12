'use client';

import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ChevronRight, X } from 'lucide-react';

interface Layer1ProductProps {
  project: Project;
  onNext: () => void;
  onClose: () => void;
}

export function Layer1Product({ project, onNext, onClose }: Layer1ProductProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <Badge variant="secondary" className="mb-2">
            {project.category}
          </Badge>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            {project.name}
          </h2>
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">{project.oneLiner}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Problem & Solution */}
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Problem
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300">{project.product.problem}</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Solution
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300">{project.product.solution}</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Target Users
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300">{project.product.targetUsers}</p>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {project.product.liveUrl && (
          <Button variant="default" asChild>
            <a
              href={project.product.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live Site
            </a>
          </Button>
        )}
        <Button variant="outline" asChild className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
          <a
            href={project.product.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            View Code
          </a>
        </Button>
      </div>

      {/* Next Layer Button */}
      <div className="border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <button
          onClick={onNext}
          className="group flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 transition-all hover:from-blue-100 hover:to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50"
        >
          <div className="text-left">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Next Layer
            </p>
            <p className="text-lg font-semibold text-neutral-900 dark:text-white">
              View Engineering Details
            </p>
          </div>
          <ChevronRight className="h-6 w-6 text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400" />
        </button>
      </div>
    </div>
  );
}
