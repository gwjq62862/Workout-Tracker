import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LIFTMETRIC — Workout Tracker",
    template: "%s | LIFTMETRIC",
  },
  description:
    "Track workouts, sets, reps, and weights. View history, edit sessions, and stay consistent with LIFTMETRIC.",
  applicationName: "LIFTMETRIC",
  keywords: [
    "workout tracker",
    "fitness app",
    "gym log",
    "sets and reps",
    "supabase",
    "next.js",
  ],
  authors: [{ name: "LIFTMETRIC" }],
  creator: "LIFTMETRIC",
  metadataBase:
    typeof process !== "undefined"
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
      : undefined,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "LIFTMETRIC — Workout Tracker",
    description:
      "Log workouts easily, see progress clearly, and stay consistent.",
    url: "/",
    siteName: "LIFTMETRIC",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Workout Tracker Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LIFTMETRIC — Workout Tracker",
    description:
      "Log workouts easily, see progress clearly, and stay consistent.",
    images: ["/hero.webp"],
    creator: "@liftmetric",
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster />
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
