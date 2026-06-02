import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const LineX: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "w-full border-x border-muted-foreground/50 border-dashed p-2 relative",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default LineX;
