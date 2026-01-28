export type WorkoutState = {
  error?: string;

  fieldErrors?: {
    title?: string[];
    date?: string[];
    exercises?: string[];
  };

  values?: {
    title?: string;
    date?: string;
    exercises?: {
      name: string;
      sets: number;
      reps: number;
      weight?: number;
    }[];
  };

  success?: boolean;
} | null;
