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
        },
      }
    : {}),
};

export default function RootPage() {
  return <PortfolioBootLoader />;
}
