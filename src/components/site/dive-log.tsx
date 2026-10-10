"use client";

import { useState } from "react";
import { DEPTHS, shortDate, type Depth, type RabbitHole } from "@/data/rabbit-holes";
import { DepthMeter } from "./depth-meter";

// Chart geometry, in viewBox units.
const W = 600;
const H = 230;
const SURFACE_Y = 28;
const LEVEL_GAP = 38;
const PLOT_LEFT = 74;
const PLOT_RIGHT = 590;
const LEVELS = [1, 2, 3, 4, 5] as const;

const yOf = (depth: Depth | 0) => SURFACE_Y + depth * LEVEL_GAP;

// A dive profile: from the surface down to each hole's depth, back up if I surfaced, and left hanging if I'm still down there.
const profilePath = (holes: RabbitHole[], xs: number[], halfWidth: number) => {
  let d = `M ${PLOT_LEFT - 20} ${SURFACE_Y}`;
  holes.forEach((hole, i) => {
    const x = xs[i];
    const y = yOf(hole.depth);
    d += ` L ${x - halfWidth} ${SURFACE_Y}`;
    d += ` C ${x - halfWidth * 0.35} ${SURFACE_Y} ${x - halfWidth * 0.6} ${y} ${x} ${y}`;
    if (hole.status === "surfaced") {
      d += ` C ${x + halfWidth * 0.6} ${y} ${x + halfWidth * 0.35} ${SURFACE_Y} ${x + halfWidth} ${SURFACE_Y}`;
    }
  });
  if (holes.at(-1)?.status === "surfaced") d += ` L ${PLOT_RIGHT} ${SURFACE_Y}`;
  return d;
};

export const DiveLog = ({ holes }: { holes: RabbitHole[] }) => {
  const [active, setActive] = useState(holes.length - 1);
  const slot = (PLOT_RIGHT - PLOT_LEFT) / Math.max(holes.length, 1);
  const xs = holes.map((_, i) => PLOT_LEFT + slot * (i + 0.5));
  const current = holes[active];
  const deepest = holes.reduce((max, h) => Math.max(max, h.depth), 0);

  return (
    <>
      <figure className="dive">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Dive profile of ${holes.length} rabbit holes; deepest: ${DEPTHS[deepest as Depth]?.label ?? "none"}`}>
          <text x="0" y={SURFACE_Y + 4} className="dive-axis">surface</text>
          <line x1={PLOT_LEFT - 20} x2={PLOT_RIGHT} y1={SURFACE_Y} y2={SURFACE_Y} className="dive-surface" />
          {LEVELS.map((level) => (
            <g key={level}>
              <text x="0" y={yOf(level) + 4} className="dive-axis">{DEPTHS[level].short}</text>
              <line x1={PLOT_LEFT - 20} x2={PLOT_RIGHT} y1={yOf(level)} y2={yOf(level)} className="dive-grid" />
            </g>
          ))}

          <path d={profilePath(holes, xs, slot * 0.4)} pathLength={1} className="dive-line" />

          {holes.map((hole, i) => (
            <g key={hole.date} className="dive-point" data-active={i === active} onMouseEnter={() => setActive(i)}>
              <line x1={xs[i]} x2={xs[i]} y1={SURFACE_Y} y2={yOf(hole.depth)} className="dive-drop" />
              {hole.status === "digging" && <circle cx={xs[i]} cy={yOf(hole.depth)} r="6" className="dive-ping" />}
              <circle cx={xs[i]} cy={yOf(hole.depth)} r="4.5" className="dive-dot" style={{ animationDelay: `${0.4 + i * 0.12}s` }} />
              <circle cx={xs[i]} cy={(SURFACE_Y + yOf(hole.depth)) / 2} r={slot / 2} className="dive-hit" />
            </g>
          ))}
        </svg>
        {current && (
          <figcaption className="dive-caption" aria-live="polite">
            <span className="label">{shortDate(current.date)}</span>
            <span className="dive-caption-topic">{current.topic}</span>
            <span className="label">{DEPTHS[current.depth].label}</span>
          </figcaption>
        )}
      </figure>

      <ol className="holes" reversed>
        {holes
          .map((hole, i) => ({ hole, i }))
          .reverse()
          .map(({ hole, i }) => (
            <li key={hole.date} className="hole" data-active={i === active} onMouseEnter={() => setActive(i)}>
              <span className="label hole-date">{shortDate(hole.date)}</span>
              <div className="hole-body">
                <div className="hole-head">
                  <span className="hole-topic">{hole.topic}</span>
                  {hole.status === "digging" && (
                    <span className="now">
                      <span className="now-dot" />
                      digging
                    </span>
                  )}
                </div>
                <p className="dim hole-learned">{hole.learned}</p>
                <div className="hole-foot">
                  <DepthMeter depth={hole.depth} />
                  {hole.link && (
                    <a className="link-pill" href={hole.link.href}>
                      {hole.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ol>
    </>
  );
};
