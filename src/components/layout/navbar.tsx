"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-cream border-b-2 border-ink">
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-14">
                <Link
                    href="/"
                    className="font-mono font-bold text-lg bg-ink text-acid px-2 py-0.5 hover:bg-coral hover:text-cream transition-colors"
                >
                    CP_
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navItems.map((item, i) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="font-mono text-xs font-semibold uppercase tracking-wider px-3 py-2 hover:bg-acid transition-colors"
                        >
                            <span className="text-coral">0{i + 1}/</span> {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => window.dispatchEvent(new Event("open-palette"))}
                        className="ml-3 font-mono text-xs font-bold border-2 border-ink px-3 py-2 bg-card hover:bg-acid transition-colors"
                        title="Open command palette"
                    >
                        ⌘K
                    </button>
                    <Link
                        href="/resume.pdf"
                        target="_blank"
                        onClick={() => posthog.capture("resume_downloaded", { source: "navbar" })}
                        className="ml-1 font-mono text-xs font-bold uppercase tracking-wider bg-ink text-cream border-2 border-ink px-4 py-2 shadow-hard-acid press"
                    >
                        Resume ↓
                    </Link>
                </nav>

                {/* Mobile Nav */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="border-2 border-ink rounded-none shadow-hard press"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="bg-cream border-l-2 border-ink"
                    >
                        <nav className="flex flex-col gap-2 mt-10 px-4">
                            {navItems.map((item, i) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="font-mono text-base font-semibold uppercase tracking-wider border-2 border-ink px-4 py-3 bg-card shadow-hard press"
                                >
                                    <span className="text-coral">0{i + 1}/</span> {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                onClick={() => posthog.capture("resume_downloaded", { source: "navbar_mobile" })}
                                className="font-mono text-base font-bold uppercase tracking-wider bg-ink text-cream border-2 border-ink px-4 py-3 mt-2 text-center shadow-hard-acid press"
                            >
                                Resume ↓
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
