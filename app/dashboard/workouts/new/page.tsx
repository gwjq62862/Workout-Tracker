"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dumbbell, Info, Plus, Trash, Trash2 } from "lucide-react";
import { createWorkoutAction } from "@/lib/action/workout";
import { WorkoutState } from "@/lib/type/workoutType";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export type Exercise = {
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
    <div className="container max-w-4xl py-6 space-y-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Workout</h1>
        <p className="text-muted-foreground text-sm">
          Plan your session and track your performance.
        </p>
      </header>

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="exercises" value={JSON.stringify(exercises)} />

        <Card className="shadow-sm border-muted-foreground/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-4 h-4" />
              <CardTitle className="text-lg">General Info</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs uppercase font-bold text-muted-foreground">Workout Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Upper Body Power"
                className="bg-muted/30 focus-visible:ring-primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {state?.fieldErrors?.title && (
                <p className="text-xs font-medium text-destructive">{state.fieldErrors.title[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-xs uppercase font-bold text-muted-foreground">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                className="bg-muted/30"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {state?.fieldErrors?.date && (
                <p className="text-xs font-medium text-destructive">{state.fieldErrors.date[0]}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Exercises</h2>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addExercise}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Exercise
            </Button>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div 
                key={index} 
                className="group relative bg-card border rounded-xl p-4 hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5 space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Exercise Name</Label>
                    <Input
                      placeholder="Bench Press"
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, "name", e.target.value)}
                      className="border-none bg-muted/50 focus-visible:ring-1"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Sets</Label>
                    <Input
                      placeholder="0"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(index, "sets", e.target.value)}
                      className="border-none bg-muted/50 text-center"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Reps</Label>
                    <Input
                      placeholder="0"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(index, "reps", e.target.value)}
                      className="border-none bg-muted/50 text-center"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Weight (kg)</Label>
                    <Input
                      placeholder="0"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(index, "weight", e.target.value)}
                      className="border-none bg-muted/50 text-center"
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    {exercises.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => removeExercise(index)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {state?.fieldErrors?.exercises && (
            <p className="text-sm font-medium text-destructive px-1">{state.fieldErrors.exercises[0]}</p>
          )}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4">
          {state?.error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center font-medium">
              {state.error}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20" 
            disabled={isPending}
          >
            {isPending ? "Syncing to Cloud..." : "Complete Workout"}
          </Button>
        </div>
      </form>
    </div>
  );
}
