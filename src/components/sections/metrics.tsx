"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, durationMs = 1400) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let frame: number;
        let start: number | null = null;
        const tick = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, target, durationMs]);

    return { ref, value };
}

type Metric = {
    label: string;
    value: number;
    decimals: number;
    prefix?: string;
    suffix?: string;
    sub: string;
    points: string;
    color: string;
};

const metrics: Metric[] = [
    {
        label: "ITEMS ANALYZED",
        value: 1.5,
        decimals: 1,
        suffix: "M / 30 min",
        sub: "menu analyzer throughput",
        points: "0,24 14,20 28,22 42,14 56,16 70,8 84,10 100,3",
        color: "text-coral",
    },
    {
        label: "MERCHANTS ONBOARDED",
        value: 260,
        decimals: 0,
        prefix: "~",
        sub: "go-live: 17 days → 4",
        points: "0,25 16,23 30,18 44,19 58,12 72,13 86,6 100,4",
        color: "text-blueberry",
    },
    {
        label: "STORE RECOVERIES",
        value: 523,
        decimals: 0,
        sub: "always-on automation",
        points: "0,26 14,22 28,24 42,17 56,18 70,11 84,12 100,5",
        color: "text-ink",
    },
    {
        label: "SAVED FOR MERCHANTS",
        value: 10208,
        decimals: 0,
        prefix: "$",
        sub: "always-on auto-recovery",
        points: "0,25 15,24 30,19 45,21 60,13 75,14 88,7 100,3",
        color: "text-coral",
    },
    {
        label: "ON-CALL ISSUES RESOLVED",
        value: 90,
        decimals: 0,
        suffix: "+",
        sub: "production issues · service requests",
        points: "0,22 13,25 27,16 41,20 55,10 69,15 84,6 100,8",
        color: "text-blueberry",
    },
    {
        label: "AI SYSTEMS IN PROD",
        value: 3,
        decimals: 0,
        sub: "on-call RAG · coding agent · janus",
        points: "0,26 20,26 34,17 52,17 66,9 82,9 92,4 100,4",
        color: "text-ink",
    },
];

function Sparkline({ points, color, delay }: { points: string; color: string; delay: number }) {
    return (
        <svg
            viewBox="0 0 100 28"
            className={`w-full h-7 mt-3 ${color}`}
            fill="none"
            aria-hidden="true"
        >
            <motion.polyline
                points={points}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                pathLength={1}
                strokeDasharray="1"
                initial={{ strokeDashoffset: 1 }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay, ease: "easeOut" }}
            />
        </svg>
    );
}

function MetricPanel({ metric, index }: { metric: Metric; index: number }) {
    const { ref, value } = useCountUp(metric.value);
    const formatted = value.toLocaleString("en-US", {
        minimumFractionDigits: metric.decimals,
        maximumFractionDigits: metric.decimals,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="border-2 border-ink bg-cream shadow-hard p-5 lift"
        >
            <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {metric.label}
            </p>
            <p className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-2">
                {metric.prefix}
                {formatted}
                {metric.suffix && (
                    <span className="text-lg md:text-xl align-baseline"> {metric.suffix}</span>
                )}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">{metric.sub}</p>
            <Sparkline points={metric.points} color={metric.color} delay={index * 0.08 + 0.2} />
        </motion.div>
    );
}

export function Metrics() {
    return (
        <section id="metrics" className="py-20 border-b-2 border-ink bg-card">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="font-mono text-sm font-bold text-coral mb-2">03.5 / METRICS</p>
                    <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-3">
                        Prod Numbers
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground">
                        // live-ish gauges from 2 years in production
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {metrics.map((metric, index) => (
                        <MetricPanel key={metric.label} metric={metric} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
