# AI Transformation Blueprint™ — Full App Todo

## Phase 1: Core Architecture & Backend
- [x] Upgrade to web-db-user for backend API + LLM + image generation + storage
- [x] Design DB schema (users, surveys, brand_profiles, execution_plans, tasks, content_pieces)
- [x] Build API routes for data persistence (survey, brand, plan, task, content, ai)
- [x] Build contentFrameworks.ts — Golden Circle + 3-layer storytelling engines (in routers.ts)
- [x] Build executionPlanEngine.ts — monthly plan + task generator (in routers.ts)

## Phase 2: Survey + Blueprint Results
- [x] Polish SurveyForm.tsx — 5-step smart survey
- [x] BlueprintResults.tsx — score reveal, level badge, CTA to strategy
- [x] Animated score reveal + level badge

## Phase 3: Monthly Execution Plan
- [x] ExecutionPlan.tsx — 4-week tab view with weekly tasks
- [x] TaskSystem.tsx — step-by-step guided tasks with checkboxes
- [x] Task categories: content, branding, networking, learning, strategy

## Phase 4: Brand Identity Designer
- [x] BrandDesigner.tsx — tone of voice sliders, color palette builder
- [x] Photo upload for AI reference (avatar, brand photos) — via brand.uploadPhoto API
- [x] Brand personality → auto-generate brand guidelines via AI
- [x] Brand kit preview (colors, fonts, tone examples)

## Phase 5: AI Content Studio
- [x] ContentStudio.tsx — main content creation hub
- [x] Text post generator (idea/voice → full post with storytelling framework)
- [x] Image prompt generator (brand-consistent image descriptions)
- [x] Video script generator (hook → story → CTA framework)
- [x] Content history with status management

## Phase 6: Integration & Polish
- [x] BlueprintLayout with sidebar navigation
- [x] App.tsx routing for /blueprint/*
- [x] Lazy loading for Blueprint pages
- [x] Mobile responsive sidebar with toggle

## Phase 7: Testing & Delivery
- [x] Vitest tests for all API routes (23 tests passing)
- [x] TypeScript error-free build
- [x] Checkpoint & deliver
