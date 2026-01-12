import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { Metadata } from 'next';
import Link from 'next/link';
import { ProjectScreenshot } from '@/components/ui/project-screenshot';
import { CaseStudyHeader } from '@/components/work/case-study-header';
import { TechStackSection } from '@/components/work/tech-stack-section';
import { ArchitectureSection } from '@/components/work/architecture-section';
import { EngineeringDecisionsSection } from '@/components/work/engineering-decisions-section';
import { PerformanceMetricsSection } from '@/components/work/performance-metrics-section';
import { TradeoffsSection } from '@/components/work/tradeoffs-section';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} - David MG`,
    description: project.oneLiner,
    openGraph: {
      title: project.name,
      description: project.oneLiner,
      images: [project.product.screenshot],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Back Button */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/work"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all projects
          </Link>
        </div>
      </div>

      {/* Case Study Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <CaseStudyHeader project={project} />

        {/* Layer 1: Product */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              The Problem
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl">
              {project.product.problem}
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6">
              The Solution
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl mb-8">
              {project.product.solution}
            </p>

            {/* Project Screenshot */}
            {project.product.screenshot && (
              <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-lg dark:border-neutral-800">
                <ProjectScreenshot
                  src={project.product.screenshot}
                  alt={`${project.name} Screenshot`}
                  projectName={project.name}
                  category={project.category}
                  priority
                />
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.product.liveUrl && (
                <a
                  href={project.product.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Live Site
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              <a
                href={project.product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                View on GitHub
                <svg
                  className="w-4 h-4 ml-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Target Users
            </h3>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl">
              {project.product.targetUsers}
            </p>
          </div>
        </section>

        {/* Layer 2: Engineering */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-12">
            Engineering Deep Dive
          </h2>

          {/* Tech Stack */}
          <TechStackSection techStack={project.engineering.techStack} />

          {/* Architecture */}
          <ArchitectureSection
            architecture={project.engineering.architecture}
            projectName={project.name}
            projectSlug={project.slug}
            techStack={project.engineering.techStack}
          />

          {/* Engineering Decisions */}
          <EngineeringDecisionsSection
            decisions={project.engineering.keyDecisions}
          />
        </section>

        {/* Layer 3: Quality & Performance */}
        <section className="mt-24">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-12">
            Quality & Performance
          </h2>

          <PerformanceMetricsSection
            lighthouse={project.quality.performance.lighthouse}
            bundleSize={project.quality.performance.bundleSize}
            ttfb={project.quality.performance.ttfb}
            optimizations={project.quality.performance.optimizations}
            testing={project.quality.testing}
            security={project.quality.security}
          />
        </section>

        {/* Layer 4: Trade-offs */}
        <section className="mt-24 mb-24">
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-12">
            Trade-offs & Lessons Learned
          </h2>

          <TradeoffsSection tradeoffs={project.tradeoffs} />
        </section>
      </main>
    </div>
  );
}
