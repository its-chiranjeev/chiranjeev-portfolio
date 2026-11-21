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

export const metadata: Metadata = {
  title: {
    default: "Chiranjeev Rastogi | Node.js Backend Developer",
    template: "%s | Chiranjeev Rastogi",
  },
  description:
    "Portfolio of Chiranjeev Rastogi — Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
  authors: [{ name: "Chiranjeev Rastogi" }],
  creator: "Chiranjeev Rastogi",
  metadataBase: new URL("https://chiranjeev.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chiranjeev.dev",
    siteName: "Chiranjeev Rastogi Portfolio",
    title: "Chiranjeev Rastogi | Node.js Backend Developer",
    description:
      "Node.js Backend Developer specializing in NestJS, TypeScript, PostgreSQL, and scalable REST API architectures.",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 800,
        alt: "Chiranjeev Rastogi",
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
    icon: "/images/logo.png",
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
      </head>
      <body className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] antialiased transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
