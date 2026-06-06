"use client";

import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import StackIcon from "tech-stack-icons";
import { useTheme } from "next-themes";

interface TechStackType {
  id: number;
  name: string;
  IconJSX: React.ReactNode;
}

export default function Techstack() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (
    theme === "dark" || 
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const TechStacks: TechStackType[] = [
    // Languages
    { id: 1, name: "JavaScript", IconJSX: <StackIcon name="js" className="w-4 h-4" /> },
    { id: 2, name: "TypeScript", IconJSX: <StackIcon name="typescript" className="w-4 h-4" /> },
    { id: 3, name: "Python", IconJSX: <StackIcon name="python" className="w-4 h-4" /> },
    { id: 4, name: "Go", IconJSX: <StackIcon name="go" className="w-4 h-4" /> },

    // Frontend
    { id: 5, name: "React.js", IconJSX: <StackIcon name="react" className="w-4 h-4" /> },
    { id: 6, name: "Next.js", IconJSX: <StackIcon name="nextjs" className="w-4 h-4" variant={isDark ? "dark" : "light"} /> },
    { id: 7, name: "Tailwind", IconJSX: <StackIcon name="tailwindcss" className="w-4 h-4" /> },
    { id: 8, name: "Motion", IconJSX: <StackIcon name="motion" className="w-4 h-4" /> },
    { id: 9, name: "Zustand", IconJSX: <StackIcon name="zustand" className="w-4 h-4" /> },
    { id: 10, name: "Redux Toolkit", IconJSX: <StackIcon name="redux" className="w-4 h-4" /> },
    { id: 11, name: "Tanstack Query", IconJSX: <StackIcon name="reactquery" className="w-4 h-4" /> },

    // Backend
    { id: 12, name: "Node", IconJSX: <StackIcon name="nodejs" className="w-4 h-4" /> },
    { id: 13, name: "Bun", IconJSX: <StackIcon name="bunjs" className="w-4 h-4" /> },
    { id: 14, name: "Express", IconJSX: <StackIcon name="expressjs" className="w-4 h-4" variant={isDark ? "dark" : "light"} /> },
    { id: 15, name: "tRPC", IconJSX: <StackIcon name="tRPC" className="w-4 h-4" /> },
    { id: 16, name: "Prisma", IconJSX: <StackIcon name="prisma" className="w-4 h-4" variant={isDark ? "dark" : "light"} /> },
    { id: 17, name: "Drizzle", IconJSX: <StackIcon name="drizzle" className="w-4 h-4" /> },
    { id: 18, name: "Socket.io", IconJSX: <StackIcon name="socketio" className="w-4 h-4" /> },
    {
      id: 19,
      name: "BetterAuth",
      IconJSX: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-yellow-500"
        >
          <circle cx="7.5" cy="15.5" r="5.5"></circle>
          <path d="m21 2-9.6 9.6"></path>
          <path d="m15.5 7.5 3 3"></path>
        </svg>
      )
    },
    { id: 20, name: "Clerk", IconJSX: <StackIcon name="clerk" className="w-4 h-4" /> },
    { id: 21, name: "Redis", IconJSX: <StackIcon name="redis" className="w-4 h-4" /> },

    // Database
    { id: 22, name: "PostgreSQL", IconJSX: <StackIcon name="postgresql" className="w-4 h-4" /> },
    { id: 23, name: "MongoDB", IconJSX: <StackIcon name="mongodb" className="w-4 h-4" /> },
    { id: 24, name: "MySQL", IconJSX: <StackIcon name="mysql" className="w-4 h-4" /> },

    // DevOps
    { id: 25, name: "AWS", IconJSX: <StackIcon name="aws" className="w-4 h-4" /> },
    { id: 26, name: "DigitalOcean", IconJSX: <StackIcon name="digitalocean" className="w-4 h-4" /> },
    { id: 27, name: "Docker", IconJSX: <StackIcon name="docker" className="w-4 h-4" /> },
    { id: 28, name: "Nginx", IconJSX: <StackIcon name="nginx" className="w-4 h-4" /> },
    {
      id: 29,
      name: "GitHub Actions",
      IconJSX: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-blue-500"
        >
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6M12 2v20" />
        </svg>
      )
    },
    { id: 30, name: "New Relic", IconJSX: <StackIcon name="newrelic" className="w-4 h-4" /> },

    // Tools
    { id: 31, name: "Git", IconJSX: <StackIcon name="git" className="w-4 h-4" /> },
    { id: 32, name: "GitHub", IconJSX: <StackIcon name="github" className="w-4 h-4" variant={isDark ? "dark" : "light"} /> },
    { id: 33, name: "Notion", IconJSX: <StackIcon name="notion" className="w-4 h-4" /> },
    { id: 34, name: "Cursor", IconJSX: <StackIcon name="cursor" className="w-4 h-4" /> },
    { id: 35, name: "Antigravity", IconJSX: <StackIcon name="antigravity" className="w-4 h-4" /> }
  ];

  return (
    <>
      <SubSection>
        <h2 className="text-xl font-medium text-foreground tracking-tight py-1">
          Tech Stack
        </h2>
      </SubSection>
      <SubSection>
        <div className="flex flex-wrap gap-2 py-3 select-none">
          {TechStacks.map((tech) => (
            <div
              key={tech.id}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-xs border border-zinc-200 shadow-xs dark:border-zinc-600 dark:bg-card/30 text-foreground text-xs tracking-wide hover:bg-accent/60 hover:text-accent-foreground transition-all duration-200 cursor-pointer"
            >
              {tech.IconJSX}
              {tech.name}
            </div>
          ))}
        </div>
      </SubSection>
    </>
  );
}