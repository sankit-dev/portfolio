"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%&*";
const FRAME_MS = 35;

const scrambleFrame = (target: string, revealed: number) =>
  target
    .split("")
    .map((char, i) => (char === " " || i < revealed ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");

export const ScrambleName = ({ name }: { name: string }) => {
  const [text, setText] = useState(name);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const scramble = () => {
    if (timer.current) clearInterval(timer.current);
    let frame = 0;
    timer.current = setInterval(() => {
      frame += 1;
      const revealed = frame / 2;
      if (revealed >= name.length) {
        if (timer.current) clearInterval(timer.current);
        setText(name);
        return;
      }
      setText(scrambleFrame(name, revealed));
    }, FRAME_MS);
  };

  return (
    <h1 className="name fade-up" aria-label={name} onMouseEnter={scramble} style={{ animationDelay: "0.05s" }}>
      <span aria-hidden="true">{text}</span>
    </h1>
  );
};
