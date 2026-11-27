export type ProjectCategory =
  | "Professional Experience"
  | "Independent Development";

export type TechCategory =
  | "Backend"
  | "Database"
  | "Security"
  | "Cloud"
  | "Testing"
  | "Architecture"
  | "Tools"
  | "Frontend";

export interface TechItem {
  name: string;
  category: TechCategory;
}

export interface BaseSection {
  id: string;
  sectionNumber: string;
  title: string;
}

export interface OverviewSection extends BaseSection {
  type: "overview";
  problemStatement: string;
  objectives: string[];
}

export interface ArchitectureComponent {
  name: string;
  role: string;
  portOrLayer?: string;
}

export interface ArchitectureFlowStep {
  step: string;
  title: string;
  description: string;
}

export interface ArchitectureSection extends BaseSection {
  type: "architecture";
  summary: string;
  components?: ArchitectureComponent[];
  flowSteps?: ArchitectureFlowStep[];
}

export interface ContributionItem {
  title: string;
  description: string;
  tags?: string[];
}

export interface ContributionsSection extends BaseSection {
  type: "contributions";
  items: ContributionItem[];
}

export interface ChallengeItem {
  challenge: string;
  solution: string;
  context?: string;
}

export interface ChallengesSolutionsSection extends BaseSection {
  type: "challenges-solutions";
  items: ChallengeItem[];
}

export interface CodeExampleSection extends BaseSection {
  type: "code-example";
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface KeyFeatureItem {
  title: string;
  description: string;
}

export interface KeyFeaturesSection extends BaseSection {
  type: "key-features";
  features: KeyFeatureItem[];
}

export interface ResultsSection extends BaseSection {
  type: "results";
  bulletPoints: string[];
  takeaways?: string[];
}

export interface FeaturedShowcaseItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  roleBadge: string;
  description: string;
  artworkSrc: string;
  artworkType: "promotional-mockup";
  deviceMeta: string;
  width: number;
  height: number;
  techTags: string[];
}

export type GalleryCategory =
  | "All"
  | "Customer"
  | "Admin"
  | "Purohit"
  | "Authentication"
  | "Services";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export interface GalleryScreenshot {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "Customer" | "Admin" | "Purohit" | "Authentication" | "Services";
  src: string;
  pngSrc?: string;
  originalSrc?: string;
  width: number;
  height: number;
  availableDevices?: DeviceMode[];
  deviceCaptures?: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
  };
  techHighlights?: string[];
  notes?: string;
}

export interface GallerySection extends BaseSection {
  type: "gallery";
  eyebrow?: string;
  subtitle?: string;
  description?: string;
  featuredShowcase: FeaturedShowcaseItem[];
  screenshots?: GalleryScreenshot[];
}

export type CaseStudySection =
  | OverviewSection
  | ArchitectureSection
  | ContributionsSection
  | ChallengesSolutionsSection
  | CodeExampleSection
  | KeyFeaturesSection
  | ResultsSection
  | GallerySection;

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription?: string;
  category: ProjectCategory;
  role: string;
  organization?: string;
  organizationLogo?: string;
  duration?: string;
  featured: boolean;
  published: boolean;
  order: number;
  techStack: TechItem[];
  technologies?: string[];
  responsibilities?: string[];
  challenges?: string[];
  solutions?: string[];
  architecture?: string;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: string;
  coverImage?: string;
  coverImageAlt?: string;
  gallery?: string[];
  sections: CaseStudySection[];
}
