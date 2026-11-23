import { PortfolioBootLoader } from "@/components/loader/PortfolioBootLoader";
import { getAbsoluteUrl } from "@/lib/env";
import type { Metadata } from "next";

const canonicalUrl = getAbsoluteUrl("/");

export const metadata: Metadata = {
  title: "Chiranjeev Rastogi | Node.js Backend Developer",
  description:
    "Portfolio boot sequence of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, TypeORM, and distributed REST API systems.",
  ...(canonicalUrl
    ? {
        alternates: {
          canonical: canonicalUrl,
        },
        openGraph: {
          title: "Chiranjeev Rastogi | Node.js Backend Developer",
          description:
            "Portfolio boot sequence of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, TypeORM, and distributed REST API systems.",
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
          title: "Chiranjeev Rastogi | Node.js Backend Developer",
          description:
            "Portfolio boot sequence of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, TypeORM, and distributed REST API systems.",
          images: ["/images/og-image-v2.png"],
        },
      }
    : {}),
};

export default function RootPage() {
  return <PortfolioBootLoader />;
}
