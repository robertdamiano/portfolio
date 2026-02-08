import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-mono text-3xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="inline-block rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">
        Go home
      </Link>
    </div>
  );
}
