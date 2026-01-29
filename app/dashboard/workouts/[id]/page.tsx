import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Exercise } from "../new/page";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 
  const supabase = await createClient();


const { data: workout, error } = await supabase
  .from("workouts")
  .select("id, title, workout_date, exercises")
  .eq("id", id)
  .single();


  if (error || !workout) {
    notFound(); 
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{workout.title}</h1>
          <p className="text-muted-foreground">
            {new Date(workout.workout_date).toLocaleDateString()}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/workouts">Back to Workouts</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {workout.exercises.map((ex: Exercise, index: number) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{ex.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Sets:</span>{" "}
                  <span className="font-semibold">{ex.sets}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Reps:</span>{" "}
                  <span className="font-semibold">{ex.reps}</span>
                </div>
                {ex.weight && (
                  <div>
                    <span className="text-muted-foreground">Weight:</span>{" "}
                    <span className="font-semibold">{ex.weight} kg</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
