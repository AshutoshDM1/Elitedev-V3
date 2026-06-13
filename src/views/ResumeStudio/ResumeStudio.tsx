"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useIsDark } from "@/hooks/useIsDark";
import CanvasContent from "./CanvasContent";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import BottomConsole from "./components/BottomConsole";

export default function ResumeStudio() {
  const [pageSize, setPageSize] = React.useState("a4");
  const [zoom, setZoom] = React.useState(1.0);
  const [canvasDark, setCanvasDark] = React.useState(false);
  const [bgPreset, setBgPreset] = React.useState("dots");
  const [isStudioMode, setIsStudioMode] = React.useState(false);
  const { setTheme } = useTheme();
  const { isDark: isGlobalDark, mounted } = useIsDark();

  React.useEffect(() => {
    if (mounted) {
      setCanvasDark(isGlobalDark);
    }
  }, [isGlobalDark, mounted]);

  React.useEffect(() => {
    // Lock the root and body scrolling
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyHeight = document.body.style.height;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlHeight = document.documentElement.style.height;

    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.height = originalBodyHeight;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.height = originalHtmlHeight;
    };
  }, []);

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
    window.open(
      "https://drive.google.com/file/d/1DZ_ysG7D15G0_cdH8F0lISCJ0JJbjHNB/view?usp=drive_link",
      "_blank"
    );
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2.0));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.4));
  const handleResetZoom = () => setZoom(1.0);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Main Studio Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Studio & Design Settings */}
        {isStudioMode && (
          <LeftPanel
            pageSize={pageSize}
            setPageSize={setPageSize}
            bgPreset={bgPreset}
            setBgPreset={setBgPreset}
            canvasDark={canvasDark}
            setCanvasDark={setCanvasDark}
            setTheme={setTheme}
            getDimensionLabel={getDimensionLabel}
          />
        )}

        {/* Center Panel: Interactive Canvas */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-auto pb-40 p-8 flex items-start justify-center relative transition-all duration-300 no-scrollbar"
          style={getStudioBgStyle()}
        >
          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-6 left-6 z-40 flex items-center justify-center size-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-md hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all text-zinc-650 dark:text-zinc-400 hover:text-foreground cursor-pointer"
            title="Back to Home"
          >
            <ArrowLeft className="size-4" />
          </Link>
          
          {/* Scaled Layout Container to reserve correct space for zoom scroll */}
          <div
            className="relative transition-all duration-300"
            style={{
              width: `calc(${getSizeStyles().width} * ${zoom})`,
              height: `calc(${getSizeStyles().height} * ${zoom})`,
            }}
          >
            {/* The scaled wrapper centered inside the layout container */}
            <div
              className="absolute left-1/2 top-0 origin-top transition-all duration-300"
              style={{
                transform: `translateX(-50%) scale(${zoom})`,
                width: getSizeStyles().width,
                height: getSizeStyles().height,
              }}
            >
              <div
                id="portfolio-studio-canvas"
                className={`shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden relative transition-colors duration-300 w-full h-full ${
                  canvasDark ? "dark" : ""
                }`}
              >
                <div id="portfolio-studio-canvas-content" className="h-full">
                  <CanvasContent />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Actions & Guidelines */}
        {isStudioMode && (
          <RightPanel
            handleDownloadPDF={handleDownloadPDF}
            zoom={zoom}
            handleZoomOut={handleZoomOut}
            handleZoomIn={handleZoomIn}
            handleResetZoom={handleResetZoom}
          />
        )}
      </div>

      {/* Floating Bottom Console */}
      <BottomConsole
        zoom={zoom}
        handleZoomOut={handleZoomOut}
        handleZoomIn={handleZoomIn}
        handleResetZoom={handleResetZoom}
        canvasDark={canvasDark}
        setCanvasDark={setCanvasDark}
        setTheme={setTheme}
        handleDownloadPDF={handleDownloadPDF}
        isStudioMode={isStudioMode}
        setIsStudioMode={setIsStudioMode}
      />
    </div>
  );
}
