import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingHighlights } from "@/components/landing/LandingHighlights";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { getSiteConfig } from "@/lib/content";

export default function WelcomePage() {
  const site = getSiteConfig();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <LandingNavbar />
      <main className="flex-1">
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
