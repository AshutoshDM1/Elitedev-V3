import * as React from "react";
import { CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface BooleanCheckProps {
  value: boolean | any;
  label?: string;
}

export const BooleanCheck = ({ value, label }: BooleanCheckProps) => {
  const isTrue = !!value;
  return (
    <div className="flex items-center gap-2 text-xs text-foreground select-none">
      {isTrue ? (
        <CheckSquare className="w-4 h-4 text-emerald-500 fill-emerald-500/10 stroke-[2] shrink-0" />
      ) : (
        <Square className="w-4 h-4 text-zinc-300 dark:text-zinc-700 stroke-[1.5] shrink-0" />
      )}
      {label && (
        <span className={cn(isTrue ? "text-foreground font-semibold" : "text-muted-foreground")}>
          {label}
        </span>
      )}
      {isTrue && typeof value === "string" && (
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">({value})</span>
      )}
    </div>
  );
};
