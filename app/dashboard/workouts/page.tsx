import { createClient } from "@/lib/supabase/server";

import WorkoutList from "@/components/dashboard/workouts/WorkoutList";


export default async function WorkoutPage() {
  const supabase = await createClient();





  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("id, title, workout_date, exercises, created_at")
    .order("workout_date", { ascending: false });

  if (error) {
    throw new Error("Failed to load workouts");
  }

  return (
    <div className="container max-w-5xl py-10">
      <WorkoutList workouts={workouts ?? []} />
    </div>
  );
}
