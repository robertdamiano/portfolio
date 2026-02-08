import { ProjectCard } from "@/components/project-card";
import { getCollectionItems } from "@/lib/content";

export const metadata = {
  title: "Projects",
};

export default async function ProjectsPage() {
  const projects = await getCollectionItems("projects");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-mono text-3xl font-semibold">Projects</h1>
        <p className="text-sm text-muted">Selected work with write-ups, live demos, and source.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
