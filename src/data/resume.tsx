import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";

export const DATA = {
  name: "Ankit Singh",
  initials: "AS",
  url: "https://github.com/sankit-dev",
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Developer building practical web apps, clean interfaces, and reliable user experiences.",
  summary:
    "I enjoy turning ideas into polished web products with thoughtful interfaces and maintainable code. This portfolio is a work in progress, so some sections use placeholder content until the final resume details are added.",
  avatarUrl: "https://avatars.githubusercontent.com/u/257124607?v=4",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Typescript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "osi.vijay@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sankit-dev",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "",
        icon: Icons.linkedin,

        navbar: false,
      },
      X: {
        name: "X",
        url: "",
        icon: Icons.x,

        navbar: false,
      },
      Youtube: {
        name: "Youtube",
        url: "",
        icon: Icons.youtube,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:sankitdev.official.com",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [] as {
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string;
  }[],
  education: [] as {
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }[],
  projects: [
    {
      title: "Personal Portfolio",
      href: "https://github.com/sankit-dev/portfolio",
      dates: "2026 - Present",
      active: true,
      description:
        "A personal portfolio and writing site built with Next.js, TypeScript, Tailwind CSS, MDX, and reusable React components.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "React",
        "Node",
        "Express",
        "MongoDB"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/sankit-dev/portfolio",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Dev Atlas",
      href: "https://github.com/sankit-dev/dev-atlas",
      dates: "",
      active: true,
      description:
        "A developer-focused project. Description and feature details will be updated as the project README and final portfolio copy are filled in.",
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "React",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/sankit-dev/dev-atlas",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [] as {
    title: string;
    dates: string;
    location: string;
    description: string;
    image: string;
    links: {
      title: string;
      icon: ReactNode;
      href: string;
    }[];
  }[],
} as const;
