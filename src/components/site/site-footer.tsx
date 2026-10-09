import { SITE } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon, MediumIcon, XIcon } from "./icons";

const DOCK = [
  { label: "GitHub", href: SITE.socials.github, Icon: GitHubIcon },
  { label: "X", href: SITE.socials.x, Icon: XIcon },
  { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedInIcon },
  { label: "Medium", href: SITE.socials.medium, Icon: MediumIcon },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon },
];

export const SiteFooter = () => (
  <footer className="site-footer">
    <nav className="dock" aria-label="Social links">
      {DOCK.map(({ label, href, Icon }) => (
        <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          <Icon />
        </a>
      ))}
    </nav>
    <div style={{ textAlign: "right" }}>
      <svg className="signature" role="img" aria-label={`Signed, ${SITE.name}`} width="150" height="50" viewBox="0 0 150 50" style={{ display: "block", marginLeft: "auto" }}>
        <text x="2" y="38" fill="currentColor" stroke="currentColor" strokeWidth="1" style={{ fontFamily: "var(--font-hand), cursive", fontSize: 40, fontWeight: 600 }}>
          Ankit S.
        </text>
      </svg>
      <div className="dim" style={{ fontSize: 13 }}>{SITE.footerNote}</div>
    </div>
  </footer>
);
