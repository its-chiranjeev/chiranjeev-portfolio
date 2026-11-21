import { SkillCategory } from "@/types/skill";

export const skillsData: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages used for backend logic and application development",
    skills: [
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "Java", level: "Proficient" },
    ],
  },
  {
    id: "backend",
    title: "Backend Frameworks & Runtimes",
    description: "Server-side architectures, API design, and asynchronous event processing",
    skills: [
      { name: "Node.js", level: "Core" },
      { name: "NestJS", level: "Core" },
      { name: "Express.js", level: "Core" },
      { name: "REST APIs", level: "Core" },
      { name: "Socket.IO", level: "Proficient" },
      { name: "Webhooks", level: "Proficient" },
    ],
  },
  {
    id: "databases",
    title: "Databases & ORM",
    description: "Relational modeling, migrations, query optimization, and storage",
    skills: [
      { name: "PostgreSQL", level: "Core" },
      { name: "TypeORM", level: "Core" },
      { name: "MySQL", level: "Proficient" },
      { name: "MongoDB", level: "Proficient" },
      { name: "Supabase", level: "Proficient" },
    ],
  },
  {
    id: "security",
    title: "Security & Access Governance",
    description: "Stateless authentication, session validation, and request protection",
    skills: [
      { name: "JWT Authentication", level: "Core" },
      { name: "Role-Based Access Control (RBAC)", level: "Core" },
      { name: "CSRF Protection", level: "Core" },
      { name: "Helmet Security Headers", level: "Core" },
      { name: "Rate Limiting (@nestjs/throttler)", level: "Core" },
    ],
  },
  {
    id: "integrations",
    title: "Cloud & Payment Integrations",
    description: "Financial transactions, payout reconciliation, and cloud object storage",
    skills: [
      { name: "Razorpay Payment Links & Checkout", level: "Proficient" },
      { name: "RazorpayX Automated Payouts", level: "Proficient" },
      { name: "AWS S3 & Presigned URLs", level: "Proficient" },
      { name: "Puppeteer PDF Generation", level: "Proficient" },
    ],
  },
  {
    id: "testing",
    title: "Testing, Validation & API Tooling",
    description: "Automated test suites, schema validation, and contract documentation",
    skills: [
      { name: "Jest", level: "Proficient" },
      { name: "Supertest", level: "Proficient" },
      { name: "class-validator & class-transformer", level: "Core" },
      { name: "Joi", level: "Proficient" },
      { name: "Swagger / OpenAPI", level: "Core" },
      { name: "Postman", level: "Core" },
    ],
  },
  {
    id: "tools",
    title: "Frontend & Development Tools",
    description: "Supporting web interfaces, version control, and database management",
    skills: [
      { name: "React", level: "Familiar" },
      { name: "HTML5 & CSS3", level: "Proficient" },
      { name: "Git & GitHub", level: "Core" },
      { name: "VS Code", level: "Core" },
      { name: "DBGate", level: "Proficient" },
    ],
  },
];
