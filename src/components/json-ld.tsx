// Renders a JSON-LD <script> for structured data (schema.org).
// Server component — safe to embed the serialized graph directly.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

const BASE = "https://www.singhpratap.dev";

export const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chandra Pratap Singh Chauhan",
    url: BASE,
    image: `${BASE}/apple-icon`,
    jobTitle: "Software Engineer II",
    description:
        "Builder who owns tech, design, and product end to end. Specializes in backend systems and applied AI.",
    worksFor: {
        "@type": "Organization",
        name: "UrbanPiper",
    },
    knowsAbout: [
        "Backend Engineering",
        "Applied AI",
        "Distributed Systems",
        "ClickHouse",
        "Kafka",
        "Retrieval-Augmented Generation",
        "Kubernetes",
    ],
    sameAs: [
        "https://github.com/pratap7902",
        "https://linkedin.com/in/pratap79",
    ],
};
