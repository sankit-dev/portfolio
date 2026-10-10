// Public GitHub activity for the build-in-public strip. Everything is cached for an hour, and any failure
// returns null so the page renders without the strip instead of breaking.

const HOUR_S = 3600;

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
export type LastShip = { repo: string; message: string; url: string; at: string };

const githubHeaders = (): HeadersInit => {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } : { Accept: "application/vnd.github+json" };
};

const getJson = async <T>(url: string, headers?: HeadersInit): Promise<T | null> => {
  try {
    const res = await fetch(url, { headers, next: { revalidate: HOUR_S } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
};

// GitHub's REST API has no contribution calendar, so this uses a public scraper of the profile graph.
export const getContributions = async (user: string) => {
  const data = await getJson<{ total: { lastYear: number }; contributions: ContributionDay[] }>(
    `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
  );
  return data ? { total: data.total.lastYear, days: data.contributions } : null;
};

type PushEvent = { type: string; created_at: string; repo: { name: string }; payload: { head?: string } };

// The newest push, with its head commit's first line as the "what shipped" message.
export const getLastShip = async (user: string): Promise<LastShip | null> => {
  const events = await getJson<PushEvent[]>(`https://api.github.com/users/${user}/events/public?per_page=30`, githubHeaders());
  const push = events
    ?.filter((e) => e.type === "PushEvent" && e.payload.head)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
  if (!push?.payload.head) return null;

  const commit = await getJson<{ commit: { message: string }; html_url: string }>(
    `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`,
    githubHeaders(),
  );
  if (!commit) return null;

  return {
    repo: push.repo.name.split("/")[1] ?? push.repo.name,
    message: commit.commit.message.split("\n")[0],
    url: commit.html_url,
    at: push.created_at,
  };
};

export const timeAgo = (iso: string, now = Date.now()) => {
  const minutes = Math.round((now - new Date(iso).getTime()) / 60_000);
  if (minutes < 60) return `${Math.max(minutes, 1)}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
};
