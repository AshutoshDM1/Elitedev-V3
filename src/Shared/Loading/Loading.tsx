import * as React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  subMessage?: string;
}

export default function Loading({
  message = "Loading...",
  subMessage = "Please Wait...",
  className,
  ...props
}: LoadingProps) {
  return (
    <div
      className={cn(
        "w-full h-48 border border-dashed border-zinc-400 dark:border-zinc-700 bg-background/30 flex flex-col items-center justify-center gap-3 p-6 select-none",
        className
      )}
      {...props}
    >
      <Loader className="w-6 h-6 animate-spin text-zinc-550 dark:text-zinc-400" />
      <div className="text-center space-y-1">
        <p className="font-mono text-xs font-medium text-muted-foreground ">{message}</p>
      </div>
    </div>
  );
}
