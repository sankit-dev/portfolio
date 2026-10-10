"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { NAV, SITE } from "@/data/site";
import { isTypingIn, openTerminal, PALETTE_EVENT, toggleSource } from "@/lib/overlays";
import { isDark, switchTheme } from "@/lib/theme-switch";

export type PalettePost = { title: string; slug: string };

type Item = { id: string; group: "Pages" | "Posts" | "Actions" | "Elsewhere"; label: string; hint?: string; run: () => void };

const COPIED_MS = 1400;

const matches = (item: Item, query: string) => {
  const haystack = `${item.label} ${item.group} ${item.hint ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

export const CommandPalette = ({ posts }: { posts: PalettePost[] }) => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus();
  };

  const items = useMemo<Item[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => window.open(href, "_blank", "noopener");
    return [
      { id: "home", group: "Pages", label: "Home", hint: "/", run: go("/") },
      ...NAV.map((n) => ({ id: n.href, group: "Pages" as const, label: n.label, hint: n.href, run: go(n.href) })),
      { id: "holes", group: "Pages", label: "Rabbit holes", hint: "/rabbit-holes", run: go("/rabbit-holes") },
      ...posts.map((p) => ({ id: `post-${p.slug}`, group: "Posts" as const, label: p.title, hint: "post", run: go(`/blog/${p.slug}`) })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email",
        hint: SITE.email,
        run: () => {
          navigator.clipboard?.writeText(SITE.email).catch(() => undefined);
          setToast("Email copied");
        },
      },
      { id: "theme", group: "Actions", label: "Toggle theme", hint: "light / dark", run: () => switchTheme(setTheme, isDark() ? "light" : "dark") },
      { id: "terminal", group: "Actions", label: "Open terminal", hint: "~", run: openTerminal },
      { id: "source", group: "Actions", label: "View source", hint: "what powers each section", run: () => toggleSource() },
      { id: "github", group: "Elsewhere", label: "GitHub", run: external(SITE.socials.github) },
      { id: "x", group: "Elsewhere", label: "X", run: external(SITE.socials.x) },
      { id: "linkedin", group: "Elsewhere", label: "LinkedIn", run: external(SITE.socials.linkedin) },
      { id: "medium", group: "Elsewhere", label: "Medium", run: external(SITE.socials.medium) },
    ];
  }, [posts, router, setTheme]);

  const visible = query.trim() ? items.filter((item) => matches(item, query.trim())) : items;

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !isTypingIn(e.target);
      if (!combo && !slash) return;
      e.preventDefault();
      setQuery("");
      setCursor(0);
      setOpen((wasOpen) => !wasOpen);
    };
    const onOpen = () => {
      setQuery("");
      setCursor(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    input.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), COPIED_MS);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    item.run();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(visible.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + visible.length) % Math.max(visible.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(visible[cursor]);
    } else if (e.key === "Tab") {
      // The input is the only focus stop; keep focus inside the dialog.
      e.preventDefault();
    }
  };

  return (
    <>
      {open && (
        <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={onKeyDown}>
            <div className="palette-search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <circle cx="7" cy="7" r="4.8" />
                <path d="M10.6 10.6L14 14" />
              </svg>
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                placeholder="Jump to a page, post or action…"
                aria-label="Search"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={visible[cursor] ? `palette-${visible[cursor].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd>esc</kbd>
            </div>
            <ul ref={list} id="palette-list" className="palette-list" role="listbox" aria-label="Results">
              {visible.length === 0 && <li className="palette-empty label">nothing down this hole. try &ldquo;blog&rdquo;</li>}
              {visible.map((item, i) => (
                <li key={item.id}>
                  {(i === 0 || visible[i - 1].group !== item.group) && <div className="palette-group label">{item.group}</div>}
                  <div
                    id={`palette-${item.id}`}
                    role="option"
                    aria-selected={i === cursor}
                    data-index={i}
                    className="palette-item"
                    onMouseMove={() => setCursor(i)}
                    onClick={() => run(item)}
                  >
                    <span>{item.label}</span>
                    {item.hint && <span className="label">{item.hint}</span>}
                  </div>
                </li>
              ))}
            </ul>
            <div className="palette-foot label" aria-hidden="true">
              <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>~</kbd> terminal</span>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="palette-toast label" role="status">
          {toast}
        </div>
      )}
    </>
  );
};
