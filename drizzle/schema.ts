import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Survey submissions — raw answers from the 5-step survey
 */
export const surveySubmissions = mysqlTable("survey_submissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  // Contact info
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  // All survey answers as JSON
  answers: json("answers").notNull(),
  // Computed scores
  totalScore: int("totalScore").notNull(),
  levelId: int("levelId").notNull(),
  levelName: varchar("levelName", { length: 100 }).notNull(),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SurveySubmission = typeof surveySubmissions.$inferSelect;
export type InsertSurveySubmission = typeof surveySubmissions.$inferInsert;

/**
 * Brand profiles — personal brand DNA + identity for each user
 */
export const brandProfiles = mysqlTable("brand_profiles", {
  id: int("id").autoincrement().primaryKey(),
  surveyId: int("surveyId").notNull(),
  userId: int("userId"),
  // Brand DNA
  archetype: varchar("archetype", { length: 100 }),
  mission: text("mission"),
  coreFeeling: varchar("coreFeeling", { length: 200 }),
  positioningStatement: text("positioningStatement"),
  brandDNA: json("brandDNA"), // Full PersonalBrandDNA object
  // Brand Identity (Module 4)
  toneOfVoice: json("toneOfVoice"), // { formal/casual, serious/playful, etc. }
  colorPalette: json("colorPalette"), // { primary, secondary, accent, bg }
  brandKeywords: json("brandKeywords"), // string[]
  avatarUrl: text("avatarUrl"), // uploaded photo URL
  brandGuidelinesGenerated: json("brandGuidelinesGenerated"), // AI-generated guidelines
  // Role mapping
  roleMapping: json("roleMapping"), // AIRoleMapping object
  // Content strategy
  contentPillars: json("contentPillars"),
  channelStrategy: json("channelStrategy"),
  // Service recommendation
  serviceRecommendation: json("serviceRecommendation"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BrandProfile = typeof brandProfiles.$inferSelect;
export type InsertBrandProfile = typeof brandProfiles.$inferInsert;

/**
 * Execution plans — monthly strategy with weekly breakdown
 */
export const executionPlans = mysqlTable("execution_plans", {
  id: int("id").autoincrement().primaryKey(),
  brandProfileId: int("brandProfileId").notNull(),
  userId: int("userId"),
  // Plan metadata
  month: int("month").notNull(), // 1-based month number
  title: varchar("title", { length: 255 }),
  status: mysqlEnum("status", ["draft", "active", "completed"]).default("draft").notNull(),
  // Plan content (AI-generated)
  weeklyPlan: json("weeklyPlan"), // 4 weeks with daily tasks
  goals: json("goals"), // string[]
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ExecutionPlan = typeof executionPlans.$inferSelect;
export type InsertExecutionPlan = typeof executionPlans.$inferInsert;

/**
 * Tasks — individual action items within execution plans
 */
export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  executionPlanId: int("executionPlanId").notNull(),
  userId: int("userId"),
  // Task info
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["content", "branding", "networking", "learning", "strategy"]).notNull(),
  week: int("week").notNull(), // 1-4
  day: int("day"), // 1-7 (optional)
  // Status
  status: mysqlEnum("taskStatus", ["pending", "in_progress", "completed", "skipped"]).default("pending").notNull(),
  // Guidance
  stepByStepGuide: json("stepByStepGuide"), // string[] — step-by-step instructions
  aiPromptTemplate: text("aiPromptTemplate"), // prompt template for AI assistance
  estimatedMinutes: int("estimatedMinutes"),
  // Timestamps
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

/**
 * Content pieces — generated content items (posts, images, scripts)
 */
export const contentPieces = mysqlTable("content_pieces", {
  id: int("id").autoincrement().primaryKey(),
  brandProfileId: int("brandProfileId").notNull(),
  userId: int("userId"),
  taskId: int("taskId"), // optional link to task
  // Content
  contentType: mysqlEnum("contentType", ["text_post", "image_prompt", "video_script", "carousel", "story"]).notNull(),
  title: varchar("contentTitle", { length: 500 }),
  body: text("body"), // main content text
  imageUrl: text("imageUrl"), // generated image URL
  metadata: json("metadata"), // extra data (hashtags, platform, etc.)
  // Status
  status: mysqlEnum("contentStatus", ["draft", "ready", "published"]).default("draft").notNull(),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContentPiece = typeof contentPieces.$inferSelect;
export type InsertContentPiece = typeof contentPieces.$inferInsert;

/**
 * Calendar events — content scheduling and task scheduling on calendar
 */
export const calendarEvents = mysqlTable("calendar_events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  brandProfileId: int("brandProfileId"),
  // Event info
  title: varchar("calEventTitle", { length: 500 }).notNull(),
  description: text("calEventDescription"),
  eventType: mysqlEnum("eventType", ["content", "task", "milestone", "custom"]).default("custom").notNull(),
  // Scheduling
  scheduledDate: timestamp("scheduledDate").notNull(),
  endDate: timestamp("endDate"),
  allDay: int("allDay").default(0), // boolean: 0 = false, 1 = true
  // Links to other entities
  contentPieceId: int("contentPieceId"),
  taskId: int("calTaskId"),
  executionPlanId: int("calPlanId"),
  // Status
  status: mysqlEnum("calEventStatus", ["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled").notNull(),
  // Metadata
  color: varchar("color", { length: 20 }),
  metadata: json("calEventMetadata"),
  // Timestamps
  createdAt: timestamp("calEventCreatedAt").defaultNow().notNull(),
  updatedAt: timestamp("calEventUpdatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type InsertCalendarEvent = typeof calendarEvents.$inferInsert;

/**
 * Activity logs — track all user actions for history display
 */
export const activityLogs = mysqlTable("activity_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("actUserId").notNull(),
  // Action info
  action: varchar("action", { length: 100 }).notNull(), // e.g. "survey_completed", "content_created", "task_completed"
  entityType: varchar("entityType", { length: 50 }), // e.g. "survey", "content", "task", "brand"
  entityId: int("entityId"),
  // Details
  title: varchar("actTitle", { length: 500 }),
  description: text("actDescription"),
  metadata: json("actMetadata"),
  // Timestamps
  createdAt: timestamp("actCreatedAt").defaultNow().notNull(),
});

export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = typeof activityLogs.$inferInsert;
