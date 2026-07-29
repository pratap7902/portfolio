import { Navbar } from "@/components/layout/navbar";
import { Ticker } from "@/components/layout/ticker";
import { CommandPalette } from "@/components/command-palette";
import { Statusbar } from "@/components/statusbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background pb-8">
      <Navbar />
      <CommandPalette />
      <Hero />
      <Ticker />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
      <Statusbar />
    </main>
  );
}
