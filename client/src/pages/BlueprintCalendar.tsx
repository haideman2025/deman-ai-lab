import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Loader2,
  PenTool,
  Plus,
  Sparkles,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";

/* ═══ TYPES ═══ */
type ViewMode = "month" | "week";

interface CalEvent {
  id: number;
  title: string;
  description?: string | null;
  eventType: string;
  scheduledDate: string | Date;
  endDate?: string | Date | null;
  status: string;
  color?: string | null;
  taskId?: number | null;
  contentPieceId?: number | null;
}

/* ═══ HELPERS ═══ */
const DAYS_VI = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTHS_VI = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay(); // 0=Sun
  const totalDays = lastDay.getDate();

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  for (let i = startPad - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // Current month
  for (let i = 1; i <= totalDays; i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  // Next month padding to fill 6 rows
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
  }

  return days;
}

function getWeekDays(baseDate: Date) {
  const start = new Date(baseDate);
  const day = start.getDay();
  start.setDate(start.getDate() - day + 1); // Monday
  if (day === 0) start.setDate(start.getDate() - 7); // If Sunday, go to previous Monday

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const eventTypeColors: Record<string, string> = {
  content: "#00B4FF",
  task: "#F59E0B",
  milestone: "#A855F7",
  custom: "#22C55E",
};

const eventTypeLabels: Record<string, string> = {
  content: "Nội dung",
  task: "Nhiệm vụ",
  milestone: "Cột mốc",
  custom: "Tùy chỉnh",
};

export default function BlueprintCalendar() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Date range for query
  const dateRange = useMemo(() => {
    if (viewMode === "month") {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      start.setDate(start.getDate() - 7); // Include previous month padding
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 7);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    } else {
      const weekDays = getWeekDays(currentDate);
      const start = new Date(weekDays[0]);
      start.setHours(0, 0, 0, 0);
      const end = new Date(weekDays[6]);
      end.setHours(23, 59, 59, 999);
      return { startDate: start.toISOString(), endDate: end.toISOString() };
    }
  }, [currentDate, viewMode]);

  const { data: events = [], isLoading, refetch } = trpc.calendar.getEvents.useQuery(
    dateRange,
    { enabled: !!user }
  );

  const createEvent = trpc.calendar.create.useMutation({
    onSuccess: () => {
      refetch();
      setShowAddModal(false);
    },
  });

  const deleteEvent = trpc.calendar.delete.useMutation({
    onSuccess: () => refetch(),
  });

  // Not logged in
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <CalendarIcon className="w-16 h-16 text-primary/50 mx-auto" />
          <h1 className="font-display text-2xl font-bold">Lịch sáng tạo</h1>
          <p className="text-muted-foreground">Đăng nhập để quản lý lịch sáng tạo nội dung của bạn.</p>
          <Button onClick={() => { window.location.href = getLoginUrl(); }}>Đăng nhập</Button>
        </div>
      </div>
    );
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const eventsMap = new Map<string, CalEvent[]>();
  (events as CalEvent[]).forEach((evt) => {
    const key = formatDate(new Date(evt.scheduledDate));
    if (!eventsMap.has(key)) eventsMap.set(key, []);
    eventsMap.get(key)!.push(evt);
  });

  const navigatePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() - 1);
    else d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const navigateNext = () => {
    const d = new Date(currentDate);
    if (viewMode === "month") d.setMonth(d.getMonth() + 1);
    else d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const goToday = () => setCurrentDate(new Date());

  const today = new Date();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <CalendarIcon className="w-7 h-7 text-primary" />
            Lịch sáng tạo
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Lên lịch và quản lý nội dung theo tuần/tháng
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setSelectedDate(new Date()); setShowAddModal(true); }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" /> Thêm sự kiện
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/50 p-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={navigatePrev}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="font-display font-semibold text-lg min-w-[180px] text-center">
            {viewMode === "month"
              ? `${MONTHS_VI[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              : (() => {
                  const week = getWeekDays(currentDate);
                  return `${week[0].getDate()}/${week[0].getMonth() + 1} — ${week[6].getDate()}/${week[6].getMonth() + 1}`;
                })()
            }
          </h2>
          <Button variant="ghost" size="sm" onClick={navigateNext}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToday} className="ml-2 text-xs">
            Hôm nay
          </Button>
        </div>
        <div className="flex rounded-lg border border-border/50 overflow-hidden">
          <button
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "month" ? "bg-primary text-primary-foreground" : "hover:bg-accent/50"}`}
            onClick={() => setViewMode("month")}
          >
            Tháng
          </button>
          <button
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "week" ? "bg-primary text-primary-foreground" : "hover:bg-accent/50"}`}
            onClick={() => setViewMode("week")}
          >
            Tuần
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === "month" ? (
        <MonthView
          currentDate={currentDate}
          today={today}
          eventsMap={eventsMap}
          selectedDate={selectedDate}
          onSelectDate={(d) => { setSelectedDate(d); }}
          onAddEvent={(d) => { setSelectedDate(d); setShowAddModal(true); }}
          onDeleteEvent={(id) => deleteEvent.mutate({ id })}
        />
      ) : (
        <WeekView
          currentDate={currentDate}
          today={today}
          eventsMap={eventsMap}
          selectedDate={selectedDate}
          onSelectDate={(d) => { setSelectedDate(d); }}
          onAddEvent={(d) => { setSelectedDate(d); setShowAddModal(true); }}
          onDeleteEvent={(id) => deleteEvent.mutate({ id })}
        />
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <AddEventModal
          date={selectedDate || new Date()}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            createEvent.mutate(data);
          }}
          isLoading={createEvent.isPending}
        />
      )}
    </div>
  );
}

/* ─── MONTH VIEW ─── */
function MonthView({
  currentDate,
  today,
  eventsMap,
  selectedDate,
  onSelectDate,
  onAddEvent,
  onDeleteEvent,
}: {
  currentDate: Date;
  today: Date;
  eventsMap: Map<string, CalEvent[]>;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  onAddEvent: (d: Date) => void;
  onDeleteEvent: (id: number) => void;
}) {
  const days = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border/30">
        {DAYS_VI.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const key = formatDate(day.date);
          const dayEvents = eventsMap.get(key) || [];
          const isToday = isSameDay(day.date, today);
          const isSelected = selectedDate && isSameDay(day.date, selectedDate);

          return (
            <div
              key={i}
              className={`min-h-[100px] sm:min-h-[120px] border-b border-r border-border/20 p-1.5 cursor-pointer transition-colors ${
                !day.isCurrentMonth ? "opacity-30" : ""
              } ${isSelected ? "bg-primary/5" : "hover:bg-accent/20"}`}
              onClick={() => onSelectDate(day.date)}
              onDoubleClick={() => onAddEvent(day.date)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                  isToday ? "bg-primary text-primary-foreground" : ""
                }`}>
                  {day.date.getDate()}
                </span>
                {day.isCurrentMonth && (
                  <button
                    className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); onAddEvent(day.date); }}
                    style={{ opacity: isSelected ? 1 : undefined }}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((evt) => (
                  <div
                    key={evt.id}
                    className="group/evt flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] leading-tight truncate"
                    style={{ backgroundColor: `${evt.color || eventTypeColors[evt.eventType] || "#00B4FF"}20`, color: evt.color || eventTypeColors[evt.eventType] || "#00B4FF" }}
                    title={evt.title}
                  >
                    <span className="truncate flex-1">{evt.title}</span>
                    <button
                      className="opacity-0 group-hover/evt:opacity-100 flex-shrink-0"
                      onClick={(e) => { e.stopPropagation(); onDeleteEvent(evt.id); }}
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <p className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 3} khác</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── WEEK VIEW ─── */
function WeekView({
  currentDate,
  today,
  eventsMap,
  selectedDate,
  onSelectDate,
  onAddEvent,
  onDeleteEvent,
}: {
  currentDate: Date;
  today: Date;
  eventsMap: Map<string, CalEvent[]>;
  selectedDate: Date | null;
  onSelectDate: (d: Date) => void;
  onAddEvent: (d: Date) => void;
  onDeleteEvent: (id: number) => void;
}) {
  const weekDays = getWeekDays(currentDate);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
      <div className="grid grid-cols-7 divide-x divide-border/20">
        {weekDays.map((day, i) => {
          const key = formatDate(day);
          const dayEvents = eventsMap.get(key) || [];
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <div
              key={i}
              className={`min-h-[300px] cursor-pointer transition-colors ${
                isSelected ? "bg-primary/5" : "hover:bg-accent/10"
              }`}
              onClick={() => onSelectDate(day)}
            >
              {/* Day header */}
              <div className={`p-3 border-b border-border/20 text-center ${isToday ? "bg-primary/10" : ""}`}>
                <p className="text-xs text-muted-foreground">{DAYS_VI[(i + 1) % 7 === 0 ? 0 : (i + 1) % 7]}</p>
                <p className={`text-lg font-display font-bold ${isToday ? "text-primary" : ""}`}>
                  {day.getDate()}
                </p>
              </div>

              {/* Events */}
              <div className="p-2 space-y-1.5">
                {dayEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="group/evt p-2 rounded-lg border border-border/30 bg-background/50"
                    style={{ borderLeftColor: evt.color || eventTypeColors[evt.eventType] || "#00B4FF", borderLeftWidth: "3px" }}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-xs font-medium leading-tight line-clamp-2">{evt.title}</p>
                      <button
                        className="opacity-0 group-hover/evt:opacity-100 flex-shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); onDeleteEvent(evt.id); }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {eventTypeLabels[evt.eventType] || evt.eventType}
                    </p>
                  </div>
                ))}

                {/* Add button */}
                <button
                  className="w-full p-2 rounded-lg border border-dashed border-border/30 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-1"
                  onClick={(e) => { e.stopPropagation(); onAddEvent(day); }}
                >
                  <Plus className="w-3 h-3" />
                  <span className="text-[10px]">Thêm</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── ADD EVENT MODAL ─── */
function AddEventModal({
  date,
  onClose,
  onSubmit,
  isLoading,
}: {
  date: Date;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    eventType: "content" | "task" | "milestone" | "custom";
    scheduledDate: string;
    color?: string;
  }) => void;
  isLoading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState<"content" | "task" | "milestone" | "custom">("content");
  const [time, setTime] = useState("09:00");

  const handleSubmit = () => {
    if (!title.trim()) return;
    const scheduledDate = new Date(date);
    const [h, m] = time.split(":").map(Number);
    scheduledDate.setHours(h, m, 0, 0);
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      eventType,
      scheduledDate: scheduledDate.toISOString(),
      color: eventTypeColors[eventType],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-border/50 bg-card p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Thêm sự kiện</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground">
          {date.toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>

        {/* Event Type */}
        <div className="grid grid-cols-4 gap-2">
          {(["content", "task", "milestone", "custom"] as const).map((type) => {
            const icons: Record<string, typeof Sparkles> = {
              content: PenTool,
              task: Target,
              milestone: Sparkles,
              custom: CalendarIcon,
            };
            const Icon = icons[type];
            return (
              <button
                key={type}
                className={`p-2 rounded-lg border text-center transition-colors ${
                  eventType === type
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/50 hover:border-primary/30"
                }`}
                onClick={() => setEventType(type)}
              >
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <span className="text-[10px]">{eventTypeLabels[type]}</span>
              </button>
            );
          })}
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Tiêu đề sự kiện..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          autoFocus
        />

        {/* Description */}
        <textarea
          placeholder="Mô tả (tùy chọn)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />

        {/* Time */}
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border/50 bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Hủy
          </Button>
          <Button className="flex-1 gap-2" onClick={handleSubmit} disabled={!title.trim() || isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Tạo sự kiện
          </Button>
        </div>
      </div>
    </div>
  );
}
