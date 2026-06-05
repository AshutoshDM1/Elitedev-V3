'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface RightPanelProps {
  handleDownloadPDF: () => void;
  zoom: number;
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  handleResetZoom: () => void;
}

export default function RightPanel({
  handleDownloadPDF,
  zoom,
  handleZoomOut,
  handleZoomIn,
  handleResetZoom,
}: RightPanelProps) {
  return (
    <div className="w-72 shrink-0 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/20 p-5 flex flex-col gap-6 overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Actions */}
      <div className="space-y-4">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Actions
        </h2>
        <Button
          onClick={handleDownloadPDF}
          className="w-full h-10 rounded-none font-mono text-xs uppercase bg-foreground text-background hover:bg-foreground/90 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <Download className="size-4" /> Export PDF
        </Button>
        <p className="text-[10px] text-muted-foreground font-mono leading-relaxed text-center">
          Compiles vector layers. Searchable and selectable text.
        </p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Scale Controller */}
      <div className="space-y-3">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Canvas Scale
        </h2>
        <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 mb-1">
          <span>Zoom level:</span>
          <span className="font-bold text-foreground">
            {Math.round(zoom * 100)}%
          </span>
        </div>
        <div className="flex items-center gap-1 border border-zinc-200 dark:border-zinc-800 h-9 p-1 bg-background">
          <Button
            type="button"
            variant="ghost"
            className="flex-1 h-full rounded-none cursor-pointer hover:bg-muted text-xs font-mono"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <ZoomOut className="size-3.5 mr-1" /> Out
          </Button>
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
          <Button
            type="button"
            variant="ghost"
            className="flex-1 h-full rounded-none cursor-pointer hover:bg-muted text-xs font-mono"
            onClick={handleResetZoom}
            title="Reset Zoom"
          >
            <RotateCcw className="size-3.5 mr-1" /> Reset
          </Button>
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
          <Button
            type="button"
            variant="ghost"
            className="flex-1 h-full rounded-none cursor-pointer hover:bg-muted text-xs font-mono"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <ZoomIn className="size-3.5 mr-1" /> In
          </Button>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Developer Guide */}
      <div className="space-y-3">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-semibold">
          <Sparkles className="size-3.5 text-emerald-500" /> Developer Tips
        </h2>
        <div className="border border-zinc-200 dark:border-zinc-800 bg-background/50 p-3.5 space-y-3 text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          <div className="space-y-1">
            <span className="font-bold text-foreground flex items-center gap-1">
              <BookOpen className="size-3" /> 1. Edit Source
            </span>
            <p>
              Modify the resume layout directly in:
              <br />
              <code className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 block mt-1 break-all">
                src/views/ResumeStudio/components/CanvasContent.tsx
              </code>
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-foreground">
              ⚡ 2. Hot Reload
            </span>
            <p>
              Any React or Tailwind classes update immediately inside this
              browser preview.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-foreground">
              🎨 3. Page Constraint
            </span>
            <p>
              For a single-page resume, design carefully inside the sheet
              margins and avoid vertical overflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
