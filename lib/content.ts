import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/lib/mdx-components";

export type CollectionName = "projects" | "blog" | "lab";

export type CollectionFrontmatter = {
  title: string;
  summary?: string;
  date?: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
};

export type CollectionListItem = {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
};

function collectionDir(name: CollectionName) {
  return path.join(process.cwd(), "content", name);
}

function mdxPath(name: CollectionName, slug: string) {
  return path.join(collectionDir(name), `${slug}.mdx`);
}

export async function getCollectionSlugs(name: CollectionName): Promise<string[]> {
  const entries = await fs.readdir(collectionDir(name), { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
    .map((e) => e.name.replace(/\.mdx$/, ""))
    .sort();
}

export async function getCollectionItem(name: CollectionName, slug: string): Promise<CollectionListItem | null> {
  try {
    const raw = await fs.readFile(mdxPath(name, slug), "utf8");
    const { data } = matter(raw);
    const frontmatter = data as Partial<CollectionFrontmatter>;
    if (!frontmatter.title) return null;

    return {
      slug,
      title: frontmatter.title,
      summary: frontmatter.summary,
      date: frontmatter.date,
      featured: frontmatter.featured,
      liveUrl: frontmatter.liveUrl,
      repoUrl: frontmatter.repoUrl,
    };
  } catch {
    return null;
  }
}

export async function getCollectionItems(name: CollectionName): Promise<CollectionListItem[]> {
  const slugs = await getCollectionSlugs(name);
  const items = await Promise.all(slugs.map((slug) => getCollectionItem(name, slug)));
  const filtered = items.filter((i): i is CollectionListItem => Boolean(i));

  if (name === "blog") {
    return filtered.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  }

  return filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export async function renderMdxItem(name: CollectionName, slug: string) {
  try {
    const raw = await fs.readFile(mdxPath(name, slug), "utf8");
    const { content, data } = matter(raw);
    const frontmatter = data as CollectionFrontmatter;

    if (!frontmatter?.title) return null;

    const compiled = await compileMDX({
      source: content,
      components: mdxComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug],
        },
      },
    });

    return {
      frontmatter,
      content: compiled.content,
    };
  } catch {
    return null;
  }
}

