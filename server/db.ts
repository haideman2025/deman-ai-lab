import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  surveySubmissions, InsertSurveySubmission, SurveySubmission,
  brandProfiles, InsertBrandProfile, BrandProfile,
  executionPlans, InsertExecutionPlan, ExecutionPlan,
  tasks, InsertTask, Task,
  contentPieces, InsertContentPiece, ContentPiece,
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

// ─── SURVEY HELPERS ───────────────────────────────────────────

export async function createSurveySubmission(data: InsertSurveySubmission): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(surveySubmissions).values(data);
  return Number(result[0].insertId);
}

export async function getSurveysByUserId(userId: number): Promise<SurveySubmission[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(surveySubmissions).where(eq(surveySubmissions.userId, userId)).orderBy(desc(surveySubmissions.createdAt));
}

export async function getSurveyById(id: number): Promise<SurveySubmission | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(surveySubmissions).where(eq(surveySubmissions.id, id)).limit(1);
  return result[0];
}

export async function getAllSurveys(): Promise<SurveySubmission[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(surveySubmissions).orderBy(desc(surveySubmissions.createdAt));
}

// ─── BRAND PROFILE HELPERS ────────────────────────────────────

export async function createBrandProfile(data: InsertBrandProfile): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(brandProfiles).values(data);
  return Number(result[0].insertId);
}

export async function getBrandProfileBySurveyId(surveyId: number): Promise<BrandProfile | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(brandProfiles).where(eq(brandProfiles.surveyId, surveyId)).limit(1);
  return result[0];
}

export async function getBrandProfilesByUserId(userId: number): Promise<BrandProfile[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(brandProfiles).where(eq(brandProfiles.userId, userId)).orderBy(desc(brandProfiles.createdAt));
}

export async function getBrandProfileById(id: number): Promise<BrandProfile | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(brandProfiles).where(eq(brandProfiles.id, id)).limit(1);
  return result[0];
}

export async function updateBrandProfile(id: number, data: Partial<InsertBrandProfile>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(brandProfiles).set(data).where(eq(brandProfiles.id, id));
}

// ─── EXECUTION PLAN HELPERS ───────────────────────────────────

export async function createExecutionPlan(data: InsertExecutionPlan): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(executionPlans).values(data);
  return Number(result[0].insertId);
}

export async function getExecutionPlansByBrandId(brandProfileId: number): Promise<ExecutionPlan[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(executionPlans).where(eq(executionPlans.brandProfileId, brandProfileId)).orderBy(desc(executionPlans.createdAt));
}

export async function updateExecutionPlan(id: number, data: Partial<InsertExecutionPlan>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(executionPlans).set(data).where(eq(executionPlans.id, id));
}

// ─── TASK HELPERS ─────────────────────────────────────────────

export async function createTasks(data: InsertTask[]): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.length === 0) return;
  await db.insert(tasks).values(data);
}

export async function getTasksByPlanId(planId: number): Promise<Task[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tasks).where(eq(tasks.executionPlanId, planId));
}

export async function updateTask(id: number, data: Partial<InsertTask>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(tasks).set(data).where(eq(tasks.id, id));
}

// ─── CONTENT PIECE HELPERS ────────────────────────────────────

export async function createContentPiece(data: InsertContentPiece): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(contentPieces).values(data);
  return Number(result[0].insertId);
}

export async function getContentPiecesByBrandId(brandProfileId: number): Promise<ContentPiece[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contentPieces).where(eq(contentPieces.brandProfileId, brandProfileId)).orderBy(desc(contentPieces.createdAt));
}

export async function updateContentPiece(id: number, data: Partial<InsertContentPiece>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contentPieces).set(data).where(eq(contentPieces.id, id));
}
