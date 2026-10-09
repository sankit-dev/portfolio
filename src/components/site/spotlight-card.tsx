"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

// Moves a soft light under the cursor by setting CSS variables directly, so it never re-renders.
export const SpotlightCard = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  };

  const leave = () => ref.current?.style.setProperty("--y", "-200px");

  return (
    <div ref={ref} className="spot-card" onMouseMove={move} onMouseLeave={leave}>
      {children}
    </div>
  );
};
