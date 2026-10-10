// Everything the site shows lives here. Fill in the [bracketed] placeholders.

export const SITE = {
  name: "Ankit Singh",
  initials: "AS",
  // Used as the base URL for metadata and OG images. Switch to your domain once it's live.
  url: "https://github.com/sankit-dev",
  description:
    "Software engineer who builds things end to end and goes way too deep into how they work.",
  avatarUrl: "https://avatars.githubusercontent.com/u/257124607?v=4",
  email: "[your@email.com]",
  resumeUrl: "#",
  openTo: "Open to remote startup roles",
  roles: ["backend tinkerer", "professional rabbit-hole diver", "ships it, then reads the docs"],
  footerNote: "made with curiosity, coffee and Claude",
  // Drives the local-time line on the home page.
  timeZone: "Asia/Kolkata",
  place: "India",
  githubUser: "sankit-dev",
  socials: {
    github: "https://github.com/sankit-dev",
    x: "#",
    linkedin: "#",
    medium: "#",
  },
} as const;

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
] as const;

export type TechName = "Node" | "Hono" | "Bun" | "MongoDB" | "Next.js" | "Tailwind";

export const HONEST_STATS = [
  { label: "Tabs open right now", value: "47", note: "(all docs)" },
  { label: "Rabbit holes per week", value: "∞" },
  { label: "Reads docs for fun", value: "yes", note: "(send help)" },
] as const;

export type Job = {
  mark: string;
  role: string;
  where: string;
  when: string;
  current: boolean;
  points: string[];
  stack: string[];
};

export const JOBS: Job[] = [
  {
    mark: "SE",
    role: "Software Engineer",
    where: "Early-stage startup",
    when: "[YYYY] — now",
    current: true,
    points: [
      "[What you own end to end]",
      "[Something you shipped and the impact]",
      "[A problem you dug into way too deep]",
    ],
    stack: ["Node", "Next.js", "MongoDB", "[more]"],
  },
  {
    mark: "IB",
    role: "Indie builder",
    where: "Builder arc · DevAtlas, StudyAtlas, TwoTap",
    when: "Oct 2026 — now",
    current: true,
    points: [
      "Shipped DevAtlas, a curated directory of backend tools",
      "Shipped StudyAtlas",
      "Building TwoTap, a mobile health app",
      "Building and marketing in public on X",
    ],
    stack: ["Next.js", "Hono", "Bun", "Vercel"],
  },
];

export type ProjectStatus = "shipped" | "cooking";

export type Project = {
  name: string;
  kind: "Web" | "Mobile";
  status: ProjectStatus;
  summary: string;
  description: string;
  url?: string;
  displayUrl?: string;
  screenshot?: string;
  stack: string[];
  links: { label: string; href: string }[];
};

export const PROJECTS: Project[] = [
  {
    name: "DevAtlas",
    kind: "Web",
    status: "shipped",
    summary: "a curated directory of backend tools",
    description:
      "A curated directory of backend tools, so you spend less time comparing and more time shipping.",
    url: "https://devatlas.site",
    displayUrl: "devatlas.site",
    stack: ["Next.js", "Tailwind", "Vercel"],
    links: [
      { label: "Live", href: "https://devatlas.site" },
      { label: "Code", href: "https://github.com/sankit-dev/dev-atlas" },
    ],
  },
  {
    name: "StudyAtlas",
    kind: "Web",
    status: "shipped",
    summary: "[one line on what it does]",
    description: "[One line on what StudyAtlas does and who it is for.]",
    url: "https://study.devatlas.site",
    displayUrl: "study.devatlas.site",
    stack: ["Next.js", "[stack]"],
    links: [{ label: "Live", href: "https://study.devatlas.site" }],
  },
  {
    name: "TwoTap",
    kind: "Mobile",
    status: "cooking",
    summary: "a health app, mobile",
    description: "A health app, two taps to log what matters. [Refine this line.]",
    stack: ["React Native", "Expo", "[stack]"],
    links: [{ label: "Waitlist", href: "#" }],
  },
];

// External posts (X, Medium). Posts written on the site live in /content as .mdx files.
export type ExternalPost = { title: string; date: string; source: "Medium" | "X"; href: string };

export const EXTERNAL_POSTS: ExternalPost[] = [
  { title: "[Post title]", date: "[Mon YY]", source: "Medium", href: "#" },
  { title: "[Thread title]", date: "[Mon YY]", source: "X", href: "#" },
  { title: "[Post title]", date: "[Mon YY]", source: "Medium", href: "#" },
];

export const FEATURED_POST = {
  title: "[The post you're proudest of]",
  date: "[Mon YYYY]",
  source: "Medium",
  summary: "[One line on what it's about and why someone should read it.]",
  href: "#",
};

export type Verdict = "READ IT" | "MAYBE" | "SKIM IT" | "SKIP" | "ASK ME LATER" | "UP NEXT";

export type Book = {
  title: string;
  author: string;
  status: string;
  progress?: number;
  liked: string[];
  disliked: string[];
  verdict: Verdict;
  forWho: string;
  // Optional: the cover's main colour (hex) for the spine and cover, and a cover image URL.
  // Open Library covers work well: https://covers.openlibrary.org/b/isbn/<ISBN>-M.jpg
  color?: string;
  cover?: string;
};

const LIKED = ["[Something that stuck with you]", "[An idea you now use at work]", "[A line or chapter you loved]"];
const DISLIKED = ["[What dragged or felt like filler]", "[What you disagreed with]"];

export const BOOKS: Book[] = [
  { title: "[Currently reading]", author: "[Author]", status: "Currently reading", progress: 42, liked: LIKED, disliked: ["[Too early to say, ask me in a month]"], verdict: "ASK ME LATER", forWho: "[Why you picked it up]" },
  { title: "[Book title]", author: "[Author]", status: "Read · favourite", liked: LIKED, disliked: DISLIKED, verdict: "READ IT", forWho: "[Who should read it, in one line]" },
  { title: "[Book title]", author: "[Author]", status: "Read", liked: LIKED, disliked: DISLIKED, verdict: "READ IT", forWho: "[Who should read it, in one line]" },
  { title: "[Book title]", author: "[Author]", status: "Read", liked: LIKED, disliked: DISLIKED, verdict: "MAYBE", forWho: "[Read it if…]" },
  { title: "[Book title]", author: "[Author]", status: "Read", liked: LIKED, disliked: DISLIKED, verdict: "SKIM IT", forWho: "[Read chapters X to Y, skip the rest]" },
  { title: "[Book title]", author: "[Author]", status: "Read", liked: LIKED, disliked: DISLIKED, verdict: "SKIP", forWho: "[Read this instead: …]" },
  { title: "[Book title]", author: "[Author]", status: "Up next", liked: ["[Haven't started yet]"], disliked: ["[Nothing yet]"], verdict: "UP NEXT", forWho: "[Why it is next]" },
];

// Quotes on the home page. Swap in the ones you actually come back to.
export type Quote = { text: string; author: string };

export const QUOTES: Quote[] = [
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
];

export const currentlyReading = () => BOOKS.find((b) => b.progress !== undefined) ?? null;
