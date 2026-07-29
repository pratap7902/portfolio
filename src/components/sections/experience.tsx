"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        company: "UrbanPiper",
        role: "Software Engineer II",
        period: "Oct 2025 — Present",
        location: "Bengaluru, India",
        accent: "bg-acid",
        highlights: [
            "Designed and built, solo, a company-wide AI incident-response system: structured Slack intake with automatic routing, GitHub integration tying each incident to its fix, and a RAG pipeline (pgvector embeddings, LLM reranking, Kibana MCP log retrieval) that surfaces similar past incidents to cut time-to-resolution.",
            "Built a coding agent on the Claude Agent SDK that triages critical Sentry alerts, localizes the fault, and opens a reviewable PR with a candidate fix — human-in-the-loop, nothing deploys without review.",
            "Built Janus — a dispute-recovery automation service for delivery-aggregator merchant portals (DoorDash, Uber Eats): browser + API automation (Playwright) that files order disputes end to end, guided by a calibrated win-probability model that prioritizes filings under monthly quota limits.",
            "Built store uptime/downtime analytics from scratch on ClickHouse (AggregatingMergeTree materialized views) plus the real-time availability layer over a Menu Analyzer processing ~1.5M items / 30 min.",
            "Automated store remediation with an \"Always-On\" recovery layer (anti-flap cooldowns, audited state machine) — saved ~$2,750 for a single merchant in a 3-week pilot (157 recoveries).",
            "Built cross-service sync over Kafka event streaming for real-time multi-service consistency; debugged stuck consumers and ETL pods on Kubernetes.",
        ],
        skills: ["Python", "FastAPI", "ClickHouse", "Kafka", "pgvector RAG", "MCP", "Claude Agent SDK", "Playwright", "Kubernetes"],
    },
    {
        company: "UrbanPiper",
        role: "Software Engineer I",
        period: "Jul 2024 — Oct 2025",
        location: "Bengaluru, India",
        accent: "bg-coral text-cream",
        highlights: [
            "Built a merchant onboarding service that cut average go-live time from ~17 days to ~4 and onboarded ~260 clients — Hasura auto-exposing a GraphQL layer over Postgres, eliminating hand-written CRUD APIs.",
            "Architected the alerting system from scratch (event gathering, roll-up, firing) for real-time, de-duplicated merchant notifications of store/item issues.",
            "Led the Python 3.6 → 3.9 upgrade of a large legacy service, resolving dependency and compatibility breakage across the codebase.",
            "Triaged dozens of SEV-1/SEV-2 production incidents across reporting, analytics, and reconciliation pipelines for enterprise brands in India, the UK, and MENA — including diagnosing silent ingestion data loss and running safe backfills.",
            "Delivered Atlas (React) features end to end — a global command palette with fuzzy search (~1,150 opens, ~500 in-product navigations) — plus menu-platform APIs (access control, MENA Menu V2, Lightspeed POS OAuth).",
        ],
        skills: ["Python", "Hasura", "PostgreSQL", "React", "Kafka", "Kubernetes", "ELK"],
    },
];

export function Experience() {
    return (
        <section id="experience" className="py-20 border-b-2 border-ink paper-grid">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="font-mono text-sm font-bold text-coral mb-2">02 / EXPERIENCE</p>
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
                        Where I&apos;ve Shipped
                    </h2>
                </motion.div>

                <div className="space-y-10">
                    {experiences.map((exp, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-2 border-ink bg-card shadow-hard-lg"
                        >
                            <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-5 md:px-7 py-4 bg-cream">
                                <div>
                                    <h3 className="font-display text-2xl font-extrabold uppercase">
                                        {exp.role}
                                    </h3>
                                    <p className="font-mono text-sm">
                                        {exp.company} · {exp.location}
                                    </p>
                                </div>
                                <span
                                    className={`font-mono text-xs font-bold border-2 border-ink px-3 py-1.5 shadow-hard ${exp.accent}`}
                                >
                                    {exp.period}
                                </span>
                            </header>

                            <ul className="px-5 md:px-7 py-6 space-y-3">
                                {exp.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex gap-3 leading-relaxed">
                                        <span className="font-mono text-coral font-bold shrink-0">▸</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>

                            <footer className="px-5 md:px-7 pb-6 flex flex-wrap gap-2">
                                {exp.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="font-mono text-xs border border-ink px-2 py-1 bg-cream"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </footer>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
