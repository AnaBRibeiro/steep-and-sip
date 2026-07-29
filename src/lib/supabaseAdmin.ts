import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Uses the service_role key, which bypasses Row Level Security entirely.
 * Must never be imported from a "use client" file or exposed to the browser.
 */
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
