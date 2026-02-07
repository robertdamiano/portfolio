import Link from "next/link";
import { notFound } from "next/navigation";

import { renderMdxItem, getCollectionSlugs, getCollectionItem } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCollectionItem("blog", slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await renderMdxItem("blog", slug);
  if (!item) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-mono text-3xl font-semibold">{item.frontmatter.title}</h1>
          <span className="rounded-full border border-border bg-card px-2 py-1 text-xs text-muted">blog</span>
        </div>
        {item.frontmatter.date ? <p className="text-xs text-muted">{item.frontmatter.date}</p> : null}
        {item.frontmatter.summary ? <p className="text-sm text-muted">{item.frontmatter.summary}</p> : null}
        <Link className="text-sm text-accent underline underline-offset-4" href="/blog">
          Back to blog
        </Link>
      </header>

      <div className="mdx">{item.content}</div>
    </article>
  );
}
