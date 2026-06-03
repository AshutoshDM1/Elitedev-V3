import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function Error({
  title = "Something Went Wrong ",
  message = "An unexpected error occurred while fetching records.",
  onRetry,
  className,
  ...props
}: ErrorProps) {
  return (
    <div
      className={cn(
        "w-full h-48 border border-dashed border-red-500/50 bg-red-500/5 text-red-500 dark:text-red-400 flex flex-col items-center justify-center gap-2 p-6 select-none",
        className
      )}
      {...props}
    >
      <AlertTriangle className="w-6 h-6 text-red-500 dark:text-red-400 animate-pulse" />
      <div className="text-center space-y-1">
        <p className="font-mono text-xs uppercase tracking-tight">
          {title}
        </p>
        <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest max-w-md wrap-break-word">
          {message}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 px-3 py-1 font-mono text-[10px] uppercase border border-dashed border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-600 dark:text-red-450 transition-colors rounded-none cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}
