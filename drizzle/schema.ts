import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
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
 * Blog sidebar email capture leads.
 */
export const blogLeads = mysqlTable("blog_leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  sourcePage: varchar("source_page", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogLead = typeof blogLeads.$inferSelect;
export type InsertBlogLead = typeof blogLeads.$inferInsert;

/**
 * Client testimonial submissions awaiting admin review.
 */
export const testimonialSubmissions = mysqlTable("testimonial_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  businessName: varchar("business_name", { length: 256 }).notNull(),
  location: varchar("location", { length: 128 }).notNull(),
  industry: varchar("industry", { length: 64 }).notNull(),
  quote: text("quote").notNull(),
  rating: int("rating").notNull().default(5),
  email: varchar("email", { length: 320 }),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
});

export type TestimonialSubmission = typeof testimonialSubmissions.$inferSelect;
export type InsertTestimonialSubmission = typeof testimonialSubmissions.$inferInsert;

/**
 * Unified lead inbox — every form submission from the site is stored here.
 * Feeds the admin portal Lead Inbox tab.
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  /** Which form generated this lead */
  formType: varchar("form_type", { length: 64 }).notNull(),
  /** Contact info */
  firstName: varchar("first_name", { length: 128 }).notNull(),
  lastName: varchar("last_name", { length: 128 }).default("").notNull(),
  email: varchar("email", { length: 320 }).default("").notNull(),
  phone: varchar("phone", { length: 32 }).default("").notNull(),
  /** Business info */
  businessName: varchar("business_name", { length: 256 }),
  businessType: varchar("business_type", { length: 128 }),
  monthlyVolume: varchar("monthly_volume", { length: 64 }),
  /** Extra fields as JSON (hardware config, message, source page, etc.) */
  notes: text("notes"),
  /** CRM status for pipeline tracking */
  status: mysqlEnum("status", ["new", "contacted", "qualified", "closed", "lost"]).default("new").notNull(),
  /** Admin notes */
  adminNotes: text("admin_notes"),
  /** Source page / UTM */
  sourcePage: varchar("source_page", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * SEO Audit Run — tracks each time SEMrush data was pulled.
 */
export const seoAuditRuns = mysqlTable("seo_audit_runs", {
  id: int("id").autoincrement().primaryKey(),
  /** Total issues found in this run */
  totalIssues: int("total_issues").default(0).notNull(),
  errors: int("errors").default(0).notNull(),
  warnings: int("warnings").default(0).notNull(),
  notices: int("notices").default(0).notNull(),
  /** Raw SEMrush response stored for reference */
  rawData: text("raw_data"),
  /** Status of this run */
  status: mysqlEnum("status", ["running", "completed", "failed"]).default("running").notNull(),
  errorMessage: text("error_message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export type SeoAuditRun = typeof seoAuditRuns.$inferSelect;

/**
 * SEO Audit Issues — individual issues from SEMrush site audit.
 * Each issue is AI-analyzed and can have a fix applied.
 */
export const seoAuditIssues = mysqlTable("seo_audit_issues", {
  id: int("id").autoincrement().primaryKey(),
  runId: int("run_id").notNull(),
  /** Issue classification */
  severity: mysqlEnum("severity", ["error", "warning", "notice"]).notNull(),
  issueType: varchar("issue_type", { length: 256 }).notNull(),
  description: text("description").notNull(),
  /** Number of affected pages */
  affectedPages: int("affected_pages").default(0).notNull(),
  /** Raw SEMrush issue data */
  rawIssueData: text("raw_issue_data"),
  /** AI analysis result */
  aiAnalysis: text("ai_analysis"),
  aiAnalyzedAt: timestamp("ai_analyzed_at"),
  /** Fix status */
  fixStatus: mysqlEnum("fix_status", ["pending", "analyzed", "fix_ready", "applied", "ignored"]).default("pending").notNull(),
  /** The AI-generated fix (code diff or instructions) */
  suggestedFix: text("suggested_fix"),
  /** Admin notes on this issue */
  adminNotes: text("admin_notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoAuditIssue = typeof seoAuditIssues.$inferSelect;

/**
 * SEO Audit Schedule config — stores the heartbeat task UID for the auto-pull job.
 */
export const seoAuditConfig = mysqlTable("seo_audit_config", {
  id: int("id").autoincrement().primaryKey(),
  /** Heartbeat task UID for the scheduled pull */
  scheduleCronTaskUid: varchar("schedule_cron_task_uid", { length: 65 }),
  /** Cron expression (6-field) */
  cronExpression: varchar("cron_expression", { length: 64 }).default("0 0 6 * * 1").notNull(),
  /** Whether auto-pull is enabled */
  enabled: int("enabled").default(1).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeoAuditConfig = typeof seoAuditConfig.$inferSelect;
