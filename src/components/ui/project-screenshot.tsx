'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Monitor, Code2, Database, Zap } from 'lucide-react';

interface ProjectScreenshotProps {
  src: string;
  alt: string;
  projectName: string;
  category: string;
  priority?: boolean;
}

const categoryIcons: Record<string, typeof Monitor> = {
  FinTech: Database,
  SaaS: Code2,
  HealthTech: Zap,
  EdTech: Monitor,
  PropTech: Monitor,
};

const categoryColors: Record<string, { from: string; to: string; icon: string }> = {
  FinTech: { from: 'from-emerald-500', to: 'to-teal-600', icon: 'text-emerald-200' },
  SaaS: { from: 'from-blue-500', to: 'to-indigo-600', icon: 'text-blue-200' },
  HealthTech: { from: 'from-red-500', to: 'to-pink-600', icon: 'text-red-200' },
  EdTech: { from: 'from-purple-500', to: 'to-violet-600', icon: 'text-purple-200' },
  PropTech: { from: 'from-orange-500', to: 'to-amber-600', icon: 'text-orange-200' },
};

export function ProjectScreenshot({
  src,
  alt,
  projectName,
  category,
  priority = false,
}: ProjectScreenshotProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const colors = categoryColors[category] || categoryColors.SaaS;
  const Icon = categoryIcons[category] || Monitor;

  if (hasError) {
    // Render beautiful placeholder
    return (
      <div
        className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${colors.from} ${colors.to}`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <Icon className={`h-12 w-12 ${colors.icon}`} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">{projectName}</h3>
          <p className="text-sm text-white/80">Screenshot coming soon</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-600 dark:border-neutral-600 dark:border-t-blue-400" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  );
}
