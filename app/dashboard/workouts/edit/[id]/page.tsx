import EditWorkoutForm from "@/components/dashboard/workouts/edit/EditWorkoutForm";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditWorkoutPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: workout } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single();

  if (!workout) notFound();

  return <EditWorkoutForm workout={workout} />;
}
