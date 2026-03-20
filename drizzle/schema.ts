import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
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

// TODO: Add your tables here

/**
 * Blog sidebar email capture leads.
 * Stores name + email from visitors who opt in via the blog sidebar form.
 */
export const blogLeads = mysqlTable("blog_leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  /** The blog post slug the visitor was reading when they submitted, if known. */
  sourcePage: varchar("source_page", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BlogLead = typeof blogLeads.$inferSelect;
export type InsertBlogLead = typeof blogLeads.$inferInsert;

/**
 * Client testimonial submissions awaiting admin review.
 * Submitted via the public form on /testimonials.
 * Only approved submissions are shown on the live page.
 */
export const testimonialSubmissions = mysqlTable("testimonial_submissions", {
  id: int("id").autoincrement().primaryKey(),
  /** Reviewer's full name */
  name: varchar("name", { length: 128 }).notNull(),
  /** Business name or title (e.g. "Owner · Salt Lake City Restaurant") */
  businessName: varchar("business_name", { length: 256 }).notNull(),
  /** City, UT */
  location: varchar("location", { length: 128 }).notNull(),
  /** Industry tag for filter pill (e.g. "Restaurants", "Retail") */
  industry: varchar("industry", { length: 64 }).notNull(),
  /** The testimonial quote text */
  quote: text("quote").notNull(),
  /** Star rating 1–5 */
  rating: int("rating").notNull().default(5),
  /** Contact email (not shown publicly, for admin follow-up only) */
  email: varchar("email", { length: 320 }),
  /** Review status: pending → approved or rejected */
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  /** Admin notes on the review decision */
  adminNotes: text("admin_notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  reviewedAt: timestamp("reviewedAt"),
});

export type TestimonialSubmission = typeof testimonialSubmissions.$inferSelect;
export type InsertTestimonialSubmission = typeof testimonialSubmissions.$inferInsert;