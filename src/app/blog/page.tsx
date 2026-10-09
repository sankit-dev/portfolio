import { EXTERNAL_POSTS, FEATURED_POST } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { allPosts } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the rabbit holes: backend, building in public, and whatever I dug into this week.",
};

const slugOf = (path: string) => path.replace(/\.mdx$/, "");

export default function BlogPage() {
  const posts = [...allPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <section className="page">
      <div className="page-head">
        <h1 className="page-title">Writing <em>from the rabbit holes</em></h1>
      </div>

      <a className="featured" href={FEATURED_POST.href}>
        <span className="label">featured · {FEATURED_POST.date} · {FEATURED_POST.source}</span>
        <span style={{ display: "block", marginTop: 6, fontSize: 22, fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" }}>{FEATURED_POST.title}</span>
        <span className="dim" style={{ display: "block", marginTop: 6, fontSize: 16 }}>{FEATURED_POST.summary}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 14, fontWeight: 500 }}>
          Read it <span className="arrow" aria-hidden="true">↗</span>
        </span>
      </a>

      {posts.length > 0 && (
        <>
          <h2 className="label" style={{ margin: "32px 0 4px", fontWeight: 400 }}>on this site</h2>
          {posts.map((post) => (
            <Link key={post._meta.path} className="post-row" href={`/blog/${slugOf(post._meta.path)}`}>
              <span className="label" style={{ flex: "0 0 96px" }}>{formatDate(post.publishedAt)}</span>
              <span style={{ flex: 1, minWidth: 0, fontWeight: 500 }}>{post.title}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </>
      )}

      <h2 className="label" style={{ margin: "32px 0 4px", fontWeight: 400 }}>elsewhere</h2>
      {EXTERNAL_POSTS.map((post, i) => (
        <a key={`${post.title}-${i}`} className="post-row" href={post.href} target="_blank" rel="noreferrer">
          <span className="label" style={{ flex: "0 0 96px" }}>{post.date}</span>
          <span style={{ flex: 1, minWidth: 0, fontWeight: 500 }}>{post.title}</span>
          <span className="label">{post.source}</span>
          <span className="arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </section>
  );
}
