"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { NAV } from "@/data/site";
import { MoonIcon, SunIcon } from "./icons";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

export const SiteHeader = () => {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="site-header">
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
        {/* Both icons render; CSS shows the right one from the .dark class, so no hydration mismatch. */}
        <button type="button" className="icon-btn" aria-label="Toggle theme" onClick={toggleTheme}>
          <MoonIcon className="theme-icon-moon" />
          <SunIcon className="theme-icon-sun" />
        </button>
      </nav>
    </header>
  );
};
