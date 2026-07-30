import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Field Notes — Chandra Pratap Singh Chauhan",
    description:
        "Engineering write-ups: reverse-engineering, backend systems, applied AI, and the things I couldn't find a good post about when I needed one.",
    alternates: { canonical: "/blog" },
};

function fmt(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-background paper-grid pb-16">
            <header className="border-b-2 border-ink bg-cream">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl h-14 flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-mono font-bold text-lg bg-ink text-acid px-2 py-0.5 hover:bg-coral hover:text-cream transition-colors"
                    >
                        ← CP_
                    </Link>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                        field notes
                    </span>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-6 max-w-3xl pt-16">
                <p className="font-mono text-sm font-bold text-coral mb-2">
                    ~/blog $ ls
                </p>
                <h1 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-4">
                    Field Notes
                </h1>
                <p className="text-lg max-w-xl mb-12 leading-relaxed">
                    Write-ups on the things I had to figure out the hard way —
                    reverse-engineering, backend systems, and applied AI. The rule: write
                    the post I couldn&apos;t find when I needed it.
                </p>

                <ul className="space-y-6">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link
                                href={`/blog/${post.slug}`}
                                className="block border-2 border-ink bg-cream shadow-hard p-6 lift"
                            >
                                <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-3">
                                    <span>{fmt(post.date)}</span>
                                    <span>·</span>
                                    <span>{post.readingMinutes} min read</span>
                                </div>
                                <h2 className="font-display text-2xl font-extrabold mb-2 leading-tight">
                                    {post.title}
                                </h2>
                                <p className="leading-relaxed mb-4 text-muted-foreground">
                                    {post.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-mono text-xs border border-ink px-2 py-0.5 bg-card"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
