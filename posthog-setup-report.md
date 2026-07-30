# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the portfolio site. The setup covers client-side initialization via `instrumentation-client.ts` (Next.js 15.3+ pattern), a reverse-proxy through Next.js rewrites to avoid ad-blockers, and 10 targeted capture events spread across 7 files — tracking every meaningful user action from hero engagement through to blog contact clicks.

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `hero_cta_clicked` | Visitor clicked the primary "View Work →" CTA in the hero section | `src/components/sections/hero.tsx` |
| `resume_downloaded` | Visitor opened the resume PDF from the hero (property: `source: "hero"`) | `src/components/sections/hero.tsx` |
| `resume_downloaded` | Visitor opened the resume PDF from the navbar (property: `source: "navbar"` or `"navbar_mobile"`) | `src/components/layout/navbar.tsx` |
| `project_demo_clicked` | Visitor clicked a project demo link (property: `project_name`) | `src/components/sections/projects.tsx` |
| `contact_email_clicked` | Visitor clicked the primary email CTA in the contact section | `src/components/sections/contact.tsx` |
| `social_link_clicked` | Visitor clicked a social profile icon (property: `platform`: LinkedIn / GitHub / Website) | `src/components/sections/contact.tsx` |
| `command_palette_opened` | Command palette opened (property: `trigger`: `keyboard` or `button`) | `src/components/command-palette.tsx` |
| `command_palette_action_executed` | Visitor ran an action from the palette (property: `action_label`) | `src/components/command-palette.tsx` |
| `terminal_command_executed` | Visitor ran a command in the interactive terminal (property: `command`) | `src/components/terminal.tsx` |
| `blog_contact_clicked` | Visitor clicked the contact email link at the bottom of a blog post | `src/app/blog/[slug]/page.tsx` via `src/components/blog-contact-link.tsx` |

## Files created or modified

| File | Change |
|---|---|
| `instrumentation-client.ts` | **Created** — PostHog init for Next.js 15.3+ with reverse-proxy host, exception capture, and dev-only error guard |
| `next.config.ts` | **Updated** — Added `/ingest/*` rewrites (static, array, catch-all) + `skipTrailingSlashRedirect` |
| `.env.local` | **Updated** — Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` |
| `src/components/sections/hero.tsx` | `hero_cta_clicked`, `resume_downloaded` |
| `src/components/layout/navbar.tsx` | `resume_downloaded` (desktop + mobile) |
| `src/components/sections/projects.tsx` | `project_demo_clicked` |
| `src/components/sections/contact.tsx` | `contact_email_clicked`, `social_link_clicked` |
| `src/components/command-palette.tsx` | `command_palette_opened`, `command_palette_action_executed` |
| `src/components/terminal.tsx` | `terminal_command_executed` |
| `src/components/blog-contact-link.tsx` | **Created** — `"use client"` wrapper enabling `blog_contact_clicked` from a server-component page |
| `src/app/blog/[slug]/page.tsx` | Replaced inline contact `<Link>` with `<BlogContactLink />` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard:** [Analytics basics (wizard)](https://us.posthog.com/project/534763/dashboard/1928249)
- **Portfolio engagement overview:** [WGWtCB4v](https://us.posthog.com/project/534763/insights/WGWtCB4v) — all key events in one line graph
- **Contact conversion funnel:** [B9y1zlxf](https://us.posthog.com/project/534763/insights/B9y1zlxf) — hero CTA → email contact
- **Resume downloads over time:** [4Gkbs9Zz](https://us.posthog.com/project/534763/insights/4Gkbs9Zz) — broken down by hero vs navbar source
- **Project demo clicks by project:** [TTp4iBSB](https://us.posthog.com/project/534763/insights/TTp4iBSB) — which side quests get the most interest
- **Top command palette actions:** [oEpV0wfS](https://us.posthog.com/project/534763/insights/oEpV0wfS) — what visitors actually do with ⌘K

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
