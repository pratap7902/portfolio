import { Navbar } from "@/components/layout/navbar";
import { Ticker } from "@/components/layout/ticker";
import { CommandPalette } from "@/components/command-palette";
import { Statusbar } from "@/components/statusbar";
import { Fx } from "@/components/fx";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Metrics } from "@/components/sections/metrics";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { JsonLd, personSchema } from "@/components/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-8">
      <JsonLd data={personSchema} />
      <Navbar />
      <CommandPalette />
      <Fx />
      <Hero />
      <Ticker />
      <About />
      <Experience />
      <Projects />
      <Metrics />
      <Achievements />
      <Contact />
      <Statusbar />
    </main>
  );
}
