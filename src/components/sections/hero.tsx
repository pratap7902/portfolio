"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal } from "@/components/terminal";

const stickers = [
    { text: "SDE-2 @ URBANPIPER", className: "bg-acid text-ink -rotate-2" },
    { text: "BENGALURU, IN", className: "bg-cream text-ink rotate-1" },
    { text: "OPEN TO WORK", className: "bg-coral text-cream -rotate-1" },
];

export function Hero() {
    return (
        <section className="relative pt-14 border-b-2 border-ink paper-grid overflow-hidden">
            {/* Decorative grid-breaking shapes */}
            <div className="absolute top-24 right-[8%] w-24 h-24 bg-coral border-2 border-ink rotate-12 hidden lg:block" />
            <div className="absolute bottom-16 left-[5%] w-16 h-16 bg-blueberry border-2 border-ink rounded-full hidden lg:block" />
            <div className="absolute top-1/2 right-[20%] w-10 h-10 bg-acid border-2 border-ink -rotate-6 hidden lg:block" />

            <div className="container px-4 md:px-6 mx-auto py-20 md:py-28 relative z-10">
                <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center max-w-6xl mx-auto">
                    <div>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="font-mono text-sm font-semibold text-coral mb-4"
                        >
                            ~/portfolio $ whoami<span className="animate-blink">▌</span>
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-5xl md:text-7xl lg:text-8xl mb-6"
                        >
                            Chandra
                            <br />
                            Pratap
                            <br />
                            <span className="text-outline">Singh Chauhan</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-3 mb-8"
                        >
                            {stickers.map((s) => (
                                <span
                                    key={s.text}
                                    className={`font-mono text-xs font-bold tracking-wider border-2 border-ink px-3 py-1.5 shadow-hard ${s.className}`}
                                >
                                    {s.text}
                                </span>
                            ))}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                        >
                            I build <b>backend systems</b> and <b>production AI</b> —
                            event-driven pipelines, ClickHouse analytics at scale, and LLM
                            agents (RAG, MCP, Claude Agent SDK) that actually ship.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                href="#projects"
                                className="font-mono font-bold uppercase tracking-wider bg-ink text-acid border-2 border-ink px-6 py-3 shadow-hard-coral press"
                            >
                                View Work →
                            </Link>
                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                className="font-mono font-bold uppercase tracking-wider bg-cream text-ink border-2 border-ink px-6 py-3 shadow-hard press"
                            >
                                Resume ↓
                            </Link>
                            <span className="hidden md:inline-flex items-center font-mono text-xs text-muted-foreground self-center">
                                or press{" "}
                                <kbd className="mx-1 border border-ink px-1.5 py-0.5 bg-card font-bold">
                                    ⌘K
                                </kbd>
                            </span>
                        </motion.div>
                    </div>

                    {/* Interactive terminal — it actually works */}
                    <motion.div
                        initial={{ opacity: 0, rotate: 5, scale: 0.92 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block w-full max-w-md"
                    >
                        <Terminal />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
