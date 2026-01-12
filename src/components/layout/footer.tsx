import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/obedav',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/obedav',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:obedav@live.com',
      icon: Mail,
    },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link
                href={item.href}
                className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        {/* Tagline */}
        <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Building production-ready applications with modern technologies.
        </p>

        {/* Copyright */}
        <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">
          &copy; {currentYear} David Makinde-George. All rights reserved.
        </p>

        {/* Built with */}
        <p className="mt-2 text-center text-xs text-neutral-400 dark:text-neutral-600">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
