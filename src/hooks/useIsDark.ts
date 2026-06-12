import * as React from "react";
import { useTheme } from "next-themes";

export function useIsDark() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = React.useMemo(() => {
    if (!mounted) return false;
    if (resolvedTheme) return resolvedTheme === "dark";
    return (
      theme === "dark" ||
      (theme === "system" &&
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [mounted, theme, resolvedTheme]);

  return { isDark, mounted };
}
