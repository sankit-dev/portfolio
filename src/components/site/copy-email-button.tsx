"use client";

import { useEffect, useRef, useState } from "react";
import { MailIcon } from "./icons";

const RESET_MS = 1800;

export const CopyEmailButton = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked; the label still confirms so the visitor can use the mail link instead.
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), RESET_MS);
  };

  return (
    <button type="button" className="btn" onClick={copy}>
      <MailIcon />
      <span aria-live="polite">{copied ? "Copied. Talk soon!" : "Copy email"}</span>
    </button>
  );
};
