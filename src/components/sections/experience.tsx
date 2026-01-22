"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
    {
        company: "UrbanPiper",
        role: "Software Engineer - II",
        period: "Oct 2025 - Present",
        location: "Bengaluru, Karnataka, India",
        description: "Building intelligent automation and monitoring systems for the food delivery ecosystem.",
        highlights: [
            "Built EOC AI Intelligent Automation system that analyzes incoming engineering-on-call issues against historical data, suggests solutions, and integrates with Kibana MCP for log analysis",
            "Implemented centralized alerting system for various events across ecosystem, enabling proactive merchant notifications",
            "Contributed to a data rich micro-service which was a GraphQL layer wrapped around the main back-end built using FastAPI, MongoDB, Redis and Clickhouse",
            "Designed and maintained unified monitoring dashboards providing real-time visibility into application health and performance metrics for multiple product teams on Grafana, ELK stack etc."
        ],
        skills: ["FastAPI", "GraphQL", "MongoDB", "Redis", "ClickHouse", "Grafana", "ELK Stack", "AI/ML", "MCP"],
    },
    {
        company: "UrbanPiper",
        role: "Software Engineer - I",
        period: "Jul 2024 - Oct 2025",
        location: "Bengaluru, Karnataka, India",
        description: "Developed core backend infrastructure and distributed systems for Periscope and Atlas products.",
        highlights: [
            "Built Store Sync mechanism between Atlas and Periscope using Codex event streaming for real-time data consistency",
            "Architected the core item availability tracking engine powering Periscope's downtime visibility products - a 4-state system with hierarchical schedule evaluation across store, category, and item levels",
            "Contributed to Kubernetes operations including deployment configurations, resource optimization and debugging pod/service issues in a microservices architecture",
            "Documented workflows to help the engineering and operations team"
        ],
        skills: ["Kubernetes", "Event Streaming", "Microservices", "Kafka", "Docker", "Backend Development"],
    },
];

export function Experience() {
    return (
        <section id="experience" className="py-20">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
                    <p className="text-muted-foreground">My professional journey so far.</p>
                </motion.div>

                <div className="max-w-3xl mx-auto relative pl-8 md:pl-0">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2 hidden md:block" />
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border md:hidden" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative mb-12 md:flex ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-[9px] md:-translate-x-1/2 mt-6 border-4 border-background z-10" />

                            {/* Content Spacer */}
                            <div className="md:w-1/2" />

                            {/* Card */}
                            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"} pl-8`}>
                                <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Briefcase className="w-4 h-4 text-primary" />
                                            <span className="text-sm text-muted-foreground">{exp.period}</span>
                                        </div>
                                        <CardTitle className="text-xl">{exp.role}</CardTitle>
                                        <div className="text-lg font-medium text-primary">{exp.company}</div>
                                        <div className="text-sm text-muted-foreground">{exp.location}</div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                                        {exp.highlights && exp.highlights.length > 0 && (
                                            <ul className="list-disc list-inside space-y-2 mb-4 text-sm text-muted-foreground">
                                                {exp.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="leading-relaxed">{highlight}</li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
