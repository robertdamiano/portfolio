export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background/60">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="font-mono">© {new Date().getFullYear()} Robert Damiano</div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <a className="underline underline-offset-4" href="https://github.com/robertdamiano" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
