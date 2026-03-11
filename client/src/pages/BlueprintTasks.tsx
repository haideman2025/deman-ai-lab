import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Loader2,
  PenTool,
  Play,
  SkipForward,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import { Streamdown } from "streamdown";

/* ═══ TYPES ═══ */
interface TaskItem {
  id: number;
  title: string;
  description: string | null;
  category: string;
  week: number;
  day: number | null;
  status: string;
  stepByStepGuide: unknown;
  aiPromptTemplate: string | null;
  estimatedMinutes: number | null;
  completedAt: string | Date | null;
}

const categoryLabels: Record<string, string> = {
  content: "Sáng tạo nội dung",
  branding: "Xây dựng thương hiệu",
  networking: "Kết nối & Mạng lưới",
  learning: "Học tập & Phát triển",
  strategy: "Chiến lược",
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  content: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  branding: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  networking: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  learning: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  strategy: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
};

const statusLabels: Record<string, string> = {
  pending: "Chưa bắt đầu",
  in_progress: "Đang thực hiện",
  completed: "Hoàn thành",
  skipped: "Bỏ qua",
};

export default function BlueprintTasks() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [filterWeek, setFilterWeek] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [aiResult, setAiResult] = useState<Record<number, string>>({});
  const [aiLoading, setAiLoading] = useState<Record<number, boolean>>({});

  // Get user's brand profile to find execution plan
  const { data: overview } = trpc.dashboard.overview.useQuery(undefined, { enabled: !!user });

  // Get execution plans for the brand
  const brandProfileId = overview?.brandProfile?.id;
  const { data: plans = [] } = trpc.plan.getByBrandId.useQuery(
    { brandProfileId: brandProfileId! },
    { enabled: !!brandProfileId }
  );

  const activePlan = plans.find((p: any) => p.status === "active") || plans[0];

  // Get tasks for the active plan
  const { data: allTasks = [], refetch: refetchTasks } = trpc.task.getByPlanId.useQuery(
    { planId: activePlan?.id! },
    { enabled: !!activePlan?.id }
  );

  const updateTaskStatus = trpc.task.updateStatus.useMutation({
    onSuccess: () => refetchTasks(),
  });

  const logActivity = trpc.activity.log.useMutation();

  const enhanceIdea = trpc.ai.enhanceIdea.useMutation();

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let tasks = allTasks as TaskItem[];
    if (filterWeek) tasks = tasks.filter((t) => t.week === filterWeek);
    if (filterCategory) tasks = tasks.filter((t) => t.category === filterCategory);
    return tasks.sort((a, b) => {
      // Sort: in_progress first, then pending, then completed, then skipped
      const order: Record<string, number> = { in_progress: 0, pending: 1, completed: 2, skipped: 3 };
      const diff = (order[a.status] ?? 1) - (order[b.status] ?? 1);
      if (diff !== 0) return diff;
      return (a.week * 10 + (a.day || 0)) - (b.week * 10 + (b.day || 0));
    });
  }, [allTasks, filterWeek, filterCategory]);

  // Stats
  const stats = useMemo(() => {
    const tasks = allTasks as TaskItem[];
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "completed").length,
      inProgress: tasks.filter((t) => t.status === "in_progress").length,
      pending: tasks.filter((t) => t.status === "pending").length,
    };
  }, [allTasks]);

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Not logged in
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <Target className="w-16 h-16 text-primary/50 mx-auto" />
          <h1 className="font-display text-2xl font-bold">Hệ thống nhiệm vụ</h1>
          <p className="text-muted-foreground">Đăng nhập để truy cập nhiệm vụ xây dựng thương hiệu.</p>
          <Button onClick={() => { window.location.href = getLoginUrl(); }}>Đăng nhập</Button>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // No plan yet
  if (!activePlan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <Target className="w-16 h-16 text-amber-400/50 mx-auto" />
          <h1 className="font-display text-2xl font-bold">Chưa có kế hoạch</h1>
          <p className="text-muted-foreground">Hãy tạo kế hoạch thực thi trước để có nhiệm vụ cần làm.</p>
          <Button className="gap-2" onClick={() => setLocation("/blueprint/plan")}>
            <Sparkles className="w-4 h-4" /> Tạo kế hoạch
          </Button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (taskId: number, newStatus: "pending" | "in_progress" | "completed" | "skipped") => {
    updateTaskStatus.mutate({ id: taskId, status: newStatus });
    if (newStatus === "completed") {
      logActivity.mutate({
        action: "task_completed",
        entityType: "task",
        entityId: taskId,
        title: `Hoàn thành nhiệm vụ`,
      });
    }
  };

  const handleAiAssist = async (task: TaskItem) => {
    if (!brandProfileId) return;
    setAiLoading((prev) => ({ ...prev, [task.id]: true }));
    try {
      const result = await enhanceIdea.mutateAsync({
        brandProfileId,
        rawIdea: task.aiPromptTemplate || task.description || task.title,
        targetFormat: "post",
      });
      setAiResult((prev) => ({ ...prev, [task.id]: result.enhanced }));
    } catch (err) {
      setAiResult((prev) => ({ ...prev, [task.id]: "Có lỗi xảy ra. Vui lòng thử lại." }));
    }
    setAiLoading((prev) => ({ ...prev, [task.id]: false }));
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <Target className="w-7 h-7 text-amber-400" />
            Nhiệm vụ thực thi
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Thực hiện từng bước theo hướng dẫn để xây dựng thương hiệu cá nhân
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setLocation("/blueprint/dashboard")}>
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="rounded-xl border border-border/50 bg-card/50 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span className="font-display font-semibold">Tiến độ</span>
            </div>
            <span className="text-2xl font-display font-bold text-primary">{completionRate}%</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> {stats.completed} xong</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> {stats.inProgress} đang làm</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> {stats.pending} chờ</span>
          </div>
        </div>
        <div className="w-full h-3 rounded-full bg-muted/50 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
          <Filter className="w-4 h-4" /> Lọc:
        </div>
        {/* Week filter */}
        {[1, 2, 3, 4].map((w) => (
          <button
            key={w}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterWeek === w ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-accent/50"
            }`}
            onClick={() => setFilterWeek(filterWeek === w ? null : w)}
          >
            Tuần {w}
          </button>
        ))}
        <div className="w-px h-6 bg-border/50 mx-1" />
        {/* Category filter */}
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterCategory === key
                ? `${categoryColors[key].bg} ${categoryColors[key].text} ${categoryColors[key].border} border`
                : "bg-muted/50 text-muted-foreground hover:bg-accent/50"
            }`}
            onClick={() => setFilterCategory(filterCategory === key ? null : key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-400/30" />
            <p>Không có nhiệm vụ nào phù hợp với bộ lọc.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isExpanded = expandedTask === task.id;
            const colors = categoryColors[task.category] || categoryColors.content;
            const steps = Array.isArray(task.stepByStepGuide) ? task.stepByStepGuide as string[] : [];

            return (
              <div
                key={task.id}
                className={`rounded-xl border bg-card/50 transition-all ${
                  task.status === "completed" ? "opacity-60 border-border/30" : "border-border/50"
                } ${isExpanded ? "ring-1 ring-primary/30" : ""}`}
              >
                {/* Task Header */}
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                >
                  {/* Status indicator */}
                  <button
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      task.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : task.status === "in_progress"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (task.status === "completed") return;
                      const next = task.status === "pending" ? "in_progress" : "completed";
                      handleStatusChange(task.id, next as any);
                    }}
                  >
                    {task.status === "completed" ? (
                      <Check className="w-4 h-4" />
                    ) : task.status === "in_progress" ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </button>

                  {/* Task info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {categoryLabels[task.category]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Tuần {task.week}{task.day ? ` · Ngày ${task.day}` : ""}
                      </span>
                      {task.estimatedMinutes && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> ~{task.estimatedMinutes}p
                        </span>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${task.status === "completed" ? "line-through" : ""}`}>
                      {task.title}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span className={`text-xs px-2 py-1 rounded-lg ${
                    task.status === "completed" ? "bg-emerald-500/10 text-emerald-400" :
                    task.status === "in_progress" ? "bg-amber-500/10 text-amber-400" :
                    task.status === "skipped" ? "bg-muted text-muted-foreground" :
                    "bg-muted/50 text-muted-foreground"
                  }`}>
                    {statusLabels[task.status]}
                  </span>

                  {/* Expand toggle */}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/30 pt-4 space-y-4">
                    {/* Description */}
                    {task.description && (
                      <div className="rounded-lg bg-background/50 p-4">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Mô tả
                        </h4>
                        <p className="text-sm text-foreground/80 leading-relaxed">{task.description}</p>
                      </div>
                    )}

                    {/* Step-by-step Guide */}
                    {steps.length > 0 && (
                      <div className="rounded-lg bg-background/50 p-4">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" /> Hướng dẫn từng bước
                        </h4>
                        <div className="space-y-2">
                          {steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 font-semibold mt-0.5">
                                {i + 1}
                              </span>
                              <p className="text-sm text-foreground/80 leading-relaxed">{String(step)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Assistant */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Wand2 className="w-3.5 h-3.5" /> AI Hỗ trợ
                      </h4>

                      {aiResult[task.id] ? (
                        <div className="space-y-3">
                          <div className="rounded-lg bg-background/80 p-3 text-sm max-h-[300px] overflow-y-auto">
                            <Streamdown>{aiResult[task.id]}</Streamdown>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-xs"
                              onClick={() => {
                                navigator.clipboard.writeText(aiResult[task.id]);
                              }}
                            >
                              Sao chép
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1 text-xs"
                              onClick={() => handleAiAssist(task)}
                              disabled={aiLoading[task.id]}
                            >
                              {aiLoading[task.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                              Tạo lại
                            </Button>
                            <Button
                              size="sm"
                              className="gap-1 text-xs"
                              onClick={() => setLocation("/blueprint/studio")}
                            >
                              <PenTool className="w-3 h-3" /> Mở Studio
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            size="sm"
                            className="gap-2 flex-1"
                            onClick={() => handleAiAssist(task)}
                            disabled={aiLoading[task.id]}
                          >
                            {aiLoading[task.id] ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Wand2 className="w-4 h-4" />
                            )}
                            AI giúp tôi thực hiện nhiệm vụ này
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={() => setLocation("/blueprint/studio")}
                          >
                            <PenTool className="w-4 h-4" /> Mở Content Studio
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      {task.status !== "completed" && (
                        <>
                          {task.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => handleStatusChange(task.id, "in_progress")}
                            >
                              <Play className="w-4 h-4" /> Bắt đầu
                            </Button>
                          )}
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => handleStatusChange(task.id, "completed")}
                          >
                            <CheckCircle2 className="w-4 h-4" /> Hoàn thành
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-2 text-muted-foreground"
                            onClick={() => handleStatusChange(task.id, "skipped")}
                          >
                            <SkipForward className="w-4 h-4" /> Bỏ qua
                          </Button>
                        </>
                      )}
                      {task.status === "completed" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="gap-2 text-muted-foreground"
                          onClick={() => handleStatusChange(task.id, "pending")}
                        >
                          Đánh dấu chưa xong
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
