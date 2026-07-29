export const revalidate = 3600;

const LOGIN = "pratap7902";

type ContributionStats = {
    window: string;
    source: string;
    commits: number;
    prs: number;
    reviews: number;
    private_contributions: number | null;
    total_contributions: number | null;
};

async function fromGraphql(token: string): Promise<ContributionStats | null> {
    const query = `query {
        viewer {
            contributionsCollection {
                totalCommitContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
                restrictedContributionsCount
                contributionCalendar { totalContributions }
            }
        }
    }`;
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            authorization: `bearer ${token}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const c = json?.data?.viewer?.contributionsCollection;
    if (!c) return null;
    return {
        window: "last 12 months",
        source: "github graphql (incl. private)",
        commits: c.totalCommitContributions,
        prs: c.totalPullRequestContributions,
        reviews: c.totalPullRequestReviewContributions,
        private_contributions: c.restrictedContributionsCount,
        total_contributions: c.contributionCalendar?.totalContributions ?? null,
    };
}

async function fromPublicSearch(): Promise<ContributionStats> {
    const headers = { accept: "application/vnd.github+json" };
    const [commitsRes, prsRes] = await Promise.all([
        fetch(`https://api.github.com/search/commits?q=author:${LOGIN}&per_page=1`, {
            headers,
            next: { revalidate: 3600 },
        }),
        fetch(`https://api.github.com/search/issues?q=author:${LOGIN}+type:pr&per_page=1`, {
            headers,
            next: { revalidate: 3600 },
        }),
    ]);
    const commits = commitsRes.ok ? (await commitsRes.json()).total_count ?? 0 : 0;
    const prs = prsRes.ok ? (await prsRes.json()).total_count ?? 0 : 0;
    return {
        window: "all time",
        source: "public search (set GITHUB_TOKEN for private counts)",
        commits,
        prs,
        reviews: 0,
        private_contributions: null,
        total_contributions: null,
    };
}

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    let stats: ContributionStats | null = null;
    if (token) stats = await fromGraphql(token);
    if (!stats) stats = await fromPublicSearch();
    return new Response(JSON.stringify(stats, null, 2), {
        headers: {
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": "*",
        },
    });
}
