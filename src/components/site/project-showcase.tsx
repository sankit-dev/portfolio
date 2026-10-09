"use client";

import { useState } from "react";
import type { Project, ProjectStatus } from "@/data/site";

type Filter = "all" | ProjectStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "shipped", label: "Shipped" },
  { id: "cooking", label: "Cooking" },
];

const Preview = ({ project }: { project: Project }) => (
  <div className="preview">
    <span className={`status-badge ${project.status}`}>{project.status}</span>
    {project.kind === "Web" ? (
      <div className="shot browser">
        <div className="browser-bar">
          <i /><i /><i />
          <span className="browser-url">{project.displayUrl}</span>
        </div>
        {project.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.screenshot} alt={`${project.name} screenshot`} style={{ width: "100%", display: "block" }} />
        ) : (
          <div className="label" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 40 }}>
            [ screenshot ]
          </div>
        )}
      </div>
    ) : (
      <div className="shot phone">
        <span style={{ width: 40, height: 6, borderRadius: 3, background: "var(--fg)" }} />
        <span className="label" style={{ margin: "auto 0" }}>[ app screen ]</span>
      </div>
    )}
  </div>
);

export const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = projects.filter((p) => filter === "all" || p.status === filter);
  const count = (id: Filter) => (id === "all" ? projects.length : projects.filter((p) => p.status === id).length);

  return (
    <>
      <div className="page-head">
        <h1 className="page-title">Projects <em>I&apos;ve shipped</em></h1>
        <div className="tabs" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" role="tab" className="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label} <span className="mono" style={{ fontSize: 11, opacity: 0.7 }}>{count(f.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 22 }}>
        {visible.map((p, i) => (
          <article key={`${filter}-${p.name}`} className="project-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <Preview project={p} />
            <div style={{ padding: "18px 20px 20px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>{p.name}</h2>
                <span className="label">{p.kind}</span>
              </div>
              <p className="dim" style={{ margin: "6px 0 0", fontSize: 16 }}>{p.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 14 }}>
                <div className="chips">
                  {p.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {p.links.map((l) => (
                    <a key={l.label} className="link-pill" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};
