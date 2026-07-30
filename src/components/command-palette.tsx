"use client";

import * as React from "react";
import posthog from "posthog-js";

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
        label: "Read the Blog / Field Notes",
        hint: "→",
        run: () => {
            window.location.href = "/blog";
        },
    },
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
    {
        label: "Enter the matrix",
        hint: "☂",
        run: () => window.dispatchEvent(new Event("fx-matrix")),
    },
    {
        label: "Party mode",
        hint: "🎉",
        run: () => window.dispatchEvent(new Event("fx-party")),
    },
    {
        label: "Toggle hacker mode",
        hint: "☠",
        run: () => window.dispatchEvent(new Event("toggle-hacker")),
    },
];

// Subsequence fuzzy match: every query char must appear in order in the label.
// Scores consecutive runs, word-boundary hits, and early first matches higher.
function fuzzyMatch(
    query: string,
    label: string
): { score: number; indices: number[] } | null {
    const q = query.toLowerCase();
    const l = label.toLowerCase();
    const indices: number[] = [];
    let score = 0;
    let prev = -2;
    let from = 0;
    for (const ch of q) {
        const idx = l.indexOf(ch, from);
        if (idx === -1) return null;
        score += 1;
        if (idx === prev + 1) score += 4; // consecutive match
        if (idx === 0 || /[\s\-—_./(]/.test(l[idx - 1])) score += 3; // word boundary
        indices.push(idx);
        prev = idx;
        from = idx + 1;
    }
    score -= indices[0] * 0.5; // prefer earlier first match
    return { score, indices };
}

// Render matched chars in bold on acid, merging adjacent indices into runs.
function renderLabel(label: string, indices: number[]): React.ReactNode {
    if (indices.length === 0) return label;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let i = 0;
    while (i < indices.length) {
        let j = i;
        while (j + 1 < indices.length && indices[j + 1] === indices[j] + 1) j++;
        const start = indices[i];
        const end = indices[j] + 1;
        if (start > last) parts.push(label.slice(last, start));
        parts.push(
            <b key={start} className="bg-acid">
                {label.slice(start, end)}
            </b>
        );
        last = end;
        i = j + 1;
    }
    if (last < label.length) parts.push(label.slice(last));
    return parts;
}

const RECENTS_KEY = "cp-palette-recents";

function readRecents(): string[] {
    try {
        const raw = window.localStorage.getItem(RECENTS_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed)
            ? parsed.filter((x): x is string => typeof x === "string").slice(0, 5)
            : [];
    } catch {
        return [];
    }
}

function pushRecent(label: string) {
    try {
        const next = [
            label,
            ...readRecents().filter((l) => l !== label),
        ].slice(0, 5);
        window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {
        // localStorage unavailable — recents just won't persist
    }
}

type Row = { action: Action; indices: number[] };
type Group = { heading: string | null; rows: Row[] };

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [active, setActive] = React.useState(0);
    const [recents, setRecents] = React.useState<string[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((prev) => {
                    if (!prev) posthog.capture("command_palette_opened", { trigger: "keyboard" });
                    return !prev;
                });
                setQuery("");
                setActive(0);
            }
            if (e.key === "Escape") setOpen(false);
        };
        const onOpen = () => {
            posthog.capture("command_palette_opened", { trigger: "button" });
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
        if (open) {
            setRecents(readRecents());
            inputRef.current?.focus();
        }
    }, [open]);

    if (!open) return null;

    let groups: Group[];
    if (query) {
        groups = [
            {
                heading: null,
                rows: ACTIONS.flatMap((action) => {
                    const m = fuzzyMatch(query, action.label);
                    return m ? [{ action, score: m.score, indices: m.indices }] : [];
                })
                    .sort((a, b) => b.score - a.score)
                    .map(({ action, indices }) => ({ action, indices })),
            },
        ];
    } else {
        const recentRows: Row[] = recents.flatMap((label) => {
            const action = ACTIONS.find((a) => a.label === label);
            return action ? [{ action, indices: [] }] : [];
        });
        const rest: Row[] = ACTIONS.filter(
            (a) => !recentRows.some((r) => r.action.label === a.label)
        ).map((action) => ({ action, indices: [] }));
        groups =
            recentRows.length > 0
                ? [
                      { heading: "RECENT", rows: recentRows },
                      { heading: "ALL", rows: rest },
                  ]
                : [{ heading: null, rows: rest }];
    }
    const flat = groups.flatMap((g) => g.rows);

    const runAction = (action: Action) => {
        posthog.capture("command_palette_action_executed", { action_label: action.label });
        pushRecent(action.label);
        setOpen(false);
        action.run();
    };

    let rowIndex = -1;

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
                                setActive((a) => Math.min(a + 1, flat.length - 1));
                            }
                            if (e.key === "ArrowUp") {
                                e.preventDefault();
                                setActive((a) => Math.max(a - 1, 0));
                            }
                            if (e.key === "Enter" && flat[active]) {
                                runAction(flat[active].action);
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
                    {flat.length === 0 && (
                        <li className="px-4 py-3 font-mono text-sm text-muted-foreground">
                            no results — this palette has fewer commands than the one that
                            won the hackathon
                        </li>
                    )}
                    {groups.map((group, gi) => (
                        <React.Fragment key={group.heading ?? gi}>
                            {group.heading && group.rows.length > 0 && (
                                <li className="px-4 pt-2 pb-1 font-mono text-[10px] font-bold tracking-widest text-muted-foreground">
                                    {group.heading}
                                </li>
                            )}
                            {group.rows.map(({ action, indices }) => {
                                rowIndex += 1;
                                const i = rowIndex;
                                return (
                                    <li key={action.label}>
                                        <button
                                            onMouseEnter={() => setActive(i)}
                                            onClick={() => runAction(action)}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 font-mono text-sm text-left ${i === active ? "bg-acid" : ""}`}
                                        >
                                            <span>{renderLabel(action.label, indices)}</span>
                                            <span className="text-xs font-bold opacity-60">
                                                {action.hint}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </React.Fragment>
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
