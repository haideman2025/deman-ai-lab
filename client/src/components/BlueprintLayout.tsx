import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Palette,
  PenTool,
  Sparkles,
  User,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

const navItems = [
  { icon: ClipboardList, label: "Khảo sát", path: "/blueprint", description: "Khám phá tiềm năng" },
  { icon: Brain, label: "Chiến lược", path: "/blueprint/strategy", description: "Bản vẽ thương hiệu" },
  { icon: FileText, label: "Kế hoạch", path: "/blueprint/plan", description: "Lộ trình thực thi" },
  { icon: Palette, label: "Nhận diện", path: "/blueprint/identity", description: "Thiết kế thương hiệu" },
  { icon: PenTool, label: "Sáng tạo", path: "/blueprint/studio", description: "AI Content Studio" },
];

export default function BlueprintLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 flex flex-col border-r border-border/50 bg-card/80 backdrop-blur-xl transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-[260px]"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border/30">
          <div className="flex items-center gap-3 min-w-0">
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
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/blueprint" && location.startsWith(item.path));
            const isExactActive = location === item.path;
            const active = item.path === "/blueprint" ? isExactActive : isActive;

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

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-1.5 rounded-lg hover:bg-accent/50 text-muted-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-[68px]" : "ml-[260px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
