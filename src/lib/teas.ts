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

const TEA_COLUMNS =
  "id, name, emoji, category, caffeine, flavors, goals, times, steep_temp, steep_time, description, ritual";

function mapTeaRow(row: TeaRow): Tea {
  return {
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
  };
}

export async function getTeas(): Promise<Tea[]> {
  const { data, error } = await supabase.from("teas").select(TEA_COLUMNS);

  if (error) throw error;

  return (data as TeaRow[]).map(mapTeaRow);
}

export async function getTeasByIds(ids: string[]): Promise<Tea[]> {
  if (ids.length === 0) return [];

  const { data, error } = await supabase.from("teas").select(TEA_COLUMNS).in("id", ids);

  if (error) throw error;

  return (data as TeaRow[]).map(mapTeaRow);
}
