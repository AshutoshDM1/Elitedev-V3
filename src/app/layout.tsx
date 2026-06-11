import type { Metadata } from "next";
import { Outfit, Geist, DM_Sans, Doto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Provider";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const dm_sans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashutoshtiwari.me"),
  title: "Ashutosh Tiwari",
  description: "Full stack developer specializing in clean, modern websites and apps where design, functionality, and details matter. Currently building XContext.",
  keywords: ["Ashutosh Tiwari", "Software Engineer", "Full Stack Developer", "Next.js", "React", "TypeScript", "XContext", "Portfolio"],
  authors: [{ name: "Ashutosh Tiwari" }],
  creator: "Ashutosh Tiwari",
  alternates: {
    canonical: "https://ashutoshtiwari.me",
    languages: {
      "en-US": "https://ashutoshtiwari.me",
    },
  },
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
    url: "https://ashutoshtiwari.me",
    title: "Ashutosh Tiwari | Software Engineer",
    description: "Full stack developer specializing in clean, modern websites and apps where design, functionality, and details matter.",
    siteName: "Ashutosh Tiwari Portfolio",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Ashutosh Tiwari | Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashutosh Tiwari | Software Engineer",
    description: "Full stack developer specializing in clean, modern websites and apps where design, functionality, and details matter.",
    creator: "@AshutoshDM1",
    images: ["/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        outfit.variable,
        dm_sans.variable,
        doto.variable,
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col ">
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}
