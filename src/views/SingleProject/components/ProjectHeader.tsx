import * as React from "react";
import SubSection from "@/Shared/Section/SubSection";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProjectHeaderProps {
  name: string;
  id: string | number;
  status: string;
  startDate: string;
  endDate: string;
  description?: string;
  shortDescription?: string;
}

export const ProjectHeader = ({
  name,
  id,
  status,
  startDate,
  endDate,
  description,
  shortDescription,
}: ProjectHeaderProps) => {
  return (
    <SubSection>
      <div className="space-y-3 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-mono font-bold tracking-tight uppercase text-foreground">
            {name}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  status === "Live"
                    ? "bg-emerald-500 animate-pulse"
                    : status === "Building"
                      ? "bg-amber-500 animate-pulse"
                      : "bg-blue-500",
                )}
              />
              <span className="text-[10px] uppercase font-mono tracking-widest text-foreground font-semibold">
                {status}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans ">
          {description || shortDescription}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button>Github</Button>
        <Button>Live</Button>
      </div>
    </SubSection>
  );
};
