import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { env } from "@/lib/env";
import { getSiteConfig } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const site = getSiteConfig();
const siteUrl = env.siteUrl;

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Portfolio of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
  authors: [{ name: site.name, url: siteUrl || undefined }],
  creator: site.name,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | ${site.title}`,
    description:
      "Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: `${site.name} — ${site.title} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description:
      "Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/images/logo.png" },
    ],
    apple: [
      { url: "/images/logo.png" },
    ],
  },
};

const themeScript = `(function() {
  try {
    var saved = localStorage.getItem('chiranjeev_theme');
    var isDark = saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  ...(siteUrl ? { url: siteUrl } : {}),
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    addressCountry: "India",
  },
  knowsAbout: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "PostgreSQL",
    "TypeORM",
    "REST APIs",
    "Microservices",
    "System Architecture",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased transition-colors duration-200">
        {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-lime)] focus:text-black focus:font-mono focus:text-xs focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-black"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
