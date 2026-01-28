"use client";

import { Dumbbell, LineChart, Clock } from "lucide-react";
import Feature from "./feature";

const featureData = [
  {
    icon: Dumbbell,
    title: "Log your workouts easily",
    content:
      "Track exercises, sets, reps, and weights in seconds so you can focus on training, not typing.",
  },
  {
    icon: LineChart,
    title: "See your progress clearly",
    content:
      "Visualize your workout history and improvements over time to stay motivated and consistent.",
  },
  {
    icon: Clock,
    title: "Stay consistent",
    content:
      "Build a routine by tracking every session and turning workouts into a habit.",
  },
];

const Feature02 = () => {
  return <Feature featureData={featureData} />;
};

export default Feature02;
