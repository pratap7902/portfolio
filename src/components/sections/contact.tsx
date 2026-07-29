"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Globe } from "lucide-react";
import Link from "next/link";

const socials = [
    { icon: Linkedin, href: "https://linkedin.com/in/pratap79", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/pratap7902", label: "GitHub" },
    { icon: Globe, href: "https://www.singhpratap.dev", label: "Website" },
];

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-ink text-cream">
            <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="font-mono text-sm font-bold text-acid mb-4">
                        05 / CONTACT
                    </p>
                    <h2 className="font-display text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6">
                        Let&apos;s <span className="text-acid">Talk</span>
                    </h2>
                    <p className="text-lg text-cream/80 max-w-xl mx-auto mb-10">
                        Something worth building — backend, applied AI, or the whole
                        tech × design × product loop? A question, an idea, or just want
                        to say hi — my inbox is open.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                        <Link
                            href="mailto:contact@singhpratap.dev"
                            className="font-mono font-bold uppercase tracking-wider bg-acid text-ink border-2 border-acid px-8 py-4 shadow-hard-coral press inline-flex items-center gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            contact@singhpratap.dev
                        </Link>
                    </div>

                    <div className="flex gap-4 justify-center">
                        {socials.map((social) => {
                            const Icon = social.icon;
                            return (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    className="border-2 border-cream p-3 hover:bg-coral hover:border-coral transition-colors"
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="sr-only">{social.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <p className="font-mono text-xs text-cream/50 mt-14">
                        © 2026 Chandra Pratap Singh Chauhan · built with Next.js · no
                        purple gradients were harmed
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
