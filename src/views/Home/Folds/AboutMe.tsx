import BorderGlow from "@/components/BorderGlow";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SubSection from "@/Shared/Section/SubSection";
import { Calendar1, CalendarSearch, MailPlus } from "lucide-react";
import Link from "next/link";

const AboutMe = () => {
  return (
    <SubSection>
      <div className="p-2 space-y-5">
        <div className="space-y-4">
          <p className="text-sm text-accent-foreground/80 leading-relaxed">
            Hey, I'm <span className="font-semibold text-foreground">Ashutosh</span>, a{" "}
            <span className="font-semibold text-foreground">full stack developer</span> who loves building{" "}
            <span className="font-semibold text-foreground">clean, modern websites and apps</span> where
            design, functionality, and even the smallest details matter. My focus is on making products that are
            both <span className="font-semibold text-foreground">practical</span> and{" "}
            <span className="font-semibold text-foreground">visually satisfying</span>.
          </p>
          <div className="flex gap-2">
            <Link href={"https://cal.com/ashutosh-tiwari-dm1"} target="_blank">
              <Button
                className={cn(
                  "rounded-sm border-none ring-1 text-[13px] font-light ",
                  "bg-linear-to-b from-zinc-600 zinc-700 via-zinc-900 to-black bg-clip-border focus-visible:ring-ring/50 ring-stone-500 ",
                  "dark:bg-linear-to-b dark:from-zinc-700 dark:zinc-700 dark:via-zinc-900 dark:to-black bg-clip-border focus-visible:ring-ring/50 dark:text-white dark:ring-zinc-800 shadow-none ",
                )}
              >
                <Calendar1 className="size-4 mr-0.5 " /> Book a intro Call
              </Button>
            </Link>
            <Link href="mailto:ashutosh0tiwari@gmail.com" target="_blank">
              <Button
                className={cn(
                  "rounded-sm border-none ring-1 text-[13px] font-light ",
                  "bg-linear-to-b from-zinc-600 zinc-700 via-zinc-900 to-black bg-clip-border focus-visible:ring-ring/50 ring-stone-500 ",
                  "dark:bg-linear-to-b dark:from-zinc-700 dark:zinc-700 dark:via-zinc-900 dark:to-black bg-clip-border focus-visible:ring-ring/50 dark:text-white dark:ring-zinc-800 shadow-none relative",
                )}
              >
                <MailPlus className="size-4 mr-0.5 " />
                Send a Email
              </Button>
            </Link>
          </div>
        </div>
        <Socials />
      </div>
    </SubSection>
  );
};

export default AboutMe;

export function Socials() {
  const socials = [
    {
      name: "Resume",
      url: "/resume",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M15 12h-5" />
          <path d="M15 8h-5" />
          <path d="M19 17V5a2 2 0 0 0-2-2H4" />
          <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/AshutoshDM1",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ashutosh-tiwari-8931b82b8/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://x.com/AshutoshDM_1",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <p className="text-[13px] font-normal text-zinc-500 dark:text-zinc-400">
        Here are my{" "}
        <strong className="font-semibold text-zinc-950 dark:text-white">
          socials
        </strong>
      </p>
      <div className="flex flex-wrap gap-2">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-light items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200/80 text-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 dark:text-zinc-200 transition-colors border border-zinc-200/50 dark:border-zinc-800/50 cursor-pointer"
            >
              <Icon className="size-3.5" />
              {social.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
