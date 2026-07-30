import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, type Block } from "@/lib/posts";
import { JsonLd } from "@/components/json-ld";
import { BlogContactLink } from "@/components/blog-contact-link";

const BASE = "https://www.singhpratap.dev";

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) return { title: "Not found — Field Notes" };
    return {
        title: `${post.title} — Field Notes`,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            url: `${BASE}/blog/${post.slug}`,
        },
    };
}

function fmt(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function Renderer({ block }: { block: Block }) {
    switch (block.type) {
        case "h":
            return (
                <h2 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight mt-12 mb-4">
                    {block.text}
                </h2>
            );
        case "p":
            return <p className="leading-relaxed my-4 text-[17px]">{block.text}</p>;
        case "quote":
            return (
                <blockquote className="border-l-4 border-coral bg-cream shadow-hard my-8 p-5 font-medium italic text-[17px]">
                    {block.text}
                </blockquote>
            );
        case "ul":
            return (
                <ul className="my-4 space-y-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3 leading-relaxed text-[17px]">
                            <span className="font-mono text-coral font-bold shrink-0">▸</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "code":
            return (
                <pre className="my-6 border-2 border-ink bg-ink text-acid shadow-hard-lg p-4 overflow-x-auto font-mono text-xs leading-relaxed">
                    <code>{block.text}</code>
                </pre>
            );
    }
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) notFound();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        url: `${BASE}/blog/${post.slug}`,
        keywords: post.tags.join(", "),
        author: {
            "@type": "Person",
            name: "Chandra Pratap Singh Chauhan",
            url: BASE,
        },
        publisher: {
            "@type": "Person",
            name: "Chandra Pratap Singh Chauhan",
            url: BASE,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE}/blog/${post.slug}`,
        },
    };

    return (
        <main className="min-h-screen bg-background pb-24">
            <JsonLd data={articleSchema} />
            <header className="border-b-2 border-ink bg-cream sticky top-0 z-40">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl h-14 flex items-center justify-between">
                    <Link
                        href="/blog"
                        className="font-mono font-bold text-sm bg-ink text-acid px-2 py-0.5 hover:bg-coral hover:text-cream transition-colors"
                    >
                        ← field notes
                    </Link>
                    <Link
                        href="/"
                        className="font-mono text-xs font-semibold uppercase tracking-wider hover:text-coral transition-colors"
                    >
                        home
                    </Link>
                </div>
            </header>

            <article className="container mx-auto px-4 md:px-6 max-w-3xl pt-12">
                <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-4">
                    <span>{fmt(post.date)}</span>
                    <span>·</span>
                    <span>{post.readingMinutes} min read</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
                    {post.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="font-mono text-xs border border-ink px-2 py-0.5 bg-cream"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="h-1 w-full bg-ink mb-2" />

                <div className="max-w-none">
                    {post.blocks.map((block, i) => (
                        <Renderer key={i} block={block} />
                    ))}
                </div>

                <div className="mt-16 border-2 border-ink bg-ink text-cream shadow-hard p-6">
                    <p className="font-mono text-sm mb-3">
                        Built something similar, or want to argue with an approach here?
                    </p>
                    <BlogContactLink />
                </div>
            </article>
        </main>
    );
}
