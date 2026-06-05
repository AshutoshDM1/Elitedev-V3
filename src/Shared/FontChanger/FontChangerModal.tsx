'use client';

import React, { useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Search,
  Check,
  Globe,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FontItem, GOOGLE_FONTS, CATEGORIES, loadGoogleFont } from './FontData';

interface FontChangerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  isGlobalEnabled: boolean;
  setIsGlobalEnabled: (enabled: boolean) => void;
  isNavEnabled: boolean;
  setIsNavEnabled: (enabled: boolean) => void;
  customText: string;
  setCustomText: (text: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  handleSave: () => void;
  handleReset: () => void;
  isPending: boolean;
}

export default function FontChangerModal({
  isOpen,
  onClose,
  selectedFont,
  setSelectedFont,
  isGlobalEnabled,
  setIsGlobalEnabled,
  isNavEnabled,
  setIsNavEnabled,
  customText,
  setCustomText,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  handleSave,
  handleReset,
  isPending,
}: FontChangerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Click outside to close modal
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter Google Fonts based on search query and category
  const filteredFonts = GOOGLE_FONTS.filter((font) => {
    const matchesSearch = font.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || font.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePrevFont = (e: React.MouseEvent) => {
    e.preventDefault();
    if (filteredFonts.length === 0) return;
    const currentIndex = filteredFonts.findIndex(f => f.name === selectedFont);
    const prevIndex = (currentIndex - 1 + filteredFonts.length) % filteredFonts.length;
    setSelectedFont(filteredFonts[prevIndex].name);
  };

  const handleNextFont = (e: React.MouseEvent) => {
    e.preventDefault();
    if (filteredFonts.length === 0) return;
    const currentIndex = filteredFonts.findIndex(f => f.name === selectedFont);
    const nextIndex = (currentIndex + 1) % filteredFonts.length;
    setSelectedFont(filteredFonts[nextIndex].name);
  };

  return (
    <>
      <style>{`
        @keyframes font-studio-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes font-studio-slide-up {
          from { transform: translateY(12px) scale(0.99); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .font-studio-backdrop {
          animation: font-studio-fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .font-studio-modal {
          animation: font-studio-slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Main Dialog Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm font-studio-backdrop">
        
        {/* Dialog Panel Container */}
        <div
          ref={modalRef}
          className={cn(
            'w-full max-w-3xl bg-background border border-border rounded-md overflow-hidden',
            'shadow-lg flex flex-col relative font-studio-modal',
            'text-foreground transition-colors duration-300'
          )}
        >
          {/* Header Section */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-muted border border-border rounded-md">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">
                  Typography Studio
                </h2>
                <p className="text-[10px] text-muted-foreground font-mono tracking-wider">
                  REAL-TIME TYPOGRAPHY ENGINE
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-input bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body Section (Redesigned into 2-Column Workspace) */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border relative z-10">
            
            {/* Column 1 (Left): Search & Selection (cols: 7) */}
            <div className="md:col-span-7 p-6 flex flex-col gap-4 overflow-hidden">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 font-bold">
                  <span>01 / Choose Typeface</span>
                </label>
                
                {/* Search input */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search Google Font..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      'w-full pl-9 pr-4 py-2 rounded-md text-xs font-mono',
                      'bg-background border border-input text-foreground',
                      'placeholder:text-muted-foreground',
                      'focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-all'
                    )}
                  />
                </div>
              </div>

              {/* Category selector pills */}
              <div className="flex flex-wrap gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-[9px] font-mono tracking-tight uppercase transition-all cursor-pointer border',
                      activeCategory === cat
                        ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-sm'
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Scrollable list of matching fonts */}
              <div className="overflow-y-auto max-h-[280px] md:max-h-[340px] pr-1.5 flex flex-col gap-1.5 no-scrollbar">
                {filteredFonts.length > 0 ? (
                  filteredFonts.map((font) => {
                    // Pre-initialize fonts on hover to make load instant
                    const handleHover = () => loadGoogleFont(font.name);

                    return (
                      <button
                        key={font.name}
                        onMouseEnter={handleHover}
                        onClick={() => setSelectedFont(font.name)}
                        className={cn(
                          'w-full flex items-center justify-between p-3 rounded-md text-left transition-all border cursor-pointer',
                          selectedFont === font.name
                            ? 'bg-accent border-accent text-accent-foreground shadow-sm'
                            : 'bg-card border-border text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent'
                        )}
                      >
                        <div className="flex flex-col">
                          <span
                            style={{ fontFamily: `"${font.name}", sans-serif` }}
                            className="text-xs font-semibold text-foreground"
                          >
                            {font.name}
                          </span>
                          <span className="text-[9px] text-muted-foreground font-mono mt-0.5">
                            {font.category} • {font.description}
                          </span>
                        </div>
                        {selectedFont === font.name && (
                          <Check className="w-3.5 h-3.5 text-primary" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-12 text-center text-muted-foreground font-mono text-[10px]">
                    NO FONTS MATCHED YOUR CRITERIA
                  </div>
                )}
              </div>
            </div>

            {/* Column 2 (Right): Live Preview & Configs (cols: 5) */}
            <div className="md:col-span-5 p-6 flex flex-col gap-5 justify-between">
              
              {/* Preview Block */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                  <span>02 / Live Render Preview</span>
                </label>

                {/* Typography terminal board */}
                <div className="border border-border rounded-md bg-muted/40 p-4 relative overflow-hidden flex flex-col gap-4 shadow-inner">
                  <div className="absolute top-0 right-0 px-2 py-0.5 border-l border-b border-border rounded-bl bg-muted font-mono text-[8px] text-muted-foreground tracking-wider uppercase select-none">
                    Preview Pane
                  </div>

                  <div
                    className="space-y-2 select-all pr-2"
                    style={{ fontFamily: `"${selectedFont}", sans-serif` }}
                  >
                    <h3 className="text-base font-bold tracking-tight leading-snug text-foreground">
                      Ashutosh Tiwari
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed wrap-break-word">
                      {customText || 'Type custom branding text below.'}
                    </p>
                  </div>

                  {/* Navigation controls inside preview board */}
                  {isNavEnabled && (
                    <div className="flex items-center justify-between border border-border bg-background px-2 py-1 rounded-md shadow-sm">
                      <button
                        onClick={handlePrevFont}
                        className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer transition-all active:scale-90"
                        title="Previous Font"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-[10px] font-bold text-foreground tracking-wider">
                        {selectedFont.toUpperCase()}
                      </span>
                      <button
                        onClick={handleNextFont}
                        className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer transition-all active:scale-90"
                        title="Next Font"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Interactive typed text block */}
                  <div className="border-t border-border pt-3">
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Type preview text..."
                      className={cn(
                        'w-full bg-background border border-input rounded-md px-2.5 py-1.5 text-xs font-mono',
                        'text-foreground placeholder:text-muted-foreground',
                        'focus:outline-none focus:border-border'
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Settings Configuration (Global Apply Toggle) */}
              <div className="space-y-2.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-bold">
                  <span>03 / Engine Settings</span>
                </label>

                <div className="flex flex-col gap-2">
                  <div className="p-3 border border-border rounded-md bg-muted/20 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        <span>Apply Globally</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground max-w-[190px] leading-tight">
                        Forcefully overrides font properties across all page elements.
                      </p>
                    </div>

                    {/* Switch toggle */}
                    <button
                      role="switch"
                      aria-checked={isGlobalEnabled}
                      onClick={() => setIsGlobalEnabled(!isGlobalEnabled)}
                      className={cn(
                        'w-10 h-5.5 rounded-full p-0.5 transition-colors duration-355 outline-none select-none relative shrink-0 cursor-pointer',
                        isGlobalEnabled ? 'bg-primary' : 'bg-input'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4.5 h-4.5 rounded-full bg-background shadow transition-transform duration-300 flex items-center justify-center',
                          isGlobalEnabled ? 'translate-x-4.5' : 'translate-x-0'
                        )}
                      >
                        {isGlobalEnabled && (
                          <Check className="w-2.5 h-2.5 text-primary" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Quick Navigation Settings Toggle */}
                  <div className="p-3 border border-border rounded-md bg-muted/20 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
                        <Sliders className="w-3.5 h-3.5 text-primary" />
                        <span>Quick Navigation</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground max-w-[190px] leading-tight">
                        Adds previous/next buttons to the side panel to cycle fonts.
                      </p>
                    </div>

                    <button
                      role="switch"
                      aria-checked={isNavEnabled}
                      onClick={() => setIsNavEnabled(!isNavEnabled)}
                      className={cn(
                        'w-10 h-5.5 rounded-full p-0.5 transition-colors duration-355 outline-none select-none relative shrink-0 cursor-pointer',
                        isNavEnabled ? 'bg-primary' : 'bg-input'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4.5 h-4.5 rounded-full bg-background shadow transition-transform duration-300 flex items-center justify-center',
                          isNavEnabled ? 'translate-x-4.5' : 'translate-x-0'
                        )}
                      >
                        {isNavEnabled && (
                          <Check className="w-2.5 h-2.5 text-primary" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/40 relative z-10">
            <button
              disabled={isPending}
              onClick={handleReset}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md border cursor-pointer',
                'bg-background border-input font-mono text-[10px] uppercase tracking-wider text-muted-foreground',
                'hover:bg-accent hover:text-accent-foreground transition-colors active:scale-95 disabled:opacity-50'
              )}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className={cn(
                  'px-3.5 py-1.5 rounded-md border font-mono text-[10px] uppercase tracking-wider text-muted-foreground cursor-pointer',
                  'bg-background border-input hover:bg-accent hover:text-accent-foreground transition-colors active:scale-95'
                )}
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                onClick={handleSave}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-md border cursor-pointer',
                  'bg-primary hover:bg-primary/90 border-primary text-primary-foreground font-mono text-[10px] uppercase tracking-wider',
                  'shadow transition-all duration-300 active:scale-95 disabled:opacity-50'
                )}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isPending ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
