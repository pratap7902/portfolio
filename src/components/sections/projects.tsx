"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        title: "Cognify",
        description:
            "AI-powered assessment platform that turns uploaded documents (SOPs, guidelines) into adaptive, conversational tests — with real-time LLM evaluation of answers.",
        tags: ["RAG", "Next.js", "LLM Evaluation"],
        image: "/cognify-hero.png",
        demo: "https://cognify.singhpratap.dev",
        accent: "bg-acid",
    },
    {
        title: "Powframe",
        description:
            "AI comic-generation platform transforming stories into comic panels — multiple layouts, style customization, and context-aware narrative flow.",
        tags: ["AI", "Image Generation", "Next.js"],
        image: "/powframe-hero.png",
        demo: "https://powframe.com",
        accent: "bg-coral text-cream",
    },
    {
        title: "Marudhar Resorts",
        description:
            "Website + custom Property Management System (PMS) for a working resort — bookings, rooms, operations — in active production use.",
        tags: ["Full-stack", "PMS", "Production"],
        image: "/marudhar-hero.png",
        demo: "https://www.marudharresorts.com",
        accent: "bg-blueberry text-cream",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-20 border-b-2 border-ink bg-card">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="font-mono text-sm font-bold text-coral mb-2">03 / PROJECTS</p>
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
                        Side Quests
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-2 border-ink bg-cream shadow-hard flex flex-col lift"
                        >
                            <div className="relative w-full h-44 border-b-2 border-ink overflow-hidden">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div
                                        className={`w-full h-full flex items-center justify-center ${project.accent}`}
                                    >
                                        <span className="font-display text-4xl font-extrabold uppercase -rotate-3">
                                            PMS
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-display text-2xl font-extrabold uppercase mb-2">
                                    {project.title}
                                </h3>
                                <p className="leading-relaxed mb-4 flex-grow">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-xs border border-ink px-2 py-0.5 bg-card"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Link
                                    href={project.demo}
                                    target="_blank"
                                    className="font-mono text-sm font-bold uppercase tracking-wider text-center bg-ink text-cream border-2 border-ink px-4 py-2.5 shadow-hard-acid press"
                                >
                                    Visit ↗
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
