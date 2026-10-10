import { ProjectShowcase } from "@/components/site/project-showcase";
import { PROJECTS } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects", description: "Things I've built and shipped, and what's still cooking." };

export default function ProjectsPage() {
  return (
    <section className="page" data-src="ProjectShowcase ← PROJECTS">
      <ProjectShowcase projects={PROJECTS} />
    </section>
  );
}
