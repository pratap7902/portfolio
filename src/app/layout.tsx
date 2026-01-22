import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const font = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chandra Pratap Singh Chauhan | Portfolio",
  description: "Portfolio of Chandra Pratap Singh Chauhan - Software Engineer",
};

import { FloatingCats } from "@/components/floating-cats";

// ... (existing imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingCats />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
