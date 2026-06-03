import SubSection from "@/Shared/Section/SubSection";
import { MessageSquareQuote, Quote as QuoteIcon, UserPen } from "lucide-react";

const Quote = () => {
  return (
    <SubSection>
      <div className="w-full flex flex-col items-center justify-center gap-4 py-8 text-center select-none">
        <div className="text-muted-foreground/25 dark:text-muted-foreground/10">
          <UserPen className="size-8" />
        </div>
        <p className="text-lg md:text-xl font-medium italic text-foreground/90 tracking-tight max-w-3xl leading-snug px-4">
          "Do so much work that it would be unreasonable for you to not be successful."
        </p>
        <div className="flex items-center justify-center gap-4 mt-2 w-full">
          <div className="h-px w-12 bg-border/80" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground/80">
            Alex Hormozi
          </span>
          <div className="h-px w-12 bg-border/80" />
        </div>
      </div>
    </SubSection>
  );
};

export default Quote;
