"use client";

import * as React from "react";

export function Statusbar() {
    const [time, setTime] = React.useState("");

    React.useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                })
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t-2 border-ink font-mono text-[11px] font-semibold select-none">
            <div className="flex items-center gap-0 overflow-hidden whitespace-nowrap">
                <span className="bg-acid text-ink px-3 py-1.5 shrink-0">NORMAL</span>
                <span className="text-cream px-3 py-1.5 border-l border-cream/20">
                    ~/pratap/portfolio
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-cream px-3 py-1.5 border-l border-cream/20">
                    <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                    all systems operational
                </span>
                <button
                    onClick={() => window.dispatchEvent(new Event("open-palette"))}
                    className="hidden md:block text-cream px-3 py-1.5 border-l border-cream/20 hover:bg-coral transition-colors"
                >
                    ⌘K palette
                </button>
                <span className="flex-1" />
                <span className="text-cream px-3 py-1.5 border-l border-cream/20 shrink-0">
                    BLR {time} IST
                </span>
            </div>
        </div>
    );
}
