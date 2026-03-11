import { eq, desc, and, gte, lte, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  surveySubmissions, InsertSurveySubmission, SurveySubmission,
  brandProfiles, InsertBrandProfile, BrandProfile,
  executionPlans, InsertExecutionPlan, ExecutionPlan,
  tasks, InsertTask, Task,
  contentPieces, InsertContentPiece, ContentPiece,
  calendarEvents, InsertCalendarEvent, CalendarEvent,
  activityLogs, InsertActivityLog, ActivityLog,
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

export async function getTasksByUserId(userId: number): Promise<Task[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt));
}

export async function updateTask(id: number, data: Partial<InsertTask>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(tasks).set(data).where(eq(tasks.id, id));
}

export async function getTaskById(id: number): Promise<Task | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
  return result[0];
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

export async function getContentPiecesByUserId(userId: number): Promise<ContentPiece[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contentPieces).where(eq(contentPieces.userId, userId)).orderBy(desc(contentPieces.createdAt));
}

export async function getContentPieceById(id: number): Promise<ContentPiece | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contentPieces).where(eq(contentPieces.id, id)).limit(1);
  return result[0];
}

export async function updateContentPiece(id: number, data: Partial<InsertContentPiece>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contentPieces).set(data).where(eq(contentPieces.id, id));
}

// ─── CALENDAR EVENT HELPERS ──────────────────────────────────

export async function createCalendarEvent(data: InsertCalendarEvent): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(calendarEvents).values(data);
  return Number(result[0].insertId);
}

export async function createCalendarEvents(data: InsertCalendarEvent[]): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.length === 0) return;
  await db.insert(calendarEvents).values(data);
}

export async function getCalendarEventsByUserId(userId: number, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(calendarEvents.userId, userId)];
  if (startDate) conditions.push(gte(calendarEvents.scheduledDate, startDate));
  if (endDate) conditions.push(lte(calendarEvents.scheduledDate, endDate));
  return db.select().from(calendarEvents).where(and(...conditions)).orderBy(calendarEvents.scheduledDate);
}

export async function updateCalendarEvent(id: number, data: Partial<InsertCalendarEvent>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(calendarEvents).set(data).where(eq(calendarEvents.id, id));
}

export async function deleteCalendarEvent(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(calendarEvents).where(eq(calendarEvents.id, id));
}

// ─── ACTIVITY LOG HELPERS ────────────────────────────────────

export async function createActivityLog(data: InsertActivityLog): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(activityLogs).values(data);
  return Number(result[0].insertId);
}

export async function getActivityLogsByUserId(userId: number, limit = 50): Promise<ActivityLog[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(activityLogs).where(eq(activityLogs.userId, userId)).orderBy(desc(activityLogs.createdAt)).limit(limit);
}

// ─── DASHBOARD STATS HELPERS ─────────────────────────────────

export async function getDashboardStats(userId: number) {
  const db = await getDb();
  if (!db) return { totalTasks: 0, completedTasks: 0, totalContent: 0, totalEvents: 0, streak: 0 };

  const [taskStats] = await db
    .select({
      total: count(),
      completed: sql<number>`SUM(CASE WHEN ${tasks.status} = 'completed' THEN 1 ELSE 0 END)`,
    })
    .from(tasks)
    .where(eq(tasks.userId, userId));

  const [contentStats] = await db
    .select({ total: count() })
    .from(contentPieces)
    .where(eq(contentPieces.userId, userId));

  const [eventStats] = await db
    .select({ total: count() })
    .from(calendarEvents)
    .where(eq(calendarEvents.userId, userId));

  // Calculate streak: count consecutive days with completed tasks
  const recentCompletions = await db
    .select({ completedAt: tasks.completedAt })
    .from(tasks)
    .where(and(eq(tasks.userId, userId), eq(tasks.status, "completed")))
    .orderBy(desc(tasks.completedAt))
    .limit(90);

  let streak = 0;
  if (recentCompletions.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dates = new Set(
      recentCompletions
        .filter(r => r.completedAt)
        .map(r => {
          const d = new Date(r.completedAt!);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        })
    );
    const sortedDates = Array.from(dates).sort((a, b) => b - a);
    const DAY = 86400000;
    // Check if today or yesterday has activity
    if (sortedDates.length > 0 && (sortedDates[0] === today.getTime() || sortedDates[0] === today.getTime() - DAY)) {
      streak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        if (sortedDates[i] === sortedDates[i - 1] - DAY) {
          streak++;
        } else {
          break;
        }
      }
    }
  }

  return {
    totalTasks: taskStats?.total ?? 0,
    completedTasks: Number(taskStats?.completed ?? 0),
    totalContent: contentStats?.total ?? 0,
    totalEvents: eventStats?.total ?? 0,
    streak,
  };
}
