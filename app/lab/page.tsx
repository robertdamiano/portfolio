import Link from "next/link";

import { getCollectionItems } from "@/lib/content";

export default async function LabPage() {
  const items = await getCollectionItems("lab");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-mono text-3xl font-semibold">Lab</h1>
        <p className="text-sm text-muted">Small experiments and prototypes living inside the portfolio.</p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.slug} className="rounded-lg border border-border bg-card p-4">
            <Link
              href={`/lab/${item.slug}`}
              className="font-mono font-semibold text-accent underline underline-offset-4"
            >
              {item.title}
            </Link>
            {item.summary ? <p className="mt-2 text-sm text-muted">{item.summary}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
