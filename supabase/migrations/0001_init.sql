-- Demo V1 schema for the bank worker form system.
-- Database is the source of truth. Excel is a downstream export only.

create extension if not exists "pgcrypto";

-- ============================================================
-- submissions
-- ============================================================
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  bank text not null check (bank in ('hdfc', 'jana', 'hdb', 'kotak')),
  -- serial_no is only populated for hdfc/jana (auto-generated). Null for hdb/kotak.
  serial_no int,
  submitted_at timestamptz not null default now(),
  -- All worker-entered field values, keyed by the FieldConfig.key used in
  -- lib/banks/*.ts. Keeping this as jsonb avoids a schema change every time
  -- a bank's field list changes and lets one table serve all four banks.
  data jsonb not null
);

create index if not exists submissions_bank_idx on submissions (bank);
create index if not exists submissions_submitted_at_idx on submissions (submitted_at);

-- ============================================================
-- bank_serial_counters
-- ============================================================
create table if not exists bank_serial_counters (
  bank text primary key check (bank in ('hdfc', 'jana')), -- only these two banks use auto Sr. No.
  next_serial int not null default 1
);

insert into bank_serial_counters (bank, next_serial)
values ('hdfc', 1), ('jana', 1)
on conflict (bank) do nothing;

-- ============================================================
-- next_serial(bank_name text) -> int
-- Atomically claims and returns the next serial number for a bank.
-- Using UPDATE ... RETURNING inside a single statement makes this safe
-- under concurrent submissions without needing an explicit transaction
-- block from the client.
-- ============================================================
create or replace function next_serial(bank_name text)
returns int
language sql
as $$
  update bank_serial_counters
  set next_serial = next_serial + 1
  where bank = bank_name
  returning next_serial - 1;
$$;

-- ============================================================
-- Row Level Security
-- ============================================================
-- Demo V1 has no worker authentication, so policies are intentionally
-- permissive (open insert/select) rather than keyed to a user. This is
-- acceptable ONLY for the demo with dummy data — see README "Production
-- security note" before using with real data.

alter table submissions enable row level security;

create policy "anon can insert submissions"
  on submissions for insert
  to anon
  with check (true);

create policy "anon can read submissions for export"
  on submissions for select
  to anon
  using (true);

alter table bank_serial_counters enable row level security;

-- No direct anon access to the counters table; it is only touched via the
-- next_serial() function, which runs with definer privileges implicitly
-- through RPC. If you call this as `security invoker` (default) and RLS
-- blocks the update, mark the function `security definer` instead:
--   alter function next_serial(text) security definer;
-- Demo V1 default: no anon policy on bank_serial_counters, and next_serial
-- is executed via RPC (which bypasses table RLS if marked security definer).
alter function next_serial(text) security definer;
