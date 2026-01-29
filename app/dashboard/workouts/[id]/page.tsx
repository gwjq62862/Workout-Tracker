import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ChevronLeft, Dumbbell, Hash, Repeat, Weight, Trophy, Calendar } from "lucide-react";
import { Exercise } from "../new/page";
import { dateFormatter } from "@/lib/utils";
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkoutDetailPage({ params }:  PageProps) {
   const id =  (await params).id;

  if (!id) notFound();
  const supabase = await createClient();

  const { data: workout, error } = await supabase
    .from("workouts")
    .select("id, title, workout_date, exercises")
    .eq("id", id)
    .single();

  if (error || !workout) notFound();


  const totalVolume = workout.exercises.reduce((acc: number, ex: Exercise) => 
    acc + (Number(ex.weight || 0) * Number(ex.sets || 0) * Number(ex.reps || 0)), 0
  );
  const totalReps = workout.exercises.reduce((acc: number, ex: Exercise) => 
    acc + (Number(ex.sets || 0) * Number(ex.reps || 0)), 0
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
    
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
            <Link href="/dashboard/workouts"><ChevronLeft className="mr-1 size-4" /> Back</Link>
          </Button>
          <h1 className="text-4xl font-extrabold tracking-tight">{workout.title}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="size-4" /> 
            <span suppressHydrationWarning>{dateFormatter.format(new Date(workout.workout_date))}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/workouts/${workout.id}/edit`}>Edit Session</Link>
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Weight className="size-5 text-primary mb-1" />
            <span className="text-2xl font-bold">{totalVolume.toLocaleString()}kg</span>
            <span className="text-[10px] uppercase text-muted-foreground font-semibold">Total Volume</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Hash className="size-5 text-muted-foreground mb-1" />
            <span className="text-2xl font-bold">{workout.exercises.length}</span>
            <span className="text-[10px] uppercase text-muted-foreground font-semibold">Exercises</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Repeat className="size-5 text-muted-foreground mb-1" />
            <span className="text-2xl font-bold">{totalReps}</span>
            <span className="text-[10px] uppercase text-muted-foreground font-semibold">Total Reps</span>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/5 border-orange-500/10">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Trophy className="size-5 text-orange-500 mb-1" />
            <span className="text-2xl font-bold">Done</span>
            <span className="text-[10px] uppercase text-muted-foreground font-semibold">Status</span>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* 🔵 Exercise List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Dumbbell className="size-5 text-primary" /> Workout Breakdown
        </h2>
        <div className="grid gap-4">
          {workout.exercises.map((ex: Exercise, index: number) => (
            <Card key={index} className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold">{ex.name}</CardTitle>
                  <Badge variant="secondary" className="font-mono text-[10px]">EXERCISE {index + 1}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8 py-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Sets</span>
                    <span className="text-xl font-semibold">{ex.sets}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-bold">Reps</span>
                    <span className="text-xl font-semibold">{ex.reps}</span>
                  </div>
                  {ex.weight && (
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase font-bold">Weight</span>
                      <span className="text-xl font-semibold text-primary">{ex.weight} <span className="text-sm">kg</span></span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
