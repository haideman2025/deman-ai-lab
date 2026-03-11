import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Flame,
  Loader2,
  PenTool,
  Play,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

/* ═══ ACTION ICONS MAP ═══ */
const actionIcons: Record<string, typeof Sparkles> = {
  survey_completed: CheckCircle2,
  content_created: PenTool,
  task_completed: Target,
  calendar_event_created: Calendar,
  calendar_generated: Calendar,
  brand_updated: Sparkles,
  plan_generated: FileText,
};

const actionColors: Record<string, string> = {
  survey_completed: "text-emerald-400",
  content_created: "text-cyan-400",
  task_completed: "text-amber-400",
  calendar_event_created: "text-blue-400",
  calendar_generated: "text-blue-400",
  brand_updated: "text-purple-400",
  plan_generated: "text-rose-400",
};

export default function BlueprintDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: stats, isLoading: statsLoading } = trpc.dashboard.stats.useQuery(
    undefined,
    { enabled: !!user }
  );

  const { data: overview, isLoading: overviewLoading } = trpc.dashboard.overview.useQuery(
    undefined,
    { enabled: !!user }
  );

  // Not logged in → prompt to start
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold">Chào mừng bạn!</h1>
          <p className="text-muted-foreground text-lg">
            Đăng nhập để truy cập dashboard cá nhân và bắt đầu hành trình xây dựng thương hiệu.
          </p>
          <div className="flex flex-col gap-3">
            <Button size="lg" onClick={() => { window.location.href = getLoginUrl(); }}>
              Đăng nhập ngay
            </Button>
            <Button variant="outline" size="lg" onClick={() => setLocation("/blueprint/survey")}>
              Hoặc làm khảo sát trước
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = authLoading || statsLoading || overviewLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Đang tải dashboard...</p>
        </div>
      </div>
    );
  }

  // No survey yet → onboarding
  if (!overview?.hasSurvey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg text-center space-y-8">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mx-auto">
            <Sparkles className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="space-y-3">
            <h1 className="font-display text-3xl font-bold">
              Xin chào, {user?.name || "bạn"}!
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Hãy bắt đầu bằng bài khảo sát 5 phút để AI hiểu bạn và tạo chiến lược thương hiệu cá nhân phù hợp nhất.
            </p>
          </div>
          <Button
            size="lg"
            className="gap-2 text-lg px-8 py-6"
            onClick={() => setLocation("/blueprint/survey")}
          >
            <Play className="w-5 h-5" />
            Bắt đầu khảo sát
          </Button>
        </div>
      </div>
    );
  }

  const completionRate = stats && stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            Xin chào, {user?.name || "bạn"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Dashboard cá nhân — theo dõi tiến trình xây dựng thương hiệu của bạn
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={() => setLocation("/blueprint/calendar")}>
            <Calendar className="w-4 h-4" /> Lịch sáng tạo
          </Button>
          <Button size="sm" className="gap-2" onClick={() => setLocation("/blueprint/studio")}>
            <Plus className="w-4 h-4" /> Tạo nội dung
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${stats?.streak || 0} ngày`}
          color="text-orange-400"
          bgColor="bg-orange-500/10"
          highlight={!!stats?.streak && stats.streak > 0}
        />
        <StatCard
          icon={Target}
          label="Nhiệm vụ"
          value={`${stats?.completedTasks || 0}/${stats?.totalTasks || 0}`}
          color="text-emerald-400"
          bgColor="bg-emerald-500/10"
          sub={`${completionRate}% hoàn thành`}
        />
        <StatCard
          icon={FileText}
          label="Nội dung"
          value={String(stats?.totalContent || 0)}
          color="text-cyan-400"
          bgColor="bg-cyan-500/10"
        />
        <StatCard
          icon={Calendar}
          label="Sự kiện"
          value={String(stats?.totalEvents || 0)}
          color="text-blue-400"
          bgColor="bg-blue-500/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Tiến độ"
          value={`${completionRate}%`}
          color="text-purple-400"
          bgColor="bg-purple-500/10"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Pending Tasks + Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Tasks */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Nhiệm vụ cần làm
              </h2>
              <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setLocation("/blueprint/tasks")}>
                Xem tất cả <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {overview?.pendingTasks && overview.pendingTasks.length > 0 ? (
              <div className="space-y-2">
                {overview.pendingTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer group"
                    onClick={() => setLocation("/blueprint/tasks")}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      task.status === 'in_progress' ? 'bg-amber-500/10' : 'bg-muted/50'
                    }`}>
                      {task.status === 'in_progress' ? (
                        <Play className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tuần {task.week} · {task.category} · ~{task.estimatedMinutes || 30} phút
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-emerald-400/50" />
                <p className="text-sm">Tuyệt vời! Bạn đã hoàn thành tất cả nhiệm vụ.</p>
                <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => setLocation("/blueprint/plan")}>
                  <Plus className="w-3 h-3" /> Tạo kế hoạch mới
                </Button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <QuickAction
              icon={PenTool}
              label="Viết bài"
              description="Tạo content mới"
              onClick={() => setLocation("/blueprint/studio")}
              color="from-cyan-500/20 to-blue-500/20"
            />
            <QuickAction
              icon={Calendar}
              label="Lịch sáng tạo"
              description="Xem & lên lịch"
              onClick={() => setLocation("/blueprint/calendar")}
              color="from-blue-500/20 to-purple-500/20"
            />
            <QuickAction
              icon={BarChart3}
              label="Chiến lược"
              description="Xem bản vẽ"
              onClick={() => setLocation("/blueprint/strategy")}
              color="from-purple-500/20 to-pink-500/20"
            />
            <QuickAction
              icon={Sparkles}
              label="Nhận diện"
              description="Brand Identity"
              onClick={() => setLocation("/blueprint/identity")}
              color="from-amber-500/20 to-orange-500/20"
            />
          </div>

          {/* Recent Content */}
          {overview?.recentContent && overview.recentContent.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-card/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  Nội dung gần đây
                </h2>
                <Button variant="ghost" size="sm" className="gap-1 text-xs" onClick={() => setLocation("/blueprint/studio")}>
                  Xem tất cả <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-2">
                {overview.recentContent.slice(0, 5).map((content: any) => (
                  <div
                    key={content.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <ContentTypeIcon type={content.contentType} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{content.title || "Untitled"}</p>
                      <p className="text-xs text-muted-foreground">
                        {content.contentType.replace("_", " ")} · {content.status}
                        {content.createdAt && ` · ${formatDistanceToNow(new Date(content.createdAt), { addSuffix: true, locale: vi })}`}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      content.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' :
                      content.status === 'ready' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {content.status === 'published' ? 'Đã đăng' : content.status === 'ready' ? 'Sẵn sàng' : 'Nháp'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Activity Feed */}
        <div className="space-y-6">
          {/* Brand Profile Summary */}
          {overview?.brandProfile && (
            <div className="rounded-xl border border-border/50 bg-card/50 p-5">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Thương hiệu của bạn
              </h2>
              <div className="space-y-3">
                {overview.brandProfile.archetype && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Archetype</p>
                    <p className="text-sm font-medium">{String(overview.brandProfile.archetype)}</p>
                  </div>
                )}
                {overview.brandProfile.coreFeeling && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Core Feeling</p>
                    <p className="text-sm font-medium">{String(overview.brandProfile.coreFeeling)}</p>
                  </div>
                )}
                {overview.brandProfile.mission && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Sứ mệnh</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{String(overview.brandProfile.mission)}</p>
                  </div>
                )}
                <Button variant="outline" size="sm" className="w-full gap-2 mt-2" onClick={() => setLocation("/blueprint/identity")}>
                  Xem chi tiết <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Activity Feed */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-5">
            <h2 className="font-display font-semibold text-lg flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-400" />
              Hoạt động gần đây
            </h2>

            {overview?.recentActivity && overview.recentActivity.length > 0 ? (
              <div className="space-y-1">
                {overview.recentActivity.slice(0, 15).map((activity: any) => {
                  const IconComp = actionIcons[activity.action] || Sparkles;
                  const colorClass = actionColors[activity.action] || "text-muted-foreground";
                  return (
                    <div key={activity.id} className="flex items-start gap-3 py-2">
                      <div className="mt-0.5">
                        <IconComp className={`w-4 h-4 ${colorClass}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug">{activity.title || activity.action}</p>
                        {activity.createdAt && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true, locale: vi })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Chưa có hoạt động nào.</p>
                <p className="text-xs mt-1">Bắt đầu bằng việc hoàn thành nhiệm vụ đầu tiên!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STAT CARD ─── */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
  sub,
  highlight,
}: {
  icon: typeof Sparkles;
  label: string;
  value: string;
  color: string;
  bgColor: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-border/50 bg-card/50 p-4 ${highlight ? 'ring-1 ring-orange-500/30' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-display font-bold">{value}</p>
          {sub && <p className="text-[10px] text-muted-foreground">{sub}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── QUICK ACTION ─── */
function QuickAction({
  icon: Icon,
  label,
  description,
  onClick,
  color,
}: {
  icon: typeof Sparkles;
  label: string;
  description: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-border/50 bg-gradient-to-br ${color} p-4 text-left hover:border-primary/30 transition-all group`}
    >
      <Icon className="w-6 h-6 text-foreground mb-2 group-hover:text-primary transition-colors" />
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </button>
  );
}

/* ─── CONTENT TYPE ICON ─── */
function ContentTypeIcon({ type }: { type: string }) {
  switch (type) {
    case "text_post": return <PenTool className="w-4 h-4 text-cyan-400" />;
    case "image_prompt": return <Sparkles className="w-4 h-4 text-purple-400" />;
    case "video_script": return <Play className="w-4 h-4 text-rose-400" />;
    default: return <FileText className="w-4 h-4 text-blue-400" />;
  }
}
