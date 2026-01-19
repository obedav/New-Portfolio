import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AnalyticsProvider } from '@/components/analytics-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'David MG - Software Engineer',
    template: '%s | David MG',
  },
  description:
    'Full-stack engineer specializing in modern web applications. Building scalable systems with Next.js, React, and TypeScript.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'David MG' }],
  creator: 'David MG',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davidmg.dev',
    siteName: 'David MG Portfolio',
    title: 'David MG - Software Engineer',
    description:
      'Full-stack engineer specializing in modern web applications.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David MG - Software Engineer',
    description:
      'Full-stack engineer specializing in modern web applications.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
        <ThemeProvider>
          <AnalyticsProvider>
            <Header />
            <main className="min-h-screen" style={{ viewTransitionName: 'page-content' }}>
              {children}
            </main>
            <Footer />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
