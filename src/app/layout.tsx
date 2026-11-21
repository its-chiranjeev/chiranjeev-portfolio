import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chiranjeev.dev";

export const metadata: Metadata = {
  title: {
    default: "Chiranjeev Rastogi | Node.js Backend Developer",
    template: "%s | Chiranjeev Rastogi",
  },
  description:
    "Portfolio of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
  authors: [{ name: "Chiranjeev Rastogi", url: SITE_URL }],
  creator: "Chiranjeev Rastogi",
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: "Chiranjeev Rastogi Portfolio",
    title: "Chiranjeev Rastogi | Node.js Backend Developer",
    description:
      "Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "Chiranjeev Rastogi — Node.js Backend Developer Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiranjeev Rastogi | Node.js Backend Developer",
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
  name: "Chiranjeev Rastogi",
  jobTitle: "Node.js Backend Developer",
  url: SITE_URL,
  sameAs: [
    "https://github.com/its-chiranjeev",
    "https://linkedin.com/in/chiranjeev-rastogi",
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
