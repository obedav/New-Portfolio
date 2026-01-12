export interface Project {
  // Basic Info
  slug: string;
  name: string;
  oneLiner: string;
  keyMetric: string;
  category: 'SaaS' | 'HealthTech' | 'EdTech' | 'FinTech' | 'PropTech';

  // Layer 1: Product
  product: {
    problem: string;
    solution: string;
    targetUsers: string;
    screenshot: string;
    demoVideo?: string;
    liveUrl?: string;
    githubUrl: string;
  };

  // Layer 2: Engineering
  engineering: {
    techStack: TechStackItem[];
    architecture: {
      diagram: string; // SVG path
      description: string;
    };
    keyDecisions: EngineeringDecision[];
  };

  // Layer 3: Quality & Performance
  quality: {
    testing: {
      coverage: number;
      frameworks: string[];
      cicdUrl: string;
    };
    performance: {
      lighthouse: LighthouseScores;
      bundleSize: {
        before?: string;
        after: string;
      };
      ttfb: string;
      optimizations: string[];
    };
    security: {
      measures: string[];
    };
  };

  // Layer 4: Trade-offs
  tradeoffs: {
    constraints: string[];
    wouldChange: string[];
    knownLimitations: string[];
    scalingConsiderations: string[];
  };
}

export interface TechStackItem {
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Other';
}

export interface EngineeringDecision {
  title: string;
  decision: string;
  rationale: string;
  impact?: string;
}

export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export type UnfoldState = 'closed' | 'layer1' | 'layer2' | 'layer3' | 'layer4';
