import { Hero } from '@/components/home/hero';
import { ProjectGrid } from '@/components/home/project-grid';
import { Testimonials } from '@/components/home/testimonials';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="bg-white py-16 sm:py-24 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Featured Projects
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Click any project card to explore the 4 layers beneath: Product,
              Engineering, Quality, and Trade-offs. Each layer reveals deeper
              technical insights.
            </p>
          </div>

          {/* Project Grid */}
          <ProjectGrid />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </>
  );
}
