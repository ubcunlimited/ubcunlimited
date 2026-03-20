import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  blogLeads,
  InsertBlogLead,
  InsertTestimonialSubmission,
  InsertUser,
  testimonialSubmissions,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
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
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
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

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

export async function insertBlogLead(lead: InsertBlogLead): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert blog lead: database not available");
    return;
  }
  await db.insert(blogLeads).values(lead);
}

// ─── Testimonial Submissions ──────────────────────────────────────────────────

export async function insertTestimonialSubmission(
  submission: InsertTestimonialSubmission
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot insert testimonial: database not available");
    return;
  }
  await db.insert(testimonialSubmissions).values(submission);
}

export async function getTestimonialSubmissions(
  status?: "pending" | "approved" | "rejected"
) {
  const db = await getDb();
  if (!db) return [];
  if (status) {
    return db
      .select()
      .from(testimonialSubmissions)
      .where(eq(testimonialSubmissions.status, status))
      .orderBy(testimonialSubmissions.createdAt);
  }
  return db
    .select()
    .from(testimonialSubmissions)
    .orderBy(testimonialSubmissions.createdAt);
}

export async function updateTestimonialStatus(
  id: number,
  status: "approved" | "rejected",
  adminNotes?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .update(testimonialSubmissions)
    .set({
      status,
      adminNotes: adminNotes ?? null,
      reviewedAt: new Date(),
    })
    .where(eq(testimonialSubmissions.id, id));
}
