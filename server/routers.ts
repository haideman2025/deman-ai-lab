import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { storagePut } from "./storage";
import {
  createSurveySubmission, getSurveyById, getSurveysByUserId, getAllSurveys,
  createBrandProfile, getBrandProfileBySurveyId, getBrandProfileById, getBrandProfilesByUserId, updateBrandProfile,
  createExecutionPlan, getExecutionPlansByBrandId, updateExecutionPlan,
  createTasks, getTasksByPlanId, getTasksByUserId, getTaskById, updateTask,
  createContentPiece, getContentPiecesByBrandId, getContentPiecesByUserId, getContentPieceById, updateContentPiece,
  createCalendarEvent, createCalendarEvents, getCalendarEventsByUserId, updateCalendarEvent, deleteCalendarEvent,
  createActivityLog, getActivityLogsByUserId,
  getDashboardStats,
} from "./db";
import { z } from "zod";
import { nanoid } from "nanoid";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── SURVEY ─────────────────────────────────────────────────
  survey: router({
    submit: publicProcedure
      .input(z.object({
        answers: z.any(),
        totalScore: z.number(),
        levelId: z.number(),
        levelName: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const answers = input.answers as Record<string, unknown>;
        const surveyId = await createSurveySubmission({
          userId: ctx.user?.id ?? null,
          fullName: (answers.fullName as string) || 'Anonymous',
          email: (answers.email as string) || '',
          phone: (answers.phone as string) || null,
          answers: input.answers,
          totalScore: input.totalScore,
          levelId: input.levelId,
          levelName: input.levelName,
        });
        return { surveyId };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getSurveyById(input.id);
      }),

    mySubmissions: protectedProcedure.query(async ({ ctx }) => {
      return getSurveysByUserId(ctx.user.id);
    }),

    // Admin: list all surveys
    listAll: adminProcedure.query(async () => {
      return getAllSurveys();
    }),
  }),

  // ─── BRAND PROFILE ──────────────────────────────────────────
  brand: router({
    create: publicProcedure
      .input(z.object({
        surveyId: z.number(),
        brandDNA: z.any(),
        roleMapping: z.any(),
        contentPillars: z.any(),
        channelStrategy: z.any(),
        serviceRecommendation: z.any(),
      }))
      .mutation(async ({ input, ctx }) => {
        const dna = input.brandDNA as Record<string, unknown>;
        const profileId = await createBrandProfile({
          surveyId: input.surveyId,
          userId: ctx.user?.id ?? null,
          archetype: (dna.archetype as string) || null,
          mission: (dna.mission as string) || null,
          coreFeeling: (dna.coreFeeling as string) || null,
          positioningStatement: (dna.positioningStatement as string) || null,
          brandDNA: input.brandDNA,
          roleMapping: input.roleMapping,
          contentPillars: input.contentPillars,
          channelStrategy: input.channelStrategy,
          serviceRecommendation: input.serviceRecommendation,
        });
        return { profileId };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getBrandProfileById(input.id);
      }),

    getBySurveyId: publicProcedure
      .input(z.object({ surveyId: z.number() }))
      .query(async ({ input }) => {
        return getBrandProfileBySurveyId(input.surveyId);
      }),

    myProfiles: protectedProcedure.query(async ({ ctx }) => {
      return getBrandProfilesByUserId(ctx.user.id);
    }),

    // Update brand identity (tone of voice, colors, etc.)
    updateIdentity: publicProcedure
      .input(z.object({
        id: z.number(),
        toneOfVoice: z.any().optional(),
        colorPalette: z.any().optional(),
        brandKeywords: z.any().optional(),
        avatarUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateBrandProfile(id, data);
        return { success: true };
      }),

    // Upload avatar/brand photo
    uploadPhoto: publicProcedure
      .input(z.object({
        brandProfileId: z.number(),
        base64: z.string(),
        mimeType: z.string(),
        fileName: z.string(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, 'base64');
        const key = `brand-photos/${input.brandProfileId}/${nanoid()}-${input.fileName}`;
        const { url } = await storagePut(key, buffer, input.mimeType);
        await updateBrandProfile(input.brandProfileId, { avatarUrl: url });
        return { url };
      }),
  }),

  // ─── EXECUTION PLAN ─────────────────────────────────────────
  plan: router({
    generate: publicProcedure
      .input(z.object({
        brandProfileId: z.number(),
        month: z.number().default(1),
      }))
      .mutation(async ({ input }) => {
        const profile = await getBrandProfileById(input.brandProfileId);
        if (!profile) throw new Error("Brand profile not found");

        const brandDNA = profile.brandDNA as Record<string, unknown>;
        const roleMapping = profile.roleMapping as Record<string, unknown>;
        const contentPillars = profile.contentPillars as unknown[];

        // Use LLM to generate a personalized 4-week execution plan
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `Bạn là AI Architect của DEMAN AI LAB — chuyên gia thiết kế chiến lược phát triển thương hiệu cá nhân × AI.
Hãy tạo kế hoạch thực thi chi tiết 4 tuần cho tháng ${input.month}, dựa trên brand DNA và chiến lược đã có.
Trả về JSON với format chính xác theo schema.`
            },
            {
              role: "user",
              content: `Brand DNA: ${JSON.stringify(brandDNA)}
Role Mapping: ${JSON.stringify(roleMapping)}
Content Pillars: ${JSON.stringify(contentPillars)}

Tạo kế hoạch 4 tuần với mỗi tuần có 5-7 nhiệm vụ cụ thể. Mỗi nhiệm vụ cần:
- title: tên nhiệm vụ ngắn gọn
- description: mô tả chi tiết
- category: content | branding | networking | learning | strategy
- estimatedMinutes: thời gian ước tính (phút)
- stepByStepGuide: mảng 3-5 bước hướng dẫn cụ thể
- aiPromptTemplate: prompt mẫu để dùng AI hỗ trợ (nếu có)`
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "execution_plan",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Tên kế hoạch tháng" },
                  goals: { type: "array", items: { type: "string" }, description: "3-5 mục tiêu chính" },
                  weeks: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        weekNumber: { type: "integer" },
                        theme: { type: "string" },
                        tasks: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              title: { type: "string" },
                              description: { type: "string" },
                              category: { type: "string", enum: ["content", "branding", "networking", "learning", "strategy"] },
                              day: { type: "integer" },
                              estimatedMinutes: { type: "integer" },
                              stepByStepGuide: { type: "array", items: { type: "string" } },
                              aiPromptTemplate: { type: "string" },
                            },
                            required: ["title", "description", "category", "day", "estimatedMinutes", "stepByStepGuide", "aiPromptTemplate"],
                            additionalProperties: false,
                          }
                        }
                      },
                      required: ["weekNumber", "theme", "tasks"],
                      additionalProperties: false,
                    }
                  }
                },
                required: ["title", "goals", "weeks"],
                additionalProperties: false,
              }
            }
          }
        });

        const planData = JSON.parse(response.choices[0].message.content as string);

        // Save execution plan
        const planId = await createExecutionPlan({
          brandProfileId: input.brandProfileId,
          userId: profile.userId,
          month: input.month,
          title: planData.title,
          status: "active",
          weeklyPlan: planData.weeks,
          goals: planData.goals,
        });

        // Save individual tasks
        const taskInserts = planData.weeks.flatMap((week: { weekNumber: number; tasks: Array<{ title: string; description: string; category: string; day: number; estimatedMinutes: number; stepByStepGuide: string[]; aiPromptTemplate: string }> }) =>
          week.tasks.map((task: { title: string; description: string; category: string; day: number; estimatedMinutes: number; stepByStepGuide: string[]; aiPromptTemplate: string }) => ({
            executionPlanId: planId,
            userId: profile.userId,
            title: task.title,
            description: task.description,
            category: task.category as "content" | "branding" | "networking" | "learning" | "strategy",
            week: week.weekNumber,
            day: task.day,
            status: "pending" as const,
            stepByStepGuide: task.stepByStepGuide,
            aiPromptTemplate: task.aiPromptTemplate,
            estimatedMinutes: task.estimatedMinutes,
          }))
        );

        await createTasks(taskInserts);

        return { planId, plan: planData };
      }),

    getByBrandId: publicProcedure
      .input(z.object({ brandProfileId: z.number() }))
      .query(async ({ input }) => {
        return getExecutionPlansByBrandId(input.brandProfileId);
      }),

    updateStatus: publicProcedure
      .input(z.object({ id: z.number(), status: z.enum(["draft", "active", "completed"]) }))
      .mutation(async ({ input }) => {
        await updateExecutionPlan(input.id, { status: input.status });
        return { success: true };
      }),
  }),

  // ─── TASKS ──────────────────────────────────────────────────
  task: router({
    getByPlanId: publicProcedure
      .input(z.object({ planId: z.number() }))
      .query(async ({ input }) => {
        return getTasksByPlanId(input.planId);
      }),

    updateStatus: publicProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "in_progress", "completed", "skipped"]),
      }))
      .mutation(async ({ input }) => {
        const data: Record<string, unknown> = { status: input.status };
        if (input.status === "completed") data.completedAt = new Date();
        await updateTask(input.id, data as Parameters<typeof updateTask>[1]);
        return { success: true };
      }),
  }),

  // ─── CONTENT STUDIO ─────────────────────────────────────────
  content: router({
    generate: publicProcedure
      .input(z.object({
        brandProfileId: z.number(),
        contentType: z.enum(["text_post", "image_prompt", "video_script", "carousel", "story"]),
        input: z.string(), // user's idea, voice-to-text, or simple thought
        platform: z.string().optional(),
        length: z.enum(["short", "medium", "long"]).optional(),
        taskId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const profile = await getBrandProfileById(input.brandProfileId);
        if (!profile) throw new Error("Brand profile not found");

        const brandDNA = profile.brandDNA as Record<string, unknown>;
        const toneOfVoice = profile.toneOfVoice as Record<string, unknown> | null;
        const contentPillars = profile.contentPillars as unknown[];

        let systemPrompt = `Bạn là AI Content Architect của DEMAN AI LAB. Nhiệm vụ: tạo nội dung thương hiệu cá nhân chất lượng cao.

BRAND DNA:
- Archetype: ${brandDNA?.archetype || 'Sage × Creator'}
- Mission: ${brandDNA?.mission || ''}
- Core Feeling: ${brandDNA?.coreFeeling || 'An Tâm & Khai Sáng'}
- Positioning: ${brandDNA?.positioningStatement || ''}

CONTENT PILLARS: ${JSON.stringify(contentPillars)}
${toneOfVoice ? `TONE OF VOICE: ${JSON.stringify(toneOfVoice)}` : ''}

FRAMEWORK LUÔN ÁP DỤNG:
1. Golden Circle (Why → How → What) chạy ngầm trong mọi nội dung
2. 3 Tầng Giá Trị: Kiến thức chuyên sâu + Thông tin độc đáo + Cảm xúc chạm người dùng
3. Storytelling: Hook mạnh → Conflict/Insight → Resolution → CTA

NGUYÊN TẮC:
- Viết từ trải nghiệm thực, không lý thuyết suông
- Mỗi bài phải có ít nhất 1 insight độc đáo
- Kết thúc bằng CTA rõ ràng hoặc câu hỏi mở
- Giữ nhất quán với brand voice đã thiết lập`;

        let userPrompt = '';

        if (input.contentType === 'text_post') {
          const lengthGuide = input.length === 'short' ? '100-200 từ' : input.length === 'long' ? '500-800 từ' : '200-400 từ';
          userPrompt = `Tạo bài đăng ${input.platform || 'Facebook'} (${lengthGuide}) từ ý tưởng sau:
"${input.input}"

Trả về JSON với: title, body (nội dung chính), hashtags (mảng 5-8 hashtags), hook (câu mở đầu thu hút), cta (call to action)`;
        } else if (input.contentType === 'image_prompt') {
          userPrompt = `Tạo prompt mô tả hình ảnh phù hợp với brand identity từ ý tưởng:
"${input.input}"

Trả về JSON với: prompt (mô tả chi tiết bằng tiếng Anh cho AI image generation), caption (chú thích tiếng Việt), style (phong cách hình ảnh)`;
        } else if (input.contentType === 'video_script') {
          userPrompt = `Tạo kịch bản video ngắn (60-90 giây) từ ý tưởng:
"${input.input}"

Trả về JSON với: hook (3 giây đầu), scenes (mảng các cảnh với voiceover + visual description), cta (kết thúc), music_mood (gợi ý nhạc nền)`;
        } else {
          userPrompt = `Tạo nội dung dạng ${input.contentType} từ ý tưởng:
"${input.input}"

Trả về JSON phù hợp với loại nội dung.`;
        }

        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        });

        let contentData: Record<string, unknown>;
        try {
          const raw = response.choices[0].message.content as string;
          // Try to extract JSON from markdown code blocks if present
          const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
          contentData = JSON.parse(jsonMatch ? jsonMatch[1] : raw);
        } catch {
          contentData = { body: response.choices[0].message.content as string };
        }

        const pieceId = await createContentPiece({
          brandProfileId: input.brandProfileId,
          userId: profile.userId,
          taskId: input.taskId ?? null,
          contentType: input.contentType,
          title: (contentData.title as string) || (contentData.hook as string) || 'Untitled',
          body: JSON.stringify(contentData),
          metadata: { platform: input.platform, length: input.length },
          status: "draft",
        });

        return { pieceId, content: contentData };
      }),

    // Generate image from prompt
    generateImage: publicProcedure
      .input(z.object({
        brandProfileId: z.number(),
        prompt: z.string(),
        taskId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const result = await generateImage({ prompt: input.prompt });
        if (!result.url) throw new Error("Image generation failed");

        const pieceId = await createContentPiece({
          brandProfileId: input.brandProfileId,
          userId: null,
          taskId: input.taskId ?? null,
          contentType: "image_prompt",
          title: input.prompt.substring(0, 100),
          body: input.prompt,
          imageUrl: result.url,
          status: "ready",
        });

        return { pieceId, imageUrl: result.url };
      }),

    getByBrandId: publicProcedure
      .input(z.object({ brandProfileId: z.number() }))
      .query(async ({ input }) => {
        return getContentPiecesByBrandId(input.brandProfileId);
      }),

    update: publicProcedure
      .input(z.object({
        id: z.number(),
        body: z.string().optional(),
        status: z.enum(["draft", "ready", "published"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateContentPiece(id, data);
        return { success: true };
      }),
  }),

  // ─── AI BRAND GUIDELINES GENERATOR ──────────────────────────
  ai: router({
    generateBrandGuidelines: publicProcedure
      .input(z.object({ brandProfileId: z.number() }))
      .mutation(async ({ input }) => {
        const profile = await getBrandProfileById(input.brandProfileId);
        if (!profile) throw new Error("Brand profile not found");

        const brandDNA = profile.brandDNA as Record<string, unknown>;
        const toneOfVoice = profile.toneOfVoice as Record<string, unknown> | null;
        const colorPalette = profile.colorPalette as Record<string, unknown> | null;
        const brandKeywords = profile.brandKeywords as string[] | null;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `Bạn là Brand Strategist AI. Hãy tạo Brand Guidelines hoàn chỉnh cho thương hiệu cá nhân dựa trên dữ liệu đã có.`
            },
            {
              role: "user",
              content: `Brand DNA: ${JSON.stringify(brandDNA)}
Tone of Voice: ${JSON.stringify(toneOfVoice)}
Color Palette: ${JSON.stringify(colorPalette)}
Brand Keywords: ${JSON.stringify(brandKeywords)}

Tạo brand guidelines bao gồm:
1. Brand Story (2-3 đoạn)
2. Visual Identity Guide (màu sắc, font gợi ý, phong cách hình ảnh)
3. Voice & Tone Guide (cách viết, từ ngữ nên/không nên dùng, ví dụ cụ thể)
4. Content Do's and Don'ts
5. Social Media Profile Recommendations (bio, avatar style, cover photo concept)

Trả về dạng Markdown.`
            }
          ],
        });

        const guidelines = response.choices[0].message.content as string;
        await updateBrandProfile(input.brandProfileId, { brandGuidelinesGenerated: { markdown: guidelines, generatedAt: new Date().toISOString() } });
        return { guidelines };
      }),

    // Enhance user input into full content
    enhanceIdea: publicProcedure
      .input(z.object({
        brandProfileId: z.number(),
        rawIdea: z.string(),
        targetFormat: z.enum(["post", "thread", "article", "caption"]),
      }))
      .mutation(async ({ input }) => {
        const profile = await getBrandProfileById(input.brandProfileId);
        if (!profile) throw new Error("Brand profile not found");

        const brandDNA = profile.brandDNA as Record<string, unknown>;

        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `Bạn là AI Content Architect. Biến ý tưởng thô thành nội dung hoàn chỉnh theo brand voice.
Brand: ${brandDNA?.archetype || 'Sage'} archetype. Core feeling: ${brandDNA?.coreFeeling || 'An Tâm & Khai Sáng'}.
Luôn áp dụng: Golden Circle + 3 Tầng Giá Trị + Storytelling framework.`
            },
            {
              role: "user",
              content: `Ý tưởng thô: "${input.rawIdea}"
Format: ${input.targetFormat}

Hãy phát triển thành nội dung hoàn chỉnh, giữ nguyên giọng nói và cá tính thương hiệu.`
            }
          ],
        });

        return { enhanced: response.choices[0].message.content as string };
      }),
  }),

  // ─── DASHBOARD ──────────────────────────────────────────────
  dashboard: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      return getDashboardStats(ctx.user.id);
    }),

    // Get user's full overview: latest brand, plan, tasks, content
    overview: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.user.id;
      const [brandProfiles, recentTasks, recentContent, recentActivity] = await Promise.all([
        getBrandProfilesByUserId(userId),
        getTasksByUserId(userId),
        getContentPiecesByUserId(userId),
        getActivityLogsByUserId(userId, 20),
      ]);
      return {
        brandProfile: brandProfiles[0] || null,
        recentTasks: recentTasks.slice(0, 10),
        pendingTasks: recentTasks.filter(t => t.status === 'pending' || t.status === 'in_progress').slice(0, 5),
        recentContent: recentContent.slice(0, 10),
        recentActivity,
        hasSurvey: brandProfiles.length > 0,
      };
    }),
  }),

  // ─── CALENDAR ──────────────────────────────────────────────
  calendar: router({
    getEvents: protectedProcedure
      .input(z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      }))
      .query(async ({ input, ctx }) => {
        const start = input.startDate ? new Date(input.startDate) : undefined;
        const end = input.endDate ? new Date(input.endDate) : undefined;
        return getCalendarEventsByUserId(ctx.user.id, start, end);
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        eventType: z.enum(["content", "task", "milestone", "custom"]),
        scheduledDate: z.string(),
        endDate: z.string().optional(),
        allDay: z.boolean().optional(),
        contentPieceId: z.number().optional(),
        taskId: z.number().optional(),
        executionPlanId: z.number().optional(),
        color: z.string().optional(),
        brandProfileId: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const eventId = await createCalendarEvent({
          userId: ctx.user.id,
          brandProfileId: input.brandProfileId ?? null,
          title: input.title,
          description: input.description ?? null,
          eventType: input.eventType,
          scheduledDate: new Date(input.scheduledDate),
          endDate: input.endDate ? new Date(input.endDate) : null,
          allDay: input.allDay ? 1 : 0,
          contentPieceId: input.contentPieceId ?? null,
          taskId: input.taskId ?? null,
          executionPlanId: input.executionPlanId ?? null,
          color: input.color ?? null,
          status: "scheduled",
        });

        // Log activity
        await createActivityLog({
          userId: ctx.user.id,
          action: "calendar_event_created",
          entityType: "calendar_event",
          entityId: eventId,
          title: `Đã tạo sự kiện: ${input.title}`,
        });

        return { eventId };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        scheduledDate: z.string().optional(),
        endDate: z.string().optional(),
        status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]).optional(),
        color: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updateData: Record<string, unknown> = {};
        if (data.title) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.scheduledDate) updateData.scheduledDate = new Date(data.scheduledDate);
        if (data.endDate) updateData.endDate = new Date(data.endDate);
        if (data.status) updateData.status = data.status;
        if (data.color) updateData.color = data.color;
        await updateCalendarEvent(id, updateData as Parameters<typeof updateCalendarEvent>[1]);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteCalendarEvent(input.id);
        return { success: true };
      }),

    // Auto-generate calendar events from execution plan tasks
    generateFromPlan: protectedProcedure
      .input(z.object({
        executionPlanId: z.number(),
        brandProfileId: z.number(),
        startDate: z.string(), // The Monday of week 1
      }))
      .mutation(async ({ input, ctx }) => {
        const planTasks = await getTasksByPlanId(input.executionPlanId);
        if (planTasks.length === 0) return { count: 0 };

        const startDate = new Date(input.startDate);
        const categoryColors: Record<string, string> = {
          content: "#00B4FF",
          branding: "#A855F7",
          networking: "#22C55E",
          learning: "#F59E0B",
          strategy: "#EF4444",
        };

        const events: Parameters<typeof createCalendarEvents>[0] = planTasks.map(task => {
          const dayOffset = ((task.week - 1) * 7) + (task.day ? task.day - 1 : 0);
          const eventDate = new Date(startDate);
          eventDate.setDate(eventDate.getDate() + dayOffset);

          return {
            userId: ctx.user.id,
            brandProfileId: input.brandProfileId,
            title: task.title,
            description: task.description,
            eventType: "task" as const,
            scheduledDate: eventDate,
            allDay: 1,
            taskId: task.id,
            executionPlanId: input.executionPlanId,
            color: categoryColors[task.category] || "#00B4FF",
            status: "scheduled" as const,
          };
        });

        await createCalendarEvents(events);

        await createActivityLog({
          userId: ctx.user.id,
          action: "calendar_generated",
          entityType: "execution_plan",
          entityId: input.executionPlanId,
          title: `Đã tạo ${events.length} sự kiện từ kế hoạch thực thi`,
        });

        return { count: events.length };
      }),
  }),

  // ─── ACTIVITY LOG ──────────────────────────────────────────
  activity: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(50) }))
      .query(async ({ input, ctx }) => {
        return getActivityLogsByUserId(ctx.user.id, input.limit);
      }),

    log: protectedProcedure
      .input(z.object({
        action: z.string(),
        entityType: z.string().optional(),
        entityId: z.number().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const logId = await createActivityLog({
          userId: ctx.user.id,
          action: input.action,
          entityType: input.entityType ?? null,
          entityId: input.entityId ?? null,
          title: input.title ?? null,
          description: input.description ?? null,
        });
        return { logId };
      }),
  }),
});

export type AppRouter = typeof appRouter;
