"use server";

import { createClient } from "@/lib/supabase/server";
import { createWorkoutSchema } from "../zodSchema/wokoutSchema";
import { WorkoutState } from "../type/workoutType";

export async function createWorkoutAction(
  _prevState: WorkoutState,
  formData: FormData
): Promise<WorkoutState> {
  const raw = Object.fromEntries(formData.entries());

  const exercises = JSON.parse(raw.exercises as string);

  const parsed = createWorkoutSchema.safeParse({
    title: raw.title,
    date: raw.date,
    exercises,
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
      values: {
        title: raw.title as string,
        date: raw.date as string,
        exercises,
      },
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in" };
  }

  const { error } = await supabase.from("workouts").insert({
    user_id: user.id,
    title: parsed.data.title,
    workout_date: parsed.data.date,
    exercises: parsed.data.exercises,
  });

  if (error) {
    return { error: "Failed to create workout" };
  }

  return { success: true };
}
