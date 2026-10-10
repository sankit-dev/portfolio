"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/data/site";
import { openPalette } from "@/lib/overlays";
import { ThemeToggle } from "./theme-toggle";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <header className="site-header" data-src="SiteHeader ← NAV">
      <Link href="/" className="logo" aria-label="ankit, home">
        ankit.
      </Link>
      <nav className="nav" aria-label="Main">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
        <button type="button" className="theme-toggle palette-btn" aria-label="Open command palette" onClick={openPalette}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="7" cy="7" r="4.8" />
            <path d="M10.6 10.6L14 14" />
          </svg>
          <kbd className="palette-kbd">⌘K</kbd>
        </button>
        <ThemeToggle />
      </nav>
    </header>
  );
};
