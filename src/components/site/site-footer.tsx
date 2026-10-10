import { currentlyReading, SITE } from "@/data/site";
import Link from "next/link";
import { HandNote } from "./hand-note";
import { SourceToggle } from "./source-toggle";
import { VisitorCount } from "./visitor-count";
import { GitHubIcon, LinkedInIcon, MailIcon, MediumIcon, XIcon } from "./icons";

const reading = currentlyReading();

const DOCK = [
  { label: "GitHub", href: SITE.socials.github, Icon: GitHubIcon },
  { label: "X", href: SITE.socials.x, Icon: XIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedInIcon },
  { label: "Medium", href: SITE.socials.medium, Icon: MediumIcon },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon },
];

// Second line of the hover preview: the handle from a profile URL, or the address for mail.
const detailOf = (href: string) => {
  if (href.startsWith("mailto:")) return href.slice("mailto:".length);
  const handle = href.match(/^https?:\/\/[^/]+\/(?:in\/)?@?([^/?#]+)/)?.[1];
  return handle ? `@${handle}` : null;
};

export const SiteFooter = () => (
  <footer className="site-footer" data-src="SiteFooter ← SITE.socials, BOOKS, /api/visitors">
    <div className="follow">
      <HandNote arrow="down-right" className="follow-note">follow me</HandNote>
      <nav className="dock" aria-label="Social links">
        {DOCK.map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            <Icon />
            <span className="dock-tip" aria-hidden="true">
              {label}
              {detailOf(href) && <small>{detailOf(href)}</small>}
            </span>
          </a>
        ))}
      </nav>
    </div>
    <div style={{ textAlign: "right" }}>
      <svg className="signature" role="img" aria-label={`Signed, ${SITE.name}`} width="150" height="50" viewBox="0 0 150 50" style={{ display: "block", marginLeft: "auto" }}>
        <text x="2" y="38" fill="currentColor" stroke="currentColor" strokeWidth="1" style={{ fontFamily: "var(--font-hand), cursive", fontSize: 40, fontWeight: 600 }}>
          Ankit S.
        </text>
      </svg>
      <div className="dim" style={{ fontSize: 13 }}>{SITE.footerNote}</div>
      {reading && (
        <Link href="/books" className="footer-reading">
          reading <em>{reading.title}</em>
          {reading.progress !== undefined && <span className="label"> · {reading.progress}%</span>}
        </Link>
      )}
      <VisitorCount />
      <div className="footer-links">
        <Link href="/rabbit-holes" className="label">rabbit holes</Link>
        <SourceToggle />
      </div>
    </div>
  </footer>
);
