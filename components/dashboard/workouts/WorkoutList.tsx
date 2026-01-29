"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
};
type Workout = {
  id: string;
  title: string;
  workout_date: string;
  exercises: Exercise[];
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});


export default function WorkoutList({ workouts }: { workouts: Workout[] }) {
  if (workouts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center space-y-4">
          <p className="text-muted-foreground">
            No workouts yet
          </p>
          <Button asChild>
            <Link href="/dashboard/workouts/create">
              Create your first workout
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Workouts</h1>
        <Button asChild>
          <Link href="/dashboard/workouts/create">New workout</Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{workout.title}</span>
                <span className="text-sm text-muted-foreground"suppressHydrationWarning>
                  {dateFormatter.format(new Date(workout.workout_date))}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {workout.exercises.length} exercises
              </p>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/dashboard/workouts/${workout.id}`}>
                    View
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/dashboard/workouts/${workout.id}/edit`}>
                    Edit
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
