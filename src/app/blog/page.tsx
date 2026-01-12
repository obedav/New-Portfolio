import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | David Makinde-George',
  description:
    'Technical articles on building production applications with Next.js, React, AI integration, and modern web development.',
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const featuredPost = sortedPosts.find((post) => post.featured);
  const otherPosts = sortedPosts.filter((post) => post !== featuredPost);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:border-neutral-800 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            Blog
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Technical deep dives, lessons learned, and engineering decisions from building
            production applications.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Featured Article
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="rounded-2xl border border-neutral-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 transition-all hover:border-blue-300 hover:shadow-lg dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900 dark:hover:border-blue-700">
                <div className="mb-4 flex flex-wrap gap-2">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {featuredPost.title}
                </h3>
                <p className="mb-4 text-lg text-neutral-600 dark:text-neutral-400">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readingTime}
                  </span>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            All Articles
          </h2>
          <div className="space-y-6">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="mb-3 text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {post.readingTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-2xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 text-center dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-900">
          <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">
            More articles coming soon
          </h3>
          <p className="mb-6 text-neutral-600 dark:text-neutral-400">
            I write about building production applications, AI integration, and lessons from
            shipping real products.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
