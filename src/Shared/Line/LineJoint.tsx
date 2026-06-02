import { cn } from "@/lib/utils";
import {
  Move,
  Minimize,
  UnfoldVertical,
  Plus,
  Sparkle,
  Grip,
} from "lucide-react";
import React from "react";

enum Shape {
  Plus = "plus",
  Sparkle = "sparkle",
  Minimize = "minimize",
  UnfoldVertical = "unfoldvertical",
  Grip = "grip",
}

interface Props {
  className?: string;
  side: "left" | "right";
  vertical: "top" | "bottom";
  variant?: Shape;
}

const LineJoint: React.FC<Props> = ({
  className,
  side,
  vertical,
  variant = Shape.Plus ,
}) => {
  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none bg-background z-10 flex items-center justify-center ",
        // Horizontal position (perfectly centered on the vertical line)
        side === "left"
          ? "left-0 -translate-x-1/2"
          : "right-0 translate-x-[55%]",
        // Vertical position (perfectly centered on the horizontal border line)
        vertical === "top"
          ? "top-0 -translate-y-1/2"
          : "bottom-0 translate-y-1/2",
        // Text color matches the dashed line borders, with high-contrast hover styles
        "text-muted-foreground/70 cursor-crosshair pointer-events-auto",
        className,
      )}
    >
      <div className="flex items-center justify-center">
        {variant === Shape.Plus && <Plus className="size-4  stroke-[1px]" />}

        {variant === Shape.Sparkle && <Sparkle className="size-4" />}

        {variant === Shape.UnfoldVertical && (
          <UnfoldVertical className="size-4" />
        )}

        {variant === Shape.Grip && <Grip className="size-4 rotate-45 " />}

        {variant === Shape.Minimize && <Minimize className="size-4" />}
      </div>
    </div>
  );
};

export default LineJoint;
