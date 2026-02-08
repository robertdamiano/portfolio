import Link from "next/link";

import { getCollectionItems } from "@/lib/content";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getCollectionItems("blog");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-mono text-3xl font-semibold">Blog</h1>
        <p className="text-sm text-muted">Notes on platform engineering, delivery, and observability.</p>
      </div>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Link
                href={`/blog/${post.slug}`}
                className="font-mono font-semibold text-accent underline underline-offset-4"
              >
                {post.title}
              </Link>
              {post.date ? <span className="text-xs text-muted">{post.date}</span> : null}
            </div>
            {post.summary ? <p className="mt-2 text-sm text-muted">{post.summary}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
