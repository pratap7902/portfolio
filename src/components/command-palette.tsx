"use client";

import * as React from "react";

type Action = {
    label: string;
    hint: string;
    run: () => void;
};

const scrollTo = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const ACTIONS: Action[] = [
    { label: "Go to About", hint: "01", run: scrollTo("about") },
    { label: "Go to Experience", hint: "02", run: scrollTo("experience") },
    { label: "Go to Projects", hint: "03", run: scrollTo("projects") },
    { label: "Go to Achievements", hint: "04", run: scrollTo("achievements") },
    { label: "Go to Contact", hint: "05", run: scrollTo("contact") },
    {
        label: "Open Resume (PDF)",
        hint: "↗",
        run: () => window.open("/resume.pdf", "_blank"),
    },
    {
        label: "GitHub — pratap7902",
        hint: "↗",
        run: () => window.open("https://github.com/pratap7902", "_blank"),
    },
    {
        label: "LinkedIn — pratap79",
        hint: "↗",
        run: () => window.open("https://linkedin.com/in/pratap79", "_blank"),
    },
    {
        label: "Copy email address",
        hint: "⧉",
        run: () => navigator.clipboard?.writeText("contact@singhpratap.dev"),
    },
    {
        label: "sudo hire-me",
        hint: "✓",
        run: () =>
            window.open(
                "mailto:contact@singhpratap.dev?subject=Let's%20talk",
                "_blank"
            ),
    },
];

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [active, setActive] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const results = ACTIONS.filter((a) =>
        a.label.toLowerCase().includes(query.toLowerCase())
    );

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => !o);
                setQuery("");
                setActive(0);
            }
            if (e.key === "Escape") setOpen(false);
        };
        const onOpen = () => {
            setOpen(true);
            setQuery("");
            setActive(0);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("open-palette", onOpen);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("open-palette", onOpen);
        };
    }, []);

    React.useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    if (!open) return null;

    const runAction = (action: Action) => {
        setOpen(false);
        action.run();
    };

    return (
        <div
            className="fixed inset-0 z-[100] bg-ink/60 flex items-start justify-center pt-[18vh] px-4"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-full max-w-lg border-2 border-ink bg-cream shadow-hard-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-2 border-b-2 border-ink px-4 py-3">
                    <span className="font-mono text-coral font-bold">❯</span>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setActive(0);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setActive((a) => Math.min(a + 1, results.length - 1));
                            }
                            if (e.key === "ArrowUp") {
                                e.preventDefault();
                                setActive((a) => Math.max(a - 1, 0));
                            }
                            if (e.key === "Enter" && results[active]) {
                                runAction(results[active]);
                            }
                        }}
                        placeholder="Type a command or search…"
                        className="flex-1 bg-transparent outline-none font-mono text-sm"
                        aria-label="command palette"
                    />
                    <kbd className="font-mono text-[10px] font-bold border border-ink px-1.5 py-0.5 bg-card">
                        ESC
                    </kbd>
                </div>
                <ul className="max-h-72 overflow-y-auto py-1">
                    {results.length === 0 && (
                        <li className="px-4 py-3 font-mono text-sm text-muted-foreground">
                            no results — this palette has fewer commands than the one that
                            won the hackathon
                        </li>
                    )}
                    {results.map((action, i) => (
                        <li key={action.label}>
                            <button
                                onMouseEnter={() => setActive(i)}
                                onClick={() => runAction(action)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 font-mono text-sm text-left ${i === active ? "bg-acid" : ""}`}
                            >
                                <span>{action.label}</span>
                                <span className="text-xs font-bold opacity-60">
                                    {action.hint}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="border-t-2 border-ink px-4 py-2 font-mono text-[10px] text-muted-foreground">
                    ↑↓ navigate · ↵ run — an homage to the MCP command palette that won
                    the Amazon Gen AI Hackathon
                </div>
            </div>
        </div>
    );
}
