import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { getCollectionItems } from "@/lib/content";

export default async function HomePage() {
  const projects = await getCollectionItems("projects");
  const featured = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <div className="space-y-3">
          <h1 className="font-mono text-4xl font-semibold tracking-tight">Senior Platform Engineer</h1>
          <p className="text-balance text-xl text-muted">Reliable infrastructure, fast delivery, clear observability.</p>
          <p className="text-balance font-mono text-sm text-muted">IaC, pipelines, and observability—AWS-first.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            See projects
          </Link>
          <Link
            href="/lab"
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium"
          >
            Lab (experimental)
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">Experience (highlights)</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li>Senior Platform Engineer — building AWS-first IaC and Kubernetes platforms for product teams.</li>
          <li>
            Reduced environment provisioning from days (ticket-to-ready) to ~15 minutes by delivering self-serve ephemeral
            environments developers can create/destroy on demand.
          </li>
          <li>
            Lowered and stabilized AWS spend through continuous rightsizing, autoscaling tuning, and a reservations
            strategy across evolving workloads.
          </li>
        </ul>
      </section>

      <section className="space-y-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-mono text-xl font-semibold">Featured projects</h2>
          <Link href="/projects" className="text-sm text-accent underline underline-offset-4">
            All projects
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">Core focus</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="font-mono text-sm font-semibold">IaC</div>
            <div className="mt-1 text-sm text-muted">Terraform, AWS primitives, golden paths.</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="font-mono text-sm font-semibold">CI/CD</div>
            <div className="mt-1 text-sm text-muted">GitHub Actions, Jenkins, safer delivery patterns.</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="font-mono text-sm font-semibold">Observability</div>
            <div className="mt-1 text-sm text-muted">Dashboards, alerts, SLO thinking, on-call signal.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

