import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
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

const title = "Prism · AI guidance projected onto physical work";
const description =
  "A desk lamp with cameras and a projector that sees the workbench, understands the task, and points to the next action. Built for robotics and hardware teams.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "meetprism.co";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title,
    description,
    applicationName: "Prism Labs",
    keywords: [
      "PrismOS",
      "projected AR",
      "physical AI",
      "robotics",
      "hardware assembly",
      "spatial guidance",
    ],
    authors: [{ name: "Prism Labs", url: "https://meetprism.co" }],
    creator: "Prism Labs",
    publisher: "Prism Labs",
    alternates: { canonical: "/" },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName: "Prism Labs",
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Prism Labs: AI guidance projected onto physical work",
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
  themeColor: "#08070A",
  colorScheme: "dark",
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
