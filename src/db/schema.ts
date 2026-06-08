import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
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
  order: integer("order").default(0),
  logoLight: varchar("logo_light", { length: 255 }),
  logoDark: varchar("logo_dark", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
