"use client";

import { useEffect, useState } from "react";

const format = new Intl.NumberFormat("en-US");

export const VisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number } | null) => data && setCount(data.count))
      .catch(() => {
        // The count is decoration; if the API is down the footer just leaves it out.
      });
  }, []);

  if (count === null) return null;

  return (
    <div className="visitor-count label">
      <span className="now-dot" aria-hidden="true" />
      {format.format(count)} {count === 1 ? "visitor" : "visitors"}
    </div>
  );
};
