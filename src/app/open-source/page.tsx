import { Metadata } from 'next';
import Link from 'next/link';
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Users,
  GitPullRequest,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Open Source | David Makinde-George',
  description:
    'Open source contributions and public repositories. Building in public with Next.js, React, TypeScript, and more.',
};

// Repository data - in production, this could be fetched from GitHub API
const repositories = [
  {
    name: 'Swiftpass-visa-platform-dev',
    description: 'Enterprise visa application platform with OCR, multi-payment support, and real-time tracking.',
    language: 'TypeScript',
    stars: 12,
    forks: 3,
    url: 'https://github.com/obedav/Swiftpass-visa-platform-dev',
    topics: ['nextjs', 'supabase', 'stripe', 'typescript'],
  },
  {
    name: 'Tundua',
    description: 'AI-powered EdTech SaaS platform for study abroad guidance with document generation.',
    language: 'TypeScript',
    stars: 8,
    forks: 2,
    url: 'https://github.com/obedav/Tundua',
    topics: ['nextjs', 'openai', 'postgres', 'stripe'],
  },
  {
    name: 'finance-tracker',
    description: 'Production-grade personal finance app with virtual scrolling for 10K+ transactions.',
    language: 'Vue',
    stars: 15,
    forks: 4,
    url: 'https://github.com/obedav/finance-tracker',
    topics: ['vue3', 'laravel', 'typescript', 'postgresql'],
  },
  {
    name: 'Royal-Health-Consult',
    description: 'Healthcare booking platform for nursing, therapy, and emergency services.',
    language: 'TypeScript',
    stars: 6,
    forks: 1,
    url: 'https://github.com/obedav/Royal-Health-Consult',
    topics: ['react', 'nodejs', 'healthcare'],
  },
  {
    name: 'Estatia',
    description: 'AI-powered real estate platform with semantic search and natural language queries.',
    language: 'TypeScript',
    stars: 10,
    forks: 2,
    url: 'https://github.com/obedav/Estatia',
    topics: ['nextjs', 'dotnet', 'openai', 'pgvector'],
  },
];

const stats = [
  { label: 'Public Repos', value: '29', icon: Code2 },
  { label: 'Total Stars', value: '51', icon: Star },
  { label: 'Contributions', value: '400+', icon: GitPullRequest },
  { label: 'Years Active', value: '5+', icon: Calendar },
];

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Vue: 'bg-emerald-500',
  Python: 'bg-blue-400',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
};

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800 px-4 py-2">
            <Github className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-neutral-300">@obedav</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Open Source
          </h1>
          <p className="text-xl text-neutral-400">
            Building in public. All my projects are open source and available on GitHub.
          </p>
          <a
            href="https://github.com/obedav"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            <Github className="h-5 w-5" />
            View GitHub Profile
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-neutral-200 bg-white p-6 text-center dark:border-neutral-800 dark:bg-neutral-900"
            >
              <stat.icon className="mx-auto mb-3 h-6 w-6 text-neutral-400" />
              <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* GitHub Contribution Graph Placeholder */}
        <div className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Contribution Activity
          </h2>
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                400+ contributions in the last year
              </span>
              <a
                href="https://github.com/obedav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                View on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            {/* Simulated contribution graph */}
            <div className="flex gap-1">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    // Generate pseudo-random intensity based on position
                    const seed = (weekIndex * 7 + dayIndex) * 13;
                    const intensity = Math.abs(Math.sin(seed)) * 4;
                    const level = Math.floor(intensity);

                    const colors = [
                      'bg-neutral-100 dark:bg-neutral-800',
                      'bg-emerald-200 dark:bg-emerald-900',
                      'bg-emerald-300 dark:bg-emerald-700',
                      'bg-emerald-400 dark:bg-emerald-600',
                      'bg-emerald-500 dark:bg-emerald-500',
                    ];

                    return (
                      <div
                        key={dayIndex}
                        className={`h-2.5 w-2.5 rounded-sm ${colors[level]}`}
                        title={`${level} contributions`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end gap-1 text-xs text-neutral-500 dark:text-neutral-400">
              <span>Less</span>
              <div className="h-2.5 w-2.5 rounded-sm bg-neutral-100 dark:bg-neutral-800" />
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-900" />
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-700" />
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-600" />
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-500" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Featured Repositories */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Featured Repositories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {repositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-neutral-400" />
                    <span className="font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
                      {repo.name}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <p className="mb-4 text-sm text-neutral-600 line-clamp-2 dark:text-neutral-400">
                  {repo.description}
                </p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`h-3 w-3 rounded-full ${languageColors[repo.language] || 'bg-neutral-400'}`}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repo.forks}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-16 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900">
          <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">
            Why I Build in Public
          </h3>
          <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
            <p>
              <strong className="text-neutral-900 dark:text-white">Transparency:</strong> All my
              code is public. You can see exactly how I build things, from commit history to
              architectural decisions.
            </p>
            <p>
              <strong className="text-neutral-900 dark:text-white">Learning:</strong> I've learned
              so much from other developers' open source projects. This is my way of giving back.
            </p>
            <p>
              <strong className="text-neutral-900 dark:text-white">Accountability:</strong> When
              code is public, you write it differently. Better documentation, cleaner architecture,
              fewer shortcuts.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Interested in collaborating on an open source project?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <Users className="h-5 w-5" />
            Let's Connect
          </Link>
        </div>
      </div>
    </div>
  );
}
