import { Phone, MapPin, Globe, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/Shared/Icons/Icons";
import { H1, H2, H3, H4, P, Strong, Link, ContactItem, Li } from "./Texts";

export default function CanvasContent() {
  return (
    <div className="font-sans text-zinc-900 dark:text-zinc-100 pt-8 px-8 pb-4 h-full flex flex-col justify-between bg-white dark:bg-zinc-950 select-text overflow-y-auto no-scrollbar tracking-normal">
      <div>
        {/* Header Section */}
        <div className="space-y-2">
          <H1>Ashutosh Tiwari</H1>

          {/* Contact details */}
          <div className="text-[11px] text-black dark:text-zinc-300 space-y-2 font-medium">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
              <ContactItem
                icon={<Globe className="size-2.5" />}
                href="https://ashutoshtiwari.me"
              >
                ashutoshtiwari.me
              </ContactItem>
              <ContactItem icon={<Phone className="size-2.5" />}>
                +91 8377056538
              </ContactItem>
              <ContactItem icon={<MapPin className="size-2.5" />}>
                New Delhi, India
              </ContactItem>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5">
              <ContactItem
                icon={<Mail className="size-2.5" />}
                href="mailto:ashutosh0tiwari@gmail.com"
              >
                ashutosh0tiwari@gmail.com
              </ContactItem>
              <ContactItem
                icon={<LinkedinIcon className="size-2.5" />}
                href="https://www.linkedin.com/in/ashutosh-tiwari-8931b82b8"
                isRoundedFull={false}
              >
                linkedin/ashutosh
              </ContactItem>
              <ContactItem
                icon={<GithubIcon className="size-2.5" />}
                href="https://github.com/AshutoshDM1"
              >
                github.com/AshutoshDM1
              </ContactItem>
              <ContactItem
                icon={<TwitterIcon className="size-3 mr-0.5" />}
                href="https://x.com/AshutoshDM_1"
              >
                x.com/ashutosh
              </ContactItem>
            </div>
          </div>
        </div>

        {/* Technical Skills Section */}
        <div className="mt-4">
          <div className="border-b border-zinc-900 dark:border-zinc-100 pb-0.5 mb-2">
            <H2>Technical Skills</H2>
          </div>

          <div className="text-[10px] leading-relaxed  text-black dark:text-zinc-200 space-y-0.5">
            <div>
              <H4>Languages:</H4> JavaScript, TypeScript, Python, Go
            </div>
            <div className="space-y-1">
              <H4>Technologies:</H4>
              <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                <Li>
                  <H4>Frontend:</H4> React.js, Next.js, Tailwind, Motion,
                  Zustand, Redux Toolkit, Tanstack Query
                </Li>
                <Li>
                  <H4>Backend:</H4> Node, Bun, Express, tRPC, Prisma, Drizzle,
                  Socket.io, BetterAuth, Clerk, Redis
                </Li>
                <Li>
                  <H4>Database:</H4> PostgreSQL, MongoDB, MySQL
                </Li>
                <Li>
                  <H4>DevOps:</H4> AWS, DigitalOcean, Docker, Nginx, GitHub
                  Actions, New Relic
                </Li>
                <Li>
                  <H4>Tools:</H4> Git, GitHub, Notion, Cursor, Antigravity
                </Li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-4">
          <div className="border-b border-zinc-900 dark:border-zinc-100 pb-0.5 mb-2">
            <H2>Experience</H2>
          </div>

          <div className="space-y-3.5">
            {/* Experience 1: Software Engineer at EdgeNroots */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                <H3>Frontend Developer — EdgeNroots</H3>
                <div className="text-[10px] font-semibold text-black space-x-1.5">
                  <span>Aug, 2025 - Mar, 2026</span>
                </div>
              </div>
              <P className="text-zinc-900 text-[10px] dark:text-zinc-400">
                <H4>Skills:</H4> Next.js, Tailwind CSS, Strapi CMS, Motion, SEO,
                GitHub Action, AWS S3, Vercel
              </P>
              <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
                <Li>
                  Delivered <Strong>10+ production-grade applications</Strong>{" "}
                  using Next.js, TypeScript, and Tailwind CSS, ensuring
                  scalability and responsive user experiences.
                </Li>
                <Li>
                  Architected <Strong>reusable component libraries</Strong>,
                  auth systems, and API layers using Redux Toolkit and React
                  Query, supporting <Strong>12+ modules</Strong>.
                </Li>
                <Li>
                  Enhanced multiple projects performance through{" "}
                  <Strong>SEO, Sitemap, SSG </Strong>and{" "}
                  <Strong>CI/CD Automation,</Strong> increasing{" "}
                  <Strong>Lighthouse scores from 58 to 90+</Strong>.
                </Li>
                <Li>
                  Led <Strong>end-to-end frontend development</Strong> for
                  multiple projects, collaborating directly with clients and
                  implementing feature requests.
                </Li>
                <Li>
                  Improved <Strong>performance</Strong> by <Strong>up to 60%</Strong>, <Strong>reduced</Strong> infrastructure <Strong>Vercel costs by 40%</Strong> through the use of <Strong>SSR, SSG, and ISR</Strong> in Next.js.
                </Li>
              </ul>
            </div>

            {/* Experience 2: Frontend Developer Intern at EdgeNroots */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                <H3>Frontend Developer Intern — EdgeNroots</H3>
                <div className="text-[10px] font-semibold text-black space-x-1.5">
                  <span>May, 2025 - July, 2025</span>
                </div>
              </div>
              <P className="text-zinc-900 text-[10px] dark:text-zinc-400">
                <H4>Skills:</H4> React, TypeScript, CMS, Redux Toolkit
              </P>
              <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
                <Li>
                  Contributed to <Strong>30+ CRM modules</Strong>, including
                  Leads, Subscription, and Status Flow, resulting in a{" "}
                  <Strong>25% reduction in manual work</Strong>.
                </Li>
                <Li>
                  Developed <Strong>15+ pages using React and Next.js</Strong>{" "}
                  for 3 different projects.
                </Li>
                <Li>
                  Collaborated closely with the backend team to integrate APIs
                  and <Strong>reduce server load by 40%</Strong>.
                </Li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-4">
          <div className="border-b border-zinc-900 dark:border-zinc-100 pb-0.5 mb-2">
            <H2>Projects</H2>
          </div>

          <div className="space-y-3.5">
            {/* Project 1: XContext */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                <H3>XContext</H3>
                <div className="text-[10px]  text-zinc-500 space-x-1.5 underline">
                  <Link href="https://github.com/AshutoshDM1/xContext">
                    GitHub
                  </Link>
                  <span>|</span>
                  <Link href="https://xcontext.elitedev.space">Website</Link>
                </div>
              </div>
              <P className="text-zinc-900 text-[10px] dark:text-zinc-400">
                <H4>Technologies:</H4> Next.js, TypeScript, Express, PostgreSQL,
                Drizzle ORM, BetterAuth, Vercel AI, Redis
              </P>
              <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
                <Li>
                  <Strong>AI-powered Contest </Strong> and codebase analysis
                  platform designed for technical assessments and
                  <Strong>{" "}developer contests</Strong>.
                </Li>
                <Li>
                  Create <Strong>TypeScript</Strong>{" "}
                  support Coding challenges powered by <Strong>AI Agent</Strong>{" "}
                  and solve{" "}
                  <Strong>in-browser code editor</Strong> powered by{" "}
                  <Strong>Stakebliz WebContainer</Strong>.
                </Li>
                <Li>
                  Created <Strong>public coding contests</Strong> with
                  AI-powered interviews and <Strong>leaderboards</Strong> , using{" "}
                  <Strong>Redis caching</Strong> to achieve response times below{" "}
                  <Strong>50ms</Strong>.
                </Li>
                <Li>
                  Built and managed a<Strong> Bun monorepo</Strong> with
                  automated <Strong>CI/CD pipelines</Strong>, enabling reliable
                  deployments on a <Strong>DigitalOcean VM</Strong>.
                </Li>
              </ul>
            </div>

            {/* Project 2: Aset */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                <H3>Aset</H3>
                <div className="text-[10px]  text-zinc-500 space-x-1.5 underline">
                  <Link href="https://github.com/AshutoshDM1/Aset">GitHub</Link>
                  <span>|</span>
                  <Link href="https://aset.elitedev.space">Website</Link>
                </div>
              </div>
              <P className="text-zinc-900 text-[10px] dark:text-zinc-400">
                <H4>Technologies:</H4> React, Tailwind, tRPC, Prisma, Cloudflare
                R2, Vercel, Clerk
              </P>
              <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
                <Li>
                  Built a fast & scalable{" "}
                  <Strong>lightweight cloud storage platform</Strong> for
                  uploading and managing files, images, and videos.
                </Li>

                <Li>
                  Developed on a <Strong>PNPM monorepo</Strong> using React,{" "}
                  tRPC, and Clerk Auth, with <Strong>Cloudflare R2</Strong> for
                  object storage and providing <Strong> Global CDN</Strong> &
                  Ultra Low Latency with <Strong>Low Egress Fee</Strong> which
                  enables <Strong>unlimited downloads</Strong> for user.
                </Li>

                <Li>
                  Created the{" "}<Strong>Aset SDK</Strong>, as a{" "}
                  <Strong>NPM Package</Strong> enabling users to integrate aset
                  cloud storage into their application with{" "}
                  <Strong>two commands</Strong>.
                </Li>

                <Li>
                  <Strong>Self-hosted PostgreSQL </Strong>,{" "}
                  <Strong>Golang image Optimize MicroService</Strong> and hosted
                  on a <Strong>DigitalOcean VM</Strong>, reducing infrastructure
                  costs.
                </Li>
              </ul>
            </div>
            {/* Project 3: MangaHaven */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                <H3>MangaHaven</H3>
                <div className="text-[10px]  text-zinc-500 space-x-1.5 underline">
                  <Link href="https://github.com/AshutoshDM1/MangaHaven">
                    GitHub
                  </Link>
                  <span>|</span>
                  <Link href="https://mangaheaven.app">Website</Link>
                </div>
              </div>
              <P className="text-zinc-900 text-[10px] dark:text-zinc-400">
                <H4>Technologies:</H4> Next.js, TypeScript, Tailwind, NextAuth,
                Cloudinary, Docker, PostgreSQL, DigitalOcean
              </P>
              <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
                <Li>
                  Developed a modern <Strong>Manga reading platform</Strong>{" "}
                  that combines stunning visuals with{" "}
                  <Strong>High performance and strong SEO</Strong>.
                </Li>
                <Li>
                  Achieved <Strong> 2,000+ </Strong> Google Search Console
                  impressions and <Strong> 50+ Active Users Monthly.</Strong>
                </Li>
                <Li>
                  <Strong>Integrated CI/CD and Containerization</Strong> using
                  Docker & DockerHub and Deployment on DigitalOcean VM.
                </Li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-4">
          <div className="border-b border-zinc-900 dark:border-zinc-100 pb-0.5 mb-2">
            <H2>Education</H2>
          </div>

          <div className="space-y-3.5">
            {/* Education 1: Institute of Management and Education */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline border-b border-zinc-200 dark:border-zinc-800 pb-0.5">
                <H3>Institute of Management and Education</H3>
                <div className="text-[10px] font-semibold text-black space-x-1.5">
                  <span>Aug 2022 - June 2025</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline text-[10px] text-zinc-900 dark:text-zinc-400 font-medium">
                <span>Bachelor of Computer Application (CGPA: 7.00/10.00)</span>
                <span>MohanNagar, Ghaziabad</span>
              </div>
              {/* <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
                <Li>
                  <Strong>Relevant Coursework:</Strong> Data Structures and
                  Algorithms (C++), Full Stack Development, Core Subjects of
                  Computer Science
                </Li>
              </ul> */}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-4">
          <div className="border-b border-zinc-900 dark:border-zinc-100 pb-0.5 mb-2">
            <H2>Achievements</H2>
          </div>

          <ul className="list-disc pl-4 text-[11px] text-black dark:text-zinc-300 space-y-0.5">
            <Li>
              Promoted from <Strong>Frontend Intern</Strong> and received{" "}
              <Strong>PPO within 2 Months </Strong>for{" "}
              <Strong>Outstanding Performance</Strong> at EdgeNroots.
            </Li>
            <Li>
              <Strong>20+ deployed Projects</Strong> On
              Vercel and DigitalOcean. All available on my{" "}
              <Link className="underline" href="https://github.com/AshutoshDM1">
                GitHub
              </Link>{" "}
              and <Strong>1800+ hours </Strong> of Coding tracked on{" "}
              <Link
                className="underline"
                href="https://wakatime.com/@AshutoshDM1"
              >
                WakaTime
              </Link>
            </Li>
          </ul>
        </div>
      </div>
    </div>
  );
}
