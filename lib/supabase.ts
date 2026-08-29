import { createClient } from "@supabase/supabase-js";

// Browser client. Uses ONLY the public anon key — never the service role key.
// Relies on RLS policies (see supabase/migrations) to allow inserts from the
// worker form and reads from the export screen.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly at build/runtime rather than silently returning a broken client.
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
