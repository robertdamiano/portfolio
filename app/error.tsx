"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="space-y-4">
      <h1 className="font-mono text-3xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted">An unexpected error occurred.</p>
      <div className="flex gap-3">
        <button onClick={reset} className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">
          Try again
        </button>
        <Link href="/" className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium">
          Go home
        </Link>
      </div>
    </div>
  );
}
