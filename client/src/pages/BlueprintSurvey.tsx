import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Rocket,
  Sparkles,
  Target,
  User,
  Zap,
} from "lucide-react";

// ─── Survey Data ──────────────────────────────────────────────

interface SurveyOption {
  id: string;
  label: string;
  score: number;
  description?: string;
}

interface SurveyQuestion {
  id: string;
  question: string;
  type: "text" | "select" | "multiselect" | "textarea" | "scale";
  options?: SurveyOption[];
  placeholder?: string;
  required?: boolean;
}

interface SurveyStep {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  questions: SurveyQuestion[];
}

const surveySteps: SurveyStep[] = [
  {
    id: 1,
    title: "Bạn là ai?",
    subtitle: "Giúp chúng tôi hiểu bạn và vai trò hiện tại",
    icon: User,
    questions: [
      { id: "fullName", question: "Họ và tên", type: "text", placeholder: "Nguyễn Văn A", required: true },
      { id: "email", question: "Email", type: "text", placeholder: "email@example.com", required: true },
      { id: "phone", question: "Số điện thoại", type: "text", placeholder: "0901234567" },
      {
        id: "currentRole",
        question: "Vai trò hiện tại của bạn là gì?",
        type: "select",
        options: [
          { id: "founder", label: "Founder / CEO", score: 5 },
          { id: "manager", label: "Quản lý / Trưởng phòng", score: 4 },
          { id: "specialist", label: "Chuyên viên / Nhân viên", score: 3 },
          { id: "freelancer", label: "Freelancer / Tự do", score: 4 },
          { id: "student", label: "Sinh viên / Mới ra trường", score: 2 },
          { id: "career_change", label: "Đang chuyển đổi nghề nghiệp", score: 3 },
        ],
      },
      {
        id: "industry",
        question: "Lĩnh vực hoạt động",
        type: "select",
        options: [
          { id: "marketing", label: "Marketing / Truyền thông", score: 4 },
          { id: "tech", label: "Công nghệ / IT", score: 5 },
          { id: "education", label: "Giáo dục / Đào tạo", score: 4 },
          { id: "healthcare", label: "Y tế / Sức khỏe", score: 3 },
          { id: "finance", label: "Tài chính / Ngân hàng", score: 3 },
          { id: "ecommerce", label: "E-commerce / Bán hàng", score: 4 },
          { id: "creative", label: "Sáng tạo / Nghệ thuật", score: 4 },
          { id: "consulting", label: "Tư vấn / Coaching", score: 5 },
          { id: "other", label: "Khác", score: 3 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Thách thức & Nỗi đau",
    subtitle: "Những khó khăn bạn đang đối mặt trong sự nghiệp",
    icon: Target,
    questions: [
      {
        id: "challenges",
        question: "Thách thức lớn nhất của bạn hiện tại? (chọn tối đa 3)",
        type: "multiselect",
        options: [
          { id: "visibility", label: "Chưa được nhiều người biết đến", score: 3 },
          { id: "content", label: "Không biết tạo nội dung gì", score: 4 },
          { id: "consistency", label: "Không nhất quán trong xây dựng thương hiệu", score: 4 },
          { id: "time", label: "Thiếu thời gian cho personal branding", score: 3 },
          { id: "tech", label: "Không biết dùng AI hiệu quả", score: 5 },
          { id: "strategy", label: "Thiếu chiến lược rõ ràng", score: 5 },
          { id: "differentiation", label: "Khó tạo sự khác biệt", score: 4 },
          { id: "monetization", label: "Chưa biết cách kiếm tiền từ thương hiệu", score: 3 },
        ],
      },
      {
        id: "painDescription",
        question: "Mô tả cụ thể hơn về khó khăn bạn đang gặp",
        type: "textarea",
        placeholder: "Ví dụ: Tôi muốn xây dựng thương hiệu cá nhân nhưng không biết bắt đầu từ đâu, nội dung tạo ra không nhất quán...",
      },
    ],
  },
  {
    id: 3,
    title: "Năng lực & AI Readiness",
    subtitle: "Đánh giá mức độ sẵn sàng với AI",
    icon: Brain,
    questions: [
      {
        id: "aiExperience",
        question: "Bạn đã sử dụng AI trong công việc chưa?",
        type: "select",
        options: [
          { id: "none", label: "Chưa bao giờ", score: 1 },
          { id: "basic", label: "Đã dùng ChatGPT cơ bản", score: 2 },
          { id: "regular", label: "Dùng AI thường xuyên (ChatGPT, Midjourney...)", score: 4 },
          { id: "advanced", label: "Đã tích hợp AI vào quy trình làm việc", score: 5 },
        ],
      },
      {
        id: "contentSkill",
        question: "Khả năng tạo nội dung của bạn?",
        type: "select",
        options: [
          { id: "beginner", label: "Mới bắt đầu, chưa có kinh nghiệm", score: 1 },
          { id: "basic", label: "Viết được nhưng chưa chuyên nghiệp", score: 2 },
          { id: "intermediate", label: "Tạo nội dung đều đặn, có engagement", score: 4 },
          { id: "expert", label: "Content creator chuyên nghiệp", score: 5 },
        ],
      },
      {
        id: "brandingSkill",
        question: "Kinh nghiệm xây dựng thương hiệu cá nhân?",
        type: "select",
        options: [
          { id: "none", label: "Chưa có thương hiệu cá nhân", score: 1 },
          { id: "basic", label: "Có profile nhưng chưa chiến lược", score: 2 },
          { id: "developing", label: "Đang xây dựng, có một số followers", score: 3 },
          { id: "established", label: "Đã có thương hiệu được công nhận", score: 5 },
        ],
      },
      {
        id: "strengths",
        question: "Điểm mạnh nổi bật của bạn? (chọn tối đa 3)",
        type: "multiselect",
        options: [
          { id: "expertise", label: "Kiến thức chuyên sâu trong lĩnh vực", score: 5 },
          { id: "communication", label: "Kỹ năng giao tiếp / thuyết trình", score: 4 },
          { id: "creativity", label: "Tư duy sáng tạo", score: 4 },
          { id: "analytical", label: "Phân tích & chiến lược", score: 4 },
          { id: "network", label: "Mạng lưới quan hệ rộng", score: 3 },
          { id: "tech_savvy", label: "Nhanh nhạy với công nghệ", score: 5 },
          { id: "storytelling", label: "Kể chuyện / Storytelling", score: 5 },
          { id: "leadership", label: "Lãnh đạo / Dẫn dắt", score: 4 },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Mục tiêu 3-5 năm",
    subtitle: "Tầm nhìn phát triển sự nghiệp của bạn",
    icon: Rocket,
    questions: [
      {
        id: "careerGoal",
        question: "Mục tiêu sự nghiệp trong 3-5 năm tới?",
        type: "select",
        options: [
          { id: "thought_leader", label: "Trở thành thought leader trong ngành", score: 5 },
          { id: "business_growth", label: "Phát triển doanh nghiệp / startup", score: 4 },
          { id: "career_advance", label: "Thăng tiến trong tổ chức", score: 3 },
          { id: "freelance_scale", label: "Scale freelance / consulting", score: 4 },
          { id: "community", label: "Xây dựng cộng đồng / giáo dục", score: 5 },
          { id: "transition", label: "Chuyển đổi sang lĩnh vực AI", score: 5 },
        ],
      },
      {
        id: "incomeGoal",
        question: "Mục tiêu thu nhập từ thương hiệu cá nhân?",
        type: "select",
        options: [
          { id: "none", label: "Chưa có mục tiêu cụ thể", score: 1 },
          { id: "side", label: "Thu nhập phụ (5-20 triệu/tháng)", score: 2 },
          { id: "main", label: "Thu nhập chính (20-50 triệu/tháng)", score: 4 },
          { id: "premium", label: "Thu nhập cao (50-200 triệu/tháng)", score: 5 },
          { id: "enterprise", label: "Xây dựng doanh nghiệp (200 triệu+)", score: 5 },
        ],
      },
      {
        id: "visionDescription",
        question: "Mô tả tầm nhìn của bạn trong 3-5 năm tới",
        type: "textarea",
        placeholder: "Ví dụ: Tôi muốn trở thành chuyên gia tư vấn AI Marketing hàng đầu Việt Nam, xây dựng cộng đồng 10,000 thành viên...",
      },
    ],
  },
  {
    id: 5,
    title: "Sứ mệnh & Giá trị",
    subtitle: "Điều gì thực sự quan trọng với bạn",
    icon: Sparkles,
    questions: [
      {
        id: "coreValues",
        question: "Giá trị cốt lõi của bạn? (chọn tối đa 3)",
        type: "multiselect",
        options: [
          { id: "authenticity", label: "Chân thực — Luôn là chính mình", score: 5 },
          { id: "innovation", label: "Đổi mới — Tiên phong thử nghiệm", score: 5 },
          { id: "impact", label: "Tác động — Tạo giá trị cho cộng đồng", score: 5 },
          { id: "excellence", label: "Xuất sắc — Luôn nâng cao chất lượng", score: 4 },
          { id: "empathy", label: "Đồng cảm — Hiểu và phục vụ người khác", score: 4 },
          { id: "freedom", label: "Tự do — Độc lập trong sáng tạo", score: 4 },
          { id: "growth", label: "Phát triển — Không ngừng học hỏi", score: 4 },
          { id: "collaboration", label: "Hợp tác — Cùng nhau đi xa hơn", score: 3 },
        ],
      },
      {
        id: "missionStatement",
        question: "Nếu phải tóm gọn sứ mệnh của bạn trong 1 câu, đó là gì?",
        type: "textarea",
        placeholder: "Ví dụ: Giúp doanh nghiệp Việt tận dụng AI để phát triển bền vững và nhân văn",
      },
      {
        id: "uniqueInsight",
        question: "Điều gì khiến bạn khác biệt so với người khác trong ngành?",
        type: "textarea",
        placeholder: "Ví dụ: Tôi kết hợp kinh nghiệm 10 năm marketing truyền thống với AI, tạo ra phương pháp riêng...",
      },
      {
        id: "aiTransformVision",
        question: "Bạn muốn AI giúp bạn thay đổi điều gì nhất?",
        type: "select",
        options: [
          { id: "content", label: "Tạo nội dung nhanh hơn, chất lượng hơn", score: 4 },
          { id: "strategy", label: "Xây dựng chiến lược thông minh hơn", score: 5 },
          { id: "automation", label: "Tự động hóa quy trình làm việc", score: 4 },
          { id: "creativity", label: "Mở rộng khả năng sáng tạo", score: 5 },
          { id: "reach", label: "Tiếp cận nhiều người hơn", score: 3 },
          { id: "monetization", label: "Tạo nguồn thu nhập mới", score: 4 },
        ],
      },
    ],
  },
];

// ─── Level System ─────────────────────────────────────────────

interface Level {
  id: number;
  name: string;
  range: [number, number];
  color: string;
  description: string;
  emoji: string;
}

const levels: Level[] = [
  { id: 1, name: "Khám Phá", range: [0, 30], color: "#94a3b8", description: "Bạn đang ở giai đoạn khám phá — đây là bước đầu tiên tuyệt vời!", emoji: "🌱" },
  { id: 2, name: "Nền Tảng", range: [31, 50], color: "#22d3ee", description: "Bạn đã có nền tảng tốt, cần chiến lược rõ ràng hơn", emoji: "🏗️" },
  { id: 3, name: "Tăng Tốc", range: [51, 70], color: "#3b82f6", description: "Bạn sẵn sàng tăng tốc — AI sẽ là đòn bẩy mạnh mẽ!", emoji: "🚀" },
  { id: 4, name: "Chuyên Gia", range: [71, 85], color: "#8b5cf6", description: "Bạn đã có nền tảng vững chắc — hãy để AI nâng tầm!", emoji: "⭐" },
  { id: 5, name: "Dẫn Dắt", range: [86, 100], color: "#f59e0b", description: "Bạn là người dẫn dắt — AI sẽ giúp bạn scale lên tầm mới!", emoji: "👑" },
];

function getLevel(score: number): Level {
  return levels.find((l) => score >= l.range[0] && score <= l.range[1]) || levels[0];
}

// ─── Component ────────────────────────────────────────────────

export default function BlueprintSurvey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [surveyResult, setSurveyResult] = useState<{ surveyId: number; score: number; level: Level } | null>(null);
  const [, setLocation] = useLocation();

  const submitMutation = trpc.survey.submit.useMutation();

  const step = surveySteps[currentStep];
  const totalSteps = surveySteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Calculate score
  const totalScore = useMemo(() => {
    let score = 0;
    let maxScore = 0;
    surveySteps.forEach((s) => {
      s.questions.forEach((q) => {
        if (q.type === "select" && q.options) {
          maxScore += 5;
          const val = answers[q.id] as string;
          const opt = q.options.find((o) => o.id === val);
          if (opt) score += opt.score;
        } else if (q.type === "multiselect" && q.options) {
          maxScore += 15; // max 3 * 5
          const vals = (answers[q.id] as string[]) || [];
          vals.forEach((v) => {
            const opt = q.options!.find((o) => o.id === v);
            if (opt) score += opt.score;
          });
        } else if (q.type === "textarea") {
          maxScore += 5;
          const val = answers[q.id] as string;
          if (val && val.length > 20) score += 5;
          else if (val && val.length > 0) score += 2;
        }
      });
    });
    return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  }, [answers]);

  const canProceed = useMemo(() => {
    if (!step) return false;
    return step.questions.every((q) => {
      if (!q.required && q.type !== "select" && q.type !== "multiselect") return true;
      const val = answers[q.id];
      if (q.type === "select") return !!val;
      if (q.type === "multiselect") return Array.isArray(val) && val.length > 0;
      if (q.required) return !!val;
      return true;
    });
  }, [step, answers]);

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleMultiSelect = (questionId: string, optionId: string, maxSelect = 3) => {
    setAnswers((prev) => {
      const current = (prev[questionId] as string[]) || [];
      if (current.includes(optionId)) {
        return { ...prev, [questionId]: current.filter((id) => id !== optionId) };
      }
      if (current.length >= maxSelect) return prev;
      return { ...prev, [questionId]: [...current, optionId] };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const level = getLevel(totalScore);
      const result = await submitMutation.mutateAsync({
        answers,
        totalScore,
        levelId: level.id,
        levelName: level.name,
      });
      setSurveyResult({ surveyId: result.surveyId, score: totalScore, level });
      setShowResults(true);
    } catch (err) {
      console.error("Survey submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Results Screen ─────────────────────────────────────────
  if (showResults && surveyResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Score circle */}
          <div className="relative mx-auto w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-border/30" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={surveyResult.level.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(surveyResult.score / 100) * 327} 327`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-display font-bold" style={{ color: surveyResult.level.color }}>
                {surveyResult.score}
              </span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>

          {/* Level badge */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-3"
              style={{ backgroundColor: `${surveyResult.level.color}20`, color: surveyResult.level.color }}
            >
              <span className="text-lg">{surveyResult.level.emoji}</span>
              Level {surveyResult.level.id}: {surveyResult.level.name}
            </div>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">{surveyResult.level.description}</p>
          </div>

          {/* CTA */}
          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={() => setLocation(`/blueprint/dashboard`)}
            >
              <Sparkles className="w-4 h-4" />
              Vào Dashboard cá nhân
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2"
              onClick={() => setLocation(`/blueprint/strategy?surveyId=${surveyResult.surveyId}`)}
            >
              <Brain className="w-4 h-4" />
              Tạo Bản Vẽ Chiến Lược ngay
            </Button>
            <p className="text-xs text-muted-foreground">
              Dashboard sẽ là trung tâm quản lý toàn bộ hành trình xây dựng thương hiệu của bạn
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Survey Form ────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with progress */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/30">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {step && <step.icon className="w-5 h-5 text-primary" />}
              <div>
                <h2 className="font-display font-bold text-sm">{step?.title}</h2>
                <p className="text-xs text-muted-foreground">{step?.subtitle}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {currentStep + 1}/{totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8 space-y-8">
        {step?.questions.map((q) => (
          <div key={q.id} className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              {q.question}
              {q.required && <span className="text-destructive ml-1">*</span>}
            </label>

            {q.type === "text" && (
              <Input
                value={(answers[q.id] as string) || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                placeholder={q.placeholder}
                className="bg-card/50"
              />
            )}

            {q.type === "textarea" && (
              <Textarea
                value={(answers[q.id] as string) || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
                placeholder={q.placeholder}
                rows={4}
                className="bg-card/50 resize-none"
              />
            )}

            {q.type === "select" && q.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const selected = answers[q.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswer(q.id, opt.id)}
                      className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30 hover:bg-card/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selected ? "border-primary bg-primary" : "border-muted-foreground/30"
                          }`}
                        >
                          {selected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <span className="text-sm">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {q.type === "multiselect" && q.options && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground mb-2">Chọn tối đa 3</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt) => {
                    const selected = ((answers[q.id] as string[]) || []).includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleMultiSelect(q.id, opt.id)}
                        className={`text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                          selected
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30 hover:bg-card/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
                              selected ? "border-primary bg-primary" : "border-muted-foreground/30"
                            }`}
                          >
                            {selected && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <span className="text-sm">{opt.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border/30">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Button>

          <div className="flex items-center gap-2">
            {/* Step dots */}
            {surveySteps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentStep ? "bg-primary" : i < currentStep ? "bg-primary/40" : "bg-border"
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps - 1 ? (
            <Button
              size="sm"
              onClick={() => setCurrentStep((s) => s + 1)}
              disabled={!canProceed}
              className="gap-1"
            >
              Tiếp theo <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed}
              className="gap-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang xử lý...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" /> Hoàn thành
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
