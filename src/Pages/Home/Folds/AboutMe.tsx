import { Button } from "@/components/ui/button";
import SubSection from "@/Shared/Section/SubSection";
import { Calendar1, CalendarSearch, MailPlus } from "lucide-react";

const AboutMe = () => {
  return (
    <SubSection>
      <div className="p-2 space-y-4">
        <p className="text-[13px] leading-5 text-zinc-600 dark:text-zinc-300/80">
          Hey, I'm Rinkit, a full stack developer who loves building clean,
          modern websites and apps where design, functionality, and even the
          smallest details matter, with a focus on making products that are both
          practical and visually satisfying. <br /> I'm currently working on my
          own thing @Lunel, building something that will completely change how
          you ship.
        </p>
        <div className="flex gap-2">
          <Button className="rounded-sm border ring-1 ring-stone-500  bg-clip-border focus-visible:ring-ring/50 ">
            <Calendar1 className="size-4 mr-0.5 " /> Book a intro Call
          </Button>
          <Button className="rounded-sm border ring-1 ring-stone-500  bg-clip-border focus-visible:ring-ring/50 ">
            <MailPlus className="size-4 mr-0.5 " />
            Send a Email
          </Button>
        </div>
      </div>
    </SubSection>
  );
};

export default AboutMe;
