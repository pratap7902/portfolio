import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const BASE = "https://www.singhpratap.dev";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: BASE, changeFrequency: "monthly", priority: 1 },
        { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ];

    const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticRoutes, ...postRoutes];
}
