'use client';

import { ArrowDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '5', label: 'SaaS Products', subtext: 'Built & Shipped' },
    { value: '8', label: 'Client Projects', subtext: 'Delivered' },
    { value: '3', label: 'With Revenue', subtext: 'Live Platforms' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-20 sm:py-32 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
      </div>

      {/* Gradient Orbs */}
      <div
        className="absolute -top-40 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[100px] dark:from-blue-500/20 dark:to-purple-500/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 blur-[100px] dark:from-indigo-500/10 dark:to-cyan-500/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 dark:border-green-800 dark:bg-green-950"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Open to remote roles & contract work
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl dark:text-white"
          >
            David Makinde-George
          </motion.h1>

          {/* Role Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 sm:text-xl dark:shadow-blue-500/10">
              Full-Stack Developer & SaaS Builder
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10 text-lg leading-relaxed text-neutral-600 sm:text-xl dark:text-neutral-400"
          >
            I build and ship{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">production-ready applications</span>.
            From{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">AI-powered SaaS</span>{' '}
            to{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">client websites</span>,
            I handle the full stack with a focus on quality and user experience.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10 grid grid-cols-3 gap-4 sm:gap-8"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl border border-neutral-200 bg-white/50 p-4 backdrop-blur-sm transition-all hover:border-blue-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-blue-700"
              >
                <div className="text-3xl font-bold text-neutral-900 sm:text-4xl dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-neutral-700 sm:text-base dark:text-neutral-300">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-500">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <Button size="lg" className="group shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10">
                Get in touch
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/work">
              <Button size="lg" variant="outline" className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                View my work
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            onClick={scrollToProjects}
            className="mt-16 inline-flex flex-col items-center text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
            aria-label="Scroll to projects"
          >
            <span className="mb-2">Explore projects</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
