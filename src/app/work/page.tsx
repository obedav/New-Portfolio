import { projects } from '@/lib/projects';
import { clientProjects } from '@/lib/client-projects';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ClientProjectsAccordion } from '@/components/work/client-projects-accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work - David MG',
  description:
    'Explore detailed case studies of my software engineering projects, including technical decisions, architecture, and performance metrics.',
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:border-neutral-800 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
              Featured Work
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
              Deep dive into the engineering behind my projects. Each case study
              includes technical decisions, architecture diagrams, performance
              metrics, and the trade-offs I made along the way.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group"
            >
              <Card className="h-full p-6 transition-all hover:shadow-xl hover:scale-[1.02]">
                {/* Category & Metric Badges */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{project.category}</Badge>
                  <Badge variant="outline">{project.keyMetric}</Badge>
                </div>

                {/* Project Name */}
                <h2 className="mb-3 text-2xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
                  {project.name}
                </h2>

                {/* One-liner */}
                <p className="mb-6 text-neutral-600 leading-relaxed dark:text-neutral-400">
                  {project.oneLiner}
                </p>

                {/* Tech Stack Preview */}
                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.engineering.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech.name}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {project.engineering.techStack.length > 4 && (
                      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                        +{project.engineering.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 border-t border-neutral-200 pt-4 dark:border-neutral-700">
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Performance</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {project.quality.performance.lighthouse.performance}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Coverage</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {project.quality.testing.coverage}%
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                  <span>View case study</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Client Projects Accordion */}
        <ClientProjectsAccordion projects={clientProjects} />

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-neutral-600 dark:text-neutral-400">
            Interested in working together?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Get in touch
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
