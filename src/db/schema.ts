import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const svgThemeEnum = pgEnum("svg_theme", ["light", "dark"]);

// Like Frontend , Backend , Fullstack , DevOps , CI/CD or MERN , PERN , Web3 etc
export const techCategory = pgTable("tech_category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Like React , Next.js , Node.js , Express.js , MongoDB , PostgreSQL , Docker , Kubernetes , AWS , GCP , Azure , Git , GitHub , GitLab , Jenkins , DockerHub , etc
export const techStack = pgTable("tech_stack", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  techCategoryId: integer("tech_category_id").references(
    () => techCategory.id,
    {
      onDelete: "cascade",
    },
  ),
  logoLight: varchar("logo_light", { length: 255 }),
  logoDark: varchar("logo_dark", { length: 255 }),
  svg: text("svg"), // inline svg code for the tech stack
  svgTheme: svgThemeEnum("svg_theme").default("dark").notNull(), // theme for the inline svg
  projectId: integer("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(), // will be .md format
  shortDescription: text("short_description").notNull(),
  projectImage: varchar("image", { length: 255 }).notNull(),
  techCategoryId: integer("tech_category_id").references(
    () => techCategory.id,
    {
      onDelete: "cascade",
    },
  ),
  liveUrl: varchar("live_url", { length: 255 }),
  isMonorepo: boolean("is_monorepo").notNull().default(false),
  repoUrl: varchar("repo_url", { length: 255 }),
  backgroundImage: varchar("background_image", { length: 255 }).default(
    "background.jpg",
  ),
  isActivelyMaintining: boolean("is_actively_maintining")
    .notNull()
    .default(true), // If project is actively maintained or not

  // Project feature flags
  islatestReadme: boolean("latest_readme").notNull().default(false),
  isCustomDomain: boolean("custom_domain").notNull().default(false),
  isSelfHostingDatabase: boolean("self_hosted_database")
    .notNull()
    .default(false),
  isNeonDatabase: boolean("neon_database").notNull().default(false),
  isLLDAvailable: boolean("lld_available").notNull().default(false),
  isAuth: boolean("is_auth").notNull().default(false),
  isGoogleAuth: boolean("google_auth").notNull().default(false),
  isGithubAuth: boolean("github_auth").notNull().default(false),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const frontend = pgTable("frontend", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  techStackId: integer("tech_stack_id").references(() => techStack.id, {
    onDelete: "cascade",
  }),
  liveUrl: varchar("live_url", { length: 255 }),
  repoUrl: varchar("repo_url", { length: 255 }),
  isMonorepo: boolean("is_monorepo").notNull().default(false),
  rootPath: varchar("root_path", { length: 255 }), // directory path inside monorepo, e.g. 'apps/web'
  isActivelyMaintining: boolean("is_actively_maintining")
    .notNull()
    .default(true), // If project is actively maintained or not
  deploymentPlatform: varchar("deployment_platform", { length: 255 }),
  cicd: boolean("cicd").notNull().default(true),
  cicdTool: varchar("cicd_tool", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("unknown"), // 'UP', 'DOWN', 'DEGRADED', 'UNKNOWN'
  // GitHub stats metadata
  stars: integer("stars").notNull().default(0),
  forks: integer("forks").notNull().default(0),
  openIssues: integer("open_issues").notNull().default(0),
  lastCommitMessage: text("last_commit_message"),
  lastCommitAt: timestamp("last_commit_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const backend = pgTable("backend", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  techStackId: integer("tech_stack_id").references(() => techStack.id, {
    onDelete: "cascade",
  }),
  liveUrl: varchar("live_url", { length: 255 }),
  cicd: boolean("cicd").notNull().default(true),
  cicdTool: varchar("cicd_tool", { length: 255 }),
  containerization: boolean("containerization").notNull().default(true),
  containerizationTool: varchar("containerization_tool", { length: 255 }),
  deploymentPlatform: varchar("deployment_platform", { length: 255 }),
  isCliTool: boolean("is_cli_tool").notNull().default(true),
  npmVersion: boolean("npm_version").notNull().default(true),
  repoUrl: varchar("repo_url", { length: 255 }),
  isMonorepo: boolean("is_monorepo").notNull().default(false),
  rootPath: varchar("root_path", { length: 255 }), // directory path inside monorepo, e.g. 'apps/api'
  isActivelyMaintining: boolean("is_actively_maintining")
    .notNull()
    .default(true), // If project is actively maintained or not
  status: varchar("status", { length: 50 }).notNull().default("unknown"), // 'UP', 'DOWN', 'DEGRADED', 'UNKNOWN'

  // GitHub stats metadata
  stars: integer("stars").notNull().default(0),
  forks: integer("forks").notNull().default(0),
  openIssues: integer("open_issues").notNull().default(0),
  lastCommitMessage: text("last_commit_message"),
  lastCommitAt: timestamp("last_commit_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectTasks = pgTable("project_tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().default("todo"), // 'todo', 'in_progress', 'done', 'backlog'
  priority: varchar("priority", { length: 50 }).notNull().default("medium"), // 'low', 'medium', 'high'
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
