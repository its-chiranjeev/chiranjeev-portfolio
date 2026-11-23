import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Chiranjeev Rastogi",
  title: "Node.js Backend Developer",
  tagline: "Building resilient REST APIs, transactional workflows, and modular backend architectures.",
  description:
    "Portfolio of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, TypeORM, and secure API system design.",
  location: "Ghaziabad, Uttar Pradesh, India",
  email: "chiranjeevrastogi@gmail.com",
  phone: "+91 8468801711",
  socials: {
    github: "https://github.com/its-chiranjeev",
    linkedin: "https://linkedin.com/in/chiranjeev-rastogi",
    email: "mailto:chiranjeevrastogi@gmail.com",
    x: "https://x.com/chiranjeev846",
    instagram: "https://www.instagram.com/its.chiranjeev/",
    leetcode: "https://leetcode.com/u/its_chiranjeev11/",
  },
  navLinks: [
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/portfolio#about" },
    { label: "Skills", href: "/portfolio#skills" },
    { label: "Experience", href: "/portfolio#experience" },
    { label: "Projects", href: "/portfolio#projects" },
    { label: "Education", href: "/portfolio#education" },
    { label: "Contact", href: "/portfolio#contact" },
  ],
};
