import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHighlights } from "@/components/landing/LandingHighlights";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { getSiteConfig } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiranjeev Rastogi | Node.js Backend Developer",
  description:
    "Welcome to the official developer portfolio of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, TypeORM, and distributed REST API systems.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chiranjeev Rastogi | Node.js Backend Developer",
    description:
      "Welcome to the official developer portfolio of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable API systems.",
    url: "/",
  },
};

export default function WelcomePage() {
  const site = getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <LandingNavbar />
      <main id="main-content" className="flex-1">
        <LandingHero
          name={site.name}
          title={site.title}
          location={site.location}
          socials={site.socials}
        />
        <LandingHighlights />
      </main>
      <LandingFooter />
    </div>
  );
}
