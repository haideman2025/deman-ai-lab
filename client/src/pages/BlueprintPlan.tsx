import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { useSearch } from "wouter";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Loader2,
  Play,
  Rocket,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────

interface TaskData {
  id: number;
  title: string;
  description: string | null;
  category: string;
  week: number;
  day: number | null;
  status: string;
  stepByStepGuide: string[] | null;
  aiPromptTemplate: string | null;
  estimatedMinutes: number | null;
  completedAt: Date | null;
}

interface WeekPlan {
  weekNumber: number;
  theme: string;
  tasks: TaskData[];
}

// ─── Component ────────────────────────────────────────────────

export default function BlueprintPlan() {
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const brandIdParam = params.get("brandId");
  const brandId = brandIdParam ? Number(brandIdParam) : null;

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const plansQuery = trpc.plan.getByBrandId.useQuery(
    { brandProfileId: brandId! },
    { enabled: !!brandId }
  );

  const generateMutation = trpc.plan.generate.useMutation();
  const updateTaskMutation = trpc.task.updateStatus.useMutation();

  const currentPlan = plansQuery.data?.[0];

  const tasksQuery = trpc.task.getByPlanId.useQuery(
    { planId: currentPlan?.id! },
    { enabled: !!currentPlan?.id }
  );

  const tasks = (tasksQuery.data || []) as TaskData[];

  // Group tasks by week
  const weeklyTasks = useMemo(() => {
    const weeks: Record<number, TaskData[]> = { 1: [], 2: [], 3: [], 4: [] };
    tasks.forEach((t) => {
      if (weeks[t.week]) weeks[t.week].push(t);
    });
    return weeks;
  }, [tasks]);

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleGenerate = async () => {
    if (!brandId) return;
    setIsGenerating(true);
    try {
      await generateMutation.mutateAsync({ brandProfileId: brandId, month: 1 });
      plansQuery.refetch();
    } catch (err) {
      console.error("Plan generation error:", err);
      toast.error("Không thể tạo kế hoạch. Vui lòng thử lại.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTaskStatusChange = async (taskId: number, newStatus: "pending" | "in_progress" | "completed" | "skipped") => {
    try {
      await updateTaskMutation.mutateAsync({ id: taskId, status: newStatus });
      tasksQuery.refetch();
    } catch (err) {
      console.error("Task update error:", err);
    }
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Đã copy AI prompt!");
  };

  const categoryColors: Record<string, { bg: string; text: string }> = {
    content: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
    branding: { bg: "bg-purple-500/10", text: "text-purple-400" },
    networking: { bg: "bg-green-500/10", text: "text-green-400" },
    learning: { bg: "bg-amber-500/10", text: "text-amber-400" },
    strategy: { bg: "bg-blue-500/10", text: "text-blue-400" },
  };

  const categoryLabels: Record<string, string> = {
    content: "Nội dung",
    branding: "Thương hiệu",
    networking: "Kết nối",
    learning: "Học hỏi",
    strategy: "Chiến lược",
  };

  // ─── No brand ID ────────────────────────────────────────────
  if (!brandId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <Calendar className="w-16 h-16 text-primary/30 mx-auto" />
          <h2 className="font-display font-bold text-2xl">Chưa có chiến lược</h2>
          <p className="text-muted-foreground">Hãy hoàn thành khảo sát và tạo chiến lược trước khi lập kế hoạch thực thi.</p>
        </div>
      </div>
    );
  }

  // ─── Generating ─────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <div>
            <h2 className="font-display font-bold text-xl mb-2">AI đang tạo kế hoạch...</h2>
            <p className="text-muted-foreground text-sm">Thiết kế 4 tuần hành động cụ thể cho bạn</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── No plan yet ────────────────────────────────────────────
  if (!currentPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-8 max-w-lg">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl mb-3">Tạo Kế Hoạch Thực Thi</h2>
            <p className="text-muted-foreground">
              AI sẽ tạo kế hoạch 4 tuần chi tiết với nhiệm vụ hàng ngày, hướng dẫn từng bước, và prompt AI sẵn sàng sử dụng.
            </p>
          </div>
          <Button size="lg" onClick={handleGenerate} className="gap-2">
            <Sparkles className="w-5 h-5" /> Tạo Kế Hoạch Tháng 1
          </Button>
        </div>
      </div>
    );
  }

  // ─── Plan View ──────────────────────────────────────────────
  const weekGoals = (currentPlan.goals as string[]) || [];
  const weekPlan = (currentPlan.weeklyPlan as WeekPlan[]) || [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border/30 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-primary text-xs font-medium mb-3">
            <Calendar className="w-4 h-4" />
            KẾ HOẠCH THỰC THI — THÁNG {currentPlan.month}
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl mb-4">
            {currentPlan.title || "Kế Hoạch Thực Thi"}
          </h1>

          {/* Progress */}
          <div className="flex items-center gap-4 mb-4">
            <Progress value={progressPercent} className="flex-1 h-2" />
            <span className="text-sm font-mono text-muted-foreground">
              {completedTasks}/{totalTasks} ({progressPercent}%)
            </span>
          </div>

          {/* Goals */}
          {weekGoals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {weekGoals.map((goal, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/30">
                  <Target className="w-3 h-3 text-primary" />
                  {goal}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Week tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((week) => {
            const weekTaskCount = weeklyTasks[week]?.length || 0;
            const weekCompleted = weeklyTasks[week]?.filter((t) => t.status === "completed").length || 0;
            const theme = weekPlan.find((w) => w.weekNumber === week)?.theme || `Tuần ${week}`;

            return (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`flex-shrink-0 px-5 py-3 rounded-xl border transition-all ${
                  selectedWeek === week
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30"
                }`}
              >
                <div className="text-left">
                  <p className="text-xs font-medium">Tuần {week}</p>
                  <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{theme}</p>
                  <p className="text-[10px] mt-1">
                    <span className="text-primary">{weekCompleted}</span>/{weekTaskCount}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tasks list */}
        <div className="space-y-3">
          {(weeklyTasks[selectedWeek] || []).map((task) => {
            const isExpanded = expandedTask === task.id;
            const catColor = categoryColors[task.category] || categoryColors.content;
            const isCompleted = task.status === "completed";
            const isInProgress = task.status === "in_progress";

            return (
              <div
                key={task.id}
                className={`rounded-xl border transition-all ${
                  isCompleted
                    ? "border-green-500/20 bg-green-500/5"
                    : isInProgress
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/50 bg-card/30"
                }`}
              >
                {/* Task header */}
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedTask(isExpanded ? null : task.id)}>
                  {/* Status button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCompleted) {
                        handleTaskStatusChange(task.id, "pending");
                      } else {
                        handleTaskStatusChange(task.id, "completed");
                      }
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isCompleted
                        ? "border-green-500 bg-green-500"
                        : isInProgress
                        ? "border-primary bg-primary/20"
                        : "border-muted-foreground/30 hover:border-primary"
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                    {isInProgress && <Play className="w-3 h-3 text-primary" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`text-sm font-medium truncate ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] ${catColor.bg} ${catColor.text} border-0`}>
                        {categoryLabels[task.category] || task.category}
                      </Badge>
                      {task.estimatedMinutes && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {task.estimatedMinutes} phút
                        </span>
                      )}
                      {task.day && (
                        <span className="text-[10px] text-muted-foreground">
                          Ngày {task.day}
                        </span>
                      )}
                    </div>
                  </div>

                  {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 border-t border-border/20 space-y-4">
                    {/* Description */}
                    {task.description && (
                      <p className="text-sm text-muted-foreground pt-3">{task.description}</p>
                    )}

                    {/* Step by step guide */}
                    {task.stepByStepGuide && task.stepByStepGuide.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-primary" /> Hướng dẫn từng bước
                        </p>
                        <div className="space-y-2 pl-1">
                          {task.stepByStepGuide.map((step, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Prompt */}
                    {task.aiPromptTemplate && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Prompt sẵn sàng
                        </p>
                        <div className="relative bg-muted/30 rounded-lg p-3 border border-border/30">
                          <p className="text-xs text-muted-foreground pr-8 whitespace-pre-wrap">{task.aiPromptTemplate}</p>
                          <button
                            onClick={() => copyPrompt(task.aiPromptTemplate!)}
                            className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-accent/50 transition-colors"
                            title="Copy prompt"
                          >
                            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      {!isCompleted && !isInProgress && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTaskStatusChange(task.id, "in_progress")}
                          className="gap-1 text-xs"
                        >
                          <Play className="w-3 h-3" /> Bắt đầu
                        </Button>
                      )}
                      {isInProgress && (
                        <Button
                          size="sm"
                          onClick={() => handleTaskStatusChange(task.id, "completed")}
                          className="gap-1 text-xs"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Hoàn thành
                        </Button>
                      )}
                      {!isCompleted && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTaskStatusChange(task.id, "skipped")}
                          className="text-xs text-muted-foreground"
                        >
                          Bỏ qua
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {(weeklyTasks[selectedWeek] || []).length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Chưa có nhiệm vụ cho tuần này</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
