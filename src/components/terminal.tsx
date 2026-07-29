"use client";

import * as React from "react";

type Line = { text: string; kind: "out" | "cmd" };

const BANNER: Line[] = [
    { text: "$ curl -s api.pratap.dev/status", kind: "cmd" },
    { text: '{', kind: "out" },
    { text: '  "role": "SDE-2 @ UrbanPiper",', kind: "out" },
    { text: '  "focus": ["backend systems", "applied AI / agents"],', kind: "out" },
    { text: '  "in_prod": true, "open_to_work": true', kind: "out" },
    { text: '}', kind: "out" },
    { text: "type `help` to explore ↴", kind: "out" },
];

const HELP = [
    "available commands:",
    "  whoami      — who is this guy",
    "  stack       — tools I ship with",
    "  projects    — side quests",
    "  ls          — sections; `open <section>` to jump",
    "  resume      — grab the PDF",
    "  contact     — reach me",
    "  sudo hire-me — you know what to do",
    "  clear       — clean up",
];

const SECTIONS = ["about", "experience", "projects", "achievements", "contact"];

function run(raw: string): { out: string[]; effect?: () => void } {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return { out: [] };

    if (cmd === "help") return { out: HELP };
    if (cmd === "whoami")
        return {
            out: [
                "Chandra Pratap Singh Chauhan — Software Engineer II @ UrbanPiper, Bengaluru.",
                "Backend + applied AI. Event pipelines, ClickHouse, LLM agents in production.",
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
    if (cmd === "ls") return { out: [SECTIONS.map((s) => s + "/").join("  ")] };
    if (cmd.startsWith("open ") || cmd.startsWith("cd ")) {
        const target = cmd.split(/\s+/)[1]?.replace(/\/$/, "");
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
    if (cmd === "clear") return { out: ["__CLEAR__"] };
    if (cmd === "exit") return { out: ["nice try. there is no escape from the portfolio."] };
    return { out: [`command not found: ${cmd} — try \`help\``] };
}

export function Terminal() {
    const [lines, setLines] = React.useState<Line[]>(BANNER);
    const [input, setInput] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
    }, [lines]);

    const submit = () => {
        const { out, effect } = run(input);
        if (out[0] === "__CLEAR__") {
            setLines([]);
        } else {
            setLines((prev) => [
                ...prev,
                { text: `$ ${input}`, kind: "cmd" as const },
                ...out.map((text) => ({ text, kind: "out" as const })),
            ]);
        }
        setInput("");
        effect?.();
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
                <span className="font-mono text-xs font-bold ml-2 text-ink">
                    pratap@prod: ~ — this shell works, try it
                </span>
            </div>
            <div
                ref={bodyRef}
                className="h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
            >
                {lines.map((line, i) => (
                    <div
                        key={i}
                        className={line.kind === "cmd" ? "text-cream" : "text-acid"}
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
                        onKeyDown={(e) => e.key === "Enter" && submit()}
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
