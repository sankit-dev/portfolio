import { JobTimeline } from "@/components/site/job-timeline";
import { JOBS } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Work", description: "Where I've worked and what I've owned." };

export default function WorkPage() {
  return (
    <section className="page">
      <div className="page-head">
        <h1 className="page-title">Work <em>experience</em></h1>
        <span className="label">click to expand</span>
      </div>
      <JobTimeline jobs={JOBS} />
    </section>
  );
}
