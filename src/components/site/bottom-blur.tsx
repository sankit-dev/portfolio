"use client";

import { useEffect, useState } from "react";

// Blur doubles per layer; site.css gives each layer its own band so the strength ramps toward the bottom edge.
const LAYERS = [0.5, 1, 2, 4, 8, 16, 32, 64];
const BOTTOM_SLACK_PX = 8;

const isAtBottom = () =>
  window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - BOTTOM_SLACK_PX;

export const BottomBlur = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => setHidden(isAtBottom());
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`bottom-blur${hidden ? " is-hidden" : ""}`} aria-hidden="true">
      {LAYERS.map((blur, i) => (
        // backdrop-filter is set inline: the CSS minifier drops it when written with a var().
        <div key={blur} style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, "--i": i } as React.CSSProperties} />
      ))}
    </div>
  );
};
