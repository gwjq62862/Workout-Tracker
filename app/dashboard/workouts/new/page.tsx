"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { createWorkoutAction } from "@/lib/action/workout";
import { WorkoutState } from "@/lib/type/workoutType";
import { useRouter } from "next/navigation";

type Exercise = {
  name: string;
  sets: string;
  reps: string;
  weight?: string;//optional
};

export default function CreateWorkout() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: "", sets: "", reps: "", weight: "" },
  ]);
  const [state, formAction, isPending] = useActionState<WorkoutState, FormData>(createWorkoutAction, null);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", weight: "" }]);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (
    index: number,
    field: keyof Exercise,
    value: string | number
  ) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  useEffect(() => {
    if (state?.values) {
      setTitle(state.values.title ?? "");
      setDate(state.values.date ?? "");
      setExercises(
        state.values.exercises?.map((e) => ({
          name: e.name,
          sets: String(e.sets ?? ""),
          reps: String(e.reps ?? ""),
          weight: e.weight !== undefined ? String(e.weight) : ""
        })) ?? [{ name: "", sets: "", reps: "", weight: "" }]
      );
    }
  }, [state?.values]);

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard/workouts");
    }
  }, [state?.success, router]);

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Workout</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <form action={formAction} className="space-y-8">
            <input type="hidden" name="exercises" value={JSON.stringify(exercises)} />

            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}

            <div className="space-y-4">
              <div>
                <Label>Workout title</Label>
                <Input
                  name="title"
                  placeholder="Push Day"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {state?.fieldErrors?.title && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.title[0]}
                  </p>
                )}
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {state?.fieldErrors?.date && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.date[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Exercises</h3>

              {exercises.map((exercise, index) => (
                <Card key={index} className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Exercise {index + 1}</span>
                    {exercises.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeExercise(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input
                      placeholder="Exercise name"
                      value={exercise.name}
                      onChange={(e) =>
                        updateExercise(index, "name", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Sets"
                      value={exercise.sets}
                      onChange={(e) =>
                        updateExercise(index, "sets", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Reps"
                      value={exercise.reps}
                      onChange={(e) =>
                        updateExercise(index, "reps", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Weight (kg)"
                      value={exercise.weight}
                      onChange={(e) =>
                        updateExercise(index, "weight", e.target.value)
                      }
                    />
                  </div>
                </Card>
              ))}

              <Button type="button" variant="outline" onClick={addExercise}>
                <Plus className="mr-2 h-4 w-4" />
                Add exercise
              </Button>
              {state?.fieldErrors?.exercises && (
                <p className="text-sm text-red-500">
                  {state.fieldErrors.exercises[0]}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save workout"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
