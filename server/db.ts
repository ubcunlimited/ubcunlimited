import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  blogLeads,
  InsertBlogLead,
  InsertLead,
  InsertTestimonialSubmission,
  leads,
  testimonialSubmissions,
} from "../drizzle/schema";

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

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function insertLead(lead: InsertLead): Promise<number> {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot insert lead: database not available"); return 0; }
  const result = await db.insert(leads).values(lead);
  return (result[0] as { insertId: number }).insertId ?? 0;
}
