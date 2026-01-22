"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        title: "Cognify",
        description: "AI-powered assessment platform that creates intelligent tests from documents. Features adaptive questioning, real-time evaluation, and secure testing with document support for PDFs, DOCX, and TXT files.",
        tags: ["AI", "Next.js", "TypeScript", "Assessment Platform"],
        image: "/cognify-hero.png",
        links: { demo: "https://cognify.singhpratap.dev", github: "https://github.com/pratap7902/cognify-fe" },
    },
    {
        title: "Powframe",
        description: "AI-powered comic generation platform that transforms stories into beautiful comic panels. Features multiple layouts, style customization, and context-aware narrative flow with instant high-quality results.",
        tags: ["AI", "Image Generation", "Next.js", "TypeScript"],
        image: "/powframe-hero.png",
        links: { demo: "https://powframe.com", github: "#" },
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground">Some of the things I&apos;ve built.</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">

                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="w-full max-w-md"
                        >
                            <Card className="h-full flex flex-col hover:border-primary transition-colors duration-300 bg-card/50 backdrop-blur-sm border-muted overflow-hidden">
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                </CardHeader>
                                <div className="relative w-full h-48 overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <CardContent className="flex-grow pt-6">
                                    <p className="text-muted-foreground mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button size="sm" className="w-full" asChild>
                                        <Link href={project.links.demo} target="_blank">
                                            <ExternalLink className="mr-2 h-4 w-4" />
                                            View Demo
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
