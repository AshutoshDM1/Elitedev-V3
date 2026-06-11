import * as React from "react";
import { marked } from "marked";

interface MDFormatProps {
  content?: string;
  className?: string;
}

export default function MDFormat({ content, className }: MDFormatProps) {
  if (!content) return null;

  const html = React.useMemo(() => {
    try {
      // Use marked.parse with async: false to guarantee synchronous string return
      return marked.parse(content, { async: false }) as string;
    } catch (e) {
      console.error("Error parsing markdown:", e);
      return content;
    }
  }, [content]);

  return (
    <div
      className={`text-sm leading-relaxed text-muted-foreground
        [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-5 [&_h1]:mb-2 [&_h1]:text-foreground
        [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2.5 [&_h2]:text-foreground [&_h2]:font-mono [&_h2]:uppercase [&_h2]:tracking-wider
        [&_h3]:text-xs [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-foreground
        [&_p]:mb-3
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:mb-4
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_ol]:mb-4
        [&_li]:text-muted-foreground
        [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-current/30 [&_a]:hover:decoration-current [&_a]:transition-colors
        [&_strong]:font-semibold [&_strong]:text-foreground
        [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-muted [&_code]:text-xs [&_code]:font-mono [&_code]:text-foreground
        ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
