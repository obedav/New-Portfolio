import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | David MG`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['David Makinde-George'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Simple markdown-like renderer
function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let currentCodeBlock: string[] = [];
  let inCodeBlock = false;

  lines.forEach((line, index) => {
    // Code block start/end
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <pre
            key={`code-${index}`}
            className="my-6 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm dark:bg-neutral-800"
          >
            <code className="text-neutral-100">{currentCodeBlock.join('\n')}</code>
          </pre>
        );
        currentCodeBlock = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line);
      return;
    }

    // Headers
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={index}
          className="mb-4 mt-10 text-2xl font-bold text-neutral-900 dark:text-white"
        >
          {line.slice(3)}
        </h2>
      );
      return;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={index}
          className="mb-3 mt-8 text-xl font-bold text-neutral-900 dark:text-white"
        >
          {line.slice(4)}
        </h3>
      );
      return;
    }

    // Tables
    if (line.startsWith('|')) {
      // Simple table rendering
      const cells = line
        .split('|')
        .filter((cell) => cell.trim())
        .map((cell) => cell.trim());

      if (line.includes('---')) {
        return; // Skip separator row
      }

      const isHeader = index > 0 && lines[index + 1]?.includes('---');
      const CellTag = isHeader ? 'th' : 'td';

      elements.push(
        <tr key={index} className="border-b border-neutral-200 dark:border-neutral-700">
          {cells.map((cell, cellIndex) => (
            <CellTag
              key={cellIndex}
              className={`px-4 py-2 text-left ${
                isHeader
                  ? 'bg-neutral-100 font-semibold text-neutral-900 dark:bg-neutral-800 dark:text-white'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {cell}
            </CellTag>
          ))}
        </tr>
      );
      return;
    }

    // List items
    if (line.startsWith('- ')) {
      elements.push(
        <li key={index} className="ml-6 list-disc text-neutral-700 dark:text-neutral-300">
          {renderInlineFormatting(line.slice(2))}
        </li>
      );
      return;
    }

    if (/^\d+\. /.test(line)) {
      elements.push(
        <li key={index} className="ml-6 list-decimal text-neutral-700 dark:text-neutral-300">
          {renderInlineFormatting(line.replace(/^\d+\. /, ''))}
        </li>
      );
      return;
    }

    // Empty lines
    if (line.trim() === '') {
      return;
    }

    // Regular paragraphs
    elements.push(
      <p key={index} className="mb-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
        {renderInlineFormatting(line)}
      </p>
    );
  });

  // Wrap tables
  const wrappedElements: React.ReactNode[] = [];
  let tableRows: React.ReactNode[] = [];

  elements.forEach((el, index) => {
    if (
      el &&
      typeof el === 'object' &&
      'type' in el &&
      (el as React.ReactElement).type === 'tr'
    ) {
      tableRows.push(el);
    } else {
      if (tableRows.length > 0) {
        wrappedElements.push(
          <div key={`table-wrapper-${index}`} className="my-6 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-neutral-200 dark:border-neutral-700">
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      wrappedElements.push(el);
    }
  });

  if (tableRows.length > 0) {
    wrappedElements.push(
      <div key="table-wrapper-final" className="my-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg border border-neutral-200 dark:border-neutral-700">
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  }

  return wrappedElements;
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Bold
  text = text.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-semibold text-neutral-900 dark:text-white">$1</strong>'
  );

  // Inline code
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">$1</code>'
  );

  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-600 hover:underline dark:text-blue-400" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get adjacent posts for navigation
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = sortedPosts[currentIndex + 1];
  const nextPost = sortedPosts[currentIndex - 1];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Back Button */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {post.title}
          </h1>
          <p className="mb-6 text-xl text-neutral-600 dark:text-neutral-400">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Author */}
        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
              DM
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-white">
                David Makinde-George
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Full-Stack Developer & SaaS Builder
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12 grid gap-4 sm:grid-cols-2">
          {prevPost && (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group rounded-xl border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:hover:border-neutral-700"
            >
              <span className="mb-1 flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-500">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </span>
              <span className="font-medium text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {prevPost.title}
              </span>
            </Link>
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group rounded-xl border border-neutral-200 p-4 text-right transition-all hover:border-neutral-300 hover:shadow-md sm:col-start-2 dark:border-neutral-800 dark:hover:border-neutral-700"
            >
              <span className="mb-1 flex items-center justify-end gap-1 text-sm text-neutral-500 dark:text-neutral-500">
                Next
                <ArrowRight className="h-4 w-4" />
              </span>
              <span className="font-medium text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {nextPost.title}
              </span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
