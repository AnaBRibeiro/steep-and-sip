export type Goal = "relax" | "energy" | "digestion" | "sleep" | "wellness";
export type CaffeineLevel = "none" | "low" | "medium" | "high";
export type TimeOfDay = "morning" | "afternoon" | "evening";
export type Flavor = "earthy" | "floral" | "fruity" | "spiced" | "fresh";
export type RitualPace = "quick" | "slow";

export interface Tea {
  id: string;
  name: string;
  emoji: string;
  category: string;
  caffeine: CaffeineLevel;
  flavors: Flavor[];
  goals: Goal[];
  times: TimeOfDay[];
  steepTemp: string;
  steepTime: string;
  description: string;
  ritual: string;
}

export interface QuizAnswers {
  goal: Goal;
  caffeine: CaffeineLevel;
  time: TimeOfDay;
  flavor: Flavor;
  pace: RitualPace;
}

export interface QuizOption<T extends string> {
  value: T;
  label: string;
  description: string;
  emoji: string;
}

export interface QuizQuestion<T extends string> {
  id: keyof QuizAnswers;
  question: string;
  helper: string;
  options: QuizOption<T>[];
}
