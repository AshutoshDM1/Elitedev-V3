"use client";

import * as React from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import CanvasContent from "./components/CanvasContent";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Moon,
  Sun,
  BookOpen,
  Sparkles,
  LayoutGrid,
  Monitor,
  Sliders,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PortfolioStudio() {
  const [pageSize, setPageSize] = React.useState("a4");
  const [zoom, setZoom] = React.useState(1.0);
  const [canvasDark, setCanvasDark] = React.useState(false);
  const [bgPreset, setBgPreset] = React.useState("grid");
  const [isStudioMode, setIsStudioMode] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isGlobalDark =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  const getSizeStyles = () => {
    switch (pageSize) {
      case "a4":
        return { width: "210mm", height: "297mm" };
      case "a4-landscape":
        return { width: "297mm", height: "210mm" };
      case "letter":
        return { width: "8.5in", height: "11in" };
      case "letter-landscape":
        return { width: "11in", height: "8.5in" };
      case "square":
        return { width: "800px", height: "800px" };
      default:
        return { width: "210mm", height: "297mm" };
    }
  };

  const getDimensionLabel = () => {
    switch (pageSize) {
      case "a4":
        return "210 mm × 297 mm";
      case "a4-landscape":
        return "297 mm × 210 mm";
      case "letter":
        return "8.5 in × 11 in";
      case "letter-landscape":
        return "11 in × 8.5 in";
      case "square":
        return "800 px × 800 px";
      default:
        return "210 mm × 297 mm";
    }
  };

  const getStudioBgStyle = () => {
    const gridColor = isGlobalDark
      ? "rgba(255,255,255,0.03)"
      : "rgba(0,0,0,0.04)";
    const dotColor = isGlobalDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.06)";
    const bgBase = isGlobalDark ? "#0c0c0e" : "#fafafa";

    switch (bgPreset) {
      case "grid":
        return {
          backgroundColor: bgBase,
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        };
      case "dots":
        return {
          backgroundColor: bgBase,
          backgroundImage: `radial-gradient(circle, ${dotColor} 1.5px, transparent 1.5px)`,
          backgroundSize: "20px 20px",
        };
      case "neutral":
        return {
          backgroundColor: isGlobalDark ? "#141416" : "#f1f1f4",
        };
      case "dark-studio":
        return {
          backgroundColor: "#030303",
          backgroundImage:
            "radial-gradient(circle at 50% 45%, #18142c 0%, #030208 100%)",
        };
      default:
        return {};
    }
  };

  const handleDownloadPDF = () => {
    const canvasElement = document.getElementById(
      "portfolio-studio-canvas-content",
    );
    if (!canvasElement) {
      toast.error("Canvas content not found");
      return;
    }

    // Create a hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      toast.error("Could not initialize printing frame");
      return;
    }

    let stylesHtml = "";
    document.querySelectorAll("style, link[rel='stylesheet']").forEach((el) => {
      stylesHtml += el.outerHTML;
    });

    let pageStyle = "";
    if (pageSize === "a4") {
      pageStyle = "@page { size: 210mm 297mm; margin: 0; }";
    } else if (pageSize === "a4-landscape") {
      pageStyle = "@page { size: 297mm 210mm; margin: 0; }";
    } else if (pageSize === "letter") {
      pageStyle = "@page { size: 8.5in 11in; margin: 0; }";
    } else if (pageSize === "letter-landscape") {
      pageStyle = "@page { size: 11in 8.5in; margin: 0; }";
    } else {
      pageStyle = "@page { size: auto; margin: 0; }";
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html class="${canvasDark ? "dark" : ""}">
        <head>
          <title>Portfolio_Resume</title>
          ${stylesHtml}
          <style>
            ${pageStyle}
            body {
              margin: 0 !important;
              padding: 0 !important;
              background: ${canvasDark ? "#09090b" : "#ffffff"} !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #print-wrapper {
              width: 100%;
              height: 100%;
              margin: 0 !important;
              padding: 0 !important;
              transform: none !important;
              box-shadow: none !important;
              border: none !important;
            }
          </style>
        </head>
        <body class="${canvasDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}">
          <div id="print-wrapper" class="${canvasDark ? "dark" : ""}">
            ${canvasElement.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.frameElement.remove();
                }, 500);
              }, 600);
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => setZoom(1.0);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden relative">

      {/* Main Studio Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Studio & Design Settings */}
        {isStudioMode && (
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
                <Label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
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
                <Label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
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
                <Label className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Monitor className="size-3.5" /> Sheet Theme
                </Label>
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 border border-zinc-200 dark:border-zinc-700 select-none">
                  <button
                    onClick={() => setCanvasDark(false)}
                    className={`flex-1 py-1 text-xs font-mono uppercase transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5 ${
                      !canvasDark
                        ? "bg-white text-zinc-800 shadow-sm font-semibold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Sun className="size-3" /> Light
                  </button>
                  <button
                    onClick={() => setCanvasDark(true)}
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
        )}

        {/* Center Panel: Interactive Canvas */}
        <div
          className="flex-1 overflow-auto p-8 flex items-start justify-center relative transition-all duration-300 no-scrollbar"
          style={getStudioBgStyle()}
        >
          <div
            className="transition-all duration-300 pb-16"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
            }}
          >
            <div
              id="portfolio-studio-canvas"
              className={`shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden relative transition-colors duration-300 ${
                canvasDark ? "dark" : ""
              }`}
              style={getSizeStyles()}
            >
              <div id="portfolio-studio-canvas-content" className="h-full">
                <CanvasContent />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Actions & Guidelines */}
        {isStudioMode && (
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
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
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
                      src/views/PortfolioStudio/components/CanvasContent.tsx
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
        )}
      </div>

      {/* Floating Bottom Console */}
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
          onClick={() => setCanvasDark(!canvasDark)}
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

        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />

        {/* Studio Toggle Button */}
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
      </div>
    </div>
  );
}
