export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-saas-with-nextjs-supabase',
    title: 'Building a Production SaaS with Next.js and Supabase',
    excerpt:
      'Lessons learned from building SwiftPass - a visa application platform handling real users and payments across 100+ countries.',
    publishedAt: '2026-01-10',
    readingTime: '8 min read',
    tags: ['Next.js', 'Supabase', 'SaaS', 'Production'],
    featured: true,
    content: `
## The Challenge

When I set out to build SwiftPass, I knew I needed a stack that could handle:
- **Multi-tenancy**: Each visa agency needed isolated data
- **Real-time updates**: Users needed to see application status changes instantly
- **Payment processing**: Both international cards (Stripe) and mobile money (M-Pesa)
- **Document handling**: Passport OCR and secure file storage

## Why Next.js 14 + Supabase?

After evaluating several options, I chose this stack for specific reasons:

### Server Components for Performance
Next.js 14's Server Components allowed me to reduce the client-side JavaScript by 60%. The visa application wizard has 8 steps, but users only download the code for their current step.

\`\`\`tsx
// Each step is a Server Component by default
export default async function Step3Documents() {
  // Data fetching happens on the server
  const requirements = await getVisaRequirements(countryCode);

  return <DocumentUploader requirements={requirements} />;
}
\`\`\`

### Row-Level Security for Multi-tenancy
Instead of filtering data in the application layer (error-prone), I used Supabase's RLS:

\`\`\`sql
-- Users can only see their own applications
CREATE POLICY "Users view own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

-- Agencies can see applications assigned to them
CREATE POLICY "Agencies view assigned applications" ON applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agency_members
      WHERE agency_members.user_id = auth.uid()
      AND agency_members.agency_id = applications.agency_id
    )
  );
\`\`\`

This means even if my application code has a bug, data leaks are prevented at the database level.

## The Hard Parts

### 1. Passport OCR That Actually Works
Client-side OCR with Tesseract.js works great for machine-readable passports (MRZ), but handwritten fields are problematic. My solution:

- Use Tesseract.js for MRZ (92% accuracy)
- Fall back to manual input for other fields
- Validate MRZ checksum before auto-filling

### 2. Dual Payment Systems
Integrating Stripe was straightforward. M-Pesa was not. Key learnings:

- M-Pesa uses callback URLs, not webhooks
- You need IP whitelisting for callbacks
- Transaction status can take 30+ seconds to confirm

I built a unified payment abstraction that handles both:

\`\`\`tsx
const payment = await processPayment({
  amount: 150,
  currency: 'USD',
  method: userPreference, // 'stripe' or 'mpesa'
  onSuccess: handleSuccess,
  onFailure: handleFailure,
});
\`\`\`

### 3. Handling Edge Cases in Production

Real users do unexpected things:
- Uploading passport photos upside down
- Entering phone numbers with country codes in various formats
- Abandoning applications mid-payment

Each of these required specific handling that I wouldn't have anticipated without real usage data.

## Results

After 3 months in production:
- **94 Lighthouse performance score** (up from 67)
- **43% higher payment completion** for African users (M-Pesa)
- **78% reduction in form filling time** (OCR)
- **Zero data leak incidents** (RLS)

## What I'd Do Differently

1. **Add comprehensive E2E tests earlier** - Manual testing doesn't scale
2. **Build the admin dashboard first** - Debugging production issues without it was painful
3. **Implement i18n from the start** - Retrofitting internationalization is tedious

## Key Takeaways

1. **Choose boring technology** - Next.js and Supabase are well-documented and battle-tested
2. **Security at the database level** - RLS is underutilized and incredibly powerful
3. **Optimize for real users** - M-Pesa integration was extra work but doubled my addressable market
4. **Ship and iterate** - The MVP took 3 months; the improvements since have taken longer

The full source code is available on [GitHub](https://github.com/obedav/Swiftpass-visa-platform-dev).
    `,
  },
  {
    slug: 'ai-integration-patterns-nextjs',
    title: 'AI Integration Patterns in Next.js Applications',
    excerpt:
      'Practical patterns for integrating OpenAI APIs into production applications, with examples from Tundua and Estatia.',
    publishedAt: '2026-01-05',
    readingTime: '6 min read',
    tags: ['AI', 'OpenAI', 'Next.js', 'Patterns'],
    featured: true,
    content: `
## Beyond the Chatbot

Most AI integration tutorials show you how to build a chatbot. But in production applications, AI serves more nuanced purposes:

- **Document generation**: Creating personalized content from templates
- **Semantic search**: Finding relevant items using natural language
- **Data extraction**: Parsing unstructured data into structured formats
- **Content enhancement**: Improving user-generated content

I've implemented all of these across Tundua (EdTech) and Estatia (PropTech). Here's what I learned.

## Pattern 1: Streaming for Long-Running Tasks

When generating documents (like statement of purpose letters in Tundua), users need feedback that something is happening.

\`\`\`tsx
// app/api/generate-sop/route.ts
export async function POST(req: Request) {
  const { studentProfile, university } = await req.json();

  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are an expert admissions consultant...'
      },
      {
        role: 'user',
        content: \`Generate a statement of purpose for:
          Student: \${JSON.stringify(studentProfile)}
          University: \${university.name}
          Program: \${university.program}\`
      }
    ],
  });

  // Return as streaming response
  return new Response(stream.toReadableStream());
}
\`\`\`

On the client, I use a custom hook to handle streaming:

\`\`\`tsx
function useStreamingGeneration() {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async (params) => {
    setIsGenerating(true);
    setContent('');

    const response = await fetch('/api/generate-sop', {
      method: 'POST',
      body: JSON.stringify(params),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setContent(prev => prev + decoder.decode(value));
    }

    setIsGenerating(false);
  };

  return { content, isGenerating, generate };
}
\`\`\`

## Pattern 2: Semantic Search with Embeddings

In Estatia, users can search for properties using natural language like "quiet neighborhood near good schools with a backyard."

The architecture:
1. **Embed property descriptions** when listings are created
2. **Embed user queries** at search time
3. **Find nearest neighbors** using cosine similarity

\`\`\`tsx
// Embedding a property description
async function embedProperty(property: Property) {
  const text = \`
    \${property.title}
    \${property.description}
    Location: \${property.neighborhood}, \${property.city}
    Features: \${property.features.join(', ')}
  \`;

  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  await db.execute(
    'UPDATE properties SET embedding = $1 WHERE id = $2',
    [embedding.data[0].embedding, property.id]
  );
}
\`\`\`

For search, I use PostgreSQL with pgvector:

\`\`\`sql
-- Find properties similar to search query
SELECT *,
  1 - (embedding <=> $1) as similarity
FROM properties
WHERE 1 - (embedding <=> $1) > 0.7
ORDER BY embedding <=> $1
LIMIT 20;
\`\`\`

## Pattern 3: Structured Output Extraction

When processing uploaded documents, I need structured data, not freeform text. OpenAI's function calling helps:

\`\`\`tsx
const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    {
      role: 'user',
      content: \`Extract information from this transcript: \${transcript}\`
    }
  ],
  tools: [
    {
      type: 'function',
      function: {
        name: 'extract_academic_info',
        parameters: {
          type: 'object',
          properties: {
            gpa: { type: 'number' },
            graduationYear: { type: 'number' },
            major: { type: 'string' },
            courses: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  grade: { type: 'string' },
                  credits: { type: 'number' }
                }
              }
            }
          },
          required: ['gpa', 'graduationYear', 'major']
        }
      }
    }
  ],
  tool_choice: { type: 'function', function: { name: 'extract_academic_info' } }
});
\`\`\`

This guarantees the output matches my TypeScript types.

## Cost Optimization

AI APIs are expensive. Here's how I keep costs manageable:

### 1. Cache Embeddings
Property embeddings don't change often. I only regenerate when the listing is updated.

### 2. Use Cheaper Models Where Possible
- **gpt-4** for document generation (quality matters)
- **gpt-3.5-turbo** for simple classification tasks
- **text-embedding-3-small** instead of large (60% cheaper, similar quality)

### 3. Batch Requests
When processing multiple documents, batch them:

\`\`\`tsx
// Instead of N API calls
const embeddings = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: documents.map(d => d.content), // Single call for all
});
\`\`\`

## Error Handling

AI APIs fail. Rate limits hit. Timeouts happen. Robust error handling is essential:

\`\`\`tsx
async function generateWithRetry(params, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await openai.chat.completions.create(params);
    } catch (error) {
      if (error.status === 429) {
        // Rate limited - exponential backoff
        await sleep(Math.pow(2, attempt) * 1000);
        continue;
      }
      if (error.status >= 500) {
        // Server error - retry
        await sleep(1000);
        continue;
      }
      throw error; // Client error - don't retry
    }
  }
  throw new Error('Max retries exceeded');
}
\`\`\`

## Key Takeaways

1. **Stream long-running operations** - Users need feedback
2. **Use embeddings for semantic search** - Keywords are limiting
3. **Leverage function calling** - Get structured, typed outputs
4. **Optimize costs aggressively** - It adds up fast
5. **Handle failures gracefully** - AI APIs are not 100% reliable

Both Tundua and Estatia source code are available on GitHub.
    `,
  },
  {
    slug: 'virtual-scrolling-large-datasets',
    title: 'Virtual Scrolling: Rendering 10K+ Items Without Lag',
    excerpt:
      'How I implemented performant virtual scrolling in the Finance Tracker to handle years of transaction history.',
    publishedAt: '2025-12-28',
    readingTime: '5 min read',
    tags: ['Performance', 'Vue.js', 'Frontend', 'Optimization'],
    content: `
## The Problem

Finance Tracker needs to display years of transaction history. A typical user might have:
- 50 transactions/month × 12 months × 5 years = **3,000 transactions**
- Power users tracking everything: **10,000+ transactions**

Rendering 10,000 DOM nodes kills performance:
- Initial render: 3-5 seconds
- Scrolling: Janky, dropped frames
- Memory: 500MB+ for DOM nodes alone

## The Solution: Virtual Scrolling

Only render what's visible. If the viewport shows 20 items, render ~30 (including buffer). As the user scrolls, recycle DOM nodes.

### Choosing a Library

For Vue 3, I evaluated:
- **vue-virtual-scroller**: Mature, good performance
- **vue-virtual-scroll-list**: More features, larger bundle
- **Custom implementation**: Full control, more work

I chose **vue-virtual-scroller** for its balance of performance and simplicity.

### Basic Implementation

\`\`\`vue
<template>
  <RecycleScroller
    class="transaction-list"
    :items="transactions"
    :item-size="72"
    key-field="id"
    v-slot="{ item }"
  >
    <TransactionRow :transaction="item" />
  </RecycleScroller>
</template>

<script setup lang="ts">
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const props = defineProps<{
  transactions: Transaction[];
}>();
</script>
\`\`\`

### The Tricky Parts

#### 1. Variable Height Items

Some transactions have notes, categories, or attachments that change their height. Fixed \`item-size\` doesn't work.

Solution: Use \`DynamicScroller\` with \`DynamicScrollerItem\`:

\`\`\`vue
<DynamicScroller
  :items="transactions"
  :min-item-size="72"
  key-field="id"
>
  <template #default="{ item, index, active }">
    <DynamicScrollerItem
      :item="item"
      :active="active"
      :data-index="index"
    >
      <TransactionRow :transaction="item" />
    </DynamicScrollerItem>
  </template>
</DynamicScroller>
\`\`\`

#### 2. Maintaining Scroll Position During Updates

When new transactions are added at the top, the scroll position jumps. Users lose their place.

Solution: Calculate and restore relative position:

\`\`\`ts
const scrollerRef = ref<InstanceType<typeof DynamicScroller>>();

watch(transactions, (newTxs, oldTxs) => {
  if (newTxs.length > oldTxs.length) {
    const addedCount = newTxs.length - oldTxs.length;
    const currentScroll = scrollerRef.value?.getScroll();

    nextTick(() => {
      // Adjust scroll to account for new items
      scrollerRef.value?.scrollToPosition(
        currentScroll + (addedCount * 72)
      );
    });
  }
});
\`\`\`

#### 3. Search and Filter Performance

Filtering 10,000 items on every keystroke is slow. Solutions:

**Debounce the filter:**
\`\`\`ts
const searchQuery = ref('');
const debouncedQuery = refDebounced(searchQuery, 300);

const filteredTransactions = computed(() => {
  if (!debouncedQuery.value) return transactions.value;

  return transactions.value.filter(tx =>
    tx.description.toLowerCase().includes(debouncedQuery.value.toLowerCase())
  );
});
\`\`\`

**Use Web Workers for heavy filtering:**
\`\`\`ts
// worker.ts
self.onmessage = (e) => {
  const { transactions, query } = e.data;
  const filtered = transactions.filter(tx =>
    tx.description.toLowerCase().includes(query.toLowerCase())
  );
  self.postMessage(filtered);
};
\`\`\`

## Performance Results

| Metric | Before | After |
|--------|--------|-------|
| Initial render (10K items) | 4.2s | 180ms |
| Scroll FPS | 15-20 | 60 |
| Memory usage | 512MB | 45MB |
| Time to interactive | 5.1s | 0.9s |

## Gotchas and Tips

1. **Always set a key field** - Without it, Vue can't efficiently recycle nodes
2. **Avoid expensive computed properties in list items** - They recalculate on every render
3. **Use \`v-memo\` for complex items** - Prevents unnecessary re-renders
4. **Test with production data volumes** - 100 items works fine; 10,000 exposes issues
5. **Profile in production mode** - Dev mode has extra overhead

## When NOT to Use Virtual Scrolling

- Lists under 100 items (overhead isn't worth it)
- Items with complex interactions (drag-drop becomes harder)
- SEO-critical content (search engines can't see virtual content)

## Conclusion

Virtual scrolling transformed Finance Tracker from unusable with large datasets to smooth 60fps scrolling. The key is choosing the right library and handling edge cases around height variations and scroll position.

Full implementation is in the [Finance Tracker repo](https://github.com/obedav/finance-tracker).
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getRecentPosts(count: number = 5): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
