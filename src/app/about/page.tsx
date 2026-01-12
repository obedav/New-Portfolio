import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'About | David Makinde-George',
  description:
    'Full-Stack Developer building production SaaS applications. Specializing in AI integration, payment systems, and enterprise-grade security.',
};

export default function AboutPage() {
  const techStack = {
    Frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
    Backend: ['Node.js', '.NET', 'Laravel', 'PostgreSQL', 'Supabase'],
    AI: ['OpenAI APIs', 'LangChain', 'AI Document Generation'],
    DevOps: ['GitHub Actions', 'Vercel', 'CI/CD', 'Automated Testing'],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            About Me
          </h1>
          <p className="text-xl text-blue-600 font-semibold dark:text-blue-400">
            SaaS Founder & Full-Stack Developer
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Intro */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              I build and ship production SaaS applications that serve real users. My projects include an{' '}
              <Link href="/work/swiftpass-visa-platform" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                enterprise visa platform
              </Link>{' '}serving 100+ countries, an{' '}
              <Link href="/work/tundua" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                AI-powered EdTech SaaS
              </Link>{' '}with paying customers, and a{' '}
              <Link href="/work/royal-health-consult" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                live healthcare booking platform
              </Link>.
            </p>
            <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              Unlike developers who only build tutorial projects, I build products that solve real problems. I handle the full stack: from architecting databases to integrating AI, from payment processing to enterprise-grade security.
            </p>
          </div>

          {/* What I Bring */}
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">What I Bring to Your Team</h2>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                <span><strong className="dark:text-white">Production Experience:</strong> I've launched live SaaS products, not just demo apps</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                <span><strong className="dark:text-white">AI Integration:</strong> Hands-on experience with OpenAI APIs, building features users actually pay for</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                <span><strong className="dark:text-white">Payment Systems:</strong> Integrated Stripe, Paystack, and M-Pesa in production environments</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                <span><strong className="dark:text-white">Security-First Mindset:</strong> WCAG compliance, CSP headers, rate limiting, RLS — not afterthoughts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                <span><strong className="dark:text-white">Ship Fast, Ship Well:</strong> I deliver production-ready code with tests and documentation</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="mb-6 text-xl font-bold text-neutral-900 dark:text-white">Tech Stack</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
            <h2 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">What I'm Looking For</h2>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300">
              I'm seeking remote full-stack developer positions or high-value contract work with teams building meaningful products. I thrive in environments where I can own features end-to-end and ship quickly.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-300">
                Remote Full-Time
              </span>
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-300">
                Contract Work
              </span>
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-neutral-300">
                SaaS / AI Startups
              </span>
            </div>
          </div>

          {/* Connect */}
          <div className="pt-4">
            <h2 className="mb-6 text-xl font-bold text-neutral-900 dark:text-white">Let's Connect</h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:obedav@live.com"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Mail className="h-5 w-5" />
                obedav@live.com
              </a>
              <a
                href="https://github.com/obedav"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/david-makinde-george"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8 text-center">
            <Link href="/work">
              <Button size="lg">
                View My Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
