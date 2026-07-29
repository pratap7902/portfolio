// Blog posts. Each post is structured as ordered blocks so rendering stays
// uniform and on-theme. Keep everything vendor-neutral — no client, partner,
// or employer names; no live endpoints, IDs, or secrets.

export type Block =
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "code"; lang?: string; text: string }
    | { type: "quote"; text: string }
    | { type: "ul"; items: string[] };

export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string; // ISO
    readingMinutes: number;
    tags: string[];
    blocks: Block[];
};

export const posts: Post[] = [
    {
        slug: "the-rise-of-the-builder",
        title: "The handoff is the tax: why development is collapsing into the builder",
        description:
            "For decades we split building software across specialists and paid for it in handoffs. The tooling that forced those splits is dissolving. I think the next unit of software work is one person owning the whole loop — ideation to adoption — and companies should be racing to enable it.",
        date: "2026-07-30",
        readingMinutes: 8,
        tags: ["opinion", "builder", "platform-engineering", "future-of-work"],
        blocks: [
            {
                type: "p",
                text: "For most of software's history we built it like a factory line. An idea was handed to a product manager, who handed a spec to a designer, who handed mockups to a backend engineer, who handed an API to a frontend engineer, who handed a build to QA, who handed a release to an ops team, who handed a running system to whoever watched the dashboards — and adoption was somebody else's problem entirely. Each seam was a role, and each role was a genuine specialty. I think that model is quietly ending, and the thing replacing it is a single person who owns the entire loop.",
            },
            {
                type: "quote",
                text: "Every handoff in that chain is a tax. It's a queue, a re-explanation, and a loss of context. The specialization was never the goal — it was the price we paid because touching each layer used to be genuinely hard. That price is collapsing.",
            },
            { type: "h", text: "Why we specialized in the first place" },
            {
                type: "p",
                text: "The assembly line wasn't a mistake. It existed because each layer demanded deep, hard-won expertise and unforgiving tools. Standing up infrastructure meant racking servers or wrestling with raw cloud primitives. Shipping a UI that didn't look amateur took a trained designer. Getting to production safely required people whose whole job was release engineering. No one could hold all of it at once, so we cut the work along the lines of expertise — and then, per Conway's Law, our systems and org charts grew to mirror those cuts.",
            },
            {
                type: "p",
                text: "The cost was coordination. A feature that's a day of actual work can take three weeks of calendar time, almost all of it spent waiting in someone else's queue and re-establishing context that was clear in one head and blurry by the third handoff. We accepted that overhead because the alternative — one person doing all of it — meant one person being expert at all of it, which was impossible.",
            },
            { type: "h", text: "What actually changed" },
            {
                type: "p",
                text: "It stopped being impossible. Not because people got smarter, but because the cost of touching each layer fell through the floor, mostly in the last few years:",
            },
            {
                type: "ul",
                items: [
                    "Infrastructure became self-serve. Managed platforms, serverless, and infrastructure-as-code turned 'file a ticket with ops' into a few lines you write yourself.",
                    "Design got democratized. Component libraries, design systems, and good defaults mean a competent engineer can ship something that looks intentional without a dedicated designer for every screen.",
                    "AI coding agents compressed implementation. The gap between 'I can architect this' and 'I can also write the parts I'm rusty at' shrank dramatically. A backend engineer can now hold their own on the frontend, and vice versa, with an agent covering the unfamiliar ground.",
                    "Observability and deployment became code. Feature flags, one-command deploys, dashboards-as-config, and alerting-as-code mean shipping and watching your own service no longer requires a separate priesthood.",
                ],
            },
            {
                type: "p",
                text: "Put together, these don't make any single layer trivial — they make it feasible for one motivated person to be competent across all of them, and expert where it counts, with tooling absorbing the rest. That's the unlock. The builder isn't someone who is senior at seven disciplines. They're someone who owns the outcome and has finally been handed tools good enough to carry the whole loop without drowning.",
            },
            { type: "h", text: "This isn't a new dream — it's a newly affordable one" },
            {
                type: "p",
                text: "The idea has strong precedent. Amazon institutionalized 'you build it, you run it' two decades ago, deliberately collapsing the wall between writing software and operating it. Netflix wrote about the 'full-cycle developer' who owns a service from design through operation, and was explicit about the catch: it only works when a platform team makes the hard parts easy. The instinct has been around for years. What's new is that the enabling tooling has finally caught up to the ambition, so this stops being a privilege of elite engineering orgs and becomes available to a solo builder on a normal team.",
            },
            {
                type: "p",
                text: "I'll admit my bias plainly: I've delivered platforms end to end this way — carrying something from a rough idea through design, implementation, deployment, and then watching it in production and pushing its adoption — and the compression is real. The feedback loop between 'I had a thought' and 'users are using it and I can see the graph move' is short enough that the work feels different in kind, not just in speed. When the person who imagined it is the same person watching the dashboard, nothing gets lost in translation because there's no translation.",
            },
            { type: "h", text: "The metric of success just moved" },
            {
                type: "p",
                text: "Here's the deeper shift underneath all of this. When building was expensive, the scarce, valuable skill was building well — and so we measured engineers by the craft of the artifact. How clean is the code? How elegant the abstraction? That made sense when writing the thing was the hard, slow, costly part. But building is getting cheap. Iteration that used to cost a sprint now costs an afternoon; the second, third, and tenth version are nearly free. When the cost of producing and re-producing software falls this far, sky is the limit on how much you can try — and the bottleneck stops being production and becomes judgment.",
            },
            {
                type: "quote",
                text: "The old measure of a great engineer was how good the code they wrote was. The new measure is how much impact what they built creates for the end customer. Code was never the point; it was the expensive means. Now that the means is cheap, we can finally be honest that the outcome was always the goal.",
            },
            {
                type: "p",
                text: "This reframes the whole builder argument. Owning the loop end to end isn't about being a coding machine across seven disciplines — it's about being the person who keeps the customer's outcome in view through every layer, and uses cheap, fast iteration to chase it. If your beautiful code ships something nobody adopts, that used to be forgivable because the code was hard. It isn't hard anymore. What's hard, and now rare, is knowing what's worth building and reading whether it actually landed. That's the skill the era rewards.",
            },
            { type: "h", text: "Foresight gives way to the loop" },
            {
                type: "p",
                text: "There's a practical consequence that changes how the work feels day to day. When building was expensive, getting it wrong was expensive, so the prized skill was foresight — architect it all upfront, anticipate every edge case, design the system so completely that you'd never have to unwind a bad decision. Big design up front wasn't dogma; it was rational insurance against a costly mistake.",
            },
            {
                type: "p",
                text: "Cheap iteration inverts that. When v0 costs an afternoon and rewriting it costs another, trying to foresee every issue is worse than useless — it's slower than just finding out. So the work becomes less about predicting the future and more about reacting to what actually shipped. It gets retrospective rather than far-sighted: you don't speculate about what might go wrong, you get v0 in front of reality, watch what really breaks, and fix that. Get v0 out, measure, iterate, repeat. The loop replaces the plan.",
            },
            {
                type: "quote",
                text: "Ship v0. Watch reality. Iterate. Reality is a better architect than your upfront guesses — and now it's cheap enough to just ask it.",
            },
            {
                type: "p",
                text: "This isn't license to stop thinking. The genuinely irreversible decisions — your data model, security posture, public contracts — still deserve real foresight, because those are the ones the loop can't cheaply undo. But for the vast majority of the work, a fast, honest loop beats a slow, clever plan. The builder's edge isn't seeing further than everyone else; it's closing the loop faster than everyone else.",
            },
            { type: "h", text: "The honest caveats" },
            {
                type: "p",
                text: "I'm not claiming specialists are obsolete — that would be the lazy, hype version of this argument, and it's wrong. Deep expertise still wins where the problem is genuinely hard: novel infrastructure at scale, security, performance at the limit, the gnarly core of a domain. The builder model fits a specific and large class of work — zero-to-one products, internal tools, features, most of what most teams ship most of the time. The right mental model is a builder who goes deep in one or two areas and wide across the rest, and who knows exactly when to pull in a specialist rather than fake it.",
            },
            {
                type: "ul",
                items: [
                    "Cognitive load is the real ceiling. One person owning everything can become one person overwhelmed by everything. The load has to be managed deliberately, not assumed away.",
                    "Breadth can decay into shallowness. Owning the whole loop is not license to do every part badly; the bar for each layer still has to be met, with tools and review closing the gap.",
                    "Some gates must stay gates. Security and certain compliance reviews aren't handoff tax to be eliminated — they're load-bearing. The art is removing the coordination overhead that adds no safety while keeping the checks that do.",
                ],
            },
            { type: "h", text: "What companies should actually do" },
            {
                type: "p",
                text: "If the builder is the emerging unit of work, then the highest-leverage thing a company can do is engineer its environment so that builders can exist without burning out. That is mostly a platform problem, and it's the opposite of hiring a person for every seam:",
            },
            {
                type: "ul",
                items: [
                    "Build paved roads, not ticket queues. A platform team's job is to make the safe path the easy path — self-serve infra, golden templates, one-command deploys — so a builder never files a ticket to do routine work.",
                    "Prefer guardrails over gates. Replace approval bottlenecks with automated policy, sane defaults, and blast-radius limits. Let people move fast inside boundaries you've made safe, instead of making them wait for permission.",
                    "Make ownership real: you build it, you run it. Give builders production access, on-call for what they ship, and the observability to hold it — ownership without the keys is just blame.",
                    "Invest in AI and internal tooling as first-class leverage. Every hour of a builder's unfamiliar-layer work that tooling can absorb is an hour returned to the outcome.",
                    "Measure impact, not output. Reward the customer outcome a builder created, not the volume or even the craft of the code they wrote. When building is cheap, lines shipped and tickets closed are noise; adoption and impact are the signal. Promote on that, or Conway's Law will quietly rebuild the assembly line you were trying to dissolve.",
                ],
            },
            {
                type: "p",
                text: "The companies that win the next decade won't be the ones with the most specialists per seam. They'll be the ones whose platforms make it feasible for a single motivated person to take an idea all the way to adopted, running software — and who then get out of that person's way. The handoff was always the tax. We finally have the tools to stop paying it.",
            },
        ],
    },
    {
        slug: "the-outage-that-taught-me-kubernetes",
        title: "The incident I couldn't follow — and how it made me learn Kubernetes",
        description:
            "Early in my career, a routine cluster upgrade took production down and I understood almost none of the words flying past in the incident channel. That discomfort is the best thing that happened to my engineering.",
        date: "2026-07-29",
        readingMinutes: 7,
        tags: ["kubernetes", "learning", "incidents", "career"],
        blocks: [
            {
                type: "p",
                text: "Not long into my first engineering job, I watched a routine maintenance task take production down, and I sat there unable to follow the conversation about how to bring it back. That afternoon did more for my growth than any course I'd taken. This is a post about the value of being the least knowledgeable person in the incident channel — and what I did with that feeling afterwards.",
            },
            {
                type: "p",
                text: "The task was supposed to be boring: upgrade the version of our managed Kubernetes cluster. Control-plane version bumps are the kind of thing you schedule for a quiet window and expect to be a non-event. This one wasn't. The control plane came up fine, but the machines that actually run the workloads didn't reattach cleanly — and for a stretch, traffic couldn't reach services that were, by every dashboard I knew how to read, 'up.'",
            },
            {
                type: "quote",
                text: "Everything I thought I understood about 'the service is running' quietly fell apart. The pods were healthy. The nodes were healthy. And nothing worked. I had no vocabulary for the gap in between.",
            },
            { type: "h", text: "Being the person who doesn't get it" },
            {
                type: "p",
                text: "The senior engineers moved fast and calmly. They talked about the data plane versus the control plane, nodes failing to register, traffic not being routed to healthy targets — a whole layer of the system I had never had to think about because it had always Just Worked. They coordinated, escalated where it made sense, and restored service methodically. I was mostly a spectator, and an uncomprehending one.",
            },
            {
                type: "p",
                text: "The honest, uncomfortable part: I could have written the application code running in those pods. I could not explain why healthy pods on healthy nodes were unreachable. There's a specific kind of embarrassment in realizing your mental model stops exactly at the boundary where the interesting failure happened. I decided I never wanted to be that passive in an incident again — not because passivity is shameful, but because the curiosity it triggered was too strong to ignore.",
            },
            { type: "h", text: "The questions I couldn't answer that day" },
            {
                type: "p",
                text: "Once service was restored, I started writing down every phrase from the incident I hadn't understood, and turned each into a question. The list was humbling, and it became my syllabus:",
            },
            {
                type: "ul",
                items: [
                    "What is actually the difference between the control plane and the data plane — and why can one be perfectly healthy while the other is broken?",
                    "What does it mean for a node to 'register', and register with what? What is doing the registering?",
                    "A pod is 'Running' and a node is 'Ready' — so what sits between them and the outside world, and why can that layer fail independently?",
                    "How does a request even find its way from a load balancer to the right container on the right machine?",
                    "Why is upgrading a cluster risky at all, if the containers themselves don't change?",
                ],
            },
            { type: "h", text: "What learning it properly actually taught me" },
            {
                type: "p",
                text: "I stopped treating Kubernetes as a magic box that my YAML went into. I learned it as a system with a clear split of responsibilities, and suddenly that day made sense in retrospect. The pieces that unlocked it for me:",
            },
            {
                type: "ul",
                items: [
                    "Control plane vs data plane: the control plane decides what should be running and where; the data plane (the worker nodes and their agents) is what actually runs it and carries the traffic. An upgrade can leave the first pristine while breaking the second.",
                    "The node agent and the proxy: each node runs an agent that reports in and accepts work, and a networking component that programs how traffic reaches pods. If a node comes back after an upgrade but doesn't correctly rejoin or reprogram its networking, its pods can look healthy and still be islands.",
                    "Services and endpoints: a 'service' is a stable name in front of a shifting set of pods; the mapping from that name to real pod addresses is a live, mutable object. When that mapping or the load-balancer target registration is wrong, healthy pods receive no traffic.",
                    "Why upgrades are genuinely risky: even when your containers are byte-for-byte identical, you're changing the substrate underneath them — node images, the agent, networking, the scheduler's assumptions. The workload didn't change; the ground it stands on did.",
                ],
            },
            {
                type: "p",
                text: "None of this is advanced once someone lays it out — but nobody had, because I'd never needed it. The outage created the need, and the need made the learning stick in a way no tutorial ever had.",
            },
            { type: "h", text: "The actual lesson isn't about Kubernetes" },
            {
                type: "p",
                text: "I now work on Kubernetes comfortably — debugging stuck pods, reasoning about node and consumer issues, and I no longer spectate during infra incidents. But the transferable takeaway isn't a pile of cluster knowledge. It's this: the boundary where you stop understanding a system is the most valuable map you'll ever get of what to learn next. An incident hands you that boundary for free, drawn in exactly the place that matters most.",
            },
            {
                type: "ul",
                items: [
                    "Write down the words you didn't understand while they're fresh — that list is a better curriculum than any syllabus, because production chose it for you.",
                    "Let senior engineers resolve the incident; study their vocabulary afterwards. The debrief is the lecture.",
                    "Depth compounds downward: the layer just below the one you're comfortable in is almost always where the scary failures live, and learning it pays off disproportionately.",
                ],
            },
            {
                type: "p",
                text: "I'm quietly grateful for that broken upgrade. It cost the team a stressful afternoon, but it handed me the single most useful thing an early-career engineer can get: a precise, undeniable demonstration of what I didn't know yet — and the motivation to go fix that.",
            },
        ],
    },
    {
        slug: "automating-a-hostile-web-portal",
        title: "Automating a portal that really doesn't want to be automated",
        description:
            "A third-party partner portal with no public API, wrapped in bot protection. Here's every wall I hit getting reliable reads and writes out of it — and how each one fell.",
        date: "2026-07-28",
        readingMinutes: 9,
        tags: ["reverse-engineering", "playwright", "automation", "cloudflare"],
        blocks: [
            {
                type: "p",
                text: "We had an operational problem that only a human with a login could solve: log into a partner's merchant portal, find the orders eligible for a refund dispute, and file them before a deadline. Hundreds of times a week. There was no public API and no chance of getting one. The only interface was a single-page web app guarded by commercial bot protection. This is the story of the walls I hit turning that into an unattended pipeline — and, more usefully, the general shape of each wall, because you'll meet them on any hardened target.",
            },
            {
                type: "quote",
                text: "The mental model that saved me: authentication proves who you are; attestation proves the request came from the real app and not a script. They are enforced separately, and a valid session does not get you past attestation.",
            },
            { type: "h", text: "Wall 1 — curl and fetch are dead on arrival" },
            {
                type: "p",
                text: "The obvious first move — capture a request in devtools, copy as curl, replay — failed instantly with a 403 and a challenge page. The bot layer wasn't checking a header I could copy; it was fingerprinting the TLS handshake itself (JA3) plus the user-agent and IP, and binding a clearance cookie to that fingerprint. curl's handshake doesn't look like Chrome's, so the cookie was worthless the moment I moved it out of the browser.",
            },
            {
                type: "p",
                text: "You cannot spoof your way around this from the outside. The fix is to stop fighting it: drive a real browser. I ran a persistent, logged-in Chrome under Playwright, so every request carried a genuine browser fingerprint the bot layer already trusted. The lesson that generalizes — when a target fingerprints the transport, the cheapest correct answer is to use a real transport rather than forge one.",
            },
            { type: "h", text: "Wall 2 — inside the browser, my requests still came back empty" },
            {
                type: "p",
                text: "Now logged in inside the real browser, I built the API call by hand with window.fetch(), attached every header the real request had — including a valid attestation token I'd worked out — and got back HTTP 200 with an empty body. No error. Just {}. The same call issued by the app itself returned full data.",
            },
            {
                type: "p",
                text: "This one cost me a day. The server wasn't only validating the token's contents; it was validating how the request arrived. The app's real client used XMLHttpRequest (via an axios instance) with a request interceptor the framework had installed. My hand-rolled fetch() took a different code path, and the backend soft-denied anything that didn't come through the genuine client. A forged request that is byte-identical at the header level can still be detectably not-the-app.",
            },
            {
                type: "p",
                text: "So I stopped forging requests and borrowed the app's own HTTP client. The SPA was built with webpack, whose runtime exposes a chunk-registry global. Pushing a fake chunk onto it hands you the require function, and from there you can walk the module cache, find the live axios instance (the export with .create, .interceptors and .post), and call it directly — interceptor, attestation, and all:",
            },
            {
                type: "code",
                lang: "js",
                text: `// grab the app's own module loader from the webpack runtime
const g = 'webpackChunk_app';
let require;
window[g].push([[Math.random()], {}, (r) => { require = r; }]);

// walk the module cache for the live axios instance
let axios = null;
for (const id of Object.keys(require.c)) {
  const ex = require.c[id]?.exports;
  for (const c of [ex, ex?.default].filter(Boolean)) {
    if (typeof c?.create === 'function' && c.interceptors && c.post) {
      axios = c; break;
    }
  }
  if (axios) break;
}

// use the app's OWN client — the attestation interceptor rides along for free
const inst = axios.create({ baseURL: location.origin, withCredentials: true });
const { data } = await inst.post('/…/orders_details', { /* … */ });`,
            },
            {
                type: "p",
                text: "The instant I routed calls through the app's own instance instead of a hand-built fetch, the empty {} became full payloads — for any record I asked about, not just ones I'd clicked. The general principle: on a hardened target, don't imitate the client, become the client. If the app can make the call, its own code in its own page can make the call.",
            },
            { type: "h", text: "Wall 3 — the attestation header, and why you can't hardcode it" },
            {
                type: "p",
                text: "The sensitive endpoints required a signed header the app computed in JavaScript. Reverse-engineering it from the obfuscated bundle turned out to be anticlimactic — it was a salted hash: take a fixed app identifier plus a device id, append a short random salt, SHA-256 it, base64 the digest, and append the salt so the server can recompute. Stateless, no timestamp, no server registration. I verified it byte-for-byte against a live token.",
            },
            {
                type: "p",
                text: "The trap here is thinking \"great, I'll generate it myself.\" You can — but the same header was single-use and short-lived, and (per Wall 2) only honored when the app's interceptor attached it on a real XHR. Recomputing it in my own code was wasted effort. Letting the app's own interceptor mint a fresh one per call was both correct and less code. When a secret is cheap for the app to regenerate and expensive for you to keep valid, don't cache it — trigger a fresh one each time.",
            },
            { type: "h", text: "Wall 4 — the session model: sliding refresh, not a refresh token" },
            {
                type: "p",
                text: "Unattended runs need to survive login expiry. I expected a classic OAuth refresh_token grant; there wasn't one. Auth was an OAuth authorization-code flow against a separate identity provider, and the thing that actually kept me logged in was a long-lived session cookie on that identity host. A short-lived JWT authorized the API calls, and a refresh endpoint rolled it as long as the identity session was alive — a sliding session, not a token exchange.",
            },
            {
                type: "ul",
                items: [
                    "Persist the browser profile → the identity session survives restarts, so most runs skip login entirely.",
                    "When the JWT is stale but the session lives → hit the refresh endpoint; no password needed.",
                    "Only when the identity session finally dies → replay the full credential POST, with secrets pulled from a secret store, never from code.",
                ],
            },
            {
                type: "p",
                text: "Modeling the refresh chain explicitly — identity session → silent code → API JWT → rolling refresh — is what turned a thing that worked at my desk into a thing that runs on its own at 3am.",
            },
            { type: "h", text: "Wall 5 — the write path, and the invisible CAPTCHA" },
            {
                type: "p",
                text: "Reads were now solid. Writes had one more guard. Submitting the actual dispute required, on top of the attestation header, a second single-use token in the request body — an anti-abuse challenge token. Capturing a real submission showed the token but not where it came from; a page-level fetch/XHR interceptor never saw it get minted.",
            },
            {
                type: "p",
                text: "It came from an invisible CAPTCHA widget (Cloudflare Turnstile). The write is a two-step flow: first call an intent endpoint that returns a challenge id, then a Turnstile widget consumes that id and produces the token. The reason my interceptors were blind to it: the widget runs inside a cross-origin iframe and delivers the token to the app by postMessage — never a top-window network call. You cannot intercept what isn't a request.",
            },
            {
                type: "p",
                text: "That reframed the whole write path. The token has to be minted by a live widget in a real DOM, so the write stage cannot be a headless HTTP script — it has to run in the same real browser as everything else, let the widget do its thing, receive the token via postMessage, and only then issue the submit through the app's axios instance. One detail I'm still chasing: the intent response carried an allow-silent-failure flag, which hints the write may tolerate a degraded token — a potential shortcut past the challenge entirely.",
            },
            { type: "h", text: "What it all adds up to" },
            {
                type: "p",
                text: "Every wall came down to the same underlying truth: a hardened web app trusts its own running code far more than it trusts any request, however well-formed. Fighting that with a better-forged request is a losing game. Working with it — borrowing the real browser, the real client, the real widget, and letting them produce the credentials they were built to produce — is what turned a manual, deadline-bound chore into an unattended pipeline.",
            },
            {
                type: "ul",
                items: [
                    "Fingerprinted transport → use a real browser, don't forge the handshake.",
                    "Requests validated by how they arrive → route through the app's own HTTP client, don't hand-roll fetch.",
                    "Signed, single-use headers → let the app's interceptor mint them per call, don't cache.",
                    "Sliding-session auth → persist the profile and model the refresh chain, don't assume a refresh token.",
                    "Invisible CAPTCHA over postMessage → run the write in a real DOM, don't expect to intercept a network call.",
                ],
            },
            {
                type: "p",
                text: "None of this is exotic once you have the mental model. The hard part was never any single trick — it was realizing, five walls in, that the target's whole design says the same thing: be the app, don't impersonate it.",
            },
        ],
    },
];

export function getPost(slug: string): Post | undefined {
    return posts.find((p) => p.slug === slug);
}
