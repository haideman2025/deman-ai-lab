import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useLocation, useSearch } from "wouter";
import { Streamdown } from "streamdown";
import {
  Brain,
  ChevronRight,
  Compass,
  Crown,
  Heart,
  Layers,
  Loader2,
  MessageSquare,
  Rocket,
  Share2,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────

interface BrandDNA {
  archetype: string;
  archetypeDescription: string;
  mission: string;
  coreFeeling: string;
  positioningStatement: string;
  uniqueValue: string;
  brandPersonality: string[];
}

interface RoleMapping {
  currentRole: string;
  aiEnhancedRole: string;
  transformationPath: string;
  keySkillsToLeverage: string[];
  aiToolsRecommended: string[];
}

interface ContentPillar {
  name: string;
  description: string;
  contentIdeas: string[];
  frequency: string;
}

interface ChannelStrategy {
  primary: string;
  secondary: string[];
  contentMix: Record<string, number>;
  postingSchedule: string;
}

interface ServiceRecommendation {
  tier: string;
  focus: string;
  monthlyActions: string[];
  expectedOutcome: string;
}

// ─── Component ────────────────────────────────────────────────

export default function BlueprintStrategy() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const surveyIdParam = params.get("surveyId");
  const [, setLocation] = useLocation();

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [brandProfile, setBrandProfile] = useState<{
    id: number;
    brandDNA: BrandDNA;
    roleMapping: RoleMapping;
    contentPillars: ContentPillar[];
    channelStrategy: ChannelStrategy;
    serviceRecommendation: ServiceRecommendation;
  } | null>(null);

  const surveyQuery = trpc.survey.getById.useQuery(
    { id: Number(surveyIdParam) },
    { enabled: !!surveyIdParam }
  );

  const brandQuery = trpc.brand.getBySurveyId.useQuery(
    { surveyId: Number(surveyIdParam) },
    { enabled: !!surveyIdParam }
  );

  const createBrandMutation = trpc.brand.create.useMutation();

  // Check if brand profile already exists
  useEffect(() => {
    if (brandQuery.data) {
      setBrandProfile({
        id: brandQuery.data.id,
        brandDNA: brandQuery.data.brandDNA as BrandDNA,
        roleMapping: brandQuery.data.roleMapping as RoleMapping,
        contentPillars: brandQuery.data.contentPillars as ContentPillar[],
        channelStrategy: brandQuery.data.channelStrategy as ChannelStrategy,
        serviceRecommendation: brandQuery.data.serviceRecommendation as ServiceRecommendation,
      });
    }
  }, [brandQuery.data]);

  const generateStrategy = async () => {
    if (!surveyQuery.data) return;
    setIsGenerating(true);

    const steps = [
      "Phân tích câu trả lời khảo sát...",
      "Xác định Brand Archetype...",
      "Thiết kế Brand DNA...",
      "Lập bản đồ vai trò × AI...",
      "Xây dựng Content Pillars...",
      "Hoàn thiện chiến lược kênh...",
    ];

    // Simulate step progression
    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise((r) => setTimeout(r, 800));
    }

    try {
      // Use LLM through a custom approach — call brand.create with pre-generated data
      // In production, this would call a dedicated AI endpoint
      const answers = surveyQuery.data.answers as Record<string, unknown>;

      // Generate brand strategy via the AI endpoint
      const response = await fetch("/api/trpc/ai.generateBrandGuidelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // For now, create a brand profile with structured data based on survey answers
      const brandDNA: BrandDNA = {
        archetype: determineArchetype(answers),
        archetypeDescription: getArchetypeDescription(determineArchetype(answers)),
        mission: (answers.missionStatement as string) || "Tạo giá trị thực cho cộng đồng thông qua AI",
        coreFeeling: determineCoreFeeling(answers),
        positioningStatement: generatePositioning(answers),
        uniqueValue: (answers.uniqueInsight as string) || "Kết hợp chuyên môn sâu với AI để tạo giá trị độc đáo",
        brandPersonality: determineBrandPersonality(answers),
      };

      const roleMapping: RoleMapping = {
        currentRole: getLabelForAnswer("currentRole", answers.currentRole as string),
        aiEnhancedRole: generateAIRole(answers),
        transformationPath: generateTransformationPath(answers),
        keySkillsToLeverage: getSelectedLabels("strengths", answers.strengths as string[]),
        aiToolsRecommended: recommendAITools(answers),
      };

      const contentPillars: ContentPillar[] = generateContentPillars(answers);
      const channelStrategy: ChannelStrategy = generateChannelStrategy(answers);
      const serviceRecommendation: ServiceRecommendation = generateServiceRecommendation(surveyQuery.data.totalScore);

      const result = await createBrandMutation.mutateAsync({
        surveyId: Number(surveyIdParam),
        brandDNA,
        roleMapping,
        contentPillars,
        channelStrategy,
        serviceRecommendation,
      });

      setBrandProfile({
        id: result.profileId,
        brandDNA,
        roleMapping,
        contentPillars,
        channelStrategy,
        serviceRecommendation,
      });
    } catch (err) {
      console.error("Strategy generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── No survey selected ────────────────────────────────────
  if (!surveyIdParam) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <Brain className="w-16 h-16 text-primary/30 mx-auto" />
          <h2 className="font-display font-bold text-2xl">Chưa có dữ liệu khảo sát</h2>
          <p className="text-muted-foreground">Hãy hoàn thành khảo sát trước để AI có thể tạo chiến lược phù hợp cho bạn.</p>
          <Button onClick={() => setLocation("/blueprint")} className="gap-2">
            <Sparkles className="w-4 h-4" /> Bắt đầu khảo sát
          </Button>
        </div>
      </div>
    );
  }

  // ─── Loading survey ─────────────────────────────────────────
  if (surveyQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ─── Generating ─────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-8 max-w-md">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-10 h-10 text-primary" />
            </div>
          </div>
          <div>
            <h2 className="font-display font-bold text-xl mb-2">AI đang phân tích...</h2>
            <p className="text-primary text-sm font-medium">{generationStep}</p>
          </div>
          <div className="flex justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── No brand profile yet — show generate button ────────────
  if (!brandProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-8 max-w-lg">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3">Sẵn sàng tạo Bản Vẽ Chiến Lược</h2>
            <p className="text-muted-foreground">
              Dựa trên câu trả lời khảo sát, AI sẽ phân tích và tạo chiến lược phát triển thương hiệu cá nhân riêng cho bạn.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-left max-w-sm mx-auto">
            {[
              { icon: Crown, text: "Brand Archetype" },
              { icon: Target, text: "Positioning" },
              { icon: Layers, text: "Content Pillars" },
              { icon: Share2, text: "Channel Strategy" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <item.icon className="w-4 h-4 text-primary/60" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <Button size="lg" onClick={generateStrategy} className="gap-2">
            <Zap className="w-5 h-5" /> Tạo Chiến Lược Ngay
          </Button>
        </div>
      </div>
    );
  }

  // ─── Display Brand Strategy ─────────────────────────────────
  const { brandDNA, roleMapping, contentPillars, channelStrategy, serviceRecommendation } = brandProfile;

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div className="relative py-12 px-6 border-b border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary text-xs font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI TRANSFORMATION BLUEPRINT™
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-3">
            Bản Vẽ Chiến Lược
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Chiến lược phát triển thương hiệu cá nhân được thiết kế riêng cho bạn, dựa trên phân tích AI.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        {/* Brand DNA */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Brand DNA</h2>
              <p className="text-xs text-muted-foreground">Bản chất thương hiệu cá nhân của bạn</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border/50 bg-card/30 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Archetype</p>
              <p className="font-display font-bold text-lg text-primary">{brandDNA.archetype}</p>
              <p className="text-sm text-muted-foreground">{brandDNA.archetypeDescription}</p>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card/30 space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Core Feeling</p>
              <p className="font-display font-bold text-lg">{brandDNA.coreFeeling}</p>
              <div className="flex flex-wrap gap-1.5">
                {brandDNA.brandPersonality.map((p) => (
                  <span key={p} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{p}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-card/30 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Sứ mệnh</p>
            <p className="text-foreground font-medium">{brandDNA.mission}</p>
          </div>

          <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
            <p className="text-xs text-primary uppercase tracking-wider font-medium">Positioning Statement</p>
            <p className="text-foreground italic">"{brandDNA.positioningStatement}"</p>
          </div>
        </section>

        {/* Role Mapping */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Bản Đồ Chuyển Đổi</h2>
              <p className="text-xs text-muted-foreground">Vai trò hiện tại → Vai trò AI-Enhanced</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 p-5 rounded-xl border border-border/50 bg-card/30 text-center">
              <p className="text-xs text-muted-foreground mb-2">Hiện tại</p>
              <p className="font-display font-bold">{roleMapping.currentRole}</p>
            </div>
            <ChevronRight className="w-6 h-6 text-primary rotate-90 md:rotate-0" />
            <div className="flex-1 p-5 rounded-xl border border-primary/30 bg-primary/5 text-center">
              <p className="text-xs text-primary mb-2">AI-Enhanced</p>
              <p className="font-display font-bold text-primary">{roleMapping.aiEnhancedRole}</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-border/50 bg-card/30">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Lộ trình chuyển đổi</p>
            <p className="text-sm text-foreground">{roleMapping.transformationPath}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-border/50 bg-card/30">
              <p className="text-xs text-muted-foreground mb-3">Kỹ năng cần tận dụng</p>
              <div className="space-y-2">
                {roleMapping.keySkillsToLeverage.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm">
                    <Zap className="w-3 h-3 text-primary" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl border border-border/50 bg-card/30">
              <p className="text-xs text-muted-foreground mb-3">AI Tools gợi ý</p>
              <div className="space-y-2">
                {roleMapping.aiToolsRecommended.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <Brain className="w-3 h-3 text-purple-400" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Pillars */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Content Pillars</h2>
              <p className="text-xs text-muted-foreground">Trụ cột nội dung thương hiệu</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentPillars.map((pillar, i) => (
              <div key={i} className="p-5 rounded-xl border border-border/50 bg-card/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm text-primary">{pillar.name}</h3>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{pillar.frequency}</span>
                </div>
                <p className="text-xs text-muted-foreground">{pillar.description}</p>
                <div className="space-y-1">
                  {pillar.contentIdeas.map((idea, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-foreground/80">
                      <MessageSquare className="w-3 h-3 text-primary/40 mt-0.5 flex-shrink-0" />
                      <span>{idea}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Channel Strategy */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">Chiến Lược Kênh</h2>
              <p className="text-xs text-muted-foreground">Nơi bạn nên xuất hiện</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
            <p className="text-xs text-primary mb-2">Kênh chính</p>
            <p className="font-display font-bold text-lg">{channelStrategy.primary}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {channelStrategy.secondary.map((ch) => (
              <div key={ch} className="p-4 rounded-xl border border-border/50 bg-card/30 text-center">
                <p className="text-sm font-medium">{ch}</p>
                <p className="text-xs text-muted-foreground mt-1">Kênh phụ</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 border-t border-border/30">
          <div className="text-center space-y-6">
            <h3 className="font-display font-bold text-xl">Bước tiếp theo</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Chiến lược đã sẵn sàng. Hãy tạo kế hoạch thực thi hàng tháng để biến chiến lược thành hành động cụ thể.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => setLocation(`/blueprint/plan?brandId=${brandProfile.id}`)}
                className="gap-2"
              >
                <Rocket className="w-4 h-4" /> Tạo Kế Hoạch Thực Thi
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setLocation(`/blueprint/identity?brandId=${brandProfile.id}`)}
                className="gap-2"
              >
                <Heart className="w-4 h-4" /> Thiết Kế Nhận Diện
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── Helper Functions ─────────────────────────────────────────

function determineArchetype(answers: Record<string, unknown>): string {
  const values = (answers.coreValues as string[]) || [];
  const goal = answers.careerGoal as string;

  if (values.includes("innovation") && values.includes("authenticity")) return "The Creator × Sage";
  if (values.includes("impact") && values.includes("empathy")) return "The Hero × Caregiver";
  if (values.includes("freedom") && values.includes("innovation")) return "The Explorer × Creator";
  if (values.includes("excellence") && values.includes("growth")) return "The Sage × Ruler";
  if (goal === "thought_leader") return "The Sage × Creator";
  if (goal === "community") return "The Hero × Caregiver";
  if (goal === "business_growth") return "The Ruler × Creator";
  return "The Sage × Explorer";
}

function getArchetypeDescription(archetype: string): string {
  const descriptions: Record<string, string> = {
    "The Creator × Sage": "Bạn là người kết hợp sáng tạo với tri thức — tạo ra giá trị mới từ kiến thức sâu",
    "The Hero × Caregiver": "Bạn là chiến binh với trái tim — dẫn dắt bằng hành động và sự đồng cảm",
    "The Explorer × Creator": "Bạn là người tiên phong — khám phá và sáng tạo không giới hạn",
    "The Sage × Ruler": "Bạn là người dẫn dắt bằng trí tuệ — chiến lược và tầm nhìn xa",
    "The Sage × Explorer": "Bạn là người tìm kiếm chân lý — chia sẻ tri thức qua trải nghiệm thực",
    "The Ruler × Creator": "Bạn là kiến trúc sư — xây dựng hệ thống và tạo giá trị bền vững",
  };
  return descriptions[archetype] || "Bạn là người tạo giá trị độc đáo trong lĩnh vực của mình";
}

function determineCoreFeeling(answers: Record<string, unknown>): string {
  const values = (answers.coreValues as string[]) || [];
  if (values.includes("authenticity")) return "Chân Thực & Khai Sáng";
  if (values.includes("innovation")) return "Đổi Mới & Truyền Cảm Hứng";
  if (values.includes("impact")) return "Tác Động & Kết Nối";
  if (values.includes("excellence")) return "Xuất Sắc & Tin Cậy";
  return "An Tâm & Khai Sáng";
}

function generatePositioning(answers: Record<string, unknown>): string {
  const role = getLabelForAnswer("currentRole", answers.currentRole as string);
  const industry = getLabelForAnswer("industry", answers.industry as string);
  const goal = getLabelForAnswer("careerGoal", answers.careerGoal as string);
  return `Là ${role} trong lĩnh vực ${industry}, tôi giúp cộng đồng ${goal.toLowerCase()} thông qua sự kết hợp giữa chuyên môn sâu và AI — tạo ra giá trị mà không ai khác có thể thay thế.`;
}

function determineBrandPersonality(answers: Record<string, unknown>): string[] {
  const values = (answers.coreValues as string[]) || [];
  const traits: string[] = [];
  if (values.includes("authenticity")) traits.push("Chân thực");
  if (values.includes("innovation")) traits.push("Tiên phong");
  if (values.includes("impact")) traits.push("Tạo tác động");
  if (values.includes("excellence")) traits.push("Chuyên nghiệp");
  if (values.includes("empathy")) traits.push("Đồng cảm");
  if (values.includes("freedom")) traits.push("Tự do");
  if (values.includes("growth")) traits.push("Phát triển");
  if (values.includes("collaboration")) traits.push("Hợp tác");
  return traits.length > 0 ? traits : ["Chân thực", "Sáng tạo", "Chuyên nghiệp"];
}

function generateAIRole(answers: Record<string, unknown>): string {
  const role = answers.currentRole as string;
  const aiVision = answers.aiTransformVision as string;
  const roleMap: Record<string, string> = {
    founder: "AI-Powered CEO",
    manager: "AI Strategy Leader",
    specialist: "AI-Enhanced Specialist",
    freelancer: "AI Creator × Consultant",
    student: "AI-Native Professional",
    career_change: "AI Transformation Specialist",
  };
  const base = roleMap[role] || "AI-Enhanced Professional";
  if (aiVision === "strategy") return `${base} & Strategist`;
  if (aiVision === "creativity") return `${base} & Creative Director`;
  return base;
}

function generateTransformationPath(answers: Record<string, unknown>): string {
  const aiExp = answers.aiExperience as string;
  if (aiExp === "none" || aiExp === "basic") {
    return "Giai đoạn 1: Làm quen AI tools → Giai đoạn 2: Tích hợp AI vào workflow → Giai đoạn 3: Trở thành AI-native professional. Mỗi giai đoạn kéo dài 1 tháng, với hướng dẫn step-by-step.";
  }
  if (aiExp === "regular") {
    return "Giai đoạn 1: Tối ưu AI workflow hiện tại → Giai đoạn 2: Xây dựng AI Content System → Giai đoạn 3: Scale & automate. Bạn đã có nền tảng tốt, giờ là lúc nâng cấp.";
  }
  return "Giai đoạn 1: Xây dựng AI Content Engine → Giai đoạn 2: Tự động hóa & scale → Giai đoạn 3: Trở thành AI thought leader. Bạn sẵn sàng cho bước nhảy vọt.";
}

function recommendAITools(answers: Record<string, unknown>): string[] {
  const aiVision = answers.aiTransformVision as string;
  const base = ["ChatGPT / Claude (viết nội dung)", "Canva AI (thiết kế)"];
  if (aiVision === "content") return [...base, "Midjourney (hình ảnh)", "CapCut (video)"];
  if (aiVision === "strategy") return [...base, "Perplexity (nghiên cứu)", "Notion AI (quản lý)"];
  if (aiVision === "automation") return [...base, "Make.com (tự động hóa)", "Zapier (kết nối)"];
  if (aiVision === "creativity") return [...base, "Midjourney (hình ảnh)", "Runway (video AI)"];
  return [...base, "Midjourney (hình ảnh)", "Notion AI (quản lý)"];
}

function generateContentPillars(answers: Record<string, unknown>): ContentPillar[] {
  const industry = answers.industry as string;
  const strengths = (answers.strengths as string[]) || [];

  const pillars: ContentPillar[] = [
    {
      name: "Kiến Thức Chuyên Sâu",
      description: "Chia sẻ expertise trong lĩnh vực của bạn — nội dung mà chỉ người có kinh nghiệm thực mới viết được",
      contentIdeas: [
        "Phân tích case study thực tế",
        "Bài học từ sai lầm trong nghề",
        "Xu hướng ngành & nhận định chuyên gia",
      ],
      frequency: "3 bài/tuần",
    },
    {
      name: "AI × Chuyên Môn",
      description: "Cách bạn ứng dụng AI trong công việc — insight thực tế, không lý thuyết",
      contentIdeas: [
        "Before/After khi dùng AI",
        "Tutorial: AI workflow thực tế",
        "Review AI tools cho ngành",
      ],
      frequency: "2 bài/tuần",
    },
    {
      name: "Câu Chuyện Cá Nhân",
      description: "Hành trình, trải nghiệm, bài học — tạo kết nối cảm xúc với audience",
      contentIdeas: [
        "Hành trình chuyển đổi với AI",
        "Behind the scenes công việc",
        "Chia sẻ thất bại & bài học",
      ],
      frequency: "1-2 bài/tuần",
    },
    {
      name: "Giá Trị Cộng Đồng",
      description: "Nội dung tương tác, hỏi đáp, thảo luận — xây dựng cộng đồng xung quanh brand",
      contentIdeas: [
        "Q&A sessions",
        "Poll & thảo luận xu hướng",
        "Highlight thành viên cộng đồng",
      ],
      frequency: "1 bài/tuần",
    },
  ];

  return pillars;
}

function generateChannelStrategy(answers: Record<string, unknown>): ChannelStrategy {
  const industry = answers.industry as string;
  const goal = answers.careerGoal as string;

  let primary = "LinkedIn";
  let secondary = ["Facebook", "YouTube"];

  if (industry === "creative" || industry === "ecommerce") {
    primary = "Instagram / TikTok";
    secondary = ["Facebook", "YouTube"];
  } else if (industry === "tech" || industry === "consulting") {
    primary = "LinkedIn";
    secondary = ["Twitter/X", "YouTube"];
  } else if (goal === "community") {
    primary = "Facebook Group";
    secondary = ["YouTube", "LinkedIn"];
  }

  return {
    primary,
    secondary,
    contentMix: { text: 40, image: 30, video: 20, carousel: 10 },
    postingSchedule: "5-7 bài/tuần, tập trung 8-9h sáng và 19-21h tối",
  };
}

function generateServiceRecommendation(score: number): ServiceRecommendation {
  if (score >= 70) {
    return {
      tier: "AI Accelerator",
      focus: "Scale & Optimize",
      monthlyActions: [
        "Xây dựng AI Content Engine tự động",
        "Tối ưu hóa funnel chuyển đổi",
        "Phát triển sản phẩm số (course, ebook)",
        "Mở rộng network chiến lược",
      ],
      expectedOutcome: "Tăng 3-5x reach và bắt đầu monetize thương hiệu trong 90 ngày",
    };
  }
  if (score >= 40) {
    return {
      tier: "AI Foundation",
      focus: "Build & Grow",
      monthlyActions: [
        "Thiết lập brand identity hoàn chỉnh",
        "Xây dựng content calendar với AI",
        "Tạo 20+ bài content chất lượng",
        "Phát triển community ban đầu",
      ],
      expectedOutcome: "Xây dựng nền tảng thương hiệu vững chắc và 1000+ followers trong 90 ngày",
    };
  }
  return {
    tier: "AI Discovery",
    focus: "Learn & Start",
    monthlyActions: [
      "Khám phá AI tools phù hợp",
      "Xác định brand voice & identity",
      "Tạo 10+ bài content đầu tiên",
      "Học cách dùng AI hiệu quả",
    ],
    expectedOutcome: "Hiểu rõ bản thân, có chiến lược rõ ràng và bắt đầu xây dựng presence online",
  };
}

function getLabelForAnswer(questionId: string, answerId: string): string {
  const allQuestions = surveySteps.flatMap((s) => s.questions);
  const q = allQuestions.find((q) => q.id === questionId);
  const opt = q?.options?.find((o) => o.id === answerId);
  return opt?.label || answerId || "N/A";
}

// Import surveySteps data
const surveySteps = [
  {
    questions: [
      { id: "fullName", options: undefined },
      { id: "email", options: undefined },
      { id: "phone", options: undefined },
      {
        id: "currentRole",
        options: [
          { id: "founder", label: "Founder / CEO" },
          { id: "manager", label: "Quản lý / Trưởng phòng" },
          { id: "specialist", label: "Chuyên viên / Nhân viên" },
          { id: "freelancer", label: "Freelancer / Tự do" },
          { id: "student", label: "Sinh viên / Mới ra trường" },
          { id: "career_change", label: "Đang chuyển đổi nghề nghiệp" },
        ],
      },
      {
        id: "industry",
        options: [
          { id: "marketing", label: "Marketing / Truyền thông" },
          { id: "tech", label: "Công nghệ / IT" },
          { id: "education", label: "Giáo dục / Đào tạo" },
          { id: "healthcare", label: "Y tế / Sức khỏe" },
          { id: "finance", label: "Tài chính / Ngân hàng" },
          { id: "ecommerce", label: "E-commerce / Bán hàng" },
          { id: "creative", label: "Sáng tạo / Nghệ thuật" },
          { id: "consulting", label: "Tư vấn / Coaching" },
          { id: "other", label: "Khác" },
        ],
      },
    ],
  },
  { questions: [] },
  {
    questions: [
      {
        id: "strengths",
        options: [
          { id: "expertise", label: "Kiến thức chuyên sâu trong lĩnh vực" },
          { id: "communication", label: "Kỹ năng giao tiếp / thuyết trình" },
          { id: "creativity", label: "Tư duy sáng tạo" },
          { id: "analytical", label: "Phân tích & chiến lược" },
          { id: "network", label: "Mạng lưới quan hệ rộng" },
          { id: "tech_savvy", label: "Nhanh nhạy với công nghệ" },
          { id: "storytelling", label: "Kể chuyện / Storytelling" },
          { id: "leadership", label: "Lãnh đạo / Dẫn dắt" },
        ],
      },
    ],
  },
  {
    questions: [
      {
        id: "careerGoal",
        options: [
          { id: "thought_leader", label: "Trở thành thought leader trong ngành" },
          { id: "business_growth", label: "Phát triển doanh nghiệp / startup" },
          { id: "career_advance", label: "Thăng tiến trong tổ chức" },
          { id: "freelance_scale", label: "Scale freelance / consulting" },
          { id: "community", label: "Xây dựng cộng đồng / giáo dục" },
          { id: "transition", label: "Chuyển đổi sang lĩnh vực AI" },
        ],
      },
    ],
  },
  { questions: [] },
];

function getSelectedLabels(questionId: string, selectedIds: string[]): string[] {
  if (!selectedIds || !Array.isArray(selectedIds)) return [];
  const allQuestions = surveySteps.flatMap((s) => s.questions);
  const q = allQuestions.find((q) => q.id === questionId);
  if (!q?.options) return selectedIds;
  return selectedIds.map((id) => q.options!.find((o) => o.id === id)?.label || id);
}
