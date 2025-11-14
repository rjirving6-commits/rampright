import { pgTable, text, timestamp, boolean, integer, uuid, index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

// Companies table
export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  size: text("size"),
  description: text("description"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Onboarding Templates table
export const onboardingTemplates = pgTable("onboarding_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Onboarding Plans table
export const onboardingPlans = pgTable("onboarding_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  templateId: uuid("template_id")
    .references(() => onboardingTemplates.id, { onDelete: "set null" }),
  status: text("status").notNull().default("not_started"),
  startDate: timestamp("start_date").notNull(),
  currentWeek: integer("current_week").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("onboarding_plans_user_id_idx").on(table.userId),
}));

// Tasks table
export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  planId: uuid("plan_id")
    .notNull()
    .references(() => onboardingPlans.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  weekNumber: integer("week_number").notNull(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  planIdIdx: index("tasks_plan_id_idx").on(table.planId),
}));

// Module Content table
export const moduleContent = pgTable("module_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  companyIdIdx: index("module_content_company_id_idx").on(table.companyId),
}));

// Important People table
export const importantPeople = pgTable("important_people", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  photoUrl: text("photo_url"),
  bio: text("bio"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  companyIdIdx: index("important_people_company_id_idx").on(table.companyId),
}));

// Weekly Reflections table
export const weeklyReflections = pgTable("weekly_reflections", {
  id: uuid("id").defaultRandom().primaryKey(),
  planId: uuid("plan_id")
    .notNull()
    .references(() => onboardingPlans.id, { onDelete: "cascade" }),
  weekNumber: integer("week_number").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  goalsProgress: text("goals_progress"),
  challenges: text("challenges"),
  clarificationNeeded: text("clarification_needed"),
  confidenceLevel: integer("confidence_level"),
  additionalComments: text("additional_comments"),
}, (table) => ({
  planIdIdx: index("weekly_reflections_plan_id_idx").on(table.planId),
}));
