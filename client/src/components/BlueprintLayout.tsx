import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  PenTool,
  Sparkles,
  Target,
  User,
  X,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const navSections = [
  {
    label: "Tổng quan",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/blueprint/dashboard", description: "Tổng quan cá nhân" },
    ],
  },
  {
    label: "Xây dựng",
    items: [
      { icon: ClipboardList, label: "Khảo sát", path: "/blueprint/survey", description: "Khám phá tiềm năng" },
      { icon: Brain, label: "Chiến lược", path: "/blueprint/strategy", description: "Bản vẽ thương hiệu" },
      { icon: Palette, label: "Nhận diện", path: "/blueprint/identity", description: "Thiết kế thương hiệu" },
    ],
  },
  {
    label: "Thực thi",
    items: [
      { icon: FileText, label: "Kế hoạch", path: "/blueprint/plan", description: "Lộ trình thực thi" },
      { icon: Target, label: "Nhiệm vụ", path: "/blueprint/tasks", description: "Hướng dẫn từng bước" },
      { icon: Calendar, label: "Lịch sáng tạo", path: "/blueprint/calendar", description: "Lên lịch nội dung" },
    ],
  },
  {
    label: "Công cụ",
    items: [
      { icon: PenTool, label: "Content Studio", path: "/blueprint/studio", description: "AI sáng tạo nội dung" },
    ],
  },
];

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Đang tải...</p>
        </div>
      </div>
    );
  }

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border/30">
        <div
          className="flex items-center gap-3 min-w-0 cursor-pointer"
          onClick={() => setLocation("/blueprint/dashboard")}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="font-display font-bold text-sm tracking-tight truncate text-foreground">
                AI Blueprint™
              </h1>
              <p className="text-[10px] text-muted-foreground truncate">DEMAN AI LAB</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-[0.15em]">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = location === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => setLocation(item.path)}
                    className={`w-full flex items-center gap-3 rounded-lg transition-all duration-200 group ${
                      collapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"
                    } ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-primary" : ""}`} />
                    {!collapsed && (
                      <div className="text-left min-w-0">
                        <span className={`text-sm block truncate ${active ? "font-semibold" : "font-medium"}`}>
                          {item.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate block">{item.description}</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border/30 p-3 space-y-2">
        {/* Back to DEMAN */}
        <button
          onClick={() => setLocation("/")}
          className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
          title="Về trang chủ"
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-xs">Về trang chủ</span>}
        </button>

        {/* User */}
        {user ? (
          <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-primary" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{user.name || "User"}</p>
                <button onClick={logout} className="text-[10px] text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                  <LogOut className="w-2.5 h-2.5" /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className={`w-full ${collapsed ? "px-2" : ""}`}
            onClick={() => { window.location.href = getLoginUrl(); }}
          >
            {collapsed ? <User className="w-4 h-4" /> : "Đăng nhập"}
          </Button>
        )}

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full hidden md:flex items-center justify-center py-1.5 rounded-lg hover:bg-accent/50 text-muted-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b border-border/50 bg-card/90 backdrop-blur-xl">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-accent/50"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-sm">AI Blueprint™</span>
        </div>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[280px] flex flex-col bg-card border-r border-border/50">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed left-0 top-0 h-full z-40 flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-[260px]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 pt-14 md:pt-0 ${
          collapsed ? "md:ml-[68px]" : "md:ml-[260px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
