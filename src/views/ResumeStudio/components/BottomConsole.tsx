'use client';

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Download,
  Eye,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomConsoleProps {
  zoom: number;
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  handleResetZoom: () => void;
  canvasDark: boolean;
  setCanvasDark: (dark: boolean) => void;
  setTheme: (theme: string) => void;
  handleDownloadPDF: () => void;
  isStudioMode: boolean;
  setIsStudioMode: (studio: boolean) => void;
}

export default function BottomConsole({
  zoom,
  handleZoomOut,
  handleZoomIn,
  handleResetZoom,
  canvasDark,
  setCanvasDark,
  setTheme,
  handleDownloadPDF,
  isStudioMode,
  setIsStudioMode,
}: BottomConsoleProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-600 dark:text-zinc-400"
          onClick={handleZoomOut}
          title="Zoom Out"
        >
          <ZoomOut className="size-4" />
        </Button>
        <span
          className="text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 min-w-[42px] text-center cursor-pointer hover:text-foreground transition-colors select-none"
          onClick={handleResetZoom}
          title="Reset Zoom (100%)"
        >
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-zinc-600 dark:text-zinc-400"
          onClick={handleZoomIn}
          title="Zoom In"
        >
          <ZoomIn className="size-4" />
        </Button>
      </div>

      <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />

      {/* Sheet Theme Toggle (Light/Dark Resume) */}
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
        onClick={() => {
          const nextDark = !canvasDark;
          setCanvasDark(nextDark);
          setTheme(nextDark ? "dark" : "light");
        }}
        title={`Switch to ${canvasDark ? "Light" : "Dark"} Sheet`}
      >
        {canvasDark ? (
          <Sun className="size-4 text-amber-500" />
        ) : (
          <Moon className="size-4 text-zinc-500" />
        )}
      </Button>

      <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />

      {/* Download / Export Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDownloadPDF}
        className="h-8 px-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 font-sans text-[11px] font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 cursor-pointer"
      >
        <Download className="size-3.5" />
        Export PDF
      </Button>

      {/* Studio Toggle Button (Dev mode only) */}
      {process.env.NODE_ENV === "development" && (
        <>
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
          <Button
            variant={isStudioMode ? "secondary" : "default"}
            size="sm"
            onClick={() => setIsStudioMode(!isStudioMode)}
            className={cn(
              "h-8 px-3.5 rounded-full font-sans text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-300 shadow-sm",
              isStudioMode
                ? "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                : "bg-zinc-950 text-white hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-100"
            )}
          >
            {isStudioMode ? (
              <>
                <Eye className="size-3.5" />
                Close Studio
              </>
            ) : (
              <>
                <Sliders className="size-3.5" />
                Open Studio
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
}
