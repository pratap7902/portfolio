"use client";

import { motion } from "framer-motion";

const skillGroups = [
    {
        label: "Languages",
        color: "bg-acid",
        skills: ["Python", "JavaScript", "SQL", "Shell"],
    },
    {
        label: "Databases",
        color: "bg-coral text-cream",
        skills: ["ClickHouse", "PostgreSQL/pgvector", "MongoDB", "Elasticsearch", "Redis", "MySQL"],
    },
    {
        label: "Frameworks",
        color: "bg-blueberry text-cream",
        skills: ["FastAPI", "React", "Hasura (GraphQL)", "Django", "Playwright"],
    },
    {
        label: "Platforms",
        color: "bg-lilac",
        skills: ["Kubernetes", "Docker", "Kafka", "Grafana", "Kibana/ELK", "Sentry", "PostHog"],
    },
    {
        label: "AI / LLM",
        color: "bg-ink text-acid",
        skills: ["RAG (pgvector, embeddings, LLM reranking)", "MCP", "Claude Agent SDK", "Prompt engineering", "Evaluation"],
    },
];

export function About() {
    return (
        <section id="about" className="py-20 border-b-2 border-ink bg-card">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="font-mono text-sm font-bold text-coral mb-2">01 / ABOUT</p>
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
                        Who I Am
                    </h2>
                    <div className="border-2 border-ink bg-cream shadow-hard p-6 md:p-8 text-lg leading-relaxed">
                        <b>Builder</b> at <b>UrbanPiper</b> (Bengaluru) who owns{" "}
                        <span className="font-mono font-bold bg-acid px-1">
                            tech × design × product
                        </span>{" "}
                        end to end — from the schema to the pixels to the &quot;why are we
                        building this.&quot; Specializes in backend systems and applied AI:
                        event-driven pipelines, ClickHouse analytics, distributed-system
                        consistency, and LLM/RAG in production. Solo-delivered
                        company-wide platforms (engineering on-call intelligence,
                        real-time store-availability analytics) running at scale. Core
                        contributor to <b>Periscope</b> (downtime visibility) and{" "}
                        <b>Atlas</b> (merchant dashboard).
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <h3 className="font-mono text-sm font-bold uppercase tracking-widest mb-6">
                        // Toolbox
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {skillGroups.map((group, i) => (
                            <div
                                key={group.label}
                                className={`border-2 border-ink shadow-hard p-4 lift bg-cream ${i === skillGroups.length - 1 ? "md:col-span-2" : ""}`}
                            >
                                <span
                                    className={`inline-block font-mono text-xs font-bold uppercase tracking-wider border-2 border-ink px-2 py-0.5 mb-3 ${group.color}`}
                                >
                                    {group.label}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="font-mono text-xs border border-ink px-2 py-1 bg-card"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
