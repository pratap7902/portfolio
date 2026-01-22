"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section id="contact" className="py-20">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi,
                        I&apos;ll try my best to get back to you!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button size="lg" className="w-full sm:w-auto" asChild>
                            <Link href="mailto:contact@singhpratap.dev">
                                <Mail className="mr-2 h-4 w-4" />
                                Say Hello
                            </Link>
                        </Button>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href="https://linkedin.com/in/pratap79" target="_blank">
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href="https://github.com/pratap7902" target="_blank">
                                    <Github className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
