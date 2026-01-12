'use client';

import { useState } from 'react';
import { ClientProject } from '@/lib/client-projects';
import { Badge } from '@/components/ui/badge';

interface ClientProjectsAccordionProps {
  projects: ClientProject[];
}

export function ClientProjectsAccordion({
  projects,
}: ClientProjectsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (name: string) => {
    setExpandedProject(expandedProject === name ? null : name);
  };

  return (
    <div className="mt-20 border-t border-neutral-200 pt-16 dark:border-neutral-800">
      {/* Section Header with Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group cursor-pointer"
      >
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Client Projects
            </h2>
            <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              {projects.length} Live
            </Badge>
          </div>
          <p className="text-neutral-600 max-w-2xl dark:text-neutral-400">
            Production websites delivered for real clients across various
            industries. Click to explore all live projects.
          </p>
        </div>

        {/* Toggle Icon */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100 mt-10' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Industry Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Energy', count: 1, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
            { label: 'Education', count: 2, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
            { label: 'Lifestyle', count: 2, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
            { label: 'Other', count: 3, color: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"
            >
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{stat.label}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${stat.color}`}>
                {stat.count}
              </span>
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.name}
              className="border border-neutral-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900"
            >
              {/* Project Header - Always Visible */}
              <button
                onClick={() => toggleProject(project.name)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors dark:hover:bg-neutral-800"
              >
                <div className="flex items-center gap-4">
                  {/* Live Indicator */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {project.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.industry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Tech Stack Preview */}
                  <div className="hidden md:flex gap-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand Icon */}
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 transition-transform duration-300 dark:bg-neutral-800 ${
                      expandedProject === project.name ? 'rotate-180 bg-blue-100 dark:bg-blue-900' : ''
                    }`}
                  >
                    <svg
                      className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedProject === project.name
                    ? 'max-h-[600px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column - Description & Tech */}
                    <div>
                      <p className="text-neutral-600 mb-4 leading-relaxed dark:text-neutral-400">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2 dark:text-neutral-400">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 rounded-full text-sm font-medium dark:from-blue-900/30 dark:to-purple-900/30 dark:border-blue-800 dark:text-blue-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Features */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2 dark:text-neutral-400">
                        Key Features
                      </p>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4 text-green-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-neutral-600 text-sm dark:text-neutral-400">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Visit Button */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                    >
                      <span>Visit Live Site</span>
                      <svg
                        className="w-4 h-4"
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
