import type { CSSProperties, ReactNode } from "react";

type HandNoteProps = {
  children: ReactNode;
  // Which way the curled arrow points from under the text.
  arrow: "down-right" | "down-left";
  className?: string;
  // Seconds before the note writes itself in.
  delay?: number;
};

// A scribbled margin note: handwritten text with an arrow that draws itself in.
export const HandNote = ({ children, arrow, className = "", delay = 0.6 }: HandNoteProps) => (
  <span className={`hand-note hand-note-${arrow} ${className}`} style={{ "--delay": `${delay}s` } as CSSProperties} aria-hidden="true">
    <span className="hand-note-text">{children}</span>
    <svg width="34" height="30" viewBox="0 0 34 30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path className="hand-note-arrow" pathLength="1" d="M4 2C2 12 8 22 30 24M24 19.5L30 24L24.5 28" />
    </svg>
  </span>
);
