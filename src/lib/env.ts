/**
 * Centralized, type-safe environment configuration for chiranjeev-portfolio.
 * Ensures consistent retrieval and sanitization of environment variables across the app.
 */

export interface EnvConfig {
  siteUrl: string | undefined;
  nodeEnv: "development" | "production" | "test";
  isProduction: boolean;
  isDevelopment: boolean;
}

/**
 * Trims whitespace and strips any trailing slashes to ensure uniform URL concatenation.
 * Returns undefined if the string is empty or absent.
 */
function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  return trimmed.replace(/\/+$/, "");
}

export const env: EnvConfig = {
  siteUrl: sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL),
  nodeEnv: (process.env.NODE_ENV as EnvConfig["nodeEnv"]) || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
};

/**
 * Generates an absolute URL using NEXT_PUBLIC_SITE_URL.
 * Returns undefined if NEXT_PUBLIC_SITE_URL is not configured, ensuring
 * that no unconfirmed fallback domains or malformed relative tags are published.
 */
export function getAbsoluteUrl(path: string = ""): string | undefined {
  if (!env.siteUrl) return undefined;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${env.siteUrl}${normalizedPath}`;
}
