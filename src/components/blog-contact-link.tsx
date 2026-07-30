"use client";

import Link from "next/link";
import posthog from "posthog-js";

export function BlogContactLink() {
    return (
        <Link
            href="mailto:contact@singhpratap.dev"
            onClick={() => posthog.capture("blog_contact_clicked")}
            className="inline-block font-mono font-bold uppercase tracking-wider bg-acid text-ink border-2 border-acid px-5 py-2.5 shadow-hard-coral press"
        >
            contact@singhpratap.dev
        </Link>
    );
}
