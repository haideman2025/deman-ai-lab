/**
 * DEMAN AI LAB — Router v2
 * Mới: Homepage V2 + 3 trang trụ (Academy, Affiliate, About)
 * Giữ: Blueprint™ SaaS routes (rebrand thành HAIVN.AI public name)
 * Tách: MesCells proposal sang /proposals/mescells
 *
 * URL backward compat:
 * - /  → HomePageV2 (was DemanHome) — DemanHome accessible via /v1
 * - /mescells-proposal  → Home (kept for backward compat)
 * - /game-of-ecom  → GameOfEcom (unchanged)
 * - /blueprint  → BlueprintLanding (rebrand UI to "HAIVN.AI" in component)
 * - /blueprint/*  → unchanged app routes
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { lazy, Suspense } from "react";

// V2 — new pages aligned with brand strategy v1.1
import HomePageV2 from "./pages/HomePageV2";
import AcademyPage from "./pages/AcademyPage";
import AffiliatePage from "./pages/AffiliatePage";
import AboutPage from "./pages/AboutPage";

// V1 — legacy (accessible via /v1 for rollback safety)
import DemanHome from "./pages/DemanHome";
import Home from "./pages/Home";
import GameOfEcom from "./pages/GameOfEcom";

// Blueprint Landing (eager — public entry, will display "HAIVN.AI" branding)
import BlueprintLanding from "./pages/BlueprintLanding";

// Blueprint app pages (lazy — auth-gated SaaS)
const BlueprintDashboard = lazy(() => import("./pages/BlueprintDashboard"));
const BlueprintSurvey = lazy(() => import("./pages/BlueprintSurvey"));
const BlueprintStrategy = lazy(() => import("./pages/BlueprintStrategy"));
const BlueprintPlan = lazy(() => import("./pages/BlueprintPlan"));
const BlueprintIdentity = lazy(() => import("./pages/BlueprintIdentity"));
const BlueprintStudio = lazy(() => import("./pages/BlueprintStudio"));
const BlueprintCalendar = lazy(() => import("./pages/BlueprintCalendar"));
const BlueprintTasks = lazy(() => import("./pages/BlueprintTasks"));

import BlueprintLayout from "./components/BlueprintLayout";

function BlueprintShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BlueprintLayout>{children}</BlueprintLayout>
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      {/* ============ V2 PUBLIC PAGES (NEW) ============ */}
      <Route path={"/"} component={HomePageV2} />
      <Route path={"/academy"} component={AcademyPage} />
      <Route path={"/affiliate"} component={AffiliatePage} />
      <Route path={"/about"} component={AboutPage} />

      {/* TODO Phase 2: /cases, /community */}

      {/* ============ KEPT FROM V1 ============ */}
      <Route path={"/game-of-ecom"} component={GameOfEcom} />
      <Route path={"/proposals/mescells"} component={Home} />
      <Route path={"/mescells-proposal"} component={Home} />{/* backward compat redirect */}

      {/* ============ ROLLBACK SAFETY ============ */}
      <Route path={"/v1"} component={DemanHome} />

      {/* ============ HAIVN.AI SaaS (= Blueprint™, internal name preserved for stability) ============ */}
      <Route path="/blueprint" component={BlueprintLanding} />
      <Route path="/haivn-ai" component={BlueprintLanding} />{/* alias for marketing URL */}
      <Route path="/blueprint/dashboard"><BlueprintShell><BlueprintDashboard /></BlueprintShell></Route>
      <Route path="/blueprint/survey"><BlueprintShell><BlueprintSurvey /></BlueprintShell></Route>
      <Route path="/blueprint/strategy"><BlueprintShell><BlueprintStrategy /></BlueprintShell></Route>
      <Route path="/blueprint/plan"><BlueprintShell><BlueprintPlan /></BlueprintShell></Route>
      <Route path="/blueprint/identity"><BlueprintShell><BlueprintIdentity /></BlueprintShell></Route>
      <Route path="/blueprint/studio"><BlueprintShell><BlueprintStudio /></BlueprintShell></Route>
      <Route path="/blueprint/calendar"><BlueprintShell><BlueprintCalendar /></BlueprintShell></Route>
      <Route path="/blueprint/tasks"><BlueprintShell><BlueprintTasks /></BlueprintShell></Route>

      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
