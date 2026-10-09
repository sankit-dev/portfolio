"use client";

import { useState } from "react";
import type { Job } from "@/data/site";
import { ChevronDownIcon } from "./icons";

export const JobTimeline = ({ jobs }: { jobs: Job[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="timeline">
      {jobs.map((job, i) => {
        const open = openIndex === i;
        const bodyId = `job-${i}`;
        return (
          <div key={`${job.role}-${job.where}`} style={{ position: "relative" }}>
            <button type="button" className="job-btn" aria-expanded={open} aria-controls={bodyId} onClick={() => setOpenIndex(open ? null : i)}>
              <span className="job-mark">{job.mark}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600 }}>{job.role}</span>
                  {job.current && (
                    <span className="now">
                      <span className="now-dot" />
                      now
                    </span>
                  )}
                </span>
                <span className="dim" style={{ display: "block", fontSize: 15 }}>{job.where}</span>
              </span>
              <span className="label" style={{ whiteSpace: "nowrap" }}>{job.when}</span>
              <ChevronDownIcon className="job-chev" />
            </button>
            {open && (
              <div id={bodyId} className="job-body">
                <ul className="dim" style={{ margin: 0, paddingLeft: 18, listStyle: "disc", fontSize: 16 }}>
                  {job.points.map((point) => (
                    <li key={point} style={{ marginTop: 4 }}>{point}</li>
                  ))}
                </ul>
                <div className="chips" style={{ marginTop: 12 }}>
                  {job.stack.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
