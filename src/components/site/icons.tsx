import type { ReactNode, SVGProps } from "react";
import type { TechName } from "@/data/site";

type IconProps = SVGProps<SVGSVGElement>;

const base = { fill: "none", stroke: "currentColor", "aria-hidden": true } as const;

export const GitHubIcon = (p: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 20 20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...base} {...p}>
    <path d="M7.5 16.5C3.8 17.6 3.8 14.6 2.3 14.2M12.7 18.5V15.6C12.8 14.7 12.5 13.8 11.9 13.2C14.4 12.9 17 11.9 17 7.6C17 6.5 16.6 5.4 15.8 4.6C16.2 3.6 16.1 2.4 15.8 1.5C15.8 1.5 14.8 1.2 12.7 2.6C10.9 2.1 9.1 2.1 7.3 2.6C5.2 1.2 4.2 1.5 4.2 1.5C3.9 2.4 3.8 3.6 4.2 4.6C3.4 5.4 3 6.5 3 7.6C3 11.9 5.6 12.9 8.1 13.2C7.5 13.8 7.2 14.7 7.3 15.6V18.5" />
  </svg>
);

export const XIcon = (p: IconProps) => (
  <svg width="15" height="15" viewBox="0 0 20 20" strokeWidth="1.7" strokeLinecap="round" {...base} {...p}>
    <path d="M2.5 2.5L17.5 17.5M17.5 2.5L2.5 17.5" />
  </svg>
);

export const LinkedInIcon = (p: IconProps) => (
  <svg width="17" height="17" viewBox="0 0 20 20" strokeWidth="1.5" strokeLinejoin="round" {...base} {...p}>
    <rect x="2.5" y="2.5" width="15" height="15" rx="2" />
    <path d="M6.5 8.5V14M6.5 6V6.1M9.8 14V8.5M9.8 11C9.8 9.6 10.8 8.5 12 8.5C13.2 8.5 14 9.4 14 10.8V14" strokeLinecap="round" />
  </svg>
);

export const MediumIcon = (p: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 20 20" strokeWidth="1.5" {...base} {...p}>
    <circle cx="6.5" cy="10" r="4.5" />
    <ellipse cx="14" cy="10" rx="2" ry="4.3" />
    <path d="M18 6V14" strokeLinecap="round" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" strokeWidth="1.4" strokeLinejoin="round" {...base} {...p}>
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
    <path d="M2 4L8 8.5L14 4" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 14 14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...base} {...p}>
    <path d="M3.5 5.5L7 9L10.5 5.5" />
  </svg>
);

const TECH_PATHS: Record<TechName, ReactNode> = {
  Node: <path d="M8 1.5L13.6 4.75V11.25L8 14.5L2.4 11.25V4.75Z" strokeLinejoin="round" />,
  Hono: <path d="M8 1.5C10 4 12.5 5.5 12.5 9.2C12.5 12.2 10.4 14.5 8 14.5C5.6 14.5 3.5 12.2 3.5 9.2C3.5 7.4 4.5 6 5.4 5.2C5.4 7 6.3 8 7.2 8.3C6.8 5.8 7.2 3.4 8 1.5Z" strokeLinejoin="round" />,
  Bun: (
    <>
      <ellipse cx="8" cy="9" rx="6.2" ry="4.8" />
      <circle cx="6" cy="8.6" r=".7" fill="currentColor" />
      <circle cx="10" cy="8.6" r=".7" fill="currentColor" />
    </>
  ),
  MongoDB: <path d="M8 1.5C11 4.5 11.5 7.5 8 12.5C4.5 7.5 5 4.5 8 1.5ZM8 12.5V14.5" strokeLinejoin="round" />,
  "Next.js": (
    <>
      <circle cx="8" cy="8" r="6.3" />
      <path d="M5.8 10.8V5.2L10.6 11.4M10.2 5.2V8.4" strokeLinecap="round" />
    </>
  ),
  Tailwind: <path d="M1.5 7C3 4.5 5 4 7.5 5.5C9 6.4 10 6.5 11 6M5 11C6.5 8.5 8.5 8 11 9.5C12.5 10.4 13.5 10.5 14.5 10" strokeLinecap="round" />,
};

export const TechIcon = ({ name, ...p }: IconProps & { name: TechName }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" strokeWidth="1.5" {...base} {...p}>
    {TECH_PATHS[name]}
  </svg>
);
