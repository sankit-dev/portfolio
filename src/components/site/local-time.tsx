"use client";

import { useEffect, useState } from "react";

const MINUTE_MS = 60_000;

// What I'm probably doing at a given hour, local time.
const statusAt = (hour: number) => {
  if (hour < 6) return "asleep (or debugging)";
  if (hour < 10) return "coffee, then code";
  if (hour < 18) return "probably debugging";
  if (hour < 22) return "building in public";
  return "one more rabbit hole";
};

export const LocalTime = ({ timeZone, place }: { timeZone: string; place: string }) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, MINUTE_MS);
    return () => clearInterval(id);
  }, []);

  // Rendered only after mount: the server doesn't know the current minute, and this avoids a hydration mismatch.
  if (!now) return <span className="local-time label" aria-hidden="true">&nbsp;</span>;

  const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone });
  const hour = Number(now.toLocaleString("en-US", { hour: "numeric", hourCycle: "h23", timeZone }));

  return (
    <span className="local-time label">
      <span className="now-dot" aria-hidden="true" />
      {time} in {place} · {statusAt(hour)}
    </span>
  );
};
