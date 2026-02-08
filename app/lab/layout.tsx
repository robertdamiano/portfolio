export const metadata = {
  title: "Lab",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm text-muted">
          Lab is explicitly experimental. Expect rough edges, breaking changes, and unfinished write-ups.
        </p>
      </div>
      {children}
    </div>
  );
}
