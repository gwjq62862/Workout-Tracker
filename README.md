# LIFTMETRIC — Workout Tracker

A simple, fast, and clean workout tracking app built with modern web tooling. Log exercises, sets, reps, and weights; review sessions; and edit past workouts — all backed by Supabase.

## Features
- Email/password authentication
- Log workouts with multiple exercises
- View recent workouts and a detailed session page
- Edit workouts with instant volume feedback
- Responsive UI with clean components and icons

## Tech Stack
- Next.js App Router (v16)
- React (v19) + TypeScript
- Supabase (SSR + JS client)
- Zod for validation and coercion
- Tailwind CSS (v4) with custom UI components
- Lucide icons

## Project Structure
```
app/
  (auth)/login/page.tsx          # Login
  (auth)/signUp/page.tsx         # Signup
  (auth)/layout.tsx              # Auth layout
  (home)/layout.tsx              # Home layout + Auth hydration
  (home)/page.tsx                # Landing page
  dashboard/                     # Dashboard routes
    layout.tsx
    page.tsx                     # Overview
    workouts/
      page.tsx                   # All workouts
      new/page.tsx               # Create workout (client form + server action)
      [id]/page.tsx              # Workout detail
      edit/[id]/page.tsx         # Edit workout

components/
  Navbar.tsx
  auth/                          # Auth forms and card
  dashboard/workouts/            # Workout list and edit form
  home/                          # Hero and features
  ui/                            # Reusable UI components

lib/
  action/                        # Server actions (auth, workouts)
  provider/auth-provider.tsx     # Client auth context
  supabase/                      # SSR + client setup
  type/                          # Shared state types
  zodSchema/                     # Zod validation schemas
  utils.ts                       # Utilities (e.g., date formatting)
```

## Authentication
- Server-side user fetch via Supabase SSR client: reads cookies to get the session.
- Hydrates the client with initialUser using an AuthProvider to avoid UI flash.
- Server actions:
  - `login` and `signup` perform validation, then `supabase.auth.signInWithPassword` or `signUp`, and redirect.

Entry points:
- `lib/supabase/server.ts` creates the SSR client using `cookies()`.
- `lib/provider/auth-provider.tsx` provides `user` state and listens to auth state changes.
- `components/Navbar.tsx` uses the context to render login/signup or dashboard/logout.

## Workouts
### Data Model
- Table: `workouts`
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to `auth.users`)
  - `title` (text)
  - `workout_date` (date)
  - `exercises` (jsonb)
  - `created_at` (timestamptz, default now())

`exercises` is an array of objects:
```json
[
  { "name": "Bench Press", "sets": 3, "reps": 8, "weight": 60 },
  { "name": "Incline DB Press", "sets": 3, "reps": 10, "weight": 24 }
]
```

### Validation
- `lib/zodSchema/wokoutSchema.ts` validates:
  - `title`: string, required
  - `date`: string, required
  - `exercises`: array of `{ name: string, sets: number, reps: number, weight?: number }`
- Uses `z.coerce.number()` so the UI can keep numeric inputs as strings (for placeholders) while the server coerces them to numbers.

### Server Actions
- `createWorkoutAction(formData)`:
  - Parses `exercises` from a hidden field (JSON).
  - Validates with Zod and inserts into `workouts` with the authenticated `user_id`.
- `updateWorkoutAction(formData)`:
  - Validates and updates an existing workout by `id` (and `user_id` match).
  - Revalidates relevant pages after update.

### Forms
- Create page: `app/dashboard/workouts/new/page.tsx`
  - Client component with `useActionState` and a hidden `exercises` JSON input.
  - Inline field errors shown on validation failures.
  - Redirects to the workouts list on success.
- Edit form: `components/dashboard/workouts/edit/EditWorkoutForm.tsx`
  - Pre-fills title/date/exercises.
  - Normalizes date to `YYYY-MM-DD` for HTML date inputs.
  - Displays field errors; redirects to the detail page on success.

## Environment Variables
Create a `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

> Note: Keys are read in `lib/supabase/server.ts`. Keep secrets out of source control.

## Supabase Setup
1. Create a project in Supabase.
2. Create the `workouts` table:
```sql
create table if not exists public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  workout_date date not null,
  exercises jsonb not null,
  created_at timestamptz not null default now()
);
```
3. Enable Row Level Security and add policies so users can only manage their own workouts:
   - Select: `user_id = auth.uid()`
   - Insert: `user_id = auth.uid()`
   - Update: `user_id = auth.uid()`
   - Delete: `user_id = auth.uid()`

## Getting Started
Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
```
Open http://localhost:3000.

Build and start:
```bash
npm run build
npm start
```

Lint:
```bash
npm run lint
```

## Conventions & Notes
- Server Components fetch authenticated data; client components consume hydrated state via `AuthProvider`.
- Forms use server actions + Zod for robust validation.
- Dates are rendered with utilities to avoid timezone drift and formatted consistently.
- UI uses small, composable components; prefer consistent naming and lowercase routes.

## Deployment
- Recommended: Vercel + Supabase.
- Set environment variables in your hosting provider.
- Ensure Supabase policies are in place before going live.

## Roadmap Ideas
- Workout history charts and progress analytics
- Template workouts and quick-add flows
- Mobile-focused refinements
- Unit tests for actions and utilities

## License
MIT
