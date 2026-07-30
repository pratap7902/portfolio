"use client";

import * as React from "react";
import posthog from "posthog-js";

type Line = { text: string; kind: "out" | "cmd" };

const BANNER: Line[] = [
    { text: "$ curl -sL singhpratap.dev/api/status | jq '{role, focus, identity, owns}'", kind: "cmd" },
    { text: '{', kind: "out" },
    { text: '  "role": "SDE-2 @ UrbanPiper",', kind: "out" },
    { text: '  "focus": ["backend systems", "applied AI / agents"],', kind: "out" },
    { text: '  "identity": "builder", "owns": "tech × design × product"', kind: "out" },
    { text: '}', kind: "out" },
    { text: "(that endpoint is real — full resume as JSON)", kind: "out" },
    { text: "type `help` to explore ↴", kind: "out" },
];

const HELP = [
    "available commands:",
    "  whoami      — who is this guy",
    "  neofetch    — system info, but make it personal",
    "  stack       — tools I ship with",
    "  projects    — side quests",
    "  ls          — sections; `open <section>` to jump",
    "  resume      — grab the PDF",
    "  contact     — reach me",
    "  blog        — field notes / write-ups",
    "  gh          — live github activity",
    "  sudo hire-me — you know what to do",
    "  clear       — clean up",
    "…and a few hidden ones. (hint: matrix, party, sudo su, ↑↑↓↓←→←→BA)",
];

const NEOFETCH = [
    " ██████╗ ██████╗",
    "██╔════╝ ██╔══██╗",
    "██║      ██████╔╝",
    "██║      ██╔═══╝",
    "╚██████╗ ██║",
    " ╚═════╝ ╚═╝",
    "pratap@urbanpiper",
    "─────────────────",
    "os:     fullstack builder 24.7 LTS",
    "kernel: python + clickhouse",
    "shell:  fastapi / kafka / k8s",
    "de:     neo-brutalism",
    "agents: claude-sdk (prod)",
    "scope:  tech × design × product",
    "uptime: jul 2024 → now",
];

const COMMANDS = [
    "help", "whoami", "neofetch", "stack", "projects", "ls", "open",
    "resume", "contact", "blog", "gh", "clear", "matrix", "party", "sudo hire-me", "sudo su",
];

const SECTIONS = ["about", "experience", "projects", "achievements", "contact"];

type GhEvent = {
    type: string;
    repo: { name: string };
    payload: { size?: number; commits?: unknown[]; action?: string; ref_type?: string };
};

type GhProfile = {
    login: string;
    public_repos: number;
    created_at: string;
};

type GhStats = {
    window: string;
    commits: number;
    prs: number;
    reviews: number;
    private_contributions: number | null;
    total_contributions: number | null;
};

async function fetchGithubActivity(): Promise<string[]> {
    const [profileRes, res, statsRes] = await Promise.all([
        fetch("https://api.github.com/users/pratap7902"),
        fetch("https://api.github.com/users/pratap7902/events/public"),
        fetch("/api/github-stats"),
    ]);
    if (!res.ok) throw new Error(`github api ${res.status}`);
    const events: GhEvent[] = await res.json();
    const lines: string[] = [];
    if (profileRes.ok) {
        const profile: GhProfile = await profileRes.json();
        const since = new Date(profile.created_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        }).toLowerCase();
        lines.push(
            `${profile.login} · ${profile.public_repos} public repos · on github since ${since}`
        );
    }
    if (statsRes.ok) {
        const stats: GhStats = await statsRes.json();
        if (stats.total_contributions !== null) {
            lines.push(
                `${stats.total_contributions.toLocaleString()} contributions (${stats.window}, private included)`
            );
        } else {
            lines.push(`commits: ${stats.commits} · prs: ${stats.prs} (${stats.window})`);
        }
    }
    if (lines.length > 0) lines.push("──────────");
    for (const ev of events) {
        if (lines.length >= 8) break;
        const repo = ev.repo.name.replace(/^pratap7902\//, "");
        if (ev.type === "PushEvent") {
            const n = ev.payload.size ?? ev.payload.commits?.length ?? 0;
            lines.push(n > 0 ? `push  → ${repo} (${n} commit${n === 1 ? "" : "s"})` : `push  → ${repo}`);
        } else if (ev.type === "WatchEvent") {
            lines.push(`star  → ${repo}`);
        } else if (ev.type === "PullRequestEvent") {
            lines.push(`pr    → ${repo} (${ev.payload.action ?? "updated"})`);
        } else if (ev.type === "CreateEvent") {
            lines.push(`new   → ${repo} (${ev.payload.ref_type ?? "repo"})`);
        } else if (ev.type === "IssuesEvent") {
            lines.push(`issue → ${repo} (${ev.payload.action ?? "updated"})`);
        }
    }
    if (lines.length === 0) lines.push("no recent public activity");
    return [...lines, "…live from the github api"];
}

