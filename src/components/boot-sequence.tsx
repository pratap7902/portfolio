"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

// First-ever visit: the full 8s spectacle.
const FULL_BOOT = {
    lines: [
        "PRATAP-BIOS v2.4 — initializing…",
        "cpu: 1x overclocked human (bengaluru edition)",
        "mem: 2yrs of production scar tissue … ok",
        "mounting /dev/backend … ok",
        "mounting /dev/frontend … ok",
        "starting clickhouse … ok",
        "starting kafka consumers … [3/3] ok",
        "connecting pgvector … ok",
        "loading llm agents … ok",
        "calibrating win-probability model … 90.2%",
        "applying hard shadows … ok",
        "hydrating neo-brutalism … ok",
        "establishing uplink to github … ok",
        "boot complete. welcome.",
    ],
    intervalMs: 545,
    holdMs: 400,
};

// Repeat visits: warm boot, ~2s.
const WARM_BOOT = {
    lines: [
        "PRATAP-BIOS v2.4 — warm boot",
        "cache: still hot … ok",
        "services: already running … ok",
        "boot complete. welcome back.",
    ],
    intervalMs: 400,
    holdMs: 350,
};

const BOOTED_KEY = "cp-booted";

export function BootSequence() {
    const [boot, setBoot] = React.useState<typeof FULL_BOOT | null>(null);
    const [lineCount, setLineCount] = React.useState(0);

    const finish = React.useCallback(() => {
        setBoot(null);
    }, []);

    // Runs on every page load; full sequence only the first time ever
    // (client-side only; SSR renders null)
    React.useEffect(() => {
        let seenBefore = false;
        try {
            seenBefore = localStorage.getItem(BOOTED_KEY) === "1";
            localStorage.setItem(BOOTED_KEY, "1");
        } catch {
            /* storage unavailable — treat as repeat visit, keep it short */
            seenBefore = true;
        }
        setBoot(seenBefore ? WARM_BOOT : FULL_BOOT);
    }, []);

    // Type out lines, then fade
    React.useEffect(() => {
        if (!boot) return;
        const typer = setInterval(() => {
            setLineCount((n) => {
                if (n >= boot.lines.length) {
                    clearInterval(typer);
                    return n;
                }
                return n + 1;
            });
        }, boot.intervalMs);
        const done = setTimeout(
            finish,
            boot.intervalMs * boot.lines.length + boot.holdMs
        );
        return () => {
            clearInterval(typer);
            clearTimeout(done);
        };
    }, [boot, finish]);

    // Any click or keypress skips instantly
    React.useEffect(() => {
        if (!boot) return;
        window.addEventListener("keydown", finish);
        window.addEventListener("click", finish);
        return () => {
            window.removeEventListener("keydown", finish);
            window.removeEventListener("click", finish);
        };
    }, [boot, finish]);

    return (
        <AnimatePresence>
            {boot && (
                <motion.div
                    key="boot"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[400] bg-ink font-mono text-acid text-xs sm:text-sm cursor-pointer"
                    aria-hidden="true"
                >
                    <div className="p-6 sm:p-10 space-y-1">
                        {boot.lines.slice(0, lineCount).map((line) => (
                            <div key={line}>
                                <span className="text-acid/50">&gt; </span>
                                {line}
                            </div>
                        ))}
                        <span className="inline-block w-2 h-4 bg-acid animate-pulse align-text-bottom" />
                    </div>
                    <div className="absolute bottom-6 left-6 sm:left-10 text-acid/40 text-[11px]">
                        press any key to skip
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
