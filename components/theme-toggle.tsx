"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-[96px]" aria-hidden="true" />;

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">Theme</span>
      <select
        aria-label="Select theme"
        className="h-9 rounded-md border border-border bg-card px-2 text-xs text-foreground"
        value={theme ?? "system"}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
