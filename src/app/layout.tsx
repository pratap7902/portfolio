import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chandra Pratap Singh Chauhan — Backend & Applied AI",
  description:
    "Software Engineer II at UrbanPiper. Backend systems, ClickHouse analytics, event-driven pipelines, and production LLM agents (RAG, MCP, Claude Agent SDK).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${mono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
