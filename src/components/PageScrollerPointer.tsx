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
  const [scrollPercent, setScrollPercent] = React.useState<number>(0);
  const [sectionTickIndices, setSectionTickIndices] = React.useState<Record<string, number>>({});

  const totalTicks = 45;

  const sections: SectionItem[] = [
    { id: "aboutMe", label: "About Me" },
    { id: "github", label: "Github" },
    { id: "techstack", label: "Skills" },
    { id: "experience", label: "Experiences" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Blogs" },
  ];

  // 1. Track Scroll Percentage
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = (window.scrollY / scrollHeight) * 100;
      setScrollPercent(Math.min(Math.max(Math.round(pct), 0), 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Map Sections to Ticks on the Ruler based on page height
  React.useEffect(() => {
    const calculateSectionTicks = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const indices: Record<string, number> = {};
      const usedTicks = new Set<number>();

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.scrollY + rect.top;
          const pct = scrollTop / scrollHeight;
          let tickIndex = Math.round(pct * (totalTicks - 1));
          tickIndex = Math.min(Math.max(tickIndex, 0), totalTicks - 1);

          // Ensure unique tick index for each section
          while (usedTicks.has(tickIndex) && tickIndex < totalTicks - 1) {
            tickIndex++;
          }
          usedTicks.add(tickIndex);
          indices[sec.id] = tickIndex;
        }
      });
      setSectionTickIndices(indices);
    };

    calculateSectionTicks();
    window.addEventListener("resize", calculateSectionTicks);
    const timer = setTimeout(calculateSectionTicks, 800);

    return () => {
      window.removeEventListener("resize", calculateSectionTicks);
      clearTimeout(timer);
    };
  }, []);

  // 3. Track Active Section via Intersection Observer
  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
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

  const activeTickIndex = Math.min(
    Math.max(Math.round((scrollPercent / 100) * (totalTicks - 1)), 0),
    totalTicks - 1
  );

  return (
    <div
      className={cn(
        "absolute top-0 right-0 hidden xl:flex flex-col items-start select-none w-34",
        className,
      )}
    >
      <div className="flex flex-col items-start w-full py-2">
        {[...Array(totalTicks)].map((_, i) => {
          const isActiveTick = i === activeTickIndex;
          const sectionAtTick = sections.find(
            (sec) => sectionTickIndices[sec.id] === i
          );
          const isSectionTick = !!sectionAtTick;
          const isActiveSection = sectionAtTick && activeSection === sectionAtTick.id;

          return (
            <div
              key={i}
              className="flex items-center h-[7px] w-full relative group/tick cursor-pointer"
              onClick={() => {
                if (sectionAtTick) {
                  scrollTo(sectionAtTick.id);
                } else {
                  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                  const targetScroll = (i / (totalTicks - 1)) * scrollHeight;
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
              }}
            >
              {/* Active Scroll Percent Number (on the left) */}
              <div className="w-6 flex justify-end select-none text-[11px] pr-1.5 h-full items-center font-semibold">
                {isActiveTick && (
                  <motion.span
                    initial={{ opacity: 0, x: 3 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-foreground"
                  >
                    {scrollPercent}
                  </motion.span>
                )}
              </div>

              <div className="w-8 flex items-center justify-start relative h-full">
                {/* Track tick line */}
                <div
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isSectionTick
                      ? "h-px w-6 bg-muted-foreground"
                      : "h-px w-4 bg-muted-foreground/15"
                  )}
                />

                {/* Sliding Active Indicator Line */}
                {isActiveTick && (
                  <motion.div
                    layoutId="active-scroll-line"
                    className="absolute left-0 h-[2px] bg-foreground rounded-full"
                    style={{ width: 24 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </div>

              {/* Text / Label (on the right) */}
              <div className="flex items-center select-none text-[11px] uppercase ml-1">
                {isSectionTick && (
                  <span
                    className={cn(
                      "transition-all duration-300 ml-1.5 whitespace-nowrap",
                      isActiveSection
                        ? "text-foreground font-bold scale-105 origin-left"
                        : "text-muted-foreground/45 group-hover/tick:text-foreground/75"
                    )}
                  >
                    {sectionAtTick.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
