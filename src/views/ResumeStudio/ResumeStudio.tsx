"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import CanvasContent from "./CanvasContent";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import BottomConsole from "./components/BottomConsole";

export default function PortfolioStudio() {
  const [pageSize, setPageSize] = React.useState("a4");
  const [zoom, setZoom] = React.useState(1.0);
  const [canvasDark, setCanvasDark] = React.useState(false);
  const [bgPreset, setBgPreset] = React.useState("dots");
  const [isStudioMode, setIsStudioMode] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isGlobalDark =
    mounted &&
    (theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));

  React.useEffect(() => {
    if (mounted) {
      setCanvasDark(isGlobalDark);
    }
  }, [isGlobalDark, mounted]);

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

    // Retrieve current --font-global value from root element
    const fontGlobal = typeof window !== 'undefined'
      ? document.documentElement.style.getPropertyValue('--font-global')
      : '';

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
      <html class="${canvasDark ? "dark" : ""}" style="background-color: ${canvasDark ? "#09090b" : "#ffffff"} !important; height: 100%;${fontGlobal ? ` --font-global: ${fontGlobal};` : ''}">
        <head>
          <title>Portfolio_Resume</title>
          ${stylesHtml}
          <style>
            ${pageStyle}
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              height: 100% !important;
              min-height: 100% !important;
              background-color: ${canvasDark ? "#09090b" : "#ffffff"} !important;
              background: ${canvasDark ? "#09090b" : "#ffffff"} !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            #print-wrapper {
              width: 100%;
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              transform: none !important;
              box-shadow: none !important;
              border: none !important;
            }
          </style>
        </head>
        <body class="${canvasDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"}" style="background-color: ${canvasDark ? "#09090b" : "#ffffff"} !important; height: 100%;">
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
          className="flex-1 overflow-auto p-8 flex items-start justify-center relative transition-all duration-300 no-scrollbar"
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
