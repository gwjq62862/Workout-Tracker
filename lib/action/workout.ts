"use server";

import { createClient } from "@/lib/supabase/server";
import { createWorkoutSchema } from "../zodSchema/wokoutSchema";
import { WorkoutState } from "../type/workoutType";
import { revalidatePath } from "next/cache";

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


export async function updateWorkoutAction(
  _prevState: WorkoutState, 
  formData: FormData
): Promise<WorkoutState> {
  const supabase = await createClient();
  

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in" };

 
  const id = formData.get("id") as string;
  const rawTitle = formData.get("title") as string;
  const rawDate = formData.get("date") as string;
  const exercises = JSON.parse(formData.get("exercises") as string);


  const parsed = createWorkoutSchema.safeParse({
    title: rawTitle,
    date: rawDate,
    exercises,
  });

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
      values: {
        title: rawTitle,
        date: rawDate,
        exercises,
      },
    };
  }


  const { error } = await supabase
    .from("workouts")
    .update({
      title: parsed.data.title,
      workout_date: parsed.data.date,
      exercises: parsed.data.exercises,
    })
    .eq("id", id)
    .eq("user_id", user.id); // Extra security

  if (error) {
    return { success: false, error: "Failed to update workout" };
  }


  revalidatePath("/dashboard/workouts");
  revalidatePath(`/dashboard/workouts/${id}`);

  return { success: true };
}


