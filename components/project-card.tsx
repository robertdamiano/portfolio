import Link from "next/link";

import type { CollectionListItem } from "@/lib/content";

export function ProjectCard({ project }: { project: CollectionListItem }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono text-base font-semibold text-accent underline underline-offset-4"
          >
            {project.title}
          </Link>
          {project.summary ? <p className="text-sm text-muted">{project.summary}</p> : null}
        </div>
        {project.featured ? (
          <span className="shrink-0 rounded-full border border-border bg-background px-2 py-1 text-xs text-muted">
            featured
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {project.liveUrl ? (
          <a className="text-accent underline underline-offset-4" href={project.liveUrl} target="_blank" rel="noreferrer">
            Live
          </a>
        ) : null}
        {project.repoUrl ? (
          <a className="text-accent underline underline-offset-4" href={project.repoUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        ) : null}
      </div>
    </div>
  );
}

