'use client';

import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  const stats = [
    { value: '5', label: 'SaaS Products', subtext: 'Built & Shipped' },
    { value: '8', label: 'Client Projects', subtext: 'Delivered' },
    { value: '3', label: 'With Revenue', subtext: 'Live Platforms' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-8 sm:py-12 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
      </div>

      {/* Gradient Orbs with Parallax */}
      <div
        className="parallax-slow absolute -top-40 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[100px] dark:from-blue-500/20 dark:to-purple-500/20"
        aria-hidden="true"
      />
      <div
        className="parallax-medium absolute -bottom-40 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 blur-[100px] dark:from-indigo-500/10 dark:to-cyan-500/10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 dark:border-green-800 dark:bg-green-950"
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
            className="mb-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            David Makinde-George
          </motion.h1>

          {/* Role Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1.5 text-base font-semibold text-white shadow-lg shadow-blue-500/25 sm:text-lg dark:shadow-blue-500/10">
              Full-Stack Developer & SaaS Builder
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-400"
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
            className="mb-6 grid grid-cols-3 gap-3 sm:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative rounded-xl border border-neutral-200 bg-white/50 p-3 backdrop-blur-sm transition-all hover:border-blue-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-blue-700"
              >
                <div className="text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">
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
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/contact">
              <Button size="default" className="group shadow-lg shadow-blue-500/25 dark:shadow-blue-500/10">
                Get in touch
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/work">
              <Button size="default" variant="outline" className="dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
                View my work
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
