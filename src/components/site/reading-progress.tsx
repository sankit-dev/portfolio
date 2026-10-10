"use client";

import { useEffect, useRef } from "react";

// A hairline across the top that fills as you read. Writes the transform directly, so scrolling never re-renders.
export const ReadingProgress = () => {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 1;
      bar.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div ref={bar} className="reading-progress" aria-hidden="true" />;
};
