import { StaticImageData } from "next/image";

export interface Projects {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  liveLink: string;
  githubLink: string;
  projectIcon?: string;
  shortDescription: string;
  description: string;
  projectImage?: string;
  backgroundImage?: StaticImageData;
  pinned: boolean;
  techstack: string[];
  status: ProjectStatus;
  apps: {
    frontend: Frontend | boolean;
    backend: Backend | boolean;
    cliTool: CLITool | boolean;
    microService: Backend | boolean;
    mpcServer: MPCServer | boolean;
    sdk: CLITool | boolean;
  };
  isMonorepo: MonoRepo | boolean;
  isHusky: boolean;
  isReadme: boolean;
  isLLD: boolean;
  isAgentSkills: boolean;
  isOpenSource: boolean;
  architecture: Architecture | boolean;
}

export type Frontend = {
  id: number;
  name: string;
  link: string;
  github: string;
  techStack: string[];
  language: Language;
  isContianerized: Containerized | boolean;
  isCICD: CICD | boolean;
  deploymentPlatform: DeploymentPlatform | boolean;
  deploymentStatus: DeploymentStatus;
  monitoringTool: MonitoringTool | boolean;
  isCustomDomain: boolean;
};

export type Backend = {
  id: number;
  name: string;
  link: string;
  github: string;
  techStack: string[];
  language: Language;
  isContianerized: Containerized | boolean;
  isCICD: CICD | boolean;
  deploymentPlatform: DeploymentPlatform | boolean;
  dbBackup: DbBackup | boolean;
  databaseHosting: DatabaseHosting | boolean;
  deploymentStatus: DeploymentStatus;
  monitoringTool: MonitoringTool | boolean;
  isCustomDomain: boolean;
  authentication: Authentication | boolean;
  aIGateway: AIGateway | boolean;
  reverseProxy: ReverseProxy | boolean;
  isTested: boolean;
  caching: Caching | boolean;
  ORM: ORM | boolean;
  messageBroker: messageBroker | boolean;
  objectStorage: ObjectStorage | boolean;
};

export type MPCServer = {
  id: number;
  name: string;
  npmLink: string;
  github: string;
  language: Language;
  techStack: string[];
  isCICD: CICD | boolean;
  npmVersion: string;
  githubVersion: string;
  projectStatus: ProjectStatus;
  SupportedIDE: SupportedIDE[] | boolean;
};

export type CLITool = {
  id: number;
  name: string;
  npmLink: string;
  github: string;
  language: Language;
  techStack: string[];
  isCICD: CICD | boolean;
  npmVersion: string;
  githubVersion: string;
  projectStatus: ProjectStatus;
};

export enum Architecture {
  Monolithic = "Monolithic",
  Microservice = "Microservice",
  Serverless = "Serverless",
}

export enum MonoRepo {
  TurboRepo = "TerboRepo",
  PnpmWorkspaces = "Pnpm Workspaces",
  BunWorkspaces = "Bun Workspaces",
}

export enum ProjectStatus {
  Live = "Live",
  Building = "Building",
  Completed = "Completed",
}

export enum DeploymentStatus {
  Live = "Live",
  Building = "Building",
  Completed = "Completed",
}

export enum DeploymentPlatform {
  Vercel = "Vercel",
  AWS = "AWS",
  Oracle = "Oracle",
  Cloudflare = "Cloudflare",
  DigitalOcean = "DigitalOcean",
}

export enum MonitoringTool {
  Grafana = "Grafana",
  Prometheus = "Prometheus",
  Netdata = "Netdata",
  NewRelic = "New Relic",
  Vercel = "Vercel Analytics",
}

export enum CICD {
  GithubActions = "Github Actions",
  Vercel = "Vercel",
  Jenkins = "Jenkins",
}

export enum Containerized {
  Docker = "Docker",
  Podman = "Podman",
  Kubernetes = "Kubernetes",
}

export enum DatabaseHosting {
  NeonDB = "Neon DB",
  Aiven = "Avien",
  SelfHosting = "Self Hosting",
}

export enum Authentication {
  JWT = "JWT",
  Clerk = "Clerk",
  NextAuth = "NextAuth",
  BetterAuth = "BetterAuth",
}

export enum AIGateway {
  OpenAI = "OpenAI",
  Gemini = "Gemini",
  Anthropic = "Anthropic",
  OpenRouter = "OpenRouter",
  VercelAI = "Vercel AI",
}

export enum ReverseProxy {
  Nginx = "Nginx",
  Caddy = "Caddy",
  Traefik = "Traefik",
}

export enum DbBackup {
  CronR2 = "Cron Job + R2",
  PgBackRest = "pgBackRest",
  Rclone = "Rclone",
}

export enum messageBroker {
  BullMQ = "BullMQ",
  RabbitMQ = "RabbitMQ",
  Kafka = "Kafka",
}

export enum Language {
  Go = "Go",
  Rust = "Rust",
  Python = "Python",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
}

export enum Caching {
  Redis = "Redis",
  Upstash = "Upstash",
}

export enum ObjectStorage {
  CloudflareR2 = "Cloudflare R2",
  AWSS3 = "AWS S3",
  Cloudinary = "Cloudinary",
}

export enum ORM {
  Prisma = "Prisma",
  Drizzle = "Drizzle",
  Mongoose = "Mongoose",
}

export enum SupportedIDE {
  VsCode = "VS Code",
  Cursor = "Cursor",
  Antigravity = "Antigravity",
}
