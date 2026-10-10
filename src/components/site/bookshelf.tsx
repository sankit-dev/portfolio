"use client";

import { useState } from "react";
import type { Book } from "@/data/site";

// Spine sizes are fixed per shelf slot so the shelf looks hand-stacked without random values in render.
const SPINE_SIZES = [
  { h: 200, w: 44 }, { h: 170, w: 38 }, { h: 188, w: 50 }, { h: 160, w: 36 },
  { h: 196, w: 42 }, { h: 176, w: 46 }, { h: 182, w: 40 },
];
const TONE_COUNT = 7;

// Black or white text, whichever reads better on the cover colour (WCAG relative luminance).
const textOn = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#111111" : "#ffffff";
};

const coverStyle = (book: Book) => (book.color ? { background: book.color, color: textOn(book.color) } : undefined);

type ShelfState = { index: number; open: boolean; animate: boolean; version: number };

const BookPages = ({ book, open, animate, onToggle }: { book: Book; open: boolean; animate: boolean; onToggle: () => void }) => {
  const coverAnim = animate ? (open ? "anim-open" : "anim-close") : "";
  return (
    <div className={`book${open ? " is-open" : ""}`}>
      <div className="book-left" aria-hidden="true" />

      <div className="book-page book-right">
        <div className="book-right-content">
          <div className="label">what didn&apos;t land</div>
          <ul>
            {book.disliked.map((d) => <li key={d}>{d}</li>)}
          </ul>
          <div style={{ marginTop: "auto" }}>
            <div className="label">should you read it?</div>
            <div style={{ marginTop: 8 }}>
              <span className={`stamp${book.verdict === "READ IT" ? "" : " soft"}`}>{book.verdict}</span>
            </div>
            <p className="dim" style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.5 }}>{book.forWho}</p>
            <div className="page-no" style={{ marginTop: 12, textAlign: "right" }}>p. 2</div>
          </div>
        </div>
      </div>

      <div className={`cover ${coverAnim}`}>
        <button type="button" className={`face cover-front${book.color ? "" : " tone-0"}`} style={coverStyle(book)} onClick={onToggle} aria-label={`${open ? "Close" : "Open"} ${book.title}`}>
          <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", opacity: 0.75, textTransform: "uppercase" }}>{book.status}</span>
          <span className="serif" style={{ marginTop: 18, fontSize: 34, lineHeight: 1.05 }}>{book.title}</span>
          <span style={{ marginTop: 10, fontSize: 14, opacity: 0.8 }}>{book.author}</span>
          {book.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="cover-img" src={book.cover} alt="" loading="lazy" />
          )}
          <span aria-hidden="true" style={{ marginTop: "auto", width: 40, height: 1.5, background: "currentColor", opacity: 0.5 }} />
          <span style={{ marginTop: 12, fontSize: 13, opacity: 0.85 }}>Open the book →</span>
        </button>
        <div className="face book-page cover-back">
          <div className="label">what I liked</div>
          <ul>
            {book.liked.map((l) => <li key={l}>{l}</li>)}
          </ul>
          {book.progress !== undefined && (
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div className="progress"><div style={{ width: `${book.progress}%` }} /></div>
              <span className="label">{book.progress}% read</span>
            </div>
          )}
          <div className="page-no" style={{ marginTop: "auto" }}>p. 1</div>
        </div>
      </div>
    </div>
  );
};

export const Bookshelf = ({ books }: { books: Book[] }) => {
  const [state, setState] = useState<ShelfState>({ index: 0, open: false, animate: false, version: 0 });
  const count = books.length;
  const book = books[state.index];

  const pick = (i: number) =>
    setState((s) => ({ index: (i + count) % count, open: true, animate: true, version: s.version + 1 }));
  const toggle = () => setState((s) => ({ ...s, open: !s.open, animate: true, version: s.version + 1 }));

  if (!book) return null;

  return (
    <>
      <div className="shelf" role="group" aria-label="Bookshelf">
        {books.map((b, i) => {
          const size = SPINE_SIZES[i % SPINE_SIZES.length];
          return (
            <button
              key={`${b.title}-${i}`}
              type="button"
              className={`spine${b.color ? "" : ` tone-${i % TONE_COUNT}`}`}
              aria-pressed={state.index === i}
              aria-label={`${b.title} by ${b.author}`}
              onClick={() => pick(i)}
              style={{ width: size.w, height: size.h, ...coverStyle(b) }}
            >
              <span>{b.title}</span>
            </button>
          );
        })}
      </div>

      {/* Remounting on each change replays the cover animation for the newly picked book. */}
      <BookPages key={state.version} book={book} open={state.open} animate={state.animate} onToggle={toggle} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 22, fontSize: 14 }}>
        <button type="button" className="btn-ghost" onClick={() => pick(state.index - 1)} aria-label="Previous book" style={{ minWidth: 44, justifyContent: "center", padding: 0 }}>←</button>
        <button type="button" className="btn-ghost" onClick={toggle}>{state.open ? "Close book" : "Open book"}</button>
        <button type="button" className="btn-ghost" onClick={() => pick(state.index + 1)} aria-label="Next book" style={{ minWidth: 44, justifyContent: "center", padding: 0 }}>→</button>
        <span className="label" style={{ marginLeft: 8 }}>{state.index + 1} / {count}</span>
      </div>
    </>
  );
};
