'use client';

import React, { useState, useEffect, useTransition } from 'react';
import FontChangerTrigger from './FontChangerTrigger';
import FontChangerModal from './FontChangerModal';
import { loadGoogleFont, applyGlobalFont } from './FontData';

export { loadGoogleFont, applyGlobalFont } from './FontData';

/**
 * FontInitializer: Silent loader component that reads from localStorage
 * and applies the preferred font immediately during client-side bootstrap
 */
export function FontInitializer() {
  useEffect(() => {
    try {
      const savedFont = localStorage.getItem('morax-selected-font');
      const isGlobal =
        localStorage.getItem('morax-global-font-enabled') === 'true';

      if (savedFont) {
        loadGoogleFont(savedFont);
        applyGlobalFont(savedFont, isGlobal);
      }
    } catch (e) {
      console.error('Failed to initialize dynamic font:', e);
    }
  }, []);

  return null;
}

export default function FontChanger() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [isGlobalEnabled, setIsGlobalEnabled] = useState(false);
  const [isNavEnabled, setIsNavEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [customText, setCustomText] = useState(
    'Ashutosh Tiwari: Front-End Developer & Product Builder.',
  );
  const [isPending, startTransition] = useTransition();

  // Load configuration from localStorage on mount
  useEffect(() => {
    try {
      const savedFont = localStorage.getItem('morax-selected-font');
      const isGlobal =
        localStorage.getItem('morax-global-font-enabled') === 'true';
      const isNav =
        localStorage.getItem('morax-nav-controls-enabled') === 'true';

      if (savedFont) {
        setSelectedFont(savedFont);
        loadGoogleFont(savedFont);
      }
      setIsGlobalEnabled(isGlobal);
      setIsNavEnabled(isNav);
    } catch (e) {
      console.warn('LocalStorage is not accessible:', e);
    }
  }, []);

  // Load preview font dynamically when active preview font changes
  useEffect(() => {
    loadGoogleFont(selectedFont);
  }, [selectedFont]);

  const handleSave = () => {
    startTransition(() => {
      try {
        localStorage.setItem('morax-selected-font', selectedFont);
        localStorage.setItem(
          'morax-global-font-enabled',
          String(isGlobalEnabled),
        );
        localStorage.setItem(
          'morax-nav-controls-enabled',
          String(isNavEnabled),
        );
        applyGlobalFont(selectedFont, isGlobalEnabled);
        setIsOpen(false);
      } catch (e) {
        console.error('Failed to save font settings:', e);
      }
    });
  };

  const handleReset = () => {
    startTransition(() => {
      try {
        localStorage.removeItem('morax-selected-font');
        localStorage.removeItem('morax-global-font-enabled');
        localStorage.removeItem('morax-nav-controls-enabled');
        setSelectedFont('Inter');
        setIsGlobalEnabled(false);
        setIsNavEnabled(false);
        applyGlobalFont('Inter', false);
        setIsOpen(false);
      } catch (e) {
        console.error('Failed to reset font settings:', e);
      }
    });
  };

  return (
    <>
      <FontChangerTrigger
        onClick={() => setIsOpen(true)}
        isNavEnabled={isNavEnabled}
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        isGlobalEnabled={isGlobalEnabled}
        setIsGlobalEnabled={setIsGlobalEnabled}
      />
      <FontChangerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        isGlobalEnabled={isGlobalEnabled}
        setIsGlobalEnabled={setIsGlobalEnabled}
        isNavEnabled={isNavEnabled}
        setIsNavEnabled={setIsNavEnabled}
        customText={customText}
        setCustomText={setCustomText}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        handleSave={handleSave}
        handleReset={handleReset}
        isPending={isPending}
      />
    </>
  );
}
