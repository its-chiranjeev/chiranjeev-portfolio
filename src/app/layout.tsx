import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Caveat, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { IntroController } from "@/components/loader/IntroController";
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

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: false,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: "500",
  preload: false,
});

const site = getSiteConfig();
const siteUrl = (process.env.SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Software Engineer & Full-Stack Developer`,
    template: `%s | ${site.name}`,
  },
  description:
    "Portfolio of Chiranjeev Rastogi — Software Engineer & Full-Stack Developer specializing in full-stack web applications, scalable backend architectures, and distributed systems with Next.js, Node.js, NestJS, and TypeScript.",
  applicationName: "Chiranjeev Rastogi Portfolio",
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  metadataBase: new URL(siteUrl),
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
    title: `${site.name} — Software Engineer`,
    description:
      "Software Engineer building scalable backend systems, distributed architectures, and modern web applications with Node.js, NestJS, and TypeScript.",
    images: [
      {
        url: "/images/og-image-v2.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${site.name} — Personal Brand Identity (CR Monogram)`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software Engineer`,
    description:
      "Software Engineer building scalable backend systems, distributed architectures, and modern web applications with Node.js, NestJS, and TypeScript.",
    images: ["/images/og-image-v2.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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

const introInitScript = `(function() {
  try {
    var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    var pathname = window.location.pathname;
    var isRoot = pathname === "/" || pathname === "";
    var seen = sessionStorage.getItem('chiranjeev_intro_seen');

    if (isRoot || !seen) {
      document.documentElement.classList.add('intro-active');
    }
  } catch (e) {}
})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  ...(siteUrl
    ? {
        url: siteUrl,
        image: `${siteUrl}/images/avatar.jpg`,
      }
    : {}),
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
    site.socials.x,
    site.socials.instagram,
    site.socials.leetcode,
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
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${caveat.variable} ${notoSansDevanagari.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: introInitScript }} />
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
        <ThemeProvider>
          <IntroController>{children}</IntroController>
        </ThemeProvider>
      </body>
    </html>
  );
}
