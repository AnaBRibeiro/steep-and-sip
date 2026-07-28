import { supabase } from "./supabaseClient";
import { CaffeineLevel, Flavor, Goal, Tea, TimeOfDay } from "./types";

interface TeaRow {
  id: string;
  name: string;
  emoji: string;
  category: string;
  caffeine: CaffeineLevel;
  flavors: Flavor[];
  goals: Goal[];
  times: TimeOfDay[];
  steep_temp: string;
  steep_time: string;
  description: string;
  ritual: string;
}

export async function getTeas(): Promise<Tea[]> {
  const { data, error } = await supabase
    .from("teas")
    .select("id, name, emoji, category, caffeine, flavors, goals, times, steep_temp, steep_time, description, ritual");

  if (error) throw error;

  return (data as TeaRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    emoji: row.emoji,
    category: row.category,
    caffeine: row.caffeine,
    flavors: row.flavors,
    goals: row.goals,
    times: row.times,
    steepTemp: row.steep_temp,
    steepTime: row.steep_time,
    description: row.description,
    ritual: row.ritual,
  }));
}
