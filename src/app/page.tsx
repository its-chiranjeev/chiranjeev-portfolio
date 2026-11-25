import type { Metadata } from "next";

const siteUrl = (process.env.SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");
const canonicalUrl = `${siteUrl}/`;

export const metadata: Metadata = {
  title: "Chiranjeev Rastogi | Software Engineer & Full-Stack Developer",
  description:
    "Portfolio and engineering showcase of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in modern Next.js frontends, resilient NestJS backends, PostgreSQL, and distributed systems.",
  ...(canonicalUrl
    ? {
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: "Chiranjeev Rastogi | Software Engineer & Full-Stack Developer",
          description:
            "Portfolio and engineering showcase of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in modern Next.js frontends, resilient NestJS backends, PostgreSQL, and distributed systems.",
          url: canonicalUrl,
          images: [
            {
              url: "/images/og-image-v2.png",
              width: 1200,
              height: 630,
              type: "image/png",
              alt: "Chiranjeev Rastogi — Personal Brand Identity (CR Monogram)",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: "Chiranjeev Rastogi | Software Engineer & Full-Stack Developer",
          description:
            "Portfolio and engineering showcase of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in modern Next.js frontends, resilient NestJS backends, PostgreSQL, and distributed systems.",
          images: ["/images/og-image-v2.png"],
        },
      }
    : {}),
};

export default function RootPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/portfolio" />
        <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[#121216] text-center space-y-4 max-w-md w-full">
          <p className="font-mono text-sm text-[var(--accent-lime)] font-bold">
            Chiranjeev Rastogi — Software Engineer & Full-Stack Developer
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            Engineering full-stack web applications, resilient backend architectures, and high-integrity systems.
          </p>
          <a
            href="/portfolio"
            className="inline-block px-4 py-2 rounded-lg bg-[var(--accent-lime)] text-black font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Enter Portfolio Directly &rarr;
          </a>
        </div>
      </noscript>
    </div>
  );
}
