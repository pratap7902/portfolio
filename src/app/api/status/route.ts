// The full resume, machine-readable. `curl -s singhpratap.dev/api/status`
const payload = {
    name: "Chandra Pratap Singh Chauhan",
    identity: "builder",
    owns: "tech × design × product",
    role: "SDE-2 @ UrbanPiper",
    title: "Software Engineer II (SDE-2)",
    company: "UrbanPiper Technologies Pvt Ltd",
    location: "Bengaluru, India",
    focus: ["backend systems", "applied AI / agents"],
    in_prod: true,
    summary:
        "Builder who owns tech × design × product end to end. Specializes in backend systems and applied AI — event-driven pipelines, ClickHouse analytics, distributed-system consistency, and LLM/RAG in production. Solo-delivered company-wide platforms (engineering on-call intelligence, real-time store-availability analytics) running at scale.",
    experience: [
        {
            role: "Software Engineer II",
            company: "UrbanPiper",
            period: "Oct 2025 – present",
            location: "Bengaluru, India",
            highlights: [
                "Designed and built, solo, a company-wide AI incident-response system: structured Slack incident intake with automatic routing, GitHub integration tying each incident to its fix, and a RAG pipeline (pgvector embeddings, LLM reranking, log retrieval via a Kibana MCP server) that surfaces similar past incidents to cut time-to-resolution.",
                "Built a coding agent on the Claude Agent SDK that triages critical Sentry alerts, localizes the fault in the codebase, and opens a reviewable PR with a candidate fix — a human-in-the-loop workflow where nothing deploys without engineer review.",
                "Built Janus — a dispute-recovery automation service for delivery-aggregator merchant portals (DoorDash, Uber Eats): browser + API automation (Playwright) that files order disputes end to end, guided by a calibrated win-probability model that prioritizes filings under monthly quota limits.",
                "Built store uptime/downtime analytics from scratch on ClickHouse (AggregatingMergeTree materialized views) plus the real-time availability layer over a Menu Analyzer processing ~1.5M items / 30 min, with hierarchical schedule evaluation and multi-aggregator correctness fixes.",
                "Automated store remediation with an 'Always-On' recovery layer (anti-flap cooldowns, audited state machine) — 523 successful auto-recoveries and ~$10,200 in revenue saved for merchants to date.",
                "Built cross-service sync over Kafka event streaming for real-time multi-service consistency, replacing brittle point-to-point updates; debugged stuck consumers and ETL pods on Kubernetes.",
            ],
        },
        {
            role: "Software Engineer I",
            company: "UrbanPiper",
            period: "Jul 2024 – Oct 2025",
            location: "Bengaluru, India",
            highlights: [
                "Built a merchant onboarding service that cut average go-live time from ~17 days to ~4 and onboarded ~260 clients — using Hasura to auto-expose a GraphQL layer over Postgres, eliminating hand-written CRUD APIs.",
                "Architected the alerting system from scratch (event gathering, roll-up, and firing) so merchants get real-time, de-duplicated notifications of store/item issues.",
                "Led the Python 3.6 → 3.9 upgrade of a large legacy service, resolving dependency, syntax, and library-compatibility breakage across the codebase.",
                "Resolved 90+ production issues and service requests on the engineering on-call rotation across reporting, analytics, and reconciliation pipelines for enterprise brands in India, the UK, and MENA — including diagnosing silent ingestion data loss and running safe backfills.",
                "Delivered Atlas (React) features end to end — a global command palette (PIP) with fuzzy search (~1,150 opens, ~500 in-product navigations) — plus menu-platform APIs (access control, MENA Menu V2, Lightspeed POS OAuth).",
            ],
        },
    ],
    metrics: {
        store_recoveries: 523,
        revenue_saved_usd: 10208,
        items_analyzed_per_30_min: 1500000,
        merchants_onboarded: 260,
        merchant_go_live_days: { before: 17, after: 4 },
        oncall_issues_resolved: "90+",
        ai_systems_in_prod: 3,
        github_contributions: "GET /api/github-stats",
    },
    skills: {
        languages: {
            proficient: ["python", "javascript", "sql"],
            familiar: ["shell", "html", "css"],
        },
        databases: ["clickhouse", "postgresql/pgvector", "mongodb", "elasticsearch", "redis", "mysql"],
        frameworks: ["fastapi", "react", "playwright", "hasura (graphql)", "django"],
        platforms: ["kubernetes", "docker", "kafka", "github & slack apis", "grafana", "kibana/elk", "sentry", "posthog"],
        ai_llm: [
            "agents & tool calling (claude agent sdk, claude code)",
            "rag (pgvector, embeddings, llm reranking)",
            "mcp (built servers & clients)",
            "prompt engineering",
            "evaluation & calibrated scoring",
        ],
    },
    projects: [
        {
            name: "Cognify",
            what: "RAG platform generating adaptive, conversational assessments from uploaded documents (SOPs/guidelines), with real-time LLM evaluation of candidate answers",
            url: "https://cognify.singhpratap.dev",
        },
        {
            name: "Powframe",
            what: "AI comic-generation platform transforming stories into comic panels — multiple layouts, style customization, context-aware narrative flow",
            url: "https://powframe.com",
        },
        {
            name: "Marudhar Resorts",
            what: "website + custom Property Management System (PMS) for a working resort, in active production use",
            url: "https://www.marudharresorts.com",
        },
    ],
    education: {
        degree: "Bachelor of Engineering, Computer Science",
        institution: "VTU",
        period: "2020 – 2024",
    },
    achievements: [
        "Amazon Gen AI Hackathon — Winner (engineered an MCP-backed command palette with global fuzzy search, keyboard navigation, and analytics tracking)",
    ],
    links: {
        email: "contact@singhpratap.dev",
        github: "https://github.com/pratap7902",
        linkedin: "https://linkedin.com/in/pratap79",
        website: "https://www.singhpratap.dev",
        resume: "https://www.singhpratap.dev/resume.pdf",
    },
    endpoints: {
        self: "GET /api/status",
        github_stats: "GET /api/github-stats",
    },
    easter_eggs: "on the homepage: `help` in the terminal, ⌘K, the konami code, `sudo su`",
    uptime: "since jul 2024",
    hire: {
        contact: "contact@singhpratap.dev",
        hint: "no POST required — just email",
    },
};

export async function GET() {
    return new Response(JSON.stringify(payload, null, 2), {
        headers: {
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
            "x-hire-me": "true",
            "x-powered-by": "coffee and clickhouse",
        },
    });
}
