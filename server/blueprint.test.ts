import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock DB helpers ─────────────────────────────────────────
vi.mock("./db", () => ({
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  createSurveySubmission: vi.fn().mockResolvedValue(42),
  getSurveyById: vi.fn().mockResolvedValue({
    id: 42,
    userId: null,
    fullName: "Test User",
    email: "test@example.com",
    phone: null,
    answers: {
      fullName: "Test User",
      email: "test@example.com",
      currentRole: "founder",
      industry: "marketing",
      challenges: ["visibility", "content_quality"],
      strengths: ["expertise", "communication"],
      coreValues: ["authenticity", "innovation"],
      careerGoal: "thought_leader",
      aiExperience: "regular",
      missionStatement: "Giúp doanh nghiệp Việt tận dụng AI",
      uniqueInsight: "10 năm kinh nghiệm marketing + AI",
      aiTransformVision: "strategy",
    },
    totalScore: 65,
    levelId: 3,
    levelName: "Tăng Tốc",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getSurveysByUserId: vi.fn().mockResolvedValue([]),
  getAllSurveys: vi.fn().mockResolvedValue([]),
  createBrandProfile: vi.fn().mockResolvedValue(10),
  getBrandProfileBySurveyId: vi.fn().mockResolvedValue(null),
  getBrandProfileById: vi.fn().mockResolvedValue({
    id: 10,
    surveyId: 42,
    userId: null,
    archetype: "The Sage × Creator",
    mission: "Giúp doanh nghiệp Việt tận dụng AI",
    coreFeeling: "Chân Thực & Khai Sáng",
    positioningStatement: "Test positioning",
    brandDNA: {
      archetype: "The Sage × Creator",
      mission: "Giúp doanh nghiệp Việt tận dụng AI",
      coreFeeling: "Chân Thực & Khai Sáng",
    },
    toneOfVoice: { formalCasual: 50, seriousPlayful: 40 },
    colorPalette: { primary: "#00B4FF", secondary: "#7B2FBE" },
    brandKeywords: ["AI", "Marketing"],
    avatarUrl: null,
    brandGuidelinesGenerated: null,
    roleMapping: { currentRole: "Founder", aiEnhancedRole: "AI-Powered CEO" },
    contentPillars: [{ name: "Kiến Thức Chuyên Sâu" }],
    channelStrategy: { primary: "LinkedIn" },
    serviceRecommendation: { tier: "AI Foundation" },
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  getBrandProfilesByUserId: vi.fn().mockResolvedValue([]),
  updateBrandProfile: vi.fn().mockResolvedValue(undefined),
  createExecutionPlan: vi.fn().mockResolvedValue(5),
  getExecutionPlansByBrandId: vi.fn().mockResolvedValue([]),
  updateExecutionPlan: vi.fn().mockResolvedValue(undefined),
  createTasks: vi.fn().mockResolvedValue(undefined),
  getTasksByPlanId: vi.fn().mockResolvedValue([]),
  updateTask: vi.fn().mockResolvedValue(undefined),
  createContentPiece: vi.fn().mockResolvedValue(100),
  getContentPiecesByBrandId: vi.fn().mockResolvedValue([]),
  updateContentPiece: vi.fn().mockResolvedValue(undefined),
  createCalendarEvent: vi.fn().mockResolvedValue(99),
  createCalendarEvents: vi.fn().mockResolvedValue(undefined),
  getCalendarEventsByUserId: vi.fn().mockResolvedValue([]),
  updateCalendarEvent: vi.fn().mockResolvedValue(undefined),
  deleteCalendarEvent: vi.fn().mockResolvedValue(undefined),
  createActivityLog: vi.fn().mockResolvedValue(55),
  getActivityLogsByUserId: vi.fn().mockResolvedValue([]),
  getDashboardStats: vi.fn().mockResolvedValue({
    totalTasks: 10,
    completedTasks: 5,
    totalContent: 8,
    totalEvents: 3,
    streak: 2,
  }),
  getTasksByUserId: vi.fn().mockResolvedValue([]),
  getTaskById: vi.fn().mockResolvedValue(null),
  getContentPiecesByUserId: vi.fn().mockResolvedValue([]),
  getContentPieceById: vi.fn().mockResolvedValue(null),
}));

// Mock LLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: JSON.stringify({
            title: "Kế hoạch tháng 1",
            goals: ["Goal 1", "Goal 2"],
            weeks: [
              {
                weekNumber: 1,
                theme: "Khởi động",
                tasks: [
                  {
                    title: "Task 1",
                    description: "Desc 1",
                    category: "content",
                    day: 1,
                    estimatedMinutes: 30,
                    stepByStepGuide: ["Step 1", "Step 2"],
                    aiPromptTemplate: "Prompt template",
                  },
                ],
              },
            ],
          }),
        },
      },
    ],
  }),
}));

