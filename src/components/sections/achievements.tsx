"use client";

import { motion } from "framer-motion";

const achievements = [
    {
        badge: "🏆 WINNER",
        title: "Amazon Gen AI Hackathon",
        description:
            "Engineered an MCP-backed command palette (PIP) with global fuzzy search, keyboard navigation, and analytics tracking.",
        accent: "bg-acid",
        rotate: "-rotate-1",
    },
    {
        badge: "🤖 IN PRODUCTION",
        title: "AI systems that ship",
        description:
            "On-call incident intelligence (RAG + MCP) and a human-in-the-loop coding agent — running in production, not demos.",
        accent: "bg-coral text-cream",
        rotate: "rotate-1",
    },
    {
        badge: "🎓 B.E. CSE",
        title: "VTU, Computer Science",
        description: "Bachelor of Engineering in Computer Science, 2020 – 2024.",
        accent: "bg-blueberry text-cream",
        rotate: "-rotate-1",
    },
];

export function Achievements() {
    return (
        <section id="achievements" className="py-20 border-b-2 border-ink paper-grid">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="font-mono text-sm font-bold text-coral mb-2">04 / ACHIEVEMENTS</p>
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
                        Milestones
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`border-2 border-ink bg-card shadow-hard p-6 lift ${achievement.rotate}`}
                        >
                            <span
                                className={`inline-block font-mono text-xs font-bold tracking-wider border-2 border-ink px-2 py-1 mb-4 shadow-hard ${achievement.accent}`}
                            >
                                {achievement.badge}
                            </span>
                            <h3 className="font-display text-xl font-extrabold uppercase mb-2">
                                {achievement.title}
                            </h3>
                            <p className="leading-relaxed text-muted-foreground">
                                {achievement.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
