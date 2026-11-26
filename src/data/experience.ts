import { ExperienceItem } from "@/types/experience";

export const CERTIFICATE_ASSETS = {
  DIGIXITO_INTERNSHIP: "/certificates/Chiranjeev-Rastogi-Digixito-Internship-Certificate.pdf",
} as const;

export const experienceData: ExperienceItem[] = [
  {
    id: "digixito-media-intern",
    role: "Node.js Backend Developer Intern",
    company: "Digixito Media Pvt. Ltd.",
    logo: "/images/companies/digixito.png",
    employmentType: "Internship",
    location: "Noida, India (On-site)",
    period: "May 2026 — Nov 2026 (6 mos)",
    current: false,
    certificate: {
      title: "Internship Completion Certificate",
      issuer: "Digixito Media Pvt. Ltd.",
      fileUrl: CERTIFICATE_ASSETS.DIGIXITO_INTERNSHIP,
      downloadName: "Chiranjeev-Rastogi-Digixito-Internship-Certificate.pdf",
    },
    summary:
      "Contributed individual backend engineering across production-oriented client applications, building modular REST APIs, multi-role authentication systems, transactional booking lifecycles, and third-party payment workflows.",
    highlights: [
      "Engineered modular REST endpoints for Poojawala and HiChandra using NestJS, TypeScript, PostgreSQL, and TypeORM.",
      "Implemented stateless JWT authentication paired with Role-Based Access Control (RBAC) governing Customer, Service Provider, and Admin permissions.",
      "Developed end-to-end transactional booking flows including service availability checks, paginated queries, search filtering, and DTO validation.",
      "Integrated Razorpay payment link generation and automated HMAC-SHA256 webhook reconciliation for order and booking state transitions.",
      "Built automated PDF invoice rendering with headless Puppeteer and integrated AWS S3 presigned URL uploads for secure KYC document handling.",
      "Collaborated on API contracts, documenting endpoints with Swagger/OpenAPI and verifying request-response payloads with Postman.",
    ],
    technologies: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "RBAC",
      "Razorpay",
      "RazorpayX",
      "AWS S3",
      "Puppeteer",
      "Swagger",
    ],
  },
  {
    id: "independent-backend-dev",
    role: "Software Engineer (Independent Development)",
    company: "Independent Projects",
    employmentType: "Independent",
    location: "Ghaziabad, India",
    period: "2024 — Present",
    current: true,
    summary:
      "Engineering full-stack web applications, distributed APIs, and database schemas with TypeScript, Next.js, and modern NestJS ecosystems.",
    highlights: [
      "Architected and open-sourced production-ready REST services with NestJS, PostgreSQL, TypeORM, and automated schema migrations.",
      "Implemented automated test pipelines using Jest for unit test coverage and Supertest for HTTP endpoint verification.",
      "Applied defensive API design patterns: rate limiting with @nestjs/throttler, Helmet security headers, CORS controls, and strict DTO schema validation.",
      "Maintained complete API documentation via Swagger/OpenAPI with interactive sandbox testing.",
    ],
    technologies: [
      "Next.js",
      "React",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
      "Jest",
      "Supertest",
      "class-validator",
      "Helmet",
      "Swagger",
      "Git",
    ],
  },
];
