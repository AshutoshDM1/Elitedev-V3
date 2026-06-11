"use client";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { useThemeToggle } from "./ui/skiper-ui/skiper26";
import { useAudio } from "@/hooks/useAudio";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme, isDark } = useThemeToggle({
    variant: "circle",
    start: "top-center",
    blur: true,
  });

  const { play: playClickSound } = useAudio("/sound/click.wav");

  const handleClick = () => {
    playClickSound();
    toggleTheme();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      className={cn(
        "cursor-pointer rounded-sm relative size-6 flex items-center justify-center",
        className,
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute flex items-center justify-center text-muted-foreground"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? -90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Sun className="size-3.5" />
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : 90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Moon className="size-3.5" />
      </motion.div>
    </motion.button>
  );
}
