"use client";

import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { switchTheme } from "@/lib/theme-switch";

const centerOf = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    // Keyboard clicks report (0, 0), so spread from the button itself in that case.
    const origin = event.clientX || event.clientY ? { x: event.clientX, y: event.clientY } : centerOf(event.currentTarget);
    switchTheme(setTheme, resolvedTheme === "dark" ? "light" : "dark", origin);
  };

  return (
    <button type="button" className="theme-toggle" aria-label="Toggle theme" onClick={toggle}>
      {/* One icon that morphs: a crescent in light mode, a sun in dark. Driven by the .dark class, so no hydration mismatch. */}
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <mask id="theme-toggle-cut">
          <rect width="24" height="24" fill="#fff" />
          <circle className="theme-toggle-cut" cx="17" cy="7" r="7" fill="#000" />
        </mask>
        <circle className="theme-toggle-core" cx="12" cy="12" r="8" fill="currentColor" mask="url(#theme-toggle-cut)" />
        <g className="theme-toggle-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v1.5M12 20.5V22M2 12h1.5M20.5 12H22M4.9 4.9l1.1 1.1M18 18l1.1 1.1M4.9 19.1L6 18M18 6l1.1-1.1" />
        </g>
      </svg>
    </button>
  );
};
