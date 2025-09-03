import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BON CHARGE - Science-Backed Wellness Gifts | Blue Light Glasses & Red Light Therapy",
  description: "Transform your wellness with BON CHARGE's science-backed products. Shop blue light blocking glasses, red light therapy devices, sleep optimization tools, and curated wellness bundles. 30-day guarantee.",
  keywords: "blue light glasses, red light therapy, sleep optimization, EMF protection, wellness gifts, circadian rhythm, sauna blanket, PEMF therapy, biohacking",
  authors: [{ name: "BON CHARGE" }],
  creator: "BON CHARGE",
  publisher: "BON CHARGE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://boncharge.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BON CHARGE - Science-Backed Wellness Gifts",
    description: "Transform your wellness with science-backed products. Blue light glasses, red light therapy, and more. Save 25% on bundles.",
    url: "https://boncharge.com",
    siteName: "BON CHARGE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BON CHARGE Wellness Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BON CHARGE - Science-Backed Wellness Gifts",
    description: "Transform your wellness with science-backed products. Save 25% on bundles.",
    creator: "@boncharge",
    images: ["/twitter-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
