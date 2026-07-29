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
