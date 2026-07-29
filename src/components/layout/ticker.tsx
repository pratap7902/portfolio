const ITEMS = [
    "BACKEND ENGINEERING",
    "APPLIED AI",
    "CLICKHOUSE",
    "KAFKA",
    "RAG + PGVECTOR",
    "MCP",
    "CLAUDE AGENT SDK",
    "FASTAPI",
    "KUBERNETES",
    "EVENT-DRIVEN PIPELINES",
];

export function Ticker() {
    const strip = ITEMS.map((item) => `${item} ✦ `).join("");
    return (
        <div className="bg-ink text-acid border-y-2 border-ink overflow-hidden py-2 select-none">
            <div className="animate-marquee whitespace-nowrap font-mono text-sm font-semibold tracking-widest w-max">
                <span>{strip}</span>
                <span aria-hidden="true">{strip}</span>
            </div>
        </div>
    );
}
