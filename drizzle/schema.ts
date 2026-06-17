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
