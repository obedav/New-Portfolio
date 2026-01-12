import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

export const metadata = {
  title: 'Contact | David Makinde-George',
  description:
    'Get in touch with David Makinde-George. Available for remote full-stack developer roles and high-value contract work.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:border-neutral-800 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            Let's Build Something
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Available for remote roles, contracts, and exciting collaborations
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Send a Message</h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Fill out the form and I'll get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="space-y-6 lg:col-span-2">
            {/* Direct Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Direct Contact
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:obedav@live.com"
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">Email</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">obedav@live.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/obedav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <Github className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">GitHub</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">@obedav</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/david-makinde-george"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-blue-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0077B5]/10 dark:bg-[#0077B5]/20">
                    <Linkedin className="h-5 w-5 text-[#0077B5]" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">LinkedIn</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Connect</p>
                  </div>
                </a>
              </div>
            </div>

            {/* What I'm Looking For */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Open To
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Remote Full-Time Roles', icon: '💼' },
                  { label: 'Contract Projects', icon: '🚀' },
                  { label: 'Technical Co-Founding', icon: '🤝' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800/50 dark:bg-green-900/20">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Usually responds within 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Want to see my work first?
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            View my projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
