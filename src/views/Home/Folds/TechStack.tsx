"use client";

import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import { TechStack } from "@/data/techStack";
import TechStackIcon from "@/Shared/TechStackIcon/TechStackIcon";

const hiddenTechStack = [
  "Caddy",
  "HTML",
  "CSS",
  "Bash",
  "Tanstack Query",
  // "Github-Action",
  "Grok",
  "Postman",
  "Cloudinary",
  "Redux",
  "PNPM",
  "Chat GPT",
  "Self Hosted DB",
  "MongoDB",
  // "PNPM",
];

const techCategoryOrder = [
  "Frontend",
  "Backend",
  "Database",
  "Cloud Computing",
  "DevOps",
  "CI/CD",
  "Tool",
];

// Helper to sort tech stack entries
const sortTechItems = (
  a: (typeof TechStack)[0],
  b: (typeof TechStack)[0],
  categoryPriorityList: string[],
) => {
  // 1. Sort by category priority list first
  const catA = a.techCategoryName || "";
  const catB = b.techCategoryName || "";

  const idxA = categoryPriorityList.indexOf(catA);
  const idxB = categoryPriorityList.indexOf(catB);

  if (idxA !== -1 && idxB !== -1) {
    if (idxA !== idxB) return idxA - idxB;
  } else if (idxA !== -1) {
    return -1;
  } else if (idxB !== -1) {
    return 1;
  } else {
    const cmp = catA.localeCompare(catB);
    if (cmp !== 0) return cmp;
  }

  // 2. Sort by explicit order number (lower numbers first)
  const hasOrderA = typeof a.order === "number";
  const hasOrderB = typeof b.order === "number";

  if (hasOrderA && hasOrderB) {
    if (a.order! !== b.order!) {
      return a.order! - b.order!;
    }
  } else if (hasOrderA) {
    return -1;
  } else if (hasOrderB) {
    return 1;
  }

  // 3. Sort alphabetically by name
  return a.name.localeCompare(b.name);
};

export default function Techstack() {
  const groupedTechStack = React.useMemo(() => {
    const activeTechs = TechStack.filter(
      (tech) => !hiddenTechStack.includes(tech.name),
    );

    const languages = activeTechs
      .filter((tech) => tech.techCategoryName === "Language")
      .sort((a, b) => sortTechItems(a, b, []));

    const technologies = activeTechs
      .filter((tech) => tech.techCategoryName !== "Language")
      .sort((a, b) => sortTechItems(a, b, techCategoryOrder));

    return { languages, technologies };
  }, []);

  return (
    <>
      <SubSection>
        <h2 className="text-xl font-medium text-foreground tracking-tight py-1">
          Tech Stack
        </h2>
      </SubSection>
      <SubSection>
        <div className="space-y-3 py-3">
          {/* Languages Row */}
          {groupedTechStack.languages.length > 0 && (
            <div className="flex flex-wrap gap-2 select-none">
              {groupedTechStack.languages.map((tech) => (
                <TechStackIcon key={tech.id} tech={tech} />
              ))}
            </div>
          )}

          {/* Technologies Row */}
          {groupedTechStack.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 select-none">
              {groupedTechStack.technologies.map((tech) => (
                <TechStackIcon key={tech.id} tech={tech} />
              ))}
            </div>
          )}
        </div>
      </SubSection>
    </>
  );
}
