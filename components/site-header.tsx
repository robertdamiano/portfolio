import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          Robert Damiano
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-muted hover:text-foreground" href="/projects">
            Projects
          </Link>
          <Link className="text-muted hover:text-foreground" href="/blog">
            Blog
          </Link>
          <Link className="text-muted hover:text-foreground" href="/lab">
            Lab
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

