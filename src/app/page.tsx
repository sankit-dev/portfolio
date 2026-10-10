import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HandNote } from "@/components/site/hand-note";
import { BuildStrip } from "@/components/site/build-strip";
import { CopyEmailButton } from "@/components/site/copy-email-button";
import { TechIcon } from "@/components/site/icons";
import { LocalTime } from "@/components/site/local-time";
import { QuoteDeck } from "@/components/site/quote-deck";
import { ScrambleName } from "@/components/site/scramble-name";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { DepthMeter } from "@/components/site/depth-meter";
import { currentHole, shortDate } from "@/data/rabbit-holes";
import { HONEST_STATS, PROJECTS, QUOTES, SITE, type TechName } from "@/data/site";
import Link from "next/link";

const Tech = ({ name }: { name: TechName }) => (
  <span className="tech">
    <TechIcon name={name} />
    {name}
  </span>
);

const digging = currentHole();
const shippedCount = PROJECTS.filter((p) => p.status === "shipped").length;

export default function HomePage() {
  return (
    <div className="page">
      <div className="banner" aria-hidden="true">
        <FlickeringGrid className="banner-grid" squareSize={4} gridGap={4} flickerChance={0.2} maxOpacity={0.35} />
      </div>

      <section style={{ padding: "0 2px" }} data-src="app/page.tsx · ScrambleName, LocalTime ← SITE">
        <div className="identity-row">
          <div className="avatar-wrap">
            <HandNote arrow="down-right" className="avatar-note" delay={1.2}>hi, that&apos;s me</HandNote>
            <div className="avatar">A</div>
          </div>
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
        <div className="fade-up" style={{ marginTop: 14, animationDelay: "0.5s" }}>
          <LocalTime timeZone={SITE.timeZone} place={SITE.place} />
        </div>
      </section>

      <section style={{ marginTop: 64 }} aria-labelledby="arc-title" data-src="SpotlightCard ← PROJECTS · BuildStrip ← GitHub API (1h cache)">
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
        <BuildStrip user={SITE.githubUser} />
      </section>

      {digging && (
        <section style={{ marginTop: 56 }} aria-labelledby="digging-title" data-src="currentHole() ← RABBIT_HOLES">
          <h2 id="digging-title" className="section-title">
            Currently <em>down a rabbit hole</em>
          </h2>
          <Link className="digging-card" href="/rabbit-holes">
            <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
              <span className="now">
                <span className="now-dot" />
                since {shortDate(digging.date)}
              </span>
              <span style={{ flex: 1 }} />
              <DepthMeter depth={digging.depth} />
            </span>
            <span style={{ display: "block", marginTop: 10, fontWeight: 600 }}>{digging.topic}</span>
            <span className="dim" style={{ display: "block", fontSize: 15 }}>{digging.learned}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 14, fontWeight: 500 }}>
              Open the dive log <span className="arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        </section>
      )}

      <section style={{ marginTop: 56 }} aria-labelledby="stats-title" data-src="HONEST_STATS">
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

      <section style={{ marginTop: 56 }} aria-labelledby="quotes-title" data-src="QuoteDeck ← QUOTES">
        <h2 id="quotes-title" className="section-title">
          Quotes <em>I keep coming back to</em>
        </h2>
        <QuoteDeck quotes={QUOTES} />
      </section>
    </div>
  );
}
