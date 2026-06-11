import { bg } from "@/assets/import";
import {
  Projects,
  ProjectStatus,
  Containerized,
  CICD,
  DeploymentPlatform,
  DeploymentStatus,
  DatabaseHosting,
  Authentication,
  Caching,
  ObjectStorage,
  ORM,
  MonoRepo,
  Language,
  ReverseProxy,
  AIGateway,
} from "@/types/project.types";

export const Xcontext: Projects = {
  slug: "xcontext",
  name: "Xcontext",
  startDate: "2025",
  endDate: "Present",
  liveLink: "https://xcontext.elitedev.space/",
  githubLink: "https://github.com/AshutoshDM1/Xcontext",
  projectIcon: "https://xcontext.elitedev.space/favicon.ico",
  projectImage: "/project/xcontext.png",
  shortDescription:
    "XContext is a platform for taking AI interview of given Codebase and Contests.",
  description: `XContext is a platform for taking AI interview of given Codebase.

- Advanced manga search, filtering, and pagination
- Personalized reading progress and collections
- Full admin dashboard for manga/chapter management
- AWS EC2 + Docker deployment with CI/CD pipelines
- Zustand-powered modular frontend architecture
- Smooth responsive animations and optimized reading experience`,
  backgroundImage: bg.image7,
  pinned: false,
  status: ProjectStatus.Building,
  isMonorepo: MonoRepo.PnpmWorkspaces,
  isHusky: true,
  isReadme: true,
  isLLD: false,
  isAgentSkills: false,
  techstack: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn UI",
    "Express",
    "DigitalOcean",
    "Drizzle",
    "Vercel AI",
  ],
  isOpenSource: true,
  architecture: false,
  apps: {
    frontend: false,
    backend: false,
    cliTool: {
      id: 10,
      name: "Xcontext",
      npmLink: "https://www.npmjs.com/package/xcontext",
      github: "https://github.com/AshutoshDM1/Xcontext",
      language: Language.TypeScript,
      techStack: ["Node.js", "TypeScript", "Commander.js", "Ora", "Chalk"],
      isCICD: CICD.GithubActions,
      npmVersion: "1.0.0",
      githubVersion: "1.0.0",
      projectStatus: ProjectStatus.Completed,
    },
    microService: false,
    mpcServer: false,
    sdk: false,
  },
};
