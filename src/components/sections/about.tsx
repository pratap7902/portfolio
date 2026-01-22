"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const skills = [
    // Languages
    "Python",
    "JavaScript",
    "SQL",
    "Shell",
    "HTML",
    "CSS",
    // Databases
    "ClickHouse",
    "MongoDB",
    "Elasticsearch",
    "PostgreSQL",
    "MySQL",
    // Frameworks/Libraries
    "FastAPI",
    "React",
    "Hasura (GraphQL)",
    "Django",
    // Tools/Platforms
    "Kubernetes",
    "PostHog",
    "Docker",
    "Grafana",
    "Kibana/ELK",
    "Git",
    "Kafka",
    "Postman",
    // AI/LLM
    "RAG",
    "MCP",
];

export function About() {
    return (
        <section id="about" className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">About Me</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I am a <span className="text-foreground font-semibold">Software Engineer</span> based in Bengaluru, India.
                        Currently working as <span className="text-foreground font-semibold">Software Engineer - II at UrbanPiper</span>,
                        I specialize in building robust backend systems, data engineering pipelines, and distributed architectures for the
                        online food delivery ecosystem. I have majorly contributed to <span className="text-primary font-semibold">Periscope</span> (downtime visibility platform),
                        <span className="text-primary font-semibold"> Atlas</span> (merchant-facing dashboard), and internal automation tools.
                        My expertise lies in Python, FastAPI, Kubernetes, GraphQL, and modern data stores like ClickHouse and MongoDB.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h3 className="text-xl font-semibold mb-6 text-center">Technical Skills</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {skills.map((skill, index) => (
                            <Badge
                                key={skill}
                                variant="secondary"
                                className="text-sm py-1 px-3 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                            >
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
