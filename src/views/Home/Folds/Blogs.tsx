"use client";

import React from "react";
import SubSection from "@/Shared/Section/SubSection";
import LineY from "@/Shared/Line/LineY";
import { Calendar, ArrowUpRight, NotebookPen, HandHeart } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  date: string;
  claps: number;
  tags: string[];
  link: string;
}

export default function Blogs() {
  const blogList: Blog[] = [
    {
      id: 1,
      title: "Deploying Nextjs15 Project using Docker",
      date: "Nov 2025",
      claps: 342,
      tags: ["AWS", "Docker", "Nginx", "CI/CD"],
      link: "https://elitedevs.notion.site/Deploying-Nextjs15-Project-EC2-DockerHub-Nginx-Github-Action-2a68f02f77c780e998c1d5224c6202c9",
    },
    {
      id: 2,
      title: "Vercel Deploy Hook + Github Action CI/CD",
      date: "Nov 2025",
      claps: 215,
      tags: ["Vercel", "CI/CD", "Github Actions"],
      link: "https://elitedevs.notion.site/Vercel-Deploy-Hook-Github-Action-CI-CD-2af8f02f77c78068ab6be32cba46ae4f",
    },
    {
      id: 3,
      title: "Redis - Rate Limiting and Caching",
      date: "May 2026",
      claps: 189,
      tags: ["Redis", "Caching", "System Design"],
      link: "https://elitedevs.notion.site/Redis-Rate-Limiting-and-Caching-3718f02f77c7809b90ceec4f9c60c66e",
    },
    {
      id: 4,
      title: "Custom PostgreSQL DB Hosting and Backup using Docker",
      date: "Apr 2026",
      claps: 154,
      tags: ["PostgreSQL", "Docker", "Database Hosting"],
      link: "https://elitedevs.notion.site/Custom-PostgreSQL-DB-Hosting-Docker-VM-33a8f02f77c780ccbffdee887619a129",
    },
  ];

  return (
    <>
      <SubSection>
        <h2 className="text-xl font-medium text-foreground tracking-tight py-1">
          Blogs
        </h2>
      </SubSection>
      <SubSection>
        <div className="w-full flex flex-col gap-2 py-2">
          {blogList.map((blog, index) => (
            <BlogCard
              key={blog.id}
              data={blog}
              isLast={index === blogList.length - 1}
            />
          ))}
        </div>
      </SubSection>
    </>
  );
}

const BlogCard = ({ data, isLast }: { data: Blog; isLast: boolean }) => {
  return (
    <LineY className={isLast ? "border-none" : "pb-2"}>
      <Link href={data.link} target="_blank"  className="block w-full">
        <div className="w-full p-2 hover:bg-card/40 transition-all duration-300 relative overflow-hidden group rounded-md">
          {/* Header row (Title + external arrow) */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-foreground tracking-tight group-hover:text-primary transition-colors duration-300 leading-snug">
                {data.title}
              </h3>
              {/* Date */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground/75 mt-1 select-none">
                <Calendar className="size-3.5" />
                <span>{data.date}</span>
              </div>
            </div>
            {/* Action Arrow */}
            <div className="p-1 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
              <ArrowUpRight className="size-[18px]" />
            </div>
          </div>

          {/* Footer row (Claps + Vertical line + tags) */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium select-none">
              <HandHeart className="size-3.5" />
              <span>{data.claps}</span>
            </div>
            <div className="h-3 w-px bg-border/60" />
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((tag) => (
                <div
                  key={tag}
                  className="border border-border/90 shadow-xs rounded-sm px-2 py-0.5 text-xs text-muted-foreground font-light bg-muted/20"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </LineY>
  );
};