// Mock image generation
vi.mock("./_core/imageGeneration", () => ({
  generateImage: vi.fn().mockResolvedValue({ url: "https://example.com/image.png" }),
}));

// Mock storage
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://example.com/uploaded.png", key: "test-key" }),
}));

// ─── Context helpers ─────────────────────────────────────────

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ─── Tests ───────────────────────────────────────────────────

describe("survey routes", () => {
  it("submit creates a survey and returns surveyId", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.survey.submit({
      answers: {
        fullName: "Test User",
        email: "test@example.com",
        currentRole: "founder",
        industry: "marketing",
      },
      totalScore: 65,
      levelId: 3,
      levelName: "Tăng Tốc",
    });
    expect(result).toEqual({ surveyId: 42 });
  });

  it("getById returns survey data", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.survey.getById({ id: 42 });
    expect(result).toBeDefined();
    expect(result?.id).toBe(42);
    expect(result?.fullName).toBe("Test User");
    expect(result?.totalScore).toBe(65);
  });

  it("listAll requires admin role", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.survey.listAll()).rejects.toThrow();
  });

  it("listAll works for admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.survey.listAll();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("brand routes", () => {
  it("create brand profile returns profileId", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.brand.create({
      surveyId: 42,
      brandDNA: {
        archetype: "The Sage × Creator",
        mission: "Test mission",
        coreFeeling: "Chân Thực & Khai Sáng",
        positioningStatement: "Test positioning",
        uniqueValue: "Test value",
        brandPersonality: ["Chân thực"],
      },
      roleMapping: { currentRole: "Founder", aiEnhancedRole: "AI-Powered CEO" },
      contentPillars: [{ name: "Kiến Thức Chuyên Sâu" }],
      channelStrategy: { primary: "LinkedIn" },
      serviceRecommendation: { tier: "AI Foundation" },
    });
    expect(result).toEqual({ profileId: 10 });
  });

  it("getById returns brand profile", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.brand.getById({ id: 10 });
    expect(result).toBeDefined();
    expect(result?.archetype).toBe("The Sage × Creator");
  });

  it("getBySurveyId returns null when no profile exists", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.brand.getBySurveyId({ surveyId: 42 });
    expect(result).toBeNull();
  });

  it("updateIdentity updates tone and colors", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.brand.updateIdentity({
      id: 10,
      toneOfVoice: { formalCasual: 70, seriousPlayful: 30 },
      colorPalette: { primary: "#FF0000" },
      brandKeywords: ["AI", "Sáng tạo"],
    });
    expect(result).toEqual({ success: true });
  });

  it("myProfiles requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.brand.myProfiles()).rejects.toThrow();
  });

  it("myProfiles works for authenticated user", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    const result = await caller.brand.myProfiles();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("plan routes", () => {
  it("generate creates an execution plan with LLM", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.plan.generate({
      brandProfileId: 10,
      month: 1,
    });
    expect(result.planId).toBe(5);
    expect(result.plan).toBeDefined();
    expect(result.plan.title).toBe("Kế hoạch tháng 1");
    expect(result.plan.weeks).toHaveLength(1);
  });

  it("getByBrandId returns plans array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.plan.getByBrandId({ brandProfileId: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("updateStatus updates plan status", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.plan.updateStatus({ id: 5, status: "completed" });
    expect(result).toEqual({ success: true });
  });
});

