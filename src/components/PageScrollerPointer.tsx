"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface SectionItem {
  id: string;
  label: string;
}

export default function PageScrollerPointer({
  className,
}: {
  className?: string;
}) {
  const [activeSection, setActiveSection] = React.useState<string>("");

  const sections: SectionItem[] = [
    { id: "aboutme", label: "About Me" },
    { id: "github", label: "Github" },
    { id: "techstack", label: "Skills" },
    { id: "experience", label: "Experiences" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Blogs" },
  ];

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when the section occupies the central viewport area
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn(
        "absolute top-0 right-0 hidden xl:flex flex-col items-start text-[10px] tracking-wider uppercase select-none w-36",
        className,
      )}
    >
      <div className="flex flex-col space-y-1 w-full">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="flex items-center h-5 w-full text-left transition-colors duration-200 group/btn cursor-pointer"
            >
              <div className="w-8 flex items-center justify-start">
                <motion.div
                  animate={{
                    width: isActive ? 24 : 8,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={cn(
                    "h-[2px] rounded-full transition-colors duration-300",
                    isActive
                      ? "bg-foreground"
                      : "bg-muted-foreground/20 group-hover/btn:bg-muted-foreground/40",
                  )}
                />
              </div>
              <motion.span
                animate={{
                  scale: isActive ? 1.15 : 1,
                  x: isActive ? 6 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={cn(
                  "origin-left transition-colors duration-300 select-none",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground/40 group-hover/btn:text-foreground/80",
                )}
              >
                {sec.label}
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
