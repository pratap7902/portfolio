"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ACHIEVEMENTS: Record<string, string> = {
    "toggle-hacker": "🏆 mainframe breached",
    "fx-matrix": "🏆 saw the matrix",
    "fx-party": "🏆 party mode deployed",
};

const TOTAL_EGGS = Object.keys(ACHIEVEMENTS).length;
const TOAST_MS = 3500;

type Toast = {
    id: number;
    title: string;
    count: number;
};

function readUnlocked(): string[] {
    try {
        const raw = sessionStorage.getItem("cp-achievements");
        return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
        return [];
    }
}

export function Toasts() {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    React.useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        const unlock = (event: string) => () => {
            const unlocked = readUnlocked();
            if (unlocked.includes(event)) return;
            const next = [...unlocked, event];
            try {
                sessionStorage.setItem("cp-achievements", JSON.stringify(next));
            } catch {
                /* storage unavailable — toast may repeat, fine */
            }
            const id = Date.now() + Math.random();
            setToasts((t) => [
                ...t,
                { id, title: ACHIEVEMENTS[event], count: next.length },
            ]);
            timers.push(
                setTimeout(() => {
                    setToasts((t) => t.filter((toast) => toast.id !== id));
                }, TOAST_MS)
            );
        };

        const handlers = Object.keys(ACHIEVEMENTS).map(
            (event) => [event, unlock(event)] as const
        );
        handlers.forEach(([event, handler]) =>
            window.addEventListener(event, handler)
        );
        return () => {
            handlers.forEach(([event, handler]) =>
                window.removeEventListener(event, handler)
            );
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="fixed bottom-10 right-4 z-[120] flex flex-col items-end gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ x: "120%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "120%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="border-2 border-ink bg-acid text-ink font-mono text-xs font-bold px-4 py-3 shadow-hard"
                    >
                        <div>{toast.title}</div>
                        <div className="font-normal text-ink/60">
                            achievement unlocked · {toast.count}/{TOTAL_EGGS} eggs found
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
