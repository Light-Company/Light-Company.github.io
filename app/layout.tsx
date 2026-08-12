import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const title = "The Light Company · AI That Points to the Work";
const description =
  "A lamp that sees the workbench, understands the task, and projects the next step onto the exact part.";
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
      "projected guidance",
      "hands-free work instructions",
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
          alt: "The Light Company: AI that points to the work",
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
  themeColor: "#F5F8FA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed.variable} ${inter.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
