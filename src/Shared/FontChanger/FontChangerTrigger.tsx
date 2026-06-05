'use client';

import React from 'react';
import { Type, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GOOGLE_FONTS, loadGoogleFont, applyGlobalFont } from './FontData';

interface FontChangerTriggerProps {
  onClick: () => void;
  isNavEnabled: boolean;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  isGlobalEnabled: boolean;
  setIsGlobalEnabled: (enabled: boolean) => void;
}

export default function FontChangerTrigger({
  onClick,
  isNavEnabled,
  selectedFont,
  setSelectedFont,
  isGlobalEnabled,
  setIsGlobalEnabled,
}: FontChangerTriggerProps) {

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = GOOGLE_FONTS.findIndex((f) => f.name === selectedFont);
    const prevIndex =
      (currentIndex - 1 + GOOGLE_FONTS.length) % GOOGLE_FONTS.length;
    const nextFont = GOOGLE_FONTS[prevIndex].name;
    setSelectedFont(nextFont);
    loadGoogleFont(nextFont);
    
    // Auto-enable global font so they see it immediately
    if (!isGlobalEnabled) {
      setIsGlobalEnabled(true);
      applyGlobalFont(nextFont, true);
      localStorage.setItem('morax-global-font-enabled', 'true');
    } else {
      applyGlobalFont(nextFont, true);
    }
    localStorage.setItem('morax-selected-font', nextFont);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = GOOGLE_FONTS.findIndex((f) => f.name === selectedFont);
    const nextIndex = (currentIndex + 1) % GOOGLE_FONTS.length;
    const nextFont = GOOGLE_FONTS[nextIndex].name;
    setSelectedFont(nextFont);
    loadGoogleFont(nextFont);
    
    // Auto-enable global font so they see it immediately
    if (!isGlobalEnabled) {
      setIsGlobalEnabled(true);
      applyGlobalFont(nextFont, true);
      localStorage.setItem('morax-global-font-enabled', 'true');
    } else {
      applyGlobalFont(nextFont, true);
    }
    localStorage.setItem('morax-selected-font', nextFont);
  };

  if (!isNavEnabled) {
    return (
      <button
        onClick={onClick}
        aria-label="Customize Typography"
        className={cn(
          // Positioning & Layout
          'fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2.5',
          // Sizing & Borders
          'py-4 px-2.5 rounded-l-md border-l border-t border-b shadow-md select-none cursor-pointer',
          // Themes
          'bg-background border-border',
          'text-muted-foreground hover:text-foreground hover:bg-accent/50',
          // Hover & Focus Transitions
          'transition-all duration-300 ease-out hover:-translate-x-1',
          'active:scale-95 group focus:outline-none focus:ring-2 focus:ring-ring/50'
        )}
      >
        <Type className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <div
      className={cn(
        // Positioning & Layout
        'fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5',
        // Sizing & Borders
        'py-2.5 px-1.5 rounded-l-md border-l border-t border-b shadow-md select-none',
        // Themes
        'bg-background border-border text-muted-foreground',
        // Hover & Focus Transitions
        'transition-all duration-300 ease-out hover:-translate-x-1'
      )}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        aria-label="Previous Font"
        title={`Previous Font: ${selectedFont}`}
        className="p-1.5 rounded-md hover:bg-accent hover:text-foreground active:scale-90 transition-all cursor-pointer"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Main Trigger Button */}
      <button
        onClick={onClick}
        aria-label="Customize Typography"
        title={`Customize Typography (Current: ${selectedFont})`}
        className="p-2 rounded-md bg-accent text-foreground hover:bg-accent/80 active:scale-95 transition-all cursor-pointer group"
      >
        <Type className="w-4 h-4 text-primary group-hover:scale-115 transition-transform duration-300" />
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        aria-label="Next Font"
        title={`Next Font: ${selectedFont}`}
        className="p-1.5 rounded-md hover:bg-accent hover:text-foreground active:scale-90 transition-all cursor-pointer"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