function run(raw: string): { out: string[]; effect?: () => void; async?: Promise<string[]> } {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return { out: [] };

    if (cmd === "help") return { out: HELP };
    if (cmd === "whoami")
        return {
            out: [
                "Chandra Pratap Singh Chauhan — builder. SDE-2 @ UrbanPiper, Bengaluru.",
                "owns tech × design × product. specializes in backend + applied AI.",
            ],
        };
    if (cmd === "stack")
        return {
            out: [
                "python · fastapi · clickhouse · kafka · postgres/pgvector · kubernetes",
                "rag · mcp · claude-agent-sdk · playwright · react",
            ],
        };
    if (cmd === "projects")
        return {
            out: [
                "cognify   — AI assessments w/ real-time LLM evaluation → cognify.singhpratap.dev",
                "powframe  — story → comic panels → powframe.com",
                "marudhar  — resort website + custom PMS → marudharresorts.com",
            ],
        };
    if (cmd === "ls")
        return { out: [[...SECTIONS, "blog"].map((s) => s + "/").join("  ")] };
    if (cmd.startsWith("open ") || cmd.startsWith("cd ")) {
        const target = cmd.split(/\s+/)[1]?.replace(/\/$/, "");
        if (target === "blog")
            return {
                out: ["cd ~/blog ...", "opening field notes ..."],
                effect: () => {
                    window.location.href = "/blog";
                },
            };
        if (target && SECTIONS.includes(target))
            return {
                out: [`navigating to #${target} ...`],
                effect: () =>
                    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }),
            };
        return { out: [`no such section: ${target ?? ""} — try \`ls\``] };
    }
    if (cmd === "resume")
        return {
            out: ["opening resume.pdf ..."],
            effect: () => window.open("/resume.pdf", "_blank"),
        };
    if (cmd === "blog")
        return {
            out: ["cd ~/blog ...", "opening field notes ..."],
            effect: () => {
                window.location.href = "/blog";
            },
        };
    if (cmd === "contact")
        return {
            out: [
                "email    → contact@singhpratap.dev",
                "github   → github.com/pratap7902",
                "linkedin → linkedin.com/in/pratap79",
            ],
        };
    if (cmd === "sudo hire-me" || cmd === "sudo hire me")
        return {
            out: ["[sudo] permission granted ✓", "drafting email ..."],
            effect: () =>
                window.open("mailto:contact@singhpratap.dev?subject=Let's%20talk", "_blank"),
        };
    if (cmd === "gh")
        return {
            out: ["fetching live github activity ..."],
            async: fetchGithubActivity(),
        };
    if (cmd === "clear") return { out: ["__CLEAR__"] };
    if (cmd === "neofetch") return { out: NEOFETCH };
    if (cmd === "matrix")
        return {
            out: ["wake up, neo ..."],
            effect: () => window.dispatchEvent(new Event("fx-matrix")),
        };
    if (cmd === "party")
        return {
            out: ["🎉 deploying confetti to production (no rollback plan)"],
            effect: () => window.dispatchEvent(new Event("fx-party")),
        };
    if (cmd === "sudo su" || cmd === "hack") {
        const inMainframe = document.documentElement.classList.contains("hacker");
        return {
            out: inMainframe
                ? ["logging out of the mainframe ... welcome back to the surface."]
                : ["root access granted. entering the mainframe ...", "(run `sudo su` again to log out)"],
            effect: () => window.dispatchEvent(new Event("toggle-hacker")),
        };
    }
    if (cmd === "exit") return { out: ["nice try. there is no escape from the portfolio."] };
    return { out: [`command not found: ${cmd} — try \`help\``] };
}

export function Terminal({ compact = false }: { compact?: boolean }) {
    const [lines, setLines] = React.useState<Line[]>(BANNER);
    const [input, setInput] = React.useState("");
    const [history, setHistory] = React.useState<string[]>([]);
    const [histIdx, setHistIdx] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    }, [lines]);

    const submit = () => {
        const cmd = input.trim().toLowerCase();
        if (cmd) posthog.capture("terminal_command_executed", { command: cmd });
        const { out, effect, async: pending } = run(input);
        if (out[0] === "__CLEAR__") {
            setLines([]);
        } else {
            setLines((prev) => [
                ...prev,
                { text: `$ ${input}`, kind: "cmd" as const },
                ...out.map((text) => ({ text, kind: "out" as const })),
            ]);
        }
        if (pending) {
            pending
                .catch(() => ["github api unreachable — rate limited? try later"])
                .then((extra) =>
                    setLines((prev) => [
                        ...prev,
                        ...extra.map((text) => ({ text, kind: "out" as const })),
                    ])
                );
        }
        if (input.trim()) setHistory((h) => [input, ...h]);
        setHistIdx(-1);
        setInput("");
        effect?.();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") submit();
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = Math.min(histIdx + 1, history.length - 1);
            if (history[next]) {
                setHistIdx(next);
                setInput(history[next]);
            }
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = histIdx - 1;
            setHistIdx(Math.max(next, -1));
            setInput(next < 0 ? "" : history[next]);
        }
        if (e.key === "Tab") {
            e.preventDefault();
            const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
            if (input && match) setInput(match);
        }
    };

    return (
        <div
            className="w-full max-w-md border-2 border-ink bg-ink shadow-hard-lg rotate-2 lift cursor-text"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex items-center gap-1.5 border-b-2 border-ink bg-cream px-3 py-2">
                <span className="w-3 h-3 rounded-full bg-coral border border-ink" />
                <span className="w-3 h-3 rounded-full bg-acid border border-ink" />
                <span className="w-3 h-3 rounded-full bg-blueberry border border-ink" />
                <span className="font-mono text-xs font-bold ml-2">
                    {compact ? "pratap@prod: ~" : "pratap@prod: ~ — this shell works, try it"}
                </span>
            </div>
            <div
                ref={bodyRef}
                className={`${compact ? "h-56" : "h-72"} overflow-y-auto p-4 font-mono text-xs leading-relaxed`}
            >
                {lines.map((line, i) => (
                    <div
                        key={i}
                        className={`whitespace-pre-wrap ${line.kind === "cmd" ? "text-cream" : "text-acid"}`}
                    >
                        {line.text}
                    </div>
                ))}
                <div className="flex text-cream">
                    <span className="shrink-0">$&nbsp;</span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        className="flex-1 bg-transparent outline-none text-cream caret-transparent min-w-0"
                        aria-label="terminal input"
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span className="text-acid animate-blink -ml-1">▌</span>
                </div>
            </div>
        </div>
    );
}
