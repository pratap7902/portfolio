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
        slug: "hotel-pms-1-a-hotel-is-a-distributed-system",
        title: "A hotel is a distributed system (building a resort PMS, part 1/3)",
        description:
            "Part 1 of 3. I work on real-time order systems. On the side, solo, I built a full PMS and booking engine for a boutique resort — and discovered the hotel forces the exact coordination patterns from my day job: sagas, outbox, inbox, idempotency.",
        date: "2026-07-30",
        readingMinutes: 5,
        tags: ["distributed-systems", "builder", "architecture", "series"],
        blocks: [
            {
                type: "p",
                text: "This is part 1 of a three-part series on building a resort property-management system solo, and what a hotel taught me about my day job. This part is about coordinating unreliable systems; part 2 is about time and identity; part 3 is about money, humans, and why the patterns transfer at all.",
            },
            {
                type: "p",
                text: "By day I work on real-time order systems — high-volume event pipelines, analytics, the plumbing that keeps a food-tech platform honest when orders, payments, and third-party partners are all flying at once. On the side, part-time and solo, I built something that on paper has nothing to do with that: a full property-management system and direct-booking engine for a boutique resort. I went in expecting to learn about hospitality. What actually happened is that the hotel taught me my own day job, from an angle I'd never seen it from.",
            },
            {
                type: "quote",
                text: "A hotel, it turns out, is a distributed system with money on the line and a dozen unreliable partners. Swap 'delivery aggregator' for 'travel agency' and 'payment gateway' for 'door-lock encoder', and it's the same problem I solve every day — just wearing a bathrobe.",
            },
            {
                type: "p",
                text: "Once I saw that, the architecture stopped being a hospitality question and became a distributed-systems question I already knew how to ask. The domain didn't need new patterns. It needed the same rigor I use for order pipelines, applied honestly to a messier, more human reality. Here are the patterns the hotel forced on me, and why each one is the same lesson my day job teaches.",
            },
            { type: "h", text: "Sagas, not transactions — because check-in touches five systems" },
            {
                type: "p",
                text: "Checking a guest in isn't one action. It reserves a room, encodes a key card, opens a payment pre-authorization, flips the housekeeping and front-office state, maybe provisions the in-room TV and Wi-Fi. Those live in different systems, and no database transaction spans a physical lock encoder. So check-in, room-move, refund, and group-cancel can't be transactions — they're sagas, where every forward step carries a compensating action, and a half-finished flow lands in a duty-manager queue instead of silently corrupting state.",
            },
            {
                type: "p",
                text: "This is exactly the cross-service order flow from my day job: place order → reserve inventory → charge → notify the kitchen → dispatch. You can't wrap that in one transaction either, and the discipline is identical — model it as a saga with explicit compensations, not a hopeful sequence of calls.",
            },
            { type: "h", text: "Outbox and inbox — because every partner is unreliable" },
            {
                type: "p",
                text: "The PMS never calls the lock encoder or the payment gateway inline from a business operation. It writes an outbox row in the same transaction as the business change, and a worker ships it with retries and an idempotency key until the partner acknowledges. Incoming events — a travel agency's booking webhook, a gateway callback, a lock's response — hit an inbox first, de-duplicated on (source, event id), because they arrive duplicated, out of order, and at 3 AM.",
            },
            {
                type: "p",
                text: "If you've ever consumed aggregator webhooks or emitted order events onto a bus, this is muscle memory: outbox for at-least-once delivery outward, inbox de-dup for at-least-once delivery inward, idempotency keys everywhere because the network will replay you. The hotel didn't teach me a new pattern here; it reminded me these patterns are non-negotiable the instant real money crosses a system boundary you don't control.",
            },
            {
                type: "p",
                text: "That's the coordination layer: sagas to sequence work across systems that can't share a transaction, and outbox/inbox to move messages reliably between them. But coordinating the work is only half of it. The harder, stranger half is modeling truth — what time did this happen, and who does it belong to. That's part 2.",
            },
        ],
    },
    {
        slug: "hotel-pms-2-time-and-identity",
        title: "Time and identity are not what you think (building a resort PMS, part 2/3)",
        description:
            "Part 2 of 3. The hotel's strangest lessons were about truth over time: a 'day' that isn't midnight to midnight, prices frozen at booking, and money that must follow the guest and never the room number.",
        date: "2026-07-30",
        readingMinutes: 5,
        tags: ["distributed-systems", "data-modeling", "architecture", "series"],
        blocks: [
            {
                type: "p",
                text: "This is part 2 of a three-part series on building a resort PMS solo. Part 1 covered coordinating unreliable systems with sagas and outbox/inbox. This part is about the two things the hotel modeled in ways that quietly rewired how I think about every system: time, and identity.",
            },
            { type: "h", text: "Business date is not wall-clock time — the idea that rewired me" },
            {
                type: "p",
                text: "This is the most domain-specific concept I hit, and the one that most changed how I think about time in any system. A hotel 'day' isn't midnight to midnight. It's the span between last night's end-of-day audit and the next one, and it can close at 3 AM. So a minibar charge posted at 2:30 AM belongs to yesterday's business date until the audit runs. Revenue reports key on business date; the audit trail keys on wall-clock time; the two are deliberately different fields on every posting.",
            },
            {
                type: "quote",
                text: "'When did this happen' and 'which day does it count for' are two different questions. Most night-audit bugs — and plenty of analytics bugs in my day job — come from systems that assume they're the same question.",
            },
            {
                type: "p",
                text: "I now see business-date-versus-event-time everywhere in my day-job pipelines: the difference between when an event arrived and which reporting period it belongs to is the same distinction, and getting it wrong is how you end up with numbers that don't reconcile at month boundaries.",
            },
            { type: "h", text: "Anchor to the stable entity — folios, not room numbers" },
            {
                type: "p",
                text: "A guest who moves from room 312 to 415 at 8:45 PM should still get the bar tab posted at 9 PM. So charges, locks, and messages attach to the folio and reservation — the stable identity — never to the room number, which is incidental and can change under you. I've written this exact bug in data work: keying on a short, human-friendly identifier that turns out not to be stable or unique, and watching records get stitched to the wrong owner. Anchor to the thing that doesn't move. The room number is a label; the folio is the identity.",
            },
            { type: "h", text: "Immutable snapshots — don't reconstruct history from live state" },
            {
                type: "p",
                text: "The nightly rate, the tax, the cancellation policy: all captured as an immutable snapshot at the moment of booking. The live rate plan can change tomorrow; the guest's reservation must not silently change with it. If I ever need to know what a guest agreed to, I read the snapshot, not the current global config.",
            },
            {
                type: "p",
                text: "This is the same lesson a nasty production bug once beat into me on the day job: never reconstruct a historical fact by reading mutable current state, because that state has moved on. A reservation's price is a point-in-time fact. So is an order's line-item detail. Snapshot the fact when it happens; don't recompute it later from a world that has changed.",
            },
            {
                type: "p",
                text: "So: anchor money to the stable identity, and freeze facts when they happen. Coordination (part 1) and truth-over-time (this part) are the machinery. Part 3 is about the two things that machinery ultimately serves — money and the humans touching it — and the bigger realization about why any of these patterns transferred from food-tech to hospitality at all.",
            },
        ],
    },
    {
        slug: "hotel-pms-3-money-humans-and-the-transfer",
        title: "The patterns don't belong to a domain (building a resort PMS, part 3/3)",
        description:
            "Part 3 of 3. No silent decisions on money, systems that survive the network dropping, and the real lesson: good distributed-systems thinking is domain-independent — and building solo is what makes you feel why.",
        date: "2026-07-30",
        readingMinutes: 5,
        tags: ["distributed-systems", "builder", "architecture", "series"],
        blocks: [
            {
                type: "p",
                text: "This is part 3 of a three-part series on building a resort PMS solo. Part 1 was coordination (sagas, outbox, inbox); part 2 was time and identity (business date, snapshots, folio-anchoring). This part is about money, humans, and why every one of these patterns came with me from a completely different industry.",
            },
            { type: "h", text: "No silent decisions on money — override ledgers and confidence buckets" },
            {
                type: "p",
                text: "Two more that the money forced. Every rule-bypass — voiding a charge, walking a guest, overriding a rate, re-running the audit — requires an authorization tier, a reason code, and a note, all append-only, all exportable. And every heuristic (is this a duplicate profile? a duplicate booking?) emits a confidence and routes to one of three buckets: auto-act, suggest-to-a-human, or ignore. No heuristic silently mutates guest data or money. Both are just the operational honesty any system handling money needs, hotel or not.",
            },
            { type: "h", text: "The desk can't stop when the internet does" },
            {
                type: "p",
                text: "One more the physical world forced. A hotel's front desk, housekeeping, and restaurant cannot freeze because the connection dropped for thirty minutes — guests are still arriving and ordering. So the clients hold a local cache and write mutations to a local log while offline, then replay those through the same sagas on reconnect, surfacing genuine conflicts to a human rather than silently overwriting. Offline-first isn't a nicety here; it's the difference between a working desk and a lobby full of angry guests. It's the same conflict-reconciliation problem as any occasionally-connected system, made unavoidable by the fact that the building keeps operating whether the WiFi does or not.",
            },
            { type: "h", text: "The real lesson: the patterns are domain-independent" },
            {
                type: "p",
                text: "The thing I keep coming back to is that I didn't have to invent anything. Sagas, outbox and inbox, idempotency, business-date modeling, snapshotting, stable keys, override ledgers — I brought every one of these from a completely different industry, and the hotel welcomed them because the underlying problem was the same: coordinate multiple unreliable systems, over an unreliable network, with money and real people on the line, and never lie about what happened. Good distributed-systems thinking doesn't belong to a domain. It's a way of respecting failure that transfers wholesale.",
            },
            {
                type: "p",
                text: "Building it solo, end to end, is what made that legible. On a big team you inherit the outbox and the idempotency middleware from a platform someone else owns, and you can go years using patterns without ever feeling why they exist. Rebuilding all of it alone, in a domain I didn't know, stripped away that inheritance. I had to understand each pattern well enough to re-derive it from the hotel's problems — and that re-derivation taught me my own day-job systems better than years of using them had.",
            },
            {
                type: "quote",
                text: "The fastest way to understand the patterns in your own domain is to go build them in one you don't know. Stripped of the familiar vocabulary, you find out whether you actually understood the pattern or just the local name for it.",
            },
            {
                type: "p",
                text: "I set out to build a hotel a booking system. I came back understanding order pipelines, event-time semantics, and idempotency more deeply than when I left. The transfer runs both ways — which is the whole case for being a builder who'll take an unfamiliar problem end to end, instead of staying safely inside the one domain you already know.",
            },
        ],
    },
    {
        slug: "the-optimization-hiding-in-a-quota",
        title: "A quota, a decaying curve, and the feature I almost missed",
        description:
            "An abstract allocation problem from real work: you can submit claims to an external approver who only says yes a limited number of times per period, and each yes gets harder to earn. The right policy was counterintuitive — and the win came from finding the right variable, not the fancier model.",
        date: "2026-07-30",
        readingMinutes: 8,
        tags: ["optimization", "data-science", "modeling", "judgment"],
        blocks: [
            {
                type: "p",
                text: "Here's a problem, stripped to its bones. You have a batch of claims you can submit to an external decision-maker. Each claim is worth some amount of money if approved. The decision-maker only approves a limited number per period — a quota — and, crucially, the more you've already spent against that quota, the less likely the next one is to land. You can choose which claims to submit, and in what order. What's the policy that maximizes expected recovery?",
            },
            {
                type: "p",
                text: "It sounds like a tidy textbook exercise. In practice it was a chain of wrong assumptions, one genuinely dangerous data bug, and a final answer that was both simpler and stranger than where I started. This is the walk-through, because the lessons are portable to any constrained-approval or scarce-slot problem.",
            },
            { type: "h", text: "Wrong assumption #1: I could defer claims to a fresh budget" },
            {
                type: "p",
                text: "My first instinct was obvious: if the quota resets each period, then hold the low-value claims and submit them next period against a fresh budget. Spread the load, waste nothing. Clean.",
            },
            {
                type: "p",
                text: "The data killed it flat. The quota didn't attach to when I submitted — it attached to the period each claim inherently belonged to. Deferring a claim didn't move it to next period's budget; it just spent the same budget later, after the easy wins were gone. An entire class of 'smart scheduling' strategies evaporated the moment I understood that the budget follows the item, not the action. Assumption one, dead — and it would have quietly cost money if I'd shipped it.",
            },
            {
                type: "quote",
                text: "Before you optimize the policy, make sure you actually understand what the constraint is attached to. I'd have built an elegant scheduler for a rule that didn't exist.",
            },
            { type: "h", text: "The join that lied to me" },
            {
                type: "p",
                text: "To learn the true shape of the approval curve, I had to join two datasets: the record of what I'd submitted, and the record of what came back approved or denied. I joined them on what looked like the obvious identifier — a short ID present in both — and got a clean-looking result.",
            },
            {
                type: "p",
                text: "It was clean-looking and wrong. That short ID wasn't unique; it collided across different records, so the join silently stitched together rows that had nothing to do with each other. Every downstream number was quietly poisoned, and nothing threw an error — the most dangerous kind of bug, because it produces confident, plausible garbage. The fix was to join on the true globally-unique key instead. The moment I did, the numbers changed and the real curve appeared.",
            },
            {
                type: "quote",
                text: "A join is an assertion that two keys mean the same thing. If the key isn't unique, the join isn't a join — it's a random number generator with good manners.",
            },
            { type: "h", text: "The curve, and what it demanded" },
            {
                type: "p",
                text: "With an honest join, the approval curve by position-within-budget was brutal and clear. Roughly: the first claim against a period's budget landed ~99% of the time, the second ~96%, the third crashed to ~33%, and everything after sat near a ~5% floor. This isn't a gentle decay you can average over — it's a cliff. The first two slots are almost free money; the rest is almost a coin flip you usually lose.",
            },
            {
                type: "p",
                text: "That shape forces the question: if only the earliest slots are valuable, and my claims are worth wildly different amounts, which claim gets which slot?",
            },
            { type: "h", text: "The answer is a 100-year-old inequality" },
            {
                type: "p",
                text: "This is the rearrangement inequality, and it's the whole game. To maximize the sum of products of two sequences, you pair the largest of one with the largest of the other. Here: pair the biggest-dollar claims with the highest-probability (earliest) slots. Sort claims by value, descending, and pour them into the slots from the top. Same family of result as the classic cμ rule in scheduling — when service is scarce, serve the jobs where value × urgency is highest, first.",
            },
            {
                type: "code",
                lang: "text",
                text: `slots (by position):   p1 ≈ 0.99   p2 ≈ 0.96   p3 ≈ 0.33   p4+ ≈ 0.05
claims (by value):     $$$   $$   $$   $   ...

optimal: biggest value → earliest slot
  $$$  → p1      (0.99 · $$$   — capture the whale while it's near-certain)
  $$   → p2
  $$   → p3      (marginal; only if EV still beats the effort)
  ...  → p4+     (usually not worth a slot at all)`,
            },
            { type: "h", text: "The trap that nearly inverted my logic" },
            {
                type: "p",
                text: "Here's where I almost shot myself in the foot, and it's the subtlest point in the whole thing. I'd built a model to predict the probability a claim gets approved. The tempting move is to sort your claims by that predicted probability and submit the most-likely-to-win first. It feels right. It's backwards.",
            },
            {
                type: "p",
                text: "The model was predicting the probability of a slot — position 1 is ~99% no matter what you put in it — not the desirability of a claim. Sorting claims by that score just re-derives the position curve and tells you nothing about which claim belongs there. Value decides the ordering; the probability curve only tells you how many slots are worth spending at all. Confusing 'how likely is this slot to succeed' with 'how good is this claim' would have had me feeding small claims into the golden early slots because the model happily said they'd win. They would have won — and wasted the slot.",
            },
            {
                type: "quote",
                text: "Know what your model is actually predicting. Mine predicted the slot, not the claim — and the entire policy hinges on not confusing the two.",
            },
            { type: "h", text: "The feature beat the model" },
            {
                type: "p",
                text: "When I did model the win probability properly, the interesting result wasn't the algorithm — it was the feature. The single most predictive variable was position within the depleting budget. On its own it carried an AUC around 0.94, comfortably beating the intuitive proxy I'd started with (the item's own timestamp, ~0.90) and the naive 'which submission period' feature (~0.87). A small three-feature model — position, budget remaining, and recent loss streak — hit ~90% accuracy; throwing a gradient-boosted model at it inched to ~92%. With the wrong headline feature, everything had plateaued several points lower no matter how fancy the model got.",
            },
            {
                type: "p",
                text: "That's the meta-lesson, and it's the one I keep relearning: the leverage was almost entirely in framing the right variable, not in the sophistication of the model on top of it. Choosing to measure 'position in a depleting budget' instead of 'time the item was created' moved the needle more than any modeling choice downstream of it. The judgment about what to measure dominated the machinery that measured it.",
            },
            { type: "h", text: "What travels beyond this problem" },
            {
                type: "ul",
                items: [
                    "Pin down what the constraint attaches to before optimizing — I nearly built a scheduler for a rule that didn't exist.",
                    "A join on a non-unique key is silent corruption. Verify the key is actually unique, or the analysis is fiction with a spreadsheet's confidence.",
                    "When a success curve is a cliff, not a slope, order is everything — and the rearrangement inequality tells you the order: biggest value into the best slots.",
                    "Know precisely what your model predicts. A score for the slot is not a score for the item, and mixing them up inverts your policy.",
                    "The right feature beats the fancier model. Spend your judgment on what to measure; the algorithm is usually the easy part.",
                ],
            },
            {
                type: "p",
                text: "None of the individual pieces here are exotic — a textbook inequality, a join bug, a calibration curve. The work was in the sequence: distrusting the obvious strategy, distrusting the clean join, and distrusting my own model's score long enough to ask what it was really telling me. The math was the easy part. Knowing which math, and which variable, was the job.",
            },
        ],
    },
    {
        slug: "how-is-solved-what-is-the-job",
        title: "AI solved HOW. The whole job is now WHAT.",
        description:
            "A person who doesn't write code shipped a real, working dashboard — and tellingly, added a color picker nobody asked for. That story contains the entire shift: building is commoditized, and the scarce skill is now knowing what's worth building at all.",
        date: "2026-07-30",
        readingMinutes: 6,
        tags: ["opinion", "product", "builder", "ai"],
        blocks: [
            {
                type: "p",
                text: "A colleague told me a story recently that I haven't been able to stop thinking about. Someone on their side of the business — a non-technical person who, by their own admission, doesn't know the first thing about writing code — sat down with AI tooling and built a fully functional analytics dashboard. Not a toy. It ran real queries across a full year of data, aggregations and all, and returned answers people actually used. And then, unprompted, they polished it: they added a color picker so you could theme the charts.",
            },
            {
                type: "quote",
                text: "Sit with that. Someone who can't write a line of code produced working analytics over a year of data — and had spare capacity to gold-plate it with a feature nobody requested. That single anecdote contains the entire shift in our craft.",
            },
            { type: "h", text: "The HOW just stopped being the moat" },
            {
                type: "p",
                text: "For as long as software has existed, the hard, valuable, gatekept skill was HOW: how do you actually make the machine do the thing? How do you write the query, wire the API, render the chart, ship it somewhere real? That difficulty is what a career in engineering was built on. If a person with zero coding background can now produce a genuinely functional data product in an afternoon, the uncomfortable truth is that the HOW — the act of building — is being commoditized in front of us. It isn't gone, but it's no longer the scarce thing, and scarcity is where value lives.",
            },
            {
                type: "p",
                text: "This is disorienting if your professional identity is 'I'm the person who can build it.' That skill isn't worthless, but it's deflating in value the way any skill does once a tool makes it broadly accessible. Betting your career on being good at HOW, right now, is like getting really good at a task that's actively being automated. The ground is moving.",
            },
            { type: "h", text: "But look again at the color picker" },
            {
                type: "p",
                text: "Here's the half of the story everyone skips. That color picker is the punchline. When building becomes effortless, the failure mode isn't that people can't produce — it's that they produce the wrong thing beautifully. Nobody needed to theme the charts. It was effort spent because the effort was available, not because it mattered. Cheap building doesn't automatically create value; it just as easily creates polished things that solve no real problem.",
            },
            {
                type: "p",
                text: "So the commoditization of HOW doesn't make judgment less important — it makes judgment the entire game. When anyone can build anything, the only thing that separates useful work from noise is knowing WHAT is worth building, and WHY it matters to the person on the other end. That's not a soft skill you sprinkle on top of engineering. It is now the hard skill.",
            },
            { type: "h", text: "WHAT is harder to learn than HOW ever was" },
            {
                type: "p",
                text: "We under-rate how difficult WHAT is precisely because we spent decades letting HOW consume all our attention. Finding the right problem means talking to the people who have it, distinguishing what they say they want from what they actually need, killing your own clever ideas when reality doesn't back them, and having the taste to know when something is worth doing at all. There's no autocomplete for that. AI can write the query; it can't tell you the query was the wrong question.",
            },
            {
                type: "ul",
                items: [
                    "Fall in love with the problem, not your solution. The solution is now cheap; the problem is where the scarcity is.",
                    "Talk to the end customer before you build, not after. WHAT is discovered in their reality, not invented at your desk.",
                    "Ask 'should this exist?' before 'how do I build it?' The second question is nearly free to answer now; the first is the one that matters.",
                    "Measure whether it landed. Adoption and impact tell you if you found the right WHAT — a dashboard nobody opens is a color picker with extra steps.",
                ],
            },
            { type: "h", text: "The product developer mindset" },
            {
                type: "p",
                text: "This is why I've stopped thinking of myself as someone who writes code and started thinking of myself as someone who finds problems worth solving and then solves them — using code, using AI, using whatever the loop needs. The code is the cheap part. The craft is upstream of it now: in choosing the right thing to build, and downstream of it: in reading whether it actually helped. The engineers who thrive from here won't be the ones with the best answer to HOW. That question is getting answered for all of us. They'll be the ones who are relentlessly, unfashionably good at WHAT — and who never mistake the ability to build for a reason to.",
            },
        ],
    },
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
