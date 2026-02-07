import Link from "next/link";
import { notFound } from "next/navigation";

import { renderMdxItem, getCollectionSlugs, getCollectionItem } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs("projects");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCollectionItem("projects", slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await renderMdxItem("projects", slug);
  if (!item) notFound();

  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-mono text-3xl font-semibold">{item.frontmatter.title}</h1>
          <span className="rounded-full border border-border bg-card px-2 py-1 text-xs text-muted">project</span>
        </div>
        {item.frontmatter.summary ? <p className="text-sm text-muted">{item.frontmatter.summary}</p> : null}
        <div className="flex flex-wrap gap-3 text-sm">
          {item.frontmatter.liveUrl ? (
            <a className="text-accent underline underline-offset-4" href={item.frontmatter.liveUrl} target="_blank" rel="noreferrer">
              Live
            </a>
          ) : null}
          {item.frontmatter.repoUrl ? (
            <a className="text-accent underline underline-offset-4" href={item.frontmatter.repoUrl} target="_blank" rel="noreferrer">
              Source
            </a>
          ) : null}
          <Link className="text-accent underline underline-offset-4" href="/projects">
            Back to projects
          </Link>
        </div>
      </header>

      <div className="mdx">{item.content}</div>
    </article>
  );
}
