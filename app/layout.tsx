import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const title = "The Light Company · AI guidance projected onto physical work";
const description =
  "A desk lamp with cameras and a projector that sees the workbench, understands the task, and points to the next action. Built for robotics and hardware teams.";
const metadataBase = new URL("https://lightcompany.ai");
const socialImage = new URL("/og.png", metadataBase).toString();

export function generateMetadata(): Metadata {
  return {
    metadataBase,
    title,
    description,
    applicationName: "The Light Company",
    keywords: [
      "projected AR",
      "physical AI",
      "robotics",
      "hardware assembly",
      "spatial guidance",
      "intelligent light",
    ],
    authors: [{ name: "The Light Company" }],
    creator: "The Light Company",
    publisher: "The Light Company",
    alternates: { canonical: "https://lightcompany.ai" },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url: "https://lightcompany.ai",
      siteName: "The Light Company",
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "The Light Company: AI guidance projected onto physical work",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F8FA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${inter.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
