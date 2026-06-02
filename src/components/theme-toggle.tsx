"use client";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "cursor-pointer rounded-sm relative size-6 flex items-center justify-center",
        className
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute flex items-center justify-center text-muted-foreground"
        initial={false}
        animate={{
          scale: theme === "dark" ? 0 : 1,
          rotate: theme === "dark" ? -90 : 0,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Sun className="size-3.5" />
      </motion.div>
      <motion.div
        className="absolute flex items-center justify-center"
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 90,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Moon className="size-3.5" />
      </motion.div>
    </motion.button>
  );
}
