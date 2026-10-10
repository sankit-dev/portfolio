import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";
import { SITE as DATA } from "@/data/site";
import { readingDepth } from "@/data/rabbit-holes";
import { DepthMeter } from "@/components/site/depth-meter";
import { ReadingProgress } from "@/components/site/reading-progress";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import Link from "next/link";

function getSortedPosts() {
  return [...allPosts].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.mdx$/, "") === slug);

  if (!post) {
    return undefined;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${slug}`,
      ...(image && {
        images: [
          {
            url: `${DATA.url}${image}`,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && {
        images: [`${DATA.url}${image}`],
      }),
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex(
    (p) => p._meta.path.replace(/\.mdx$/, "") === slug
  );
  const post = sortedPosts[currentIndex];

  if (!post) {
    notFound();
  }

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const reading = readingDepth(post.content);
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  const getSlug = (post: (typeof sortedPosts)[0]) =>
    post._meta.path.replace(/\.mdx$/, "");

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: post.image
      ? `${DATA.url}${post.image}`
      : `${DATA.url}/blog/${slug}/opengraph-image`,
    url: `${DATA.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    <section id="blog" className="page" style={{ paddingTop: 24 }}>
      <ReadingProgress />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />
      <Link href="/blog" className="see-all back-link">
        <span aria-hidden="true">←</span> All writing
      </Link>
      <header className="post-head" data-src={`content/${post._meta.path}`}>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          <span className="label">{formatDate(post.publishedAt)}</span>
          <span className="label">~{reading.minutes} min</span>
          <DepthMeter depth={reading.depth} />
        </p>
      </header>
      <article className="prose post-body max-w-full text-pretty dark:prose-invert">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </article>

      {(previousPost || nextPost) && (
        <nav className="post-nav" aria-label="More posts">
          {previousPost ? (
            <Link href={`/blog/${getSlug(previousPost)}`} className="post-nav-link">
              <span className="label">← newer</span>
              <span>{previousPost.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {nextPost && (
            <Link href={`/blog/${getSlug(nextPost)}`} className="post-nav-link next">
              <span className="label">older →</span>
              <span>{nextPost.title}</span>
            </Link>
          )}
        </nav>
      )}
    </section>
  );
}
