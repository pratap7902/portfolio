"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { LottieAnimation } from "@/components/ui/lottie-animation";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
            {/* Frutiger Aero Background (Light Mode) */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#87CEEB,#E0F7FA)] dark:hidden">
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                {/* Abstract Orbs/Bubbles */}
                <div className="absolute top-20 left-20 w-64 h-64 bg-white/30 rounded-full blur-2xl mix-blend-overlay animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl mix-blend-overlay animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-white/10 to-transparent rounded-full blur-3xl" />
            </div>

            {/* Deep Slate Background (Dark Mode) */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] hidden dark:block">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
            </div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse hidden dark:block" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 hidden dark:block" />


            <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-8 relative z-10">
                {/* Profile Photo with Heavy Vignette */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-64 h-64 md:w-80 md:h-80 mb-[-1rem]"
                >
                    {/* Outer glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>

                    {/* Photo container with vignette */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                        <Image
                            src="/profile-photo.jpg"
                            alt="Chandra Pratap Singh Chauhan"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Heavy vignette overlay */}
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/90"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60"></div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4 inline-block">
                        Available for hire
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                        Building <span className="text-primary">AI-Powered</span> <br />
                        Applications
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-[600px]"
                >
                    Hi, I&apos;m <span className="text-foreground font-semibold">Chandra Pratap Singh Chauhan</span>.
                    A Software Engineer specializing in Backend Development, AI Applications, and Data Engineering.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Button size="lg" className="group" asChild>
                        <Link href="#projects">
                            View Projects
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/resume.pdf" target="_blank">
                            Download Resume
                            <Download className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
