import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
  logoLight: varchar("logo_light", { length: 255 }).notNull(),
  logoDark: varchar("logo_dark", { length: 255 }).notNull(),
  projectId: integer("project_id").references(() => projects.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  projectImage: varchar("image", { length: 255 }).notNull(),
  techCategoryId: integer("tech_category_id").references(
    () => techCategory.id,
    {
      onDelete: "cascade",
    },
  ),
  liveUrl: varchar("live_url", { length: 255 }),
  frontendRepo: varchar("frontend_repo", { length: 255 }),
  backendRepo: varchar("backend_repo", { length: 255 }),
  isMonorepo: boolean("is_monorepo").notNull().default(false),
  repoUrl: varchar("repo_url", { length: 255 }),
  backgroundImage: varchar("background_image", { length: 255 }).default(
    "background.jpg",
  ),
  isActive: boolean("is_active").notNull().default(true),
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
  clientRepo: varchar("client_repo", { length: 255 }),
  isMonorepo: boolean("is_monorepo").notNull().default(false),
  repoUrl: varchar("repo_url", { length: 255 }),
  rootPath: varchar("root_path", { length: 255 }), // directory path inside monorepo, e.g. 'apps/web'
  isActive: boolean("is_active").notNull().default(true),
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
  npmVersion: boolean("is_server_less").notNull().default(true),
  serverRepo: varchar("server_repo", { length: 255 }),
  isMonorepo: boolean("is_monorepo").notNull().default(false),
  repoUrl: varchar("repo_url", { length: 255 }),
  rootPath: varchar("root_path", { length: 255 }), // directory path inside monorepo, e.g. 'apps/api'
  isActive: boolean("is_active").notNull().default(true),
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
