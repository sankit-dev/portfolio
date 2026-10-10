import { DEPTHS, type Depth } from "@/data/rabbit-holes";

const LEVELS = [1, 2, 3, 4, 5] as const;

// Five steps going down; the filled ones are how deep I got.
export const DepthMeter = ({ depth, showLabel = true }: { depth: Depth; showLabel?: boolean }) => (
  <span className="depth-meter" title={DEPTHS[depth].label}>
    <span className="depth-steps" aria-hidden="true">
      {LEVELS.map((level) => (
        <i key={level} className={level <= depth ? "on" : undefined} style={{ height: 4 + level * 2 }} />
      ))}
    </span>
    {showLabel ? <span className="label">{DEPTHS[depth].label}</span> : <span className="sr-only">{DEPTHS[depth].label}</span>}
  </span>
);
