import { ProjectCaseStudy } from "@/types/project";

export const projectsData: ProjectCaseStudy[] = [
  {
    slug: "poojawala",
    title: "Poojawala",
    tagline: "Multi-Role Devotional Services & Puja Booking Backend Platform",
    shortDescription:
      "A domain-driven backend system supporting offline ritual bookings, practitioner dispatch filtering, on-site OTP verification, and Razorpay payment workflows.",
    category: "Professional Experience",
    role: "Backend Developer Intern",
    organization: "Digixito Media Pvt. Ltd.",
    organizationLogo: "/images/companies/digixito.png",
    duration: "2026",
    featured: true,
    published: true,
    order: 1,
    githubUrl: "https://github.com/its-chiranjeev/poojawala",
    liveUrl: "https://1pooja.com/",
    thumbnail: "/images/projects/poojawala-cover.webp",
    coverImage: "/images/projects/poojawala-cover.webp",
    coverImageAlt:
      "Illustrated cover for Poojawala: a glowing traditional Indian temple with a diya in the foreground and floating booking calendar, payment card and booking-confirmation panels.",
    techStack: [
      { name: "NestJS", category: "Backend" },
      { name: "TypeScript", category: "Backend" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "TypeORM", category: "Database" },
      { name: "JWT & RBAC", category: "Security" },
      { name: "CSRF Guard", category: "Security" },
      { name: "Razorpay SDK", category: "Cloud" },
      { name: "Puppeteer", category: "Tools" },
      { name: "Socket.IO", category: "Backend" },
      { name: "Fast2SMS", category: "Cloud" },
      { name: "AWS S3", category: "Cloud" },
    ],
    sections: [
      {
        id: "poojawala-overview",
        sectionNumber: "01",
        title: "Platform Overview & Problem Statement",
        type: "overview",
        problemStatement:
          "Devotional ritual bookings traditionally rely on fragmented, unverified personal referrals without standard pricing, confirmed schedules, or secure payment channels. The platform required a structured backend to govern bookings, verify practitioners, and automate financial workflows across distinct customer, purohit, and administrative stakeholders.",
        objectives: [
          "Establish role-based access control governing Customer, Purohit, Astrologer, and Admin permissions.",
          "Build multi-stage booking workflows supporting both offline in-person ceremonies and online rituals.",
          "Implement location-based practitioner discovery with qualification and schedule conflict checks.",
          "Automate transaction tracking through Razorpay payment links and headless PDF tax invoice rendering.",
        ],
      },
      {
        id: "poojawala-architecture",
        sectionNumber: "02",
        title: "System Architecture & Gateway Topology",
        type: "architecture",
        summary:
          "The backend operates as a modular NestJS monorepo behind a unified Node.js reverse proxy gateway, coordinating dedicated domain microservices with shared database entities and WebSocket channels.",
        components: [
          {
            name: "Reverse Proxy Gateway",
            role: "Unified entry point routing HTTP requests, handling CORS preflight, and proxying WebSocket upgrades.",
            portOrLayer: "Port 3000",
          },
          {
            name: "Authentication Service",
            role: "Manages registration, dual-channel OTPs, JWT issuance, Google OAuth, and secure cookie storage.",
            portOrLayer: "Port 8010",
          },
          {
            name: "Core Domain & Booking Service",
            role: "Handles ritual catalog, service availability, booking state machine, and Socket.IO notification rooms.",
            portOrLayer: "Port 8011",
          },
          {
            name: "Payment & Invoicing Service",
            role: "Coordinates Razorpay payment links, HMAC-SHA256 webhook reconciliation, and Puppeteer PDF generation.",
            portOrLayer: "Port 8012",
          },
        ],
        flowSteps: [
          {
            step: "01",
            title: "Client Request Ingress",
            description: "Traffic enters via reverse proxy on port 3000; authentication and CSRF headers are validated.",
          },
          {
            step: "02",
            title: "Domain Routing",
            description: "Requests are dispatched to auth, booking, or payment microservices based on route patterns.",
          },
          {
            step: "03",
            title: "Real-time Notification",
            description: "Socket.IO gateway broadcasts booking assignment and status updates to subscribed client rooms.",
          },
        ],
      },
      {
        id: "poojawala-contributions",
        sectionNumber: "03",
        title: "Individual Backend Contributions",
        type: "contributions",
        items: [
          {
            title: "Role-Based Access Control (RBAC) & Guards",
            description:
              "Engineered stateless JWT authorization with role-restricted guards across Customer, Purohit, and Admin endpoints, enforcing double-submit CSRF cookie protection.",
            tags: ["JWT", "RBAC", "Guards", "Security"],
          },
          {
            title: "Purohit Assignment & Availability Query",
            description:
              "Built query workflows to identify candidate Purohits based on ritual qualifications, service radius matching, and active schedule conflict exclusion.",
            tags: ["TypeORM", "QueryBuilder", "Availability"],
          },
          {
            title: "On-Site Physical Arrival Verification",
            description:
              "Implemented ritual commencement verification via a secure 4-digit OTP ('startOtp') validated on-site upon the practitioner's physical arrival.",
            tags: ["OTP Verification", "Booking State"],
          },
          {
            title: "Booking Cancellation & Status Workflows",
            description:
              "Developed cancellation endpoints enforcing policy constraints, updating booking state machines, and emitting audit notifications.",
            tags: ["State Machine", "Lifecycle"],
          },
          {
            title: "Paginated Catalog & Search Filters",
            description:
              "Engineered paginated queries with multi-parameter filtering for service types, location boundaries, and date availability.",
            tags: ["Pagination", "Filtering", "PostgreSQL"],
          },
        ],
      },
      {
        id: "poojawala-features",
        sectionNumber: "04",
        title: "Key Functional Capabilities",
        type: "key-features",
        features: [
          {
            title: "Location-Based Service Validation",
            description: "Pre-registration validation confirming service availability by target city, state, and geographic radius.",
          },
          {
            title: "Razorpay Financial Reconciliation",
            description: "Payment link creation for token deposits and balance settlements with HMAC-SHA256 webhook confirmation.",
          },
          {
            title: "Automated Tax Invoicing",
            description: "Dynamic generation of GST-compliant PDF invoices using headless Puppeteer with S3 storage upload.",
          },
          {
            title: "Socket.IO Real-time Channels",
            description: "Live status event delivery notifying customers and practitioners of booking confirmations and schedule alerts.",
          },
        ],
      },
      {
        id: "poojawala-challenges",
        sectionNumber: "05",
        title: "Technical Challenges & Engineering Solutions",
        type: "challenges-solutions",
        items: [
          {
            challenge: "Preventing conflicting schedule overlaps during practitioner booking assignment.",
            solution:
              "Formulated composite SQL conditions in TypeORM checking existing active bookings within the requested time window plus required travel buffers.",
            context: "Scheduling Engine",
          },
          {
            challenge: "Ensuring idempotency during payment webhook processing under network retry bursts.",
            solution:
              "Stored incoming Razorpay event IDs and transaction tokens, executing updates inside database transactions to prevent double-crediting.",
            context: "Payment Gateway",
          },
        ],
      },
    ],
  },
  {
    slug: "hichandra",
    title: "HiChandra",
    tagline: "On-Demand Home Services Booking & Technician Dispatch Platform",
    shortDescription:
      "A modular backend platform managing on-demand technician bookings, radius-based dispatch, dynamic itemized pricing, and Razorpay/RazorpayX payment lifecycles.",
    category: "Professional Experience",
    role: "Backend Developer Intern",
    organization: "Digixito Media Pvt. Ltd.",
    organizationLogo: "/images/companies/digixito.png",
    duration: "2026",
    featured: true,
    published: true,
    order: 2,
    githubUrl: "https://github.com/its-chiranjeev/HiChandra",
    thumbnail: "/images/projects/hichandra-cover.webp",
    coverImage: "/images/projects/hichandra-cover.webp",
    coverImageAlt:
      "Illustrated cover for HiChandra: an isometric home with a dispatch route and location pin, a service technician, and floating booking, job-alert, invoice and security panels in green.",
    techStack: [
      { name: "NestJS", category: "Backend" },
      { name: "TypeScript", category: "Backend" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "TypeORM", category: "Database" },
      { name: "Socket.IO", category: "Backend" },
      { name: "Razorpay", category: "Cloud" },
      { name: "RazorpayX", category: "Cloud" },
      { name: "AWS S3", category: "Cloud" },
      { name: "Puppeteer", category: "Tools" },
      { name: "Twilio SMS", category: "Cloud" },
      { name: "bcryptjs", category: "Security" },
    ],
    sections: [
      {
        id: "hichandra-overview",
        sectionNumber: "01",
        title: "Project Scope & Domain Requirements",
        type: "overview",
        problemStatement:
          "Urban home service delivery demands fast technician dispatch, transparent multi-factor pricing, OTP-validated service commencement, and split financial flows between customer payments and contractor payouts.",
        objectives: [
          "Build an automated booking lifecycle with verified status progressions from pending to completion.",
          "Implement proximity-based technician matching utilizing spatial coordinates and operating radii.",
          "Engineer a dynamic pricing engine computing distance charges, emergency rates, and statutory taxes.",
          "Integrate customer payment links and contractor payout pipelines.",
        ],
      },
      {
        id: "hichandra-architecture",
        sectionNumber: "02",
        title: "Architecture & Service Topology",
        type: "architecture",
        summary:
          "HiChandra employs a dual-microservice monorepo coordinated by an HTTP reverse proxy gateway with shared database entities and real-time Socket.IO communication.",
        components: [
          {
            name: "Reverse Proxy (proxy.js)",
            role: "Public ingress listening on port 9000, routing API calls and forwarding WebSocket upgrades.",
            portOrLayer: "Port 9000",
          },
          {
            name: "Auth Service",
            role: "Manages technician/customer registration, OTP delivery, dual-token JWT sessions, and credential security.",
            portOrLayer: "Port 8000 / 5000",
          },
          {
            name: "User & Booking Service",
            role: "Coordinates service catalog, technician KYC, address geolocation, booking state transitions, and payouts.",
            portOrLayer: "Port 8001 / 5001",
          },
        ],
      },
      {
        id: "hichandra-contributions",
        sectionNumber: "03",
        title: "Individual Backend Contributions",
        type: "contributions",
        items: [
          {
            title: "Booking State Machine Implementation",
            description:
              "Engineered the full lifecycle state machine (PENDING -> ACCEPTED -> ENROUTE -> ARRIVED -> ONGOING -> COMPLETED), requiring two-factor OTP verification for job commencement and finish.",
            tags: ["State Machine", "Lifecycle", "TypeORM"],
          },
          {
            title: "Location-Based Technician Assignment",
            description:
              "Implemented geographic candidate discovery applying distance calculations against technician operating radii to match available specialists.",
            tags: ["Spatial Query", "Haversine", "Algorithms"],
          },
          {
            title: "Razorpay Customer Payments & RazorpayX Payouts",
            description:
              "Integrated Razorpay checkout links for upfront payments and configured administrative payout logging and settlement pipelines with RazorpayX.",
            tags: ["Razorpay", "RazorpayX", "FinTech"],
          },
          {
            title: "Automated Tax Invoice Generation",
            description:
              "Built an automated invoice generation pipeline with headless Puppeteer, creating itemized PDF invoices stored in AWS S3 with presigned download URLs.",
            tags: ["Puppeteer", "AWS S3", "PDF Engine"],
          },
          {
            title: "Scheduled Status Automation",
            description:
              "Configured scheduled background tasks for expired booking cleanups and timely status reconciliations.",
            tags: ["Cron", "Task Scheduling"],
          },
        ],
      },
      {
        id: "hichandra-challenges",
        sectionNumber: "04",
        title: "Technical Challenges & Solutions",
        type: "challenges-solutions",
        items: [
          {
            challenge: "Calculating dynamic price breakdowns factoring base rates, excess distance, surge windows, and GST.",
            solution:
              "Created a modular pricing utility that calculates itemized costs deterministically, persisting immutable price snapshots on the booking record at checkout time.",
            context: "Pricing Engine",
          },
          {
            challenge: "Secure storage and controlled access for technician KYC identity documents.",
            solution:
              "Utilized AWS S3 object storage with private bucket policies, generating short-lived HMAC presigned URLs exclusively for authorized administrative review.",
            context: "Security & Storage",
          },
        ],
      },
      {
        id: "hichandra-results",
        sectionNumber: "05",
        title: "Outcomes & Key Learnings",
        type: "results",
        bulletPoints: [
          "Delivered resilient, transactional booking lifecycles with verified two-party OTP completion handshakes.",
          "Established clean separation of concerns between authentication services, domain booking logic, and financial integrations.",
          "Gained practical production experience in asynchronous webhook verification and automated PDF rendering pipelines.",
        ],
        takeaways: [
          "State machines with immutable transition guards prevent invalid intermediate booking states.",
          "Preserving financial calculation snapshots at the moment of booking prevents discrepancies during retrospective accounting.",
        ],
      },
    ],
  },
  {
    slug: "nestjs-url-shortener",
    title: "NestJS URL Shortener",
    tagline: "Production-Oriented REST API for High-Integrity Short URL Management",
    shortDescription:
      "A modular, test-covered URL shortening API built with NestJS, TypeScript, PostgreSQL, and TypeORM, featuring custom aliases, expiration rules, rate limiting, and Swagger documentation.",
    category: "Independent Development",
    role: "Creator & Maintainer",
    duration: "2026",
    featured: true,
    published: true,
    order: 3,
    githubUrl: "https://github.com/its-chiranjeev/nestjs-url-shortener",
    thumbnail: "/images/projects/nestjs-url-shortener-cover.webp",
    coverImage: "/images/projects/nestjs-url-shortener-cover.webp",
    coverImageAlt:
      "Dark dashboard-style cover for a NestJS URL shortener: a long link transforming into a short link, with a QR code and click analytics charts.",
    techStack: [
      { name: "NestJS", category: "Backend" },
      { name: "TypeScript", category: "Backend" },
      { name: "Node.js", category: "Backend" },
      { name: "PostgreSQL (Neon)", category: "Database" },
      { name: "TypeORM", category: "Database" },
      { name: "class-validator", category: "Testing" },
      { name: "class-transformer", category: "Testing" },
      { name: "Joi", category: "Testing" },
      { name: "Helmet", category: "Security" },
      { name: "@nestjs/throttler", category: "Security" },
      { name: "Swagger / OpenAPI", category: "Tools" },
      { name: "Jest & Supertest", category: "Testing" },
    ],
    sections: [
      {
        id: "shortener-overview",
        sectionNumber: "01",
        title: "Project Scope & Design Objectives",
        type: "overview",
        problemStatement:
          "Public URL shortening requires high data integrity, collision-resistant code generation, strict redirection validation, defensive rate limiting against automated abuse, and verifiable database migrations.",
        objectives: [
          "Generate collision-resistant short codes and support optional human-readable custom aliases.",
          "Execute HTTP 302 redirects with click count incrementation and last-accessed timestamp tracking.",
          "Enforce URL expiration policies returning HTTP 410 Gone for elapsed links.",
          "Implement unit testing with Jest and end-to-end HTTP endpoint testing with Supertest.",
        ],
      },
      {
        id: "shortener-architecture",
        sectionNumber: "02",
        title: "Application Architecture & Request Lifecycle",
        type: "architecture",
        summary:
          "The API implements NestJS's modular Controller-Service-Repository architecture, validating inputs via DTO pipes, persisting state to PostgreSQL via TypeORM migrations, and protecting routes with throttler guards.",
        components: [
          {
            name: "UrlsController",
            role: "Exposes REST endpoints for creation, listing with pagination, status updates, deletion, and redirection.",
            portOrLayer: "Presentation Layer",
          },
          {
            name: "UrlsService",
            role: "Coordinates short-code uniqueness checking, collision retry logic, click metrics, and expiration evaluation.",
            portOrLayer: "Domain Layer",
          },
          {
            name: "Neon PostgreSQL & TypeORM",
            role: "Relational persistence with versioned migrations, soft-delete columns, and indexed lookup fields.",
            portOrLayer: "Persistence Layer",
          },
        ],
        flowSteps: [
          {
            step: "01",
            title: "Create Short URL",
            description: "Client submits POST /api/urls; DTO validation checks URL format and custom alias availability before generating a code.",
          },
          {
            step: "02",
            title: "Resolve & Redirect",
            description: "GET /:shortCode queries active records; if valid, increments click count and responds with HTTP 302 Found.",
          },
          {
            step: "03",
            title: "Expiration Guard",
            description: "If current timestamp exceeds expiresAt, service halts redirection and returns HTTP 410 Gone.",
          },
        ],
      },
      {
        id: "shortener-features",
        sectionNumber: "03",
        title: "Verified Functional Capabilities",
        type: "key-features",
        features: [
          {
            title: "Custom Alias & Short Code Engine",
            description: "Generates collision-resistant alphanumeric identifiers or binds custom user-defined vanity aliases with conflict validation.",
          },
          {
            title: "HTTP 302 Redirection & Access Tracking",
            description: "Issues standards-compliant 302 Found headers while synchronously recording total clicks and last-accessed timestamps.",
          },
          {
            title: "Configurable Expiration & Soft Deletion",
            description: "Supports optional ISO date expiration and non-destructive soft-deletion via TypeORM deleteDate columns.",
          },
          {
            title: "Defensive API Security",
            description: "Protects public redirection and creation endpoints using @nestjs/throttler rate limits, CORS policies, and Helmet headers.",
          },
          {
            title: "TypeORM Database Migrations",
            description: "Maintains reproducible schema changes through checked-in TypeScript migrations rather than automated schema synchronization.",
          },
          {
            title: "Interactive OpenAPI Sandbox",
            description: "Provides full Swagger UI documentation at /api/docs detailing request schemas, validation rules, and status codes.",
          },
        ],
      },
      {
        id: "shortener-code",
        sectionNumber: "04",
        title: "Clean API Implementation Example",
        type: "code-example",
        filename: "src/urls/urls.controller.ts",
        language: "typescript",
        code: `@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('api/urls')
  @ApiOperation({ summary: 'Create a shortened URL' })
  @ApiResponse({ status: 201, description: 'Short URL created successfully' })
  @ApiResponse({ status: 409, description: 'Short code or alias already in use' })
  async create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Get(':shortCode')
  @ApiOperation({ summary: 'Redirect short URL to original destination' })
  @ApiResponse({ status: 302, description: 'Redirect to original URL' })
  @ApiResponse({ status: 404, description: 'Short URL not found' })
  @ApiResponse({ status: 410, description: 'Short URL has expired' })
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const originalUrl = await this.urlsService.resolveAndTrack(shortCode);
    return res.redirect(HttpStatus.FOUND, originalUrl);
  }
}`,
        explanation:
          "Demonstrates NestJS dependency injection, DTO request validation, OpenAPI metadata decorators, and native HTTP response handling.",
      },
      {
        id: "shortener-results",
        sectionNumber: "05",
        title: "Testing & Code Quality Verification",
        type: "results",
        bulletPoints: [
          "Unit testing with Jest and end-to-end HTTP endpoint testing with Supertest.",
          "Zero schema discrepancies verified against PostgreSQL using explicit TypeORM migration commands.",
          "Defensive validation ensuring only valid HTTP/HTTPS targets can be shortened.",
        ],
        takeaways: [
          "Pairing class-validator with Joi startup checks prevents malformed inputs from ever touching the database layer.",
          "Decoupling short-code generation from redirection lookup makes caching layers straightforward to introduce in the future.",
        ],
      },
    ],
  },
];