describe("task routes", () => {
  it("getByPlanId returns tasks array", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.task.getByPlanId({ planId: 5 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("updateStatus updates task status", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.task.updateStatus({ id: 1, status: "completed" });
    expect(result).toEqual({ success: true });
  });

  it("updateStatus sets completedAt for completed tasks", async () => {
    const { updateTask } = await import("./db");
    const caller = appRouter.createCaller(createPublicContext());
    await caller.task.updateStatus({ id: 1, status: "completed" });
    expect(updateTask).toHaveBeenCalledWith(1, expect.objectContaining({
      status: "completed",
      completedAt: expect.any(Date),
    }));
  });
});

describe("content routes", () => {
  it("generate creates content with LLM", async () => {
    // Re-mock LLM for content generation (returns markdown-wrapped JSON)
    const { invokeLLM } = await import("./_core/llm");
    (invokeLLM as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: JSON.stringify({
              title: "Test Post",
              body: "Content body",
              hashtags: ["#AI", "#Marketing"],
              hook: "Hook line",
              cta: "Follow me",
            }),
          },
        },
      ],
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.content.generate({
      brandProfileId: 10,
      contentType: "text_post",
      input: "Chia sẻ về AI trong marketing",
      platform: "Facebook",
      length: "medium",
    });
    expect(result.pieceId).toBe(100);
    expect(result.content).toBeDefined();
  });

  it("generateImage creates an image and content piece", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.content.generateImage({
      brandProfileId: 10,
      prompt: "A professional brand image",
    });
    expect(result.pieceId).toBe(100);
    expect(result.imageUrl).toBe("https://example.com/image.png");
  });

  it("getByBrandId returns content pieces", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.content.getByBrandId({ brandProfileId: 10 });
    expect(Array.isArray(result)).toBe(true);
  });

  it("update changes content piece", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.content.update({
      id: 100,
      body: "Updated content",
      status: "ready",
    });
    expect(result).toEqual({ success: true });
  });
});

describe("dashboard routes", () => {
  it("stats requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.dashboard.stats()).rejects.toThrow();
  });

  it("stats returns dashboard data for authenticated user", async () => {
    const { getDashboardStats } = await import("./db");
    (getDashboardStats as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      totalTasks: 10,
      completedTasks: 5,
      totalContent: 8,
      totalEvents: 3,
      streak: 2,
    });
    const caller = appRouter.createCaller(createAuthContext());
    const result = await caller.dashboard.stats();
    expect(result).toBeDefined();
    expect(result.totalTasks).toBe(10);
    expect(result.completedTasks).toBe(5);
    expect(result.streak).toBe(2);
  });

  it("overview requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.dashboard.overview()).rejects.toThrow();
  });
});

describe("calendar routes", () => {
  it("getEvents requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.calendar.getEvents({ startDate: new Date().toISOString(), endDate: new Date().toISOString() })
    ).rejects.toThrow();
  });

  it("create requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.calendar.create({
        title: "Test event",
        eventType: "content",
        scheduledDate: new Date().toISOString(),
      })
    ).rejects.toThrow();
  });

  it("create event works for authenticated user", async () => {
    const { createCalendarEvent } = await import("./db");
    (createCalendarEvent as ReturnType<typeof vi.fn>).mockResolvedValueOnce(99);
    const caller = appRouter.createCaller(createAuthContext());
    const result = await caller.calendar.create({
      title: "Test event",
      eventType: "content",
      scheduledDate: new Date().toISOString(),
    });
    expect(result.eventId).toBe(99);
  });

  it("delete requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.calendar.delete({ id: 1 })).rejects.toThrow();
  });
});

describe("activity routes", () => {
  it("list requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.activity.list({})).rejects.toThrow();
  });

  it("log requires authentication", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.activity.log({ action: "test_action", entityType: "task", title: "Test" })
    ).rejects.toThrow();
  });

  it("log creates activity for authenticated user", async () => {
    const { createActivityLog } = await import("./db");
    (createActivityLog as ReturnType<typeof vi.fn>).mockResolvedValueOnce(55);
    const caller = appRouter.createCaller(createAuthContext());
    const result = await caller.activity.log({
      action: "task_completed",
      entityType: "task",
      entityId: 1,
      title: "Completed a task",
    });
    expect(result.logId).toBe(55);
  });
});

describe("ai routes", () => {
  it("generateBrandGuidelines creates guidelines markdown", async () => {
    const { invokeLLM } = await import("./_core/llm");
    (invokeLLM as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "# Brand Guidelines\n\n## Brand Story\nTest brand story...",
          },
        },
      ],
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.ai.generateBrandGuidelines({ brandProfileId: 10 });
    expect(result.guidelines).toContain("Brand Guidelines");
  });

  it("enhanceIdea transforms raw idea into content", async () => {
    const { invokeLLM } = await import("./_core/llm");
    (invokeLLM as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: "Enhanced content based on the idea...",
          },
        },
      ],
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.ai.enhanceIdea({
      brandProfileId: 10,
      rawIdea: "AI thay đổi marketing",
      targetFormat: "post",
    });
    expect(result.enhanced).toBeDefined();
    expect(typeof result.enhanced).toBe("string");
  });
});
