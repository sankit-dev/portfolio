// The dive log: things I went way too deep on. Newest entries go at the end.
// Fill in the [bracketed] placeholders; depth is how far down I got (see DEPTHS).

export type Depth = 1 | 2 | 3 | 4 | 5;

export const DEPTHS: Record<Depth, { short: string; label: string }> = {
  1: { short: "docs", label: "skimmed the docs" },
  2: { short: "source", label: "read the source" },
  3: { short: "spec", label: "read the spec" },
  4: { short: "toy", label: "built a toy version" },
  5: { short: "weekend", label: "lost a weekend" },
};

export type RabbitHole = {
  date: string; // YYYY-MM-DD
  topic: string;
  depth: Depth;
  learned: string;
  // Still down there, or back at the surface with notes.
  status: "digging" | "surfaced";
  link?: { label: string; href: string };
};

export const RABBIT_HOLES: RabbitHole[] = [
  { date: "2026-09-02", topic: "[e.g. How Postgres MVCC actually works]", depth: 3, learned: "[The one thing that clicked]", status: "surfaced" },
  { date: "2026-09-09", topic: "[e.g. Why Bun starts so fast]", depth: 2, learned: "[The one thing that clicked]", status: "surfaced" },
  { date: "2026-09-16", topic: "[e.g. Writing a tiny HTTP router]", depth: 4, learned: "[The one thing that clicked]", status: "surfaced", link: { label: "Notes", href: "#" } },
  { date: "2026-09-25", topic: "[e.g. How TLS handshakes work]", depth: 5, learned: "[The one thing that clicked]", status: "surfaced" },
  { date: "2026-10-01", topic: "[e.g. Hono's middleware chain]", depth: 1, learned: "[The one thing that clicked]", status: "surfaced" },
  { date: "2026-10-07", topic: "[What you're digging into right now]", depth: 3, learned: "[So far: what you've figured out]", status: "digging" },
];

export const currentHole = () => [...RABBIT_HOLES].reverse().find((h) => h.status === "digging") ?? null;

export const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

const WORDS_PER_MINUTE = 220;
// Upper bound in minutes for each depth: a 2 minute post is "docs" deep, anything past 15 minutes loses you a weekend.
const DEPTH_BY_MINUTES: [number, Depth][] = [[3, 1], [6, 2], [10, 3], [15, 4]];

export const readingDepth = (text: string) => {
  const minutes = Math.max(1, Math.round(text.trim().split(/\s+/).length / WORDS_PER_MINUTE));
  const depth = DEPTH_BY_MINUTES.find(([max]) => minutes <= max)?.[1] ?? 5;
  return { minutes, depth };
};
