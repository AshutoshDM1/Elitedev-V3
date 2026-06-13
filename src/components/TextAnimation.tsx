"use client";

import * as React from "react";
import { motion, Variants, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface TextFadeUpProps {
  /** A single text content to animate */
  text?: string;
  /** An array of text contents to cycle through */
  texts?: string[];
  /** Custom classes for the parent container */
  className?: string;
  /** Legacy prop from RotatingText, mapped to className */
  mainClassName?: string;
  /** Custom classes for individual characters or words */
  childClassName?: string;
  /** Initial delay before starting the animation (in seconds) */
  delay?: number;
  /** Duration of the animation per child (in seconds) */
  duration?: number;
  /** Delay between successive children animations (in seconds) */
  staggerDelay?: number;
  /** Legacy prop from RotatingText, mapped to staggerDelay */
  staggerDuration?: number;
  /** How to split the text: by words, characters, or none (entire text at once) */
  splitBy?: "words" | "characters" | "none";
  /** The initial vertical offset to translate up from (in pixels) */
  yOffset?: number;
  /** The initial blur amount (e.g. "8px" or "4px") */
  blurAmount?: string;
  /** Trigger animation when the element enters viewport (only applicable for single text mode) */
  once?: boolean;
  /** How long each text remains visible before rotating (in milliseconds) */
  rotationInterval?: number;
}

export function TextFadeUp({
  text,
  texts,
  className,
  mainClassName,
  childClassName,
  delay = 0,
  duration = 0.4,
  staggerDelay = 0.02,
  staggerDuration,
  splitBy = "characters",
  yOffset = 15,
  blurAmount = "4px",
  once = true,
  rotationInterval = 2500,
}: TextFadeUpProps) {
  const actualClassName = className || mainClassName;
  const actualStaggerDelay = staggerDuration !== undefined ? staggerDuration : staggerDelay;

  // Single text logic if texts is not provided or is empty
  const isRotating = texts && texts.length > 0;
  
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [isRotating, texts, rotationInterval]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: actualStaggerDelay,
        delayChildren: delay,
      },
    },
    exit: {
      transition: {
        staggerChildren: actualStaggerDelay * 0.5,
        staggerDirection: -1 as const, // stagger backwards on exit
      }
    }
  };

  const hiddenVariant = {
    opacity: 0,
    y: yOffset,
    filter: `blur(${blurAmount})`,
  };

  const visibleVariant = {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration,
      ease: [0.215, 0.61, 0.355, 1.0] as const, // Cast as const so TypeScript infers a 4-number tuple
    },
  };

  const exitVariant = {
    opacity: 0,
    y: -yOffset,
    filter: `blur(${blurAmount})`,
    transition: {
      duration: duration * 0.8,
      ease: [0.215, 0.61, 0.355, 1.0] as const,
    },
  };

  const childVariants: Variants = {
    hidden: hiddenVariant,
    visible: visibleVariant,
    exit: exitVariant,
  };

  const renderContent = (displayText: string) => {
    if (splitBy === "none") {
      return (
        <motion.span
          className="inline-block"
          variants={childVariants}
        >
          {displayText}
        </motion.span>
      );
    }

    const words = displayText.split(" ");

    return words.map((word, wordIndex) => {
      if (splitBy === "words") {
        return (
          <React.Fragment key={wordIndex}>
            <motion.span
              variants={childVariants}
              className={cn("inline-block", childClassName)}
            >
              {word}
            </motion.span>
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </React.Fragment>
        );
      }

      return (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={childVariants}
              className={cn("inline-block origin-bottom", childClassName)}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      );
    });
  };

  if (isRotating) {
    return (
      <span className={cn("inline-grid overflow-hidden py-1", actualClassName)}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className="col-start-1 row-start-1 inline-flex flex-wrap select-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderContent(texts[currentIndex])}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  // Fallback / Single static text mode
  const singleText = text || "";
  
  if (splitBy === "none") {
    return (
      <motion.span
        className={cn("inline-block", actualClassName)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        variants={{
          hidden: hiddenVariant,
          visible: {
            ...visibleVariant,
            transition: {
              ...visibleVariant.transition,
              delay,
            },
          },
        }}
      >
        {singleText}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={cn("inline-flex flex-wrap select-none", actualClassName)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {renderContent(singleText)}
    </motion.span>
  );
}
