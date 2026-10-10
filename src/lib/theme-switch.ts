import { flushSync } from "react-dom";

const SPREAD_MS = 650;

// Radius that reaches the farthest viewport corner from (x, y), so the circle covers the whole screen.
const coverRadius = (x: number, y: number) =>
  Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

// Switches the theme with the new one spreading out as a circle from `origin` (default: top right, where the toggle sits).
export const switchTheme = (setTheme: (theme: string) => void, next: "light" | "dark", origin?: { x: number; y: number }) => {
  const apply = () => {
    flushSync(() => setTheme(next));
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduceMotion) {
    apply();
    return;
  }

  const { x, y } = origin ?? { x: window.innerWidth - 40, y: 40 };
  const radius = coverRadius(x, y);

  document
    .startViewTransition(apply)
    .ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: SPREAD_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {
      // The browser skipped the transition (e.g. the tab was hidden); the theme has still switched.
    });
};

export const isDark = () => document.documentElement.classList.contains("dark");
