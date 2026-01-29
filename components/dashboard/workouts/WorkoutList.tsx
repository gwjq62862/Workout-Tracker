"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { dateFormatter } from "@/lib/utils";
import { Dumbbell, Calendar, MoreVertical, Trash2, Eye, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

export default function WorkoutList({ workouts }: { workouts: Workout[] }) {
  const router = useRouter();
  const supabase = createClient();

  async function deleteWorkout(id: string) {
    const confirmDelete = confirm("Are you sure you want to delete this workout?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete workout");
    } else {
      toast.success("Workout deleted");
      router.refresh();
    }
  }

  if (workouts.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Dumbbell className="text-primary size-6" />
          </div>
          <div className="space-y-1">
            <p className="font-medium">No workouts yet</p>
            <p className="text-sm text-muted-foreground">Log your first session to see it here.</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/workouts/new">Create Workout</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your History</h1>
        <p className="text-sm text-muted-foreground">{workouts.length} total sessions</p>
      </div>

      <div className="grid gap-3">
        {workouts.map((workout) => (
          <Card key={workout.id} className="group hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Dumbbell className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{workout.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {dateFormatter.format(new Date(workout.workout_date))}
                    </span>
                    <span>•</span>
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Desktop Quick Actions */}
                <Button size="icon" variant="ghost" className="hidden sm:flex" asChild>
                  <Link href={`/dashboard/workouts/${workout.id}`}>
                    <Eye className="size-4" />
                  </Link>
                </Button>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      id={`dropdown-trigger-${workout.id}`} 
                    >
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/workouts/edit/${workout.id}`} className="cursor-pointer">
                        <Pencil className="mr-2 size-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive cursor-pointer"
                      onClick={() => deleteWorkout(workout.id)}
                    >
                      <Trash2 className="mr-2 size-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
