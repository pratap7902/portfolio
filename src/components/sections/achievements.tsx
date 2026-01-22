"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy, Award } from "lucide-react";

const achievements = [
    {
        title: "Amazon Gen AI Hackathon Winner",
        description: "Engineered an MCP-backed PIP featuring global fuzzy search, keyboard navigation, and analytics tracking",
        icon: Trophy,
        year: "2024",
    },
    {
        title: "VTU Engineering Graduate",
        description: "Bachelor of Engineering in Computer Science (2020-2024)",
        icon: Award,
        year: "2024",
    },
];

export function Achievements() {
    return (
        <section id="achievements" className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Achievements</h2>
                    <p className="text-muted-foreground">Recognition and milestones.</p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card className="h-full hover:border-primary transition-colors duration-300 bg-card/50 backdrop-blur-sm border-muted">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="text-sm font-medium text-muted-foreground">
                                                {achievement.year}
                                            </span>
                                        </div>
                                        <CardTitle className="text-xl">{achievement.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{achievement.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
