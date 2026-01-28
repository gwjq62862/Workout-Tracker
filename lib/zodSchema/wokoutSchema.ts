import { z } from "zod";

export const createWorkoutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  exercises: z.array(
    z.object({
      name: z.string().min(1, "Exercise name is required"),
      sets: z.coerce.number().int().min(1, "Sets must be at least 1"),
      reps: z.coerce.number().int().min(1, "Reps must be at least 1"),
      weight: z.coerce.number().optional(),
    })
  ),
});
