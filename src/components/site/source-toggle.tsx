"use client";

import { useEffect, useState } from "react";
import { SOURCE_EVENT, toggleSource } from "@/lib/overlays";

// Footer switch for "view source" mode, which labels each section with the component and data behind it.
export const SourceToggle = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const sync = () => setOn(document.documentElement.hasAttribute("data-source"));
    window.addEventListener(SOURCE_EVENT, sync);
    return () => window.removeEventListener(SOURCE_EVENT, sync);
  }, []);

  return (
    <button type="button" className="source-toggle label" aria-pressed={on} onClick={() => toggleSource()}>
      <span aria-hidden="true">&lt;/&gt;</span> {on ? "hide source" : "view source"}
    </button>
  );
};
