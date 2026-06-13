"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { banner } from "@/assets/import";
import SubSection from "@/Shared/Section/SubSection";
import { BannerParticles } from "@/components/BannerParticles";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const FOOTER_LINKS = [
  { label: "robots.txt", href: "/robots.txt" },
  { label: "sitemap.xml", href: "/sitemap.xml" },
  { label: "llm.txt", href: "/llm.txt" },
];

function getOrdinal(i: number) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
}

export default function Footer() {
  const [views, setViews] = React.useState<number | null>(null);
  const [dateTimeStr, setDateTimeStr] = React.useState("");
  const [timeZone, setTimeZone] = React.useState("Asia/Kolkata");

  React.useEffect(() => {
    // Resolve browser timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setTimeZone(tz);
    } catch (e) {
      console.error("Error resolving timezone:", e);
    }
    // Fetch live page views
    fetch(
      "https://page-views-api.ratneshc.com/api/v1/views?site=ashutoshtiwari.me&path=/",
    )
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.views === "number") {
          setViews(data.views);
        }
      })
      .catch((err) => console.error("Error fetching views:", err));

    // Live clock update
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      });
      setDateTimeStr(`${dateStr} | ${timeStr}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SubSection className="w-full relative">
      {/* Background Image Container that determines height */}
      <div className="w-full relative">
        <BannerParticles />
        <Image
          src={banner.footer4}
          alt="Footer Background"
          priority
          className="w-full h-[300px] object-cover object-center filter brightness-95 dark:brightness-110"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/60 dark:from-transparent dark:via-black/20 dark:to-black/80" />
      </div>

      {/* Absolutely positioned content centered on top of the image */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 text-center space-y-2 select-none">
        {/* Visitor & Live Time Counter */}
        {views !== null && (
          <div className="text-[13px] text-white flex flex-col items-center gap-0.5 mt-2">
            <div>
              You&apos;re the{" "}
              <span className="font-semibold text-sm">
                {views.toLocaleString()}
                <sup className="lowercase ">{getOrdinal(views)}</sup>
              </span>{" "}
              visitor
            </div>
            {dateTimeStr && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="tracking-wider cursor-help hover:text-white/90 transition-colors">
                    {dateTimeStr}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="rounded-md bg-zinc-950 text-white text-[11px] py-1 px-2.5 border border-zinc-800 shadow-md font-sans">
                  {timeZone}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}

        <p className="text-[10px] sm:text-xs md:text-sm text-white/90 font-sans tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span>
            &copy; 2026{" "}
            <Link
              href="https://github.com/ashutoshdm1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium  underline decoration-current/30 hover:decoration-current underline-offset-4 transition-colors"
            >
              Ashutosh Tiwari
            </Link>
            . The source &middot; All rights reserved
          </span>
          {FOOTER_LINKS.map((link) => (
            <React.Fragment key={link.label}>
              <span className="text-white/40 select-none">&middot;</span>
              <Link
                href={link.href}
                target="_blank"
                className="hover:text-white transition-colors underline underline-offset-2 decoration-current/30 hover:decoration-current"
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
        </p>
      </div>
    </SubSection>
  );
}
