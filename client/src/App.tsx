import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { lazy, Suspense } from "react";

// Existing pages
import DemanHome from "./pages/DemanHome";
import Home from "./pages/Home";
import GameOfEcom from "./pages/GameOfEcom";

// Blueprint Landing (eager — it's the entry point)
import BlueprintLanding from "./pages/BlueprintLanding";

// Blueprint app pages (lazy loaded)
const BlueprintSurvey = lazy(() => import("./pages/BlueprintSurvey"));
const BlueprintStrategy = lazy(() => import("./pages/BlueprintStrategy"));
const BlueprintPlan = lazy(() => import("./pages/BlueprintPlan"));
const BlueprintIdentity = lazy(() => import("./pages/BlueprintIdentity"));
const BlueprintStudio = lazy(() => import("./pages/BlueprintStudio"));

// Layout
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
      {/* Existing pages */}
      <Route path={"/"} component={DemanHome} />
      <Route path={"/mescells-proposal"} component={Home} />
      <Route path={"/game-of-ecom"} component={GameOfEcom} />

      {/* Blueprint Landing Page (public, no sidebar) */}
      <Route path="/blueprint" component={BlueprintLanding} />

      {/* Blueprint App Routes (with sidebar layout) */}
      <Route path="/blueprint/survey">
        <BlueprintShell><BlueprintSurvey /></BlueprintShell>
      </Route>
      <Route path="/blueprint/strategy">
        <BlueprintShell><BlueprintStrategy /></BlueprintShell>
      </Route>
      <Route path="/blueprint/plan">
        <BlueprintShell><BlueprintPlan /></BlueprintShell>
      </Route>
      <Route path="/blueprint/identity">
        <BlueprintShell><BlueprintIdentity /></BlueprintShell>
      </Route>
      <Route path="/blueprint/studio">
        <BlueprintShell><BlueprintStudio /></BlueprintShell>
      </Route>

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
