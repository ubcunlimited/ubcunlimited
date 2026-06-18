import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  blogLeads,
  InsertBlogLead,
  InsertLead,
  InsertTestimonialSubmission,
  InsertUser,
  leads,
  testimonialSubmissions,
  users,
  seoAuditRuns,
  seoAuditIssues,
  seoAuditConfig,
  type SeoAuditRun,
  type SeoAuditIssue,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function insertBlogLead(lead: InsertBlogLead): Promise<void> {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot insert blog lead: database not available"); return; }
  await db.insert(blogLeads).values(lead);
}

// ─── Testimonial Submissions ──────────────────────────────────────────────────

export async function insertTestimonialSubmission(submission: InsertTestimonialSubmission): Promise<void> {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot insert testimonial: database not available"); return; }
  await db.insert(testimonialSubmissions).values(submission);
}

export async function getTestimonialSubmissions(status?: "pending" | "approved" | "rejected") {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return db.select().from(testimonialSubmissions).where(eq(testimonialSubmissions.status, status)).orderBy(testimonialSubmissions.createdAt);
  }
  return db.select().from(testimonialSubmissions).orderBy(testimonialSubmissions.createdAt);
}

export async function updateTestimonialStatus(id: number, status: "approved" | "rejected", adminNotes?: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(testimonialSubmissions).set({ status, adminNotes: adminNotes ?? null, reviewedAt: new Date() }).where(eq(testimonialSubmissions.id, id));
}

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function insertLead(lead: InsertLead): Promise<number> {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot insert lead: database not available"); return 0; }
  const result = await db.insert(leads).values(lead);
  return (result[0] as { insertId: number }).insertId ?? 0;
}

export async function getLeads(opts?: {
  formType?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return { rows: [], total: 0 };
  const conditions = [];
  if (opts?.formType && opts.formType !== "all") conditions.push(eq(leads.formType, opts.formType));
  if (opts?.status && opts.status !== "all") conditions.push(eq(leads.status, opts.status as "new" | "contacted" | "qualified" | "closed" | "lost"));
  if (opts?.dateFrom) conditions.push(gte(leads.createdAt, opts.dateFrom));
  if (opts?.dateTo) conditions.push(lte(leads.createdAt, opts.dateTo));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const limit = opts?.limit ?? 50;
  const offset = opts?.offset ?? 0;
  const [rows, countResult] = await Promise.all([
    db.select().from(leads).where(where).orderBy(desc(leads.createdAt)).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(leads).where(where),
  ]);
  return { rows, total: Number(countResult[0]?.count ?? 0) };
}

export async function updateLeadStatus(id: number, status: "new" | "contacted" | "qualified" | "closed" | "lost", adminNotes?: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(leads).set({ status, adminNotes: adminNotes ?? null }).where(eq(leads.id, id));
}

export async function getLeadStats() {
  const db = await getDb();
  if (!db) return { total: 0, thisWeek: 0, byFormType: [], byStatus: [] };
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [totalResult, weekResult, byFormType, byStatus] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(leads),
    db.select({ count: sql<number>`count(*)` }).from(leads).where(gte(leads.createdAt, weekAgo)),
    db.select({ formType: leads.formType, count: sql<number>`count(*)` }).from(leads).groupBy(leads.formType).orderBy(desc(sql`count(*)`)),
    db.select({ status: leads.status, count: sql<number>`count(*)` }).from(leads).groupBy(leads.status),
  ]);
  return {
    total: Number(totalResult[0]?.count ?? 0),
    thisWeek: Number(weekResult[0]?.count ?? 0),
    byFormType: byFormType.map(r => ({ formType: r.formType, count: Number(r.count) })),
    byStatus: byStatus.map(r => ({ status: r.status, count: Number(r.count) })),
  };
}

// ─── SEO Audit ────────────────────────────────────────────────────────────────

export async function createSeoAuditRun(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.insert(seoAuditRuns).values({ status: "running" });
  return (result[0] as { insertId: number }).insertId ?? 0;
}

export async function completeSeoAuditRun(
  id: number,
  data: { errors: number; warnings: number; notices: number; totalIssues: number; rawData?: string }
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(seoAuditRuns)
    .set({ ...data, status: "completed", completedAt: new Date() })
    .where(eq(seoAuditRuns.id, id));
}

export async function failSeoAuditRun(id: number, errorMessage: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(seoAuditRuns)
    .set({ status: "failed", errorMessage, completedAt: new Date() })
    .where(eq(seoAuditRuns.id, id));
}

export async function getLatestSeoAuditRun(): Promise<SeoAuditRun | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(seoAuditRuns)
    .where(eq(seoAuditRuns.status, "completed"))
    .orderBy(desc(seoAuditRuns.createdAt)).limit(1);
  return rows[0];
}

export async function getSeoAuditRuns(limit = 10): Promise<SeoAuditRun[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(seoAuditRuns).orderBy(desc(seoAuditRuns.createdAt)).limit(limit);
}

export async function insertSeoAuditIssues(
  issues: Array<{
    runId: number;
    severity: "error" | "warning" | "notice";
    issueType: string;
    description: string;
    affectedPages: number;
    rawIssueData?: string;
  }>
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  if (issues.length === 0) return;
  await db.insert(seoAuditIssues).values(issues);
}

export async function getSeoAuditIssues(opts?: {
  runId?: number;
  severity?: "error" | "warning" | "notice";
  fixStatus?: string;
}): Promise<SeoAuditIssue[]> {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (opts?.runId) conditions.push(eq(seoAuditIssues.runId, opts.runId));
  if (opts?.severity) conditions.push(eq(seoAuditIssues.severity, opts.severity));
  if (opts?.fixStatus) conditions.push(eq(seoAuditIssues.fixStatus, opts.fixStatus as SeoAuditIssue["fixStatus"]));
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  return db.select().from(seoAuditIssues).where(where).orderBy(seoAuditIssues.severity, desc(seoAuditIssues.affectedPages));
}

export async function updateSeoAuditIssueAnalysis(
  id: number,
  data: { aiAnalysis?: string; suggestedFix?: string; fixStatus: SeoAuditIssue["fixStatus"] }
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(seoAuditIssues)
    .set({ ...data, aiAnalyzedAt: new Date() })
    .where(eq(seoAuditIssues.id, id));
}

export async function updateSeoAuditIssueStatus(
  id: number,
  fixStatus: SeoAuditIssue["fixStatus"],
  adminNotes?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(seoAuditIssues)
    .set({ fixStatus, adminNotes: adminNotes ?? null })
    .where(eq(seoAuditIssues.id, id));
}

export async function getSeoAuditConfig() {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(seoAuditConfig).limit(1);
  return rows[0] ?? null;
}

export async function upsertSeoAuditConfig(data: {
  scheduleCronTaskUid?: string | null;
  cronExpression?: string;
  enabled?: number;
}): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const existing = await getSeoAuditConfig();
  if (existing) {
    await db.update(seoAuditConfig).set(data).where(eq(seoAuditConfig.id, existing.id));
  } else {
    await db.insert(seoAuditConfig).values({
      cronExpression: data.cronExpression ?? "0 0 6 * * 1",
      enabled: data.enabled ?? 1,
      scheduleCronTaskUid: data.scheduleCronTaskUid ?? null,
    });
  }
}
