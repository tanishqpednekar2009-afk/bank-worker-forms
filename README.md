# Bank Worker Form System — Demo V1

Mobile-first worker submission system: select a bank, fill that bank's
exact form, submit, and (for HDFC/Jana) get an auto-generated Sr. No.
Includes a minimal per-bank Excel export.

## Scope (Demo V1 only)

Implemented: bank selection → bank-specific form → validation → Supabase
storage → success screen → Excel export per bank.

Not implemented (by design, deferred): permanent/on-call attendance,
owner dashboard, analytics, authentication, payments, bank API
integration, notifications, native app, production deployment.

## Setup

1. Install dependencies (requires network access — this was not run in
   the build sandbox):
   ```
   npm install
   ```
2. Create a Supabase project, then run the migration:
   ```
   supabase/migrations/0001_init.sql
   ```
   (Paste it into the Supabase SQL editor, or use `supabase db push` if
   you have the CLI linked to the project.)
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (optional — see comment in `.env.example`)
4. Run the dev server:
   ```
   npm run dev
   ```
5. Worker flow: `http://localhost:3000/`
   Export screen: `http://localhost:3000/export`

## Checks to run locally (network was unavailable in the build sandbox)

```
npm install
npm run typecheck
npm run lint
npm run build
```
I was not able to execute these here — see the "What I could not verify"
note below. Please run them before treating this as done, and send me any
errors to fix.

## Manual test checklist

- [ ] Submit a dummy HDFC entry → confirmation shows an auto Sr. No.
- [ ] Submit a second HDFC entry → Sr. No. increments by 1 (no duplicates).
- [ ] Same two checks for Jana.
- [ ] Submit a dummy HDB entry → confirmation shows no Sr. No. (none expected).
- [ ] Submit a dummy Kotak entry → confirmation shows no Sr. No.
- [ ] Each bank form shows only that bank's fields, in the exact given order/labels.
- [ ] Leaving a required field blank shows an inline error and blocks submit.
- [ ] `/export` → download each bank's Excel → header row matches the
      exact field order/labels from the spec, HDFC/Jana include Sr. No.
      as the first column, HDB/Kotak do not have a Sr. No. column at all.

## Production security note

RLS policies in this migration are intentionally open (`using (true)`) for
anon insert/select — there is no worker authentication in Demo V1, so this
is only appropriate for dummy/test data in a demo environment. Before any
real customer or bank data touches this system, tighten RLS (e.g. scope
reads to an authenticated role) and add real authentication — both are
explicitly out of scope for Demo V1 per the approved plan.

## Using dummy data only

This build should only be tested with fake customer names, fake loan/GL/APAC
numbers, and fake amounts — no real bank or customer data, per the approved
constraints for this demo.
