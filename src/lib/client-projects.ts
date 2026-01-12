export interface ClientProject {
  name: string;
  industry: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  features: string[];
}

export const clientProjects: ClientProject[] = [
  {
    name: 'Eliban',
    industry: 'Music Education & Events',
    description:
      'Music learning platform with student authentication, course management, video streaming, and professional lighting services booking for events.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://www.eliban.org',
    features: [
      'Student authentication system',
      'Course booking & scheduling',
      'Video streaming integration',
      'Event lighting services',
      '200+ active students',
    ],
  },
  {
    name: 'Deusel Consult',
    industry: 'Sustainable Energy',
    description:
      'Energy consulting platform with interactive dashboards, performance metrics visualization, and booking system for sustainability services.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://www.deuselconsult.com',
    features: [
      'Energy metrics dashboard',
      'Interactive data charts',
      'Performance tracking (64 MW production)',
      'Consultation booking',
      'Client testimonials',
    ],
  },
  {
    name: 'MrCream Limited',
    industry: 'Food & Beverage',
    description:
      'Multi-product business website showcasing yoghurt drinks, water park services, and premium liqueurs with quote request functionality.',
    techStack: ['HTML', 'CSS', 'JavaScript', '.NET'],
    liveUrl: 'https://mrcreamlimited.com',
    features: [
      'Multi-product showcase',
      'Water park information',
      'Quote request system',
      'WhatsApp integration',
      'Partnership inquiries',
    ],
  },
  {
    name: 'StreetNG SL',
    industry: 'Luxury Lifestyle',
    description:
      'Multi-brand platform combining fine dining restaurant, bespoke tailoring, and real estate services under one cohesive brand.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
    liveUrl: 'https://streetngsl.com',
    features: [
      '3 businesses in 1 platform',
      'Restaurant (Street Tavern)',
      'Tailoring (Street Trendy)',
      'Real Estate (Street Realtors)',
      'Customer testimonials',
    ],
  },
  {
    name: 'Naocett Educational',
    industry: 'Education / Study Abroad',
    description:
      'Educational consultancy platform helping students pursue international education with application tracking and blog content.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://naocettedu.com',
    features: [
      'Study abroad programs',
      'University applications',
      'Blog & testimonials',
      '50+ nationalities served',
      '94% satisfaction rate',
    ],
  },
  {
    name: 'St. Patrick\'s Catholic Church',
    industry: 'Religious Community',
    description:
      'Full-featured church website with mass schedules, online donations, event calendar, sacramental services, and media gallery.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://stpatrickigbogilaipaja.com',
    features: [
      'Mass schedules',
      'Online donations',
      'Event calendar',
      'Sacramental services',
      'Photo gallery & podcasts',
    ],
  },
  {
    name: 'Shabach Ministries',
    industry: 'Religious Ministry',
    description:
      'Modern worship ministry website built with React and Tailwind CSS for a clean, responsive experience.',
    techStack: ['React', 'Vite', 'Tailwind CSS'],
    liveUrl: 'https://theshabachministries.org',
    features: [
      'Modern React architecture',
      'Responsive design',
      'Ministry information',
      'Contact integration',
    ],
  },
  {
    name: 'Eskal Eight Services',
    industry: 'Brand Management & Procurement',
    description:
      'Multi-service e-commerce platform for procurement, logistics, and brand management services.',
    techStack: ['JavaScript', 'React'],
    liveUrl: 'https://eskal-eight-services.vercel.app',
    features: [
      'E-commerce functionality',
      'Procurement services',
      'Brand management',
      'Logistics solutions',
    ],
  },
];
