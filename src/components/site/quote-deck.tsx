"use client";

import { useState, type CSSProperties } from "react";
import type { Quote } from "@/data/site";
import { HandNote } from "./hand-note";

const pad = (n: number) => String(n).padStart(2, "0");

export const QuoteDeck = ({ quotes }: { quotes: Quote[] }) => {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];
  if (!quote) return null;

  const next = () => setIndex((i) => (i + 1) % quotes.length);
  const words = quote.text.split(" ");

  return (
    <div className="quote-wrap">
      <HandNote arrow="down-left" className="quote-note" delay={0.2}>tap for another</HandNote>
      <figure className="quote-card">
        {/* The whole card is the hit area; the button sits over it so the quote can stay a real blockquote. */}
        <button type="button" className="quote-hit" onClick={next} aria-label="Show another quote" />
        <span className="quote-mark" aria-hidden="true">&ldquo;</span>
        {/* Keyed by index so each new quote replays the word-by-word reveal. */}
        <div key={index} aria-live="polite">
          <blockquote className="quote-text">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="quote-word" style={{ "--n": i } as CSSProperties}>
                {word}{" "}
              </span>
            ))}
          </blockquote>
          <figcaption className="quote-by" style={{ "--n": words.length } as CSSProperties}>
            <span className="quote-rule" aria-hidden="true" />
            {quote.author}
          </figcaption>
        </div>
        <span className="quote-count label" aria-hidden="true">
          {pad(index + 1)} / {pad(quotes.length)}
        </span>
      </figure>
    </div>
  );
};
