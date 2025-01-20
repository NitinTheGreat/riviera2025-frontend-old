import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"
import EnhancedCustomCursor from '../components/EnhancedCustomCursor'

const fkTrial = localFont({
  src: [
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Regular.otf",
      style: "normal",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/fk-trial/FKScreamerTrial-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--fk-trial",
});

const editorial = localFont({
  src: [
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Italic-BF644b214fb0c0a.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Regular-BF644b214ff145f.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Ultrabold-BF644b21500840c.otf",
      weight: "700",
      style: "ultrabold",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-UltraboldItalic-BF644b214faef01.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-Ultralight-BF644b21500d0c0.otf",
      weight: "200",
      style: "extralight",
    },
    {
      path: "../fonts/PPEditorialNew/PPEditorialNew-UltralightItalic-BF644b214ff1e9b.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--editorial",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://riviera.vit.ac.in'),
  title: {
    default: "Riviera 2025 | VIT Vellore's Annual International Sports and Cultural Festival",
    template: "%s | Riviera 2025"
  },
  description: "Experience Riviera 2025, VIT Vellore's premier Annual International Sports and Cultural Festival. Join thousands of participants from colleges worldwide for three days of exhilarating events, competitions, and performances. Register now for an unforgettable celebration of talent and diversity!",
  keywords: [
    "Riviera 2025", "VIT Vellore", "cultural festival", "sports festival", "college fest",
    "international festival", "student events", "competitions", "performances", "talent showcase",
    "cultural diversity", "sports competitions", "art exhibitions", "music concerts", "dance performances",
    "literary events", "technical competitions", "workshops", "seminars", "guest lectures",
    "college life", "student activities", "youth festival", "inter-college events", "academic conferences"
  ],
  authors: [{ name: "VIT Vellore" }],
  creator: "VIT Vellore",
  publisher: "VIT Vellore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Riviera 2025 | VIT Vellore's Annual International Sports and Cultural Festival",
    description: "Join the excitement at Riviera 2025, VIT Vellore's flagship event featuring international sports competitions, cultural performances, and innovative showcases. Register now for three days of non-stop action and creativity!",
    url: 'https://riviera.vit.ac.in',
    siteName: 'Riviera 2025',
    // images: [
    //   {
    //     url: '/image/riviera.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Riviera 2025 - VIT Vellore',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Riviera 2025 | VIT Vellore's Annual Festival",
    description: "Experience the thrill of Riviera 2025, VIT's international sports and cultural extravaganza. Join us for three days of competitions, performances, and unforgettable memories!",
    images: ['/image/riviera.png'],
    creator: '@VIT_univ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://riviera.vit.ac.in',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${fkTrial.variable} ${editorial.variable} antialiased`}>
        <Navbar />
        <div className="relative">
          <div className="flex min-h-screen mx-auto flex-col max-w-[90rem] bg-background px-4 md:px-6">
            {children}
            <EnhancedCustomCursor />
          </div>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

