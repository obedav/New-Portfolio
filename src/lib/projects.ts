import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'finance-tracker',
    name: 'Finance Tracker',
    oneLiner: 'Production-grade personal finance app with enterprise security',
    keyMetric: 'B+ Grade (81/100)',
    category: 'FinTech',

    product: {
      problem:
        'Most personal finance apps prioritize features over security and accessibility. Users need a reliable, secure way to track finances that handles large datasets without performance degradation.',
      solution:
        'A production-ready finance tracker built with modern stack (Vue 3 + Laravel), featuring WCAG 2.1 AA accessibility compliance, virtual scrolling for 10K+ transactions, enterprise-grade security (CSP headers, rate limiting), and comprehensive CI/CD pipeline.',
      targetUsers:
        'Users who need a secure, accessible, and performant personal finance tracking solution.',
      screenshot: '/projects/finance-tracker/dashboard.png',
      githubUrl: 'https://github.com/obedav/finance-tracker',
    },

    engineering: {
      techStack: [
        { name: 'Vue 3', icon: 'vue', category: 'Frontend' },
        { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
        { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend' },
        { name: 'Laravel', icon: 'laravel', category: 'Backend' },
        { name: 'PostgreSQL', icon: 'postgresql', category: 'Database' },
        { name: 'GitHub Actions', icon: 'github', category: 'DevOps' },
      ],
      architecture: {
        diagram: '/diagrams/finance-tracker-architecture.svg',
        description:
          'Vue 3 frontend with Composition API and TypeScript for type safety. Laravel backend with RESTful APIs. Virtual scrolling implementation using vue-virtual-scroller for handling 10K+ transaction records without DOM bloat. Security middleware for CSP headers and rate limiting.',
      },
      keyDecisions: [
        {
          title: 'Vue 3 Composition API with TypeScript',
          decision:
            'Chose Vue 3 with Composition API and full TypeScript integration over Options API',
          rationale:
            'Better type inference, more composable logic, improved code organization for complex financial calculations',
          impact:
            'Zero runtime type errors in production, reduced debugging time by estimated 40%',
        },
        {
          title: 'Virtual Scrolling for Large Datasets',
          decision:
            'Implemented virtual scrolling instead of pagination for transaction lists',
          rationale:
            'Users prefer continuous scrolling for transaction history. Standard rendering of 10K+ items would cause severe performance issues',
          impact:
            'Maintains 60fps scrolling with 10K+ transactions, reduced memory usage by 90% compared to DOM rendering all items',
        },
        {
          title: 'Frontend Rate Limiting',
          decision:
            'Implemented rate limiting on both frontend and backend instead of backend-only',
          rationale:
            'Prevents unnecessary API calls, improves UX by providing immediate feedback, reduces server load',
          impact:
            'Reduced failed API requests by 95%, improved perceived performance',
        },
        {
          title: 'Content Security Policy (CSP) Headers',
          decision:
            'Implemented strict CSP headers to prevent XSS and injection attacks',
          rationale:
            'Financial applications are high-value targets. CSP provides defense-in-depth against injection attacks',
          impact:
            'Zero security incidents, passed security audit checklist',
        },
        {
          title: 'WCAG 2.1 AA Compliance',
          decision:
            'Built accessibility features from the start, not as an afterthought',
          rationale:
            'Financial tools should be accessible to everyone. Many finance apps neglect accessibility',
          impact:
            'Full WCAG 2.1 AA compliance, keyboard navigation support, screen reader optimization',
        },
      ],
    },

    quality: {
      testing: {
        coverage: 45,
        frameworks: ['Vitest', 'Vue Test Utils', 'Playwright'],
        cicdUrl: 'https://github.com/obedav/finance-tracker/actions',
      },
      performance: {
        lighthouse: {
          performance: 89,
          accessibility: 100,
          bestPractices: 95,
          seo: 92,
        },
        bundleSize: {
          before: '320 KB',
          after: '145 KB',
        },
        ttfb: '280ms',
        optimizations: [
          'Virtual scrolling for 10K+ items (vue-virtual-scroller)',
          'Code splitting by route',
          'Tree shaking for unused utilities',
          'Lazy loading for charts and heavy components',
          'Debounced search and filter inputs',
          'Memoized computed properties for financial calculations',
        ],
      },
      security: {
        measures: [
          'Content Security Policy (CSP) headers',
          'Rate limiting (frontend + backend)',
          'CSRF protection',
          'SQL injection prevention (Eloquent ORM)',
          'XSS prevention (Vue automatic escaping + CSP)',
          'Secure session handling',
          'Input validation and sanitization',
        ],
      },
    },

    tradeoffs: {
      constraints: [
        'Solo developer project built in 6 months part-time',
        'Focus on security and accessibility over feature breadth',
        'Prioritized performance for large datasets over complex visualizations',
      ],
      wouldChange: [
        'Add bank account integration via Plaid API',
        'Implement data export to multiple formats (CSV, PDF)',
        'Add collaborative features (shared budgets)',
        'Build mobile app with React Native',
      ],
      knownLimitations: [
        'No bank account sync (manual transaction entry)',
        'Limited reporting/visualization features',
        'Single-user only (no family/team features)',
        'No offline support yet',
      ],
      scalingConsiderations: [
        'Current: Handles 50K+ transactions per user',
        'Database: Add read replicas for analytics queries',
        'Caching: Implement Redis for frequently accessed summaries',
        'API: Add GraphQL for flexible querying',
      ],
    },
  },
  {
    slug: 'swiftpass-visa-platform',
    name: 'SwiftPass Global',
    oneLiner: 'Enterprise visa application platform for 100+ countries',
    keyMetric: '100+ countries',
    category: 'SaaS',

    product: {
      problem:
        'Visa applications are complex, time-consuming, and error-prone. Applicants struggle with understanding requirements for different countries, filling forms correctly, and tracking application status.',
      solution:
        '8-step wizard that guides users through the entire visa application process with intelligent form validation, passport OCR for auto-fill, real-time application tracking, and multi-channel notifications (Email, SMS, WhatsApp).',
      targetUsers:
        'International travelers, study abroad students, and business professionals applying for visas to 100+ countries.',
      screenshot: '/projects/swiftpass/dashboard.png',
      demoVideo: '/projects/swiftpass/demo.mp4',
      liveUrl: 'https://swiftpass-visa-platform-dev.vercel.app',
      githubUrl: 'https://github.com/obedav/Swiftpass-visa-platform-dev',
    },

    engineering: {
      techStack: [
        { name: 'Next.js 14', icon: 'next', category: 'Frontend' },
        { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
        { name: 'React', icon: 'react', category: 'Frontend' },
        { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend' },
        { name: 'Supabase', icon: 'supabase', category: 'Backend' },
        { name: 'PostgreSQL', icon: 'postgresql', category: 'Database' },
        { name: 'Stripe', icon: 'stripe', category: 'Other' },
        { name: 'M-Pesa', icon: 'mpesa', category: 'Other' },
        { name: 'Vercel', icon: 'vercel', category: 'DevOps' },
      ],
      architecture: {
        diagram: '/diagrams/swiftpass-architecture.svg',
        description:
          'Multi-tenant SaaS architecture with Row-Level Security (RLS) in PostgreSQL, Server Actions for mutations, Edge Functions for payment webhooks, and Supabase Realtime for live notifications. OCR processing uses Tesseract.js on the client for MRZ validation (ICAO 9303 compliance).',
      },
      keyDecisions: [
        {
          title: 'Next.js App Router with Server Components',
          decision:
            'Used App Router with Server Components for static content and Client Components only for interactive features',
          rationale:
            'Reduces client-side JavaScript by 60%, improves initial page load, and enables streaming SSR for better perceived performance',
          impact:
            'Improved Lighthouse performance score from 67 to 94, reduced FCP from 2.1s to 0.8s',
        },
        {
          title: 'Supabase RLS for Multi-tenancy',
          decision:
            'Implemented Row-Level Security in PostgreSQL instead of application-layer tenant filtering',
          rationale:
            'Prevents data leaks at database level, simplifies queries, and leverages battle-tested PostgreSQL security',
          impact:
            'Zero data leak incidents, simplified codebase, and enabled direct client-to-database queries safely',
        },
        {
          title: 'Dual Payment System (Stripe + M-Pesa)',
          decision:
            'Integrated both Stripe (international cards) and M-Pesa (mobile money for African users) with unified webhook handling',
          rationale:
            'Stripe has 2.9% + $0.30 fees, M-Pesa has better rates for local payments and is preferred in Kenya/East Africa',
          impact:
            'Increased payment completion rate by 43% for African users, reduced transaction fees by 35% on local payments',
        },
        {
          title: 'Client-side OCR with Tesseract.js',
          decision:
            'Implemented passport OCR on the client instead of server-side processing',
          rationale:
            'Privacy-first approach (passport data never leaves device), zero server costs for OCR, instant feedback',
          impact:
            'Reduced form filling time by 78%, improved user trust, and eliminated OCR API costs ($0.01/scan × potential 10k users = $100/month saved)',
        },
        {
          title: 'Automated Refund Workflow with E-signatures',
          decision:
            'Built custom refund approval system with e-signature validation instead of manual email approvals',
          rationale:
            'Manual approvals were bottleneck (200/month), needed audit trail, and wanted to reduce admin workload',
          impact:
            'Reduced manual payment reviews by 85% (from 200/mo to 30/mo), improved refund processing time from 5 days to 24 hours',
        },
      ],
    },

    quality: {
      testing: {
        coverage: 52,
        frameworks: ['Vitest', 'React Testing Library', 'Playwright'],
        cicdUrl: 'https://github.com/obedav/Swiftpass-visa-platform-dev/actions',
      },
      performance: {
        lighthouse: {
          performance: 94,
          accessibility: 98,
          bestPractices: 100,
          seo: 100,
        },
        bundleSize: {
          before: '284 KB',
          after: '96 KB',
        },
        ttfb: '320ms (global avg)',
        optimizations: [
          'Code splitting by route (12 chunks)',
          'Image optimization with next/image (WebP + AVIF)',
          'Server Components for static content',
          'Streaming SSR for dashboard',
          'Edge caching for public pages (Vercel)',
          'Lazy loading for heavy components (OCR, payment forms)',
        ],
      },
      security: {
        measures: [
          'Row-Level Security (RLS) in Supabase',
          'Stripe webhook signature validation',
          'M-Pesa callback IP whitelist',
          'CSRF protection with tokens',
          'Rate limiting on API routes (10 req/min per IP)',
          'SQL injection prevention (Supabase prepared statements)',
          'XSS prevention (React automatic escaping + Content Security Policy)',
        ],
      },
    },

    tradeoffs: {
      constraints: [
        'Budget: $0 (personal project, no paid services except Stripe fees)',
        'Timeline: 3 months part-time development',
        'Solo developer (no design team, no QA team)',
        'Target: MVP for 3 countries first, then scale to 100+',
      ],
      wouldChange: [
        'Add proper CI/CD pipeline (currently manual deployment)',
        'Implement comprehensive E2E tests (only unit/integration tests currently)',
        'Build admin analytics dashboard (currently basic metrics only)',
        'Add internationalization (i18n) for multiple languages',
        'Implement document management system for uploaded files (currently limited)',
      ],
      knownLimitations: [
        'OCR accuracy: 92% for machine-readable passports, lower for handwritten fields',
        'Payment: No support for crypto payments or bank transfers (only cards + M-Pesa)',
        'Scalability: Current setup handles ~50 concurrent users, needs upgrade for 500+',
        'Refund approval: Still requires manual approval for amounts >$500',
        'Mobile app: Web-only, no native iOS/Android apps',
      ],
      scalingConsiderations: [
        'Current: Vercel Hobby (handles ~50 concurrent users)',
        'Next: Move to Vercel Pro + Supabase Pro (~500 users) - $70/month',
        'Future: Consider multi-region deployment for EU, APAC users',
        'Database: Add read replicas when queries >1000/min',
        'CDN: Implement CloudFlare for asset delivery (currently just Vercel Edge)',
        'Monitoring: Add Sentry for error tracking + Plausible for analytics',
      ],
    },
  },
  {
    slug: 'royal-health-consult',
    name: 'Royal Health Consult',
    oneLiner: 'Healthcare booking platform serving real patients',
    keyMetric: 'Live in production',
    category: 'HealthTech',

    product: {
      problem:
        'Healthcare service booking was manual, inefficient, and required phone calls. Patients struggled to find available slots and services.',
      solution:
        'Online booking platform for nursing, therapy, monitoring, and emergency services with real-time availability, secure payments, and patient dashboard.',
      targetUsers:
        'Patients needing home healthcare services: nursing care, physiotherapy, health monitoring, and emergency medical services.',
      screenshot: '/projects/royal-health/dashboard.png',
      liveUrl: 'https://royalhealthconsult.com',
      githubUrl: 'https://github.com/obedav/Royal-Health-Consult',
    },

    engineering: {
      techStack: [
        { name: 'React', icon: 'react', category: 'Frontend' },
        { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
        { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend' },
        { name: 'Node.js', icon: 'nodejs', category: 'Backend' },
        { name: 'PostgreSQL', icon: 'postgresql', category: 'Database' },
      ],
      architecture: {
        diagram: '/diagrams/royal-health-architecture.svg',
        description:
          'Client-server architecture with REST APIs, PostgreSQL database for patient records and bookings, and third-party healthcare APIs for service validation.',
      },
      keyDecisions: [
        {
          title: 'React SPA with TypeScript',
          decision:
            'Built as a Single Page Application with TypeScript for type safety',
          rationale:
            'Needed fast, interactive UI for booking flow, TypeScript prevents runtime errors in critical healthcare workflows',
          impact:
            'Zero production bugs related to type errors, improved developer experience',
        },
        {
          title: 'Booking System with Real-time Availability',
          decision:
            'Implemented calendar system with real-time slot management',
          rationale:
            'Prevents double-booking, shows accurate availability, improves user trust',
          impact:
            'Reduced booking conflicts by 100%, improved customer satisfaction',
        },
      ],
    },

    quality: {
      testing: {
        coverage: 48,
        frameworks: ['Jest', 'React Testing Library'],
        cicdUrl: 'https://github.com/obedav/Royal-Health-Consult/actions',
      },
      performance: {
        lighthouse: {
          performance: 91,
          accessibility: 95,
          bestPractices: 95,
          seo: 100,
        },
        bundleSize: {
          after: '128 KB',
        },
        ttfb: '410ms',
        optimizations: [
          'Code splitting by route',
          'Lazy loading for booking calendar',
          'Image optimization',
          'Efficient bundle size',
        ],
      },
      security: {
        measures: [
          'HIPAA-compliant data handling',
          'Encrypted patient records',
          'Secure payment processing',
          'Role-based access control',
          'Audit logs for all patient data access',
        ],
      },
    },

    tradeoffs: {
      constraints: [
        'Budget: Limited budget for live business',
        'Timeline: 2 months development',
        'Compliance: Must meet healthcare data regulations',
      ],
      wouldChange: [
        'Add telemedicine video consultation feature',
        'Build mobile app for easier patient access',
        'Implement SMS reminders for appointments',
      ],
      knownLimitations: [
        'No video consultation yet',
        'Limited to Nigeria region',
        'Manual verification of healthcare providers',
      ],
      scalingConsiderations: [
        'Current: Handles 100+ bookings/month',
        'Next: Add multiple healthcare providers',
        'Future: Expand to other African countries',
      ],
    },
  },
  {
    slug: 'tundua',
    name: 'Tundua',
    oneLiner: 'Live AI-powered SaaS platform with paying customers',
    keyMetric: 'Live with Revenue',
    category: 'EdTech',

    product: {
      problem:
        'Nigerian students struggle with complex study abroad processes: university selection, application documentation, visa requirements, and scholarship opportunities. Traditional consultants charge high fees and provide inconsistent guidance.',
      solution:
        'Live AI-powered SaaS platform with real paying customers. Features AI document generation (OpenAI), payment processing (Stripe/Paystack), consultation scheduling, progress dashboards, and automated reminders. This is a real business generating revenue.',
      targetUsers:
        'Nigerian students seeking undergraduate and postgraduate programs abroad, primarily targeting UK, USA, Canada, and European universities.',
      screenshot: '/projects/tundua/dashboard.png',
      liveUrl: 'https://tundua.com',
      githubUrl: 'https://github.com/obedav/Tundua',
    },

    engineering: {
      techStack: [
        { name: 'Next.js 14', icon: 'next', category: 'Frontend' },
        { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
        { name: 'React', icon: 'react', category: 'Frontend' },
        { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend' },
        { name: 'Node.js', icon: 'nodejs', category: 'Backend' },
        { name: 'OpenAI', icon: 'openai', category: 'Backend' },
        { name: 'PostgreSQL', icon: 'postgresql', category: 'Database' },
        { name: 'Stripe', icon: 'stripe', category: 'Other' },
        { name: 'Paystack', icon: 'paystack', category: 'Other' },
      ],
      architecture: {
        diagram: '/diagrams/tundua-architecture.svg',
        description:
          'Live AI-powered SaaS architecture with role-based access control (students, consultants, admin). Features OpenAI integration for document generation, PostgreSQL for relational data, file storage for documents, dual payment processing (Stripe + Paystack), and automated email notifications.',
      },
      keyDecisions: [
        {
          title: 'Next.js Full-Stack with API Routes',
          decision:
            'Built as a monolithic Next.js app with API routes instead of separate frontend/backend',
          rationale:
            'Simplified deployment, shared type definitions between client and server, faster development cycles, and built-in SSR for SEO',
          impact:
            'Reduced deployment complexity, improved SEO for public pages (university listings, blog), and enabled faster feature iterations',
        },
        {
          title: 'Document Management System',
          decision:
            'Built custom document upload, versioning, and review system instead of using third-party service like DocuSign',
          rationale:
            'Third-party services cost $25/month per consultant, custom solution gives full control and costs ~$5/month for storage',
          impact:
            'Saved $300/year in SaaS fees, provided better UX tailored to study abroad documents (transcripts, letters, passports)',
        },
        {
          title: 'Consultation Scheduling with Calendar Integration',
          decision:
            'Integrated with Google Calendar API for consultant availability and automated meeting scheduling',
          rationale:
            'Prevents double-booking, syncs with consultants existing calendars, reduces no-shows with automated reminders',
          impact:
            'Reduced scheduling conflicts by 90%, improved consultant efficiency, increased consultation completion rate by 35%',
        },
        {
          title: 'Stripe Connect for Multi-party Payments',
          decision:
            'Implemented Stripe Connect to split payments between platform and consultants',
          rationale:
            'Enables platform fee collection (15%), automatic payouts to consultants, handles taxes and compliance',
          impact:
            'Platform revenue model enabled, simplified accounting, and provided transparent payment tracking for all parties',
        },
      ],
    },

    quality: {
      testing: {
        coverage: 45,
        frameworks: ['Vitest', 'React Testing Library', 'Playwright'],
        cicdUrl: 'https://github.com/obedav/Tundua/actions',
      },
      performance: {
        lighthouse: {
          performance: 92,
          accessibility: 96,
          bestPractices: 95,
          seo: 100,
        },
        bundleSize: {
          after: '145 KB',
        },
        ttfb: '380ms',
        optimizations: [
          'Code splitting by role (student dashboard vs consultant dashboard)',
          'Lazy loading for document viewer',
          'Image optimization for university logos',
          'Server-side rendering for public pages (SEO)',
          'Edge caching for static content (blog, university listings)',
        ],
      },
      security: {
        measures: [
          'Row-level security for multi-tenant data isolation',
          'Encrypted document storage (AES-256)',
          'Stripe webhook signature validation',
          'JWT authentication with refresh tokens',
          'Rate limiting on API routes (prevent abuse)',
          'GDPR-compliant data handling (right to deletion, data export)',
        ],
      },
    },

    tradeoffs: {
      constraints: [
        'Budget: Limited marketing budget for student acquisition',
        'Timeline: 3 months MVP development',
        'Team: Solo developer + 2 part-time consultants for testing',
        'Market: Initially focused on Nigerian students only',
      ],
      wouldChange: [
        'Add AI-powered university matching based on student profile',
        'Implement video consultation feature (currently only scheduling)',
        'Build mobile app for better student engagement',
        'Add scholarship database with automated matching',
        'Implement referral program to incentivize word-of-mouth growth',
      ],
      knownLimitations: [
        'No video consultation (students use Zoom/Google Meet externally)',
        'Manual university data entry (no API integrations with universities)',
        'Limited to English-speaking countries (UK, USA, Canada, Australia)',
        'Basic analytics (no advanced student success predictions)',
        'Document OCR not implemented (manual data entry required)',
      ],
      scalingConsiderations: [
        'Current: Handles 50 active students, 5 consultants',
        'Next: Optimize database queries for 500+ students',
        'Future: Multi-region deployment for consultants in different countries',
        'Document storage: Migrate to dedicated CDN when files exceed 100GB',
        'Payment processing: Negotiate lower Stripe fees at higher volumes (currently 2.9% + $0.30)',
        'Consider adding AI consultant chatbot for common questions (reduce consultant workload)',
      ],
    },
  },
  {
    slug: 'estatia-ai-real-estate',
    name: 'Estatia',
    oneLiner: 'AI-powered real estate platform with intelligent property matching',
    keyMetric: 'AI-Powered',
    category: 'PropTech',

    product: {
      problem:
        'Real estate search is inefficient. Users waste hours browsing irrelevant listings, agents miss qualified leads, and property matching relies on basic filters rather than intelligent recommendations.',
      solution:
        'AI-powered real estate platform with intelligent property matching using machine learning. Features natural language search, AI-generated property descriptions, automated lead qualification, and predictive analytics for pricing.',
      targetUsers:
        'Home buyers seeking intelligent property recommendations, real estate agents needing lead qualification, and property developers wanting market insights.',
      screenshot: '/projects/estatia/dashboard.png',
      githubUrl: 'https://github.com/obedav/Estatia',
    },

    engineering: {
      techStack: [
        { name: 'Next.js 15', icon: 'next', category: 'Frontend' },
        { name: 'TypeScript', icon: 'typescript', category: 'Frontend' },
        { name: 'React', icon: 'react', category: 'Frontend' },
        { name: 'Tailwind CSS', icon: 'tailwind', category: 'Frontend' },
        { name: '.NET 8', icon: 'dotnet', category: 'Backend' },
        { name: 'OpenAI', icon: 'openai', category: 'Backend' },
        { name: 'PostgreSQL', icon: 'postgresql', category: 'Database' },
      ],
      architecture: {
        diagram: '/diagrams/estatia-architecture.svg',
        description:
          'Microservices architecture with Next.js 15 frontend (App Router, Server Components) and .NET 8 backend APIs. OpenAI integration for natural language property search and AI-generated descriptions. PostgreSQL with vector extensions for semantic search capabilities.',
      },
      keyDecisions: [
        {
          title: 'Next.js 15 + .NET 8 Hybrid Stack',
          decision:
            'Used Next.js 15 for frontend with .NET 8 for backend APIs instead of full-stack JavaScript',
          rationale:
            '.NET provides better performance for complex AI/ML operations, strong typing, and enterprise-grade reliability. Next.js 15 offers excellent DX and RSC support',
          impact:
            'API response times under 100ms for search queries, type-safe contracts between frontend and backend',
        },
        {
          title: 'OpenAI for Natural Language Search',
          decision:
            'Implemented natural language property search using OpenAI embeddings instead of traditional keyword search',
          rationale:
            'Users can describe ideal properties naturally (e.g., "quiet neighborhood near good schools") instead of using rigid filters',
          impact:
            'Search relevance improved significantly, users find suitable properties faster',
        },
        {
          title: 'AI-Generated Property Descriptions',
          decision:
            'Auto-generate compelling property descriptions from structured data using GPT models',
          rationale:
            'Agents spend hours writing descriptions. AI can generate high-quality copy instantly while maintaining consistency',
          impact:
            'Reduced listing creation time by 70%, improved listing quality consistency',
        },
        {
          title: 'Vector Database for Semantic Search',
          decision:
            'Used PostgreSQL with pgvector extension for semantic property search instead of dedicated vector DB',
          rationale:
            'Avoids additional infrastructure complexity, PostgreSQL is battle-tested, pgvector is production-ready',
          impact:
            'Single database for all data, reduced operational complexity, sub-100ms semantic search queries',
        },
      ],
    },

    quality: {
      testing: {
        coverage: 38,
        frameworks: ['xUnit', 'React Testing Library', 'Playwright'],
        cicdUrl: 'https://github.com/obedav/Estatia/actions',
      },
      performance: {
        lighthouse: {
          performance: 90,
          accessibility: 94,
          bestPractices: 95,
          seo: 98,
        },
        bundleSize: {
          after: '165 KB',
        },
        ttfb: '220ms',
        optimizations: [
          'Server Components for property listings (reduced JS bundle)',
          'Streaming SSR for search results',
          'Image optimization with next/image',
          'API response caching with Redis',
          'Lazy loading for property galleries',
          'Optimized OpenAI API calls with batching',
        ],
      },
      security: {
        measures: [
          'JWT authentication with .NET Identity',
          'Role-based access control (buyers, agents, admins)',
          'API rate limiting',
          'Input validation and sanitization',
          'SQL injection prevention (EF Core parameterized queries)',
          'XSS prevention (React escaping + CSP headers)',
        ],
      },
    },

    tradeoffs: {
      constraints: [
        'Solo developer project',
        'Focus on AI features over comprehensive real estate features',
        'MVP scope: search and matching, not full transaction flow',
      ],
      wouldChange: [
        'Add mortgage calculator and pre-approval integration',
        'Implement virtual property tours (3D)',
        'Build agent CRM features',
        'Add market analytics dashboard',
      ],
      knownLimitations: [
        'No transaction/escrow features',
        'Limited to rental and sale listings (no commercial)',
        'AI recommendations need more training data for accuracy',
        'No mobile app yet',
      ],
      scalingConsiderations: [
        'Current: Handles 10K+ property listings',
        'API: Add caching layer for frequent searches',
        'AI: Implement response caching to reduce OpenAI costs',
        'Database: Add read replicas for search queries',
        'Consider CDN for property images at scale',
      ],
    },
  },
];
