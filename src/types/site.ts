export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  email: string;
  phone?: string;
  socials: SocialLinks;
  navLinks: NavLink[];
}
