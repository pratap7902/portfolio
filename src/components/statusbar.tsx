"use client";

import * as React from "react";

const SECTIONS = ["about", "experience", "projects", "achievements", "contact"];

export function Statusbar() {
    const [time, setTime] = React.useState("");
    const [mode, setMode] = React.useState<"NORMAL" | "INSERT">("NORMAL");
    const [section, setSection] = React.useState("");
    const [scrollPct, setScrollPct] = React.useState(0);
    const [root, setRoot] = React.useState(false);
    const [sound, setSound] = React.useState(false);

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

    // vim mode: INSERT while any input is focused
    React.useEffect(() => {
        const onFocusIn = (e: FocusEvent) => {
            const tag = (e.target as Element | null)?.tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") setMode("INSERT");
        };
        const onFocusOut = () => setMode("NORMAL");
        document.addEventListener("focusin", onFocusIn);
        document.addEventListener("focusout", onFocusOut);
        return () => {
            document.removeEventListener("focusin", onFocusIn);
            document.removeEventListener("focusout", onFocusOut);
        };
    }, []);

    // track current section like a vim filename
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setSection(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );
        SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // scroll percentage, like vim's ruler
    React.useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // reflect sound state (default muted)
    React.useEffect(() => {
        const onSound = (e: Event) =>
            setSound(Boolean((e as CustomEvent<boolean>).detail));
        window.addEventListener("sound-changed", onSound);
        return () => window.removeEventListener("sound-changed", onSound);
    }, []);

    // reflect hacker mode
    React.useEffect(() => {
        const onToggle = () =>
            setRoot(document.documentElement.classList.contains("hacker"));
        window.addEventListener("toggle-hacker", onToggle);
        return () => window.removeEventListener("toggle-hacker", onToggle);
    }, []);

    const pct =
        scrollPct === 0 ? "TOP" : scrollPct >= 99 ? "BOT" : `${scrollPct}%`;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t-2 border-ink font-mono text-[11px] font-semibold select-none">
            <div className="flex items-center gap-0 overflow-hidden whitespace-nowrap">
                <span
                    className={`px-3 py-1.5 shrink-0 text-ink ${mode === "INSERT" ? "bg-coral" : "bg-acid"}`}
                >
                    {mode}
                </span>
                <span className="text-cream px-3 py-1.5 border-l border-cream/20">
                    {root ? "root@pratap" : "~/pratap/portfolio"}
                    {section ? `/#${section}` : ""}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-cream px-3 py-1.5 border-l border-cream/20">
                    <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                    {root ? "mainframe breached" : "all systems operational"}
                </span>
                <button
                    onClick={() => window.dispatchEvent(new Event("open-palette"))}
                    className="hidden md:block text-cream px-3 py-1.5 border-l border-cream/20 hover:bg-coral transition-colors"
                >
                    ⌘K palette
                </button>
                <button
                    onClick={() => window.dispatchEvent(new Event("toggle-sound"))}
                    className="hidden md:block text-cream px-3 py-1.5 border-l border-cream/20 hover:bg-coral transition-colors"
                >
                    {sound ? "🔊 sfx" : "🔇 sfx"}
                </button>
                <span className="flex-1" />
                <span className="hidden sm:block text-cream px-3 py-1.5 border-l border-cream/20 shrink-0">
                    {pct}
                </span>
                <span className="text-cream px-3 py-1.5 border-l border-cream/20 shrink-0">
                    BLR {time} IST
                </span>
            </div>
        </div>
    );
}
