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
  metadataBase: new URL("https://www.singhpratap.dev"),
  title: "Chandra Pratap Singh Chauhan — Builder · Backend & Applied AI",
  description:
    "Builder who owns tech × design × product end to end. Specializes in backend systems and applied AI — ClickHouse analytics, event-driven pipelines, and production LLM agents (RAG, MCP, Claude Agent SDK). SDE-2 @ UrbanPiper.",
  openGraph: {
    title: "Chandra Pratap Singh Chauhan — Builder · Backend & Applied AI",
    description:
      "Builder who owns tech × design × product end to end. Specializes in backend systems and applied AI — ClickHouse analytics, event-driven pipelines, and production LLM agents (RAG, MCP, Claude Agent SDK). SDE-2 @ UrbanPiper.",
    type: "website",
    url: "https://www.singhpratap.dev",
    siteName: "Chandra Pratap Singh Chauhan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandra Pratap Singh Chauhan — Builder · Backend & Applied AI",
    description:
      "Builder who owns tech × design × product end to end. Specializes in backend systems and applied AI — ClickHouse analytics, event-driven pipelines, and production LLM agents (RAG, MCP, Claude Agent SDK). SDE-2 @ UrbanPiper.",
  },
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
