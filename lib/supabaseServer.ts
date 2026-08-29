import "server-only";
import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY client. Imported exclusively by app/api/export/[bank]/route.ts,
// which runs on the server and is never bundled into browser JS.
//
// Prefers SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix, so it is never
// exposed to the client) if it's set, since export needs to read all rows
// for a bank regardless of RLS. If you'd rather not use a service key at all,
// set an RLS policy that allows anon SELECT on `submissions` and leave
// SUPABASE_SERVICE_ROLE_KEY unset — this client will fall back to the anon key.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || (!serviceKey && !anonKey)) {
  throw new Error(
    "Missing Supabase server env vars: need NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabaseServer = createClient(supabaseUrl, serviceKey ?? anonKey!, {
  auth: { persistSession: false },
});
