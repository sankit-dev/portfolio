import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { CopyEmailButton } from "@/components/site/copy-email-button";
import { TechIcon } from "@/components/site/icons";
import { ScrambleName } from "@/components/site/scramble-name";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { HONEST_STATS, PROJECTS, SITE, type TechName } from "@/data/site";
import Link from "next/link";

const Tech = ({ name }: { name: TechName }) => (
  <span className="tech">
    <TechIcon name={name} />
    {name}
  </span>
);

const shippedCount = PROJECTS.filter((p) => p.status === "shipped").length;

export default function HomePage() {
  return (
    <div className="page">
      <div className="banner" aria-hidden="true">
        <FlickeringGrid className="banner-grid" squareSize={4} gridGap={4} flickerChance={0.2} maxOpacity={0.35} />
      </div>

      <section style={{ padding: "0 2px" }}>
        <div className="identity-row">
          <div className="avatar">A</div>
          <span className="pill fade-up" style={{ animationDelay: "0.3s" }}>
            <span className="dot" />
            <span className="shiny">{SITE.openTo}</span>
          </span>
        </div>

        <ScrambleName name={SITE.name} />
        <div className="role-line fade-up" style={{ animationDelay: "0.12s" }}>
          <span>Software Engineer,</span>
          <span className="roles-window">
            <span className="roles-track">
              {[...SITE.roles, SITE.roles[0]].map((role, i) => (
                <span key={`${role}-${i}`}>{role}</span>
              ))}
            </span>
          </span>
        </div>

        <p className="fade-up" style={{ margin: "26px 0 0", animationDelay: "0.22s" }}>
          Hey, I&apos;m Ankit. I build stuff that <s className="dim">usually</s> works, mostly on the backend with{" "}
          <Tech name="Node" />, <Tech name="Hono" />, <Tech name="Bun" /> and <Tech name="MongoDB" />, and on the frontend with{" "}
          <Tech name="Next.js" /> and <Tech name="Tailwind" /> when nobody&apos;s looking.
        </p>
        <p className="fade-up" style={{ margin: "16px 0 0", animationDelay: "0.3s" }}>
          I&apos;m curious by default, so I tend to{" "}
          <span className="hand-mark">
            go way too deep into how things work
            <svg viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 8C60 3 120 11 180 6C230 2 270 9 298 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          , and honestly I enjoy it. This year I&apos;m on a builder arc: one app and two web products, shipped in public.
        </p>

        <div className="btn-row fade-up" style={{ animationDelay: "0.4s" }}>
          <CopyEmailButton email={SITE.email} />
          <a className="btn-ghost" href={SITE.resumeUrl}>Resume</a>
          <span className="dim" style={{ fontSize: 14 }}>or DM me on X</span>
        </div>
      </section>

      <section style={{ marginTop: 64 }} aria-labelledby="arc-title">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <h2 id="arc-title" className="section-title">
            Builder arc <em>{shippedCount} of {PROJECTS.length} shipped</em>
          </h2>
          <div className="arc-bar" aria-hidden="true">
            {PROJECTS.map((p, i) => (
              <span key={p.name} className={p.status === "shipped" ? "done" : "todo"} style={{ animationDelay: `${0.6 + i * 0.2}s` }} />
            ))}
          </div>
        </div>
        <SpotlightCard>
          {PROJECTS.map((p) => (
            <a key={p.name} className="project-row" href={p.url ?? "/projects"}>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              <span className="dim">~ {p.summary}</span>
              <span style={{ flex: 1 }} />
              <span className="label">{p.status}</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </SpotlightCard>
        <Link className="see-all" href="/projects">
          See all projects <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section style={{ marginTop: 56 }} aria-labelledby="stats-title">
        <h2 id="stats-title" className="section-title">Honest stats</h2>
        <div style={{ marginTop: 8 }}>
          {HONEST_STATS.map((s) => (
            <div key={s.label} className="stat">
              <span>{s.label}</span>
              <span className="leader" />
              <span style={{ fontWeight: 600 }}>
                {s.value} {"note" in s && <span className="dim" style={{ fontWeight: 400 }}>{s.note}</span>}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
