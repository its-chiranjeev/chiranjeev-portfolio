import { PortfolioBootLoader } from "@/components/loader/PortfolioBootLoader";
import { getAbsoluteUrl } from "@/lib/env";
import type { Metadata } from "next";

const canonicalUrl = getAbsoluteUrl("/");

export const metadata: Metadata = {
  title: "Chiranjeev Rastogi | Software Engineer & Full-Stack Developer",
  description:
    "Portfolio boot sequence of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in modern Next.js frontends, resilient NestJS backends, PostgreSQL, and distributed systems.",
  ...(canonicalUrl
    ? {
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: "Chiranjeev Rastogi | Software Engineer & Full-Stack Developer",
          description:
            "Portfolio boot sequence of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in modern Next.js frontends, resilient NestJS backends, PostgreSQL, and distributed systems.",
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
            "Portfolio boot sequence of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in modern Next.js frontends, resilient NestJS backends, PostgreSQL, and distributed systems.",
          images: ["/images/og-image-v2.png"],
        },
      }
    : {}),
};

export default function RootPage() {
  return <PortfolioBootLoader />;
}
