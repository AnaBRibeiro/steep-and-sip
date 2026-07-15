import { teas } from "./teas";
import {
  CaffeineLevel,
  Flavor,
  Goal,
  QuizAnswers,
  QuizQuestion,
  RitualPace,
  Tea,
  TimeOfDay,
} from "./types";

const CAFFEINE_ORDER: CaffeineLevel[] = ["none", "low", "medium", "high"];

export const questions: [
  QuizQuestion<Goal>,
  QuizQuestion<CaffeineLevel>,
  QuizQuestion<TimeOfDay>,
  QuizQuestion<Flavor>,
  QuizQuestion<RitualPace>,
] = [
  {
    id: "goal",
    question: "What's your main goal right now?",
    helper: "Pick the one that matters most today.",
    options: [
      { value: "relax", label: "Relax & unwind", description: "Ease tension and slow down", emoji: "🍃" },
      { value: "energy", label: "Boost energy & focus", description: "Feel alert and clear-headed", emoji: "⚡" },
      { value: "digestion", label: "Ease digestion", description: "Settle your stomach", emoji: "🌱" },
      { value: "sleep", label: "Better sleep", description: "Wind down for rest", emoji: "🌙" },
      { value: "wellness", label: "General wellness", description: "Everyday nourishment", emoji: "🌼" },
    ],
  },
  {
    id: "caffeine",
    question: "How much caffeine do you want?",
    helper: "We'll only suggest teas within your comfort zone.",
    options: [
      { value: "none", label: "Caffeine-free", description: "None at all", emoji: "🚫" },
      { value: "low", label: "A little", description: "Gentle, low-caffeine teas", emoji: "🙂" },
      { value: "medium", label: "Moderate", description: "A steady, balanced lift", emoji: "☕" },
      { value: "high", label: "Full strength", description: "Bring on the caffeine", emoji: "🔋" },
    ],
  },
  {
    id: "time",
    question: "What time of day is this for?",
    helper: "We'll build your full-day routine around this.",
    options: [
      { value: "morning", label: "Morning", description: "Starting the day", emoji: "🌅" },
      { value: "afternoon", label: "Afternoon", description: "Midday reset", emoji: "☀️" },
      { value: "evening", label: "Evening", description: "Winding down", emoji: "🌆" },
    ],
  },
  {
    id: "flavor",
    question: "What flavors call to you?",
    helper: "Trust your instinct here.",
    options: [
      { value: "earthy", label: "Earthy & robust", description: "Grounded, full-bodied", emoji: "🟤" },
      { value: "floral", label: "Floral & light", description: "Soft and fragrant", emoji: "🌸" },
      { value: "fruity", label: "Fruity & sweet", description: "Bright and juicy", emoji: "🍓" },
      { value: "spiced", label: "Spiced & warming", description: "Cozy and bold", emoji: "🫚" },
      { value: "fresh", label: "Fresh & herbal", description: "Clean and crisp", emoji: "🌿" },
    ],
  },
  {
    id: "pace",
    question: "How do you like to prepare tea?",
    helper: "There's no wrong answer.",
    options: [
      { value: "quick", label: "Quick & simple", description: "Steep and go", emoji: "⏱️" },
      { value: "slow", label: "A slow ritual", description: "Savor the whole process", emoji: "🕯️" },
    ],
  },
];

function caffeineIndex(level: CaffeineLevel): number {
  return CAFFEINE_ORDER.indexOf(level);
}

function scoreTea(tea: Tea, goal: Goal, time: TimeOfDay, flavor: Flavor): number {
  let score = 0;
  if (tea.goals.includes(goal)) score += 3;
  if (tea.times.includes(time)) score += 2;
  if (tea.flavors.includes(flavor)) score += 2;
  return score;
}

function poolForCaffeine(maxLevel: CaffeineLevel): Tea[] {
  const maxIndex = caffeineIndex(maxLevel);
  return teas.filter((tea) => caffeineIndex(tea.caffeine) <= maxIndex);
}

function pickBest(pool: Tea[], goal: Goal, time: TimeOfDay, flavor: Flavor, exclude: Set<string>): Tea {
  const candidates = pool.filter((tea) => !exclude.has(tea.id));
  const searchPool = candidates.length > 0 ? candidates : pool;
  let best = searchPool[0];
  let bestScore = -1;
  for (const tea of searchPool) {
    const s = scoreTea(tea, goal, time, flavor);
    if (s > bestScore) {
      bestScore = s;
      best = tea;
    }
  }
  return best;
}

export interface DailyRoutineEntry {
  time: TimeOfDay;
  tea: Tea;
}

export interface RoutineResult {
  primary: Tea;
  routine: DailyRoutineEntry[];
}

const TIME_LABELS: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export { TIME_LABELS };

/** Evening should stay gentle regardless of stated caffeine tolerance, per common tea guidance. */
const TIME_CAFFEINE_CAP: Record<TimeOfDay, CaffeineLevel> = {
  morning: "high",
  afternoon: "medium",
  evening: "low",
};

export function buildRoutine(answers: QuizAnswers): RoutineResult {
  const { goal, caffeine, time, flavor } = answers;

  const primaryPool = poolForCaffeine(caffeine);
  const primary = pickBest(primaryPool, goal, time, flavor, new Set());

  const used = new Set<string>([primary.id]);
  const routine: DailyRoutineEntry[] = (["morning", "afternoon", "evening"] as TimeOfDay[]).map(
    (slot) => {
      const cap = CAFFEINE_ORDER[Math.min(caffeineIndex(caffeine), caffeineIndex(TIME_CAFFEINE_CAP[slot]))];
      const pool = poolForCaffeine(cap);
      const tea = slot === time ? primary : pickBest(pool, goal, slot, flavor, used);
      used.add(tea.id);
      return { time: slot, tea };
    }
  );

  return { primary, routine };
}

export function ritualText(tea: Tea, pace: RitualPace): string {
  if (pace === "slow") {
    return `${tea.ritual} Take an extra moment: warm your cup first, breathe slowly while it steeps, and savor the aroma before your first sip.`;
  }
  return tea.ritual;
}
