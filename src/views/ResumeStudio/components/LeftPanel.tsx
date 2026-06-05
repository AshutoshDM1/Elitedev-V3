'use client';

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, LayoutGrid, Monitor, Sun, Moon } from "lucide-react";

interface LeftPanelProps {
  pageSize: string;
  setPageSize: (size: string) => void;
  bgPreset: string;
  setBgPreset: (preset: string) => void;
  canvasDark: boolean;
  setCanvasDark: (dark: boolean) => void;
  setTheme: (theme: string) => void;
  getDimensionLabel: () => string;
}

export default function LeftPanel({
  pageSize,
  setPageSize,
  bgPreset,
  setBgPreset,
  canvasDark,
  setCanvasDark,
  setTheme,
  getDimensionLabel,
}: LeftPanelProps) {
  return (
    <div className="w-72 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/20 p-5 flex flex-col gap-6 overflow-y-auto animate-in slide-in-from-left duration-300">
      <div>
        <h1 className="font-sans text-lg font-bold tracking-tight">
          Portfolio Studio
        </h1>
        <p className="text-[10px] text-muted-foreground font-mono uppercase mt-0.5 tracking-wider">
          Edit components in vscode & preview in real-time
        </p>

        {/* Sizing Preset */}
        <div className="space-y-2 mt-4">
          <Label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-semibold">
            <FileText className="size-3.5" /> Paper Size
          </Label>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-full h-9 rounded-none border-zinc-200 dark:border-zinc-800 bg-background text-xs">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-200 dark:border-zinc-800 bg-popover">
              <SelectItem value="a4">A4 Portrait</SelectItem>
              <SelectItem value="a4-landscape">A4 Landscape</SelectItem>
              <SelectItem value="letter">Letter Portrait</SelectItem>
              <SelectItem value="letter-landscape">
                Letter Landscape
              </SelectItem>
              <SelectItem value="square">Square Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dimension Display */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-background/50 p-2.5 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 space-y-1 mt-4">
          <div className="flex justify-between">
            <span>Preset:</span>
            <span className="font-bold text-foreground capitalize">
              {pageSize.replace("-", " ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Dimensions:</span>
            <span className="font-bold text-foreground">
              {getDimensionLabel()}
            </span>
          </div>
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Background & Theme presets */}
      <div className="space-y-4">
        <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Environment Customization
        </h2>

        {/* Studio Background */}
        <div className="space-y-2">
          <Label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-semibold">
            <LayoutGrid className="size-3.5" /> Drafting Grid
          </Label>
          <Select value={bgPreset} onValueChange={setBgPreset}>
            <SelectTrigger className="w-full h-9 rounded-none border-zinc-200 dark:border-zinc-800 bg-background text-xs">
              <SelectValue placeholder="Studio BG" />
            </SelectTrigger>
            <SelectContent className="rounded-none border-zinc-200 dark:border-zinc-800 bg-popover">
              <SelectItem value="grid">Draft Grid</SelectItem>
              <SelectItem value="dots">Dotted Pattern</SelectItem>
              <SelectItem value="neutral">Neutral Background</SelectItem>
              <SelectItem value="dark-studio">
                Indigo Studio Glow
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Canvas Theme Toggle */}
        <div className="space-y-2">
          <Label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-semibold">
            <Monitor className="size-3.5" /> Sheet Theme
          </Label>
          <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 select-none">
            <button
              onClick={() => {
                setCanvasDark(false);
                setTheme("light");
              }}
              className={`flex-1 py-1 text-xs font-mono uppercase transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ${
                !canvasDark
                  ? "bg-white text-zinc-800 shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Sun className="size-3" /> Light
            </button>
            <button
              onClick={() => {
                setCanvasDark(true);
                setTheme("dark");
              }}
              className={`flex-1 py-1 text-xs font-mono uppercase transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ${
                canvasDark
                  ? "bg-zinc-950 text-emerald-400 shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              <Moon className="size-3" /> Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
