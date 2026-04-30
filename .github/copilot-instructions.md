# Copilot instructions for Deploy Fest

## Build, run, lint
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## High-level architecture
- **Next.js App Router**: Routes live in `app/` with `app/layout.tsx` as the root layout.
- **Public pages + forms**: `/apply/mentor` and `/apply/participant` are client components that submit JSON to API routes.
- **API routes**: `app/api/**/route.ts` handle mentor applications, participant registrations, and admin operations (login/logout, mentor status updates, participant export).
- **Supabase access**:
  - `lib/supabase.ts` provides the public anon client (used for form inserts).
  - `lib/supabase-admin.ts` provides a server-only service-role client for admin reads/updates and XLSX export.
- **Admin auth**: `lib/admin-auth.ts` signs/verifies the `deployfest_admin_session` cookie using `ADMIN_SESSION_SECRET` and validates `ADMIN_USERNAME`/`ADMIN_PASSWORD`.
- **Email**: `lib/email.ts` sends participant confirmation via SMTP credentials.
- **Database schema**: `supabase-schema.sql`, `mentor.sql`, and `participants.sql` are the source of truth for Supabase table setup/migrations.

## Key conventions
- **Form → API flow**: Client pages POST JSON to `/api/*` and convert UI yes/no values to booleans before sending.
- **Validation + errors**: API routes perform explicit field validation and return `{ error: string }` with 400/409/500 status codes; keep this shape for new endpoints.
- **Admin-only operations**: Guard with `verifyAdminSessionToken` and use the admin Supabase client on the server (never in client components).
- **Supabase client creation**: Use `getSupabaseClient()` / `getSupabaseAdminClient()`; they throw if env vars are missing, so avoid creating clients ad-hoc.

## Extra details (added by analysis)

### Build, test, and lint
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`
- Tests: there is no test runner or `test` script configured in package.json. If tests are added, a common pattern is to add a `test` script (Jest/Vitest). Once a test script exists, run a single test file with e.g. `npm test -- path/to/file` (test runner dependent).

### High-level architecture (expanded)
- Framework: Next.js App Router (routes under `app/`, `app/layout.tsx` is the root layout).
- Public pages & forms:
  - `/apply/mentor` — client component; uploads a headshot via multipart/form-data (FormData) and posts to `/api/mentor-application`.
  - `/apply/participant` — client component; posts JSON to `/api/participant-registration` (converts UI yes/no to booleans).
- API routes: `app/api/**/route.ts`. Most routes are wrapped with `withApiAuditLogging()` which emits NDJSON audit records to `.recovery-logs` (configurable by `API_RECOVERY_LOG_DIR`).
- Supabase:
  - `lib/supabase.ts` — public/anon client (safe for browser usage via NEXT_PUBLIC_* keys).
  - `lib/supabase-admin.ts` — server-only admin client that requires `SUPABASE_SERVICE_ROLE_KEY`. Never expose this in client code.
- Admin auth: `lib/admin-auth.ts` issues/verifies the `deployfest_admin_session` cookie (signed with `ADMIN_SESSION_SECRET`). Login is a simple username/password check against `ADMIN_USERNAME`/`ADMIN_PASSWORD` and sets the cookie server-side.
- Delivery & post-processing:
  - Participant registrations are persisted, then `waitUntil` is used to async-sync Google Sheets and send confirmation emails (see `lib/participant-delivery.ts`).
  - Failures are recorded to `participant_delivery_failures` and retried via admin endpoints.
- Recovery & audit:
  - `lib/api-audit.ts` writes structured, redacted NDJSON per-request audit logs and is the single place that captures request/response snapshots for troubleshooting.
  - `lib/submission-recovery.ts` persists failed submissions across Upstash Redis, a Supabase `submission_recovery_entries` table, and a local NDJSON fallback (non-production).
- Rate limiting & resilience:
  - `lib/rate-limit.ts` uses Upstash Redis if configured; otherwise an in-memory fallback.
  - Default limits used in handlers are typically 3 requests / 60s (see handlers in `app/api/*`).

### Key conventions & expectations
- API responses:
  - Error responses follow the shape: `{ error: string }` with proper HTTP status codes (400, 401, 403, 409, 429, 500).
  - Successful creation returns `201` and recovery-queued responses return `202` with `{ recovery_id }` and `submission_status: 'recovery_pending'`.
  - Duplicate unique-constraint DB errors surface with SQL code `23505` and are mapped to HTTP 409 in handlers.
- Request content types:
  - Mentor application: `multipart/form-data` (file field `headshot`).
  - Participant registration: `application/json`.
- Security & secrets:
  - Audit logs redact keys that match `SENSITIVE_KEY_PATTERN` (password, token, secret, cookie, api_key, etc.).
  - `ADMIN_SESSION_SECRET` must be set and at least 16 characters — `lib/admin-auth.ts` enforces this.
- Server vs client:
  - Use `getSupabaseClient()` for public operations (can be used in server and client where appropriate).
  - Use `getSupabaseAdminClient()` only in server-side code (API routes / `server-only` modules).
  - Wrap any new API route with `withApiAuditLogging(route, handler)` to get consistent audit/recovery behavior.
- Recovery & retry patterns:
  - Use `retryWithBackoff()` for DB inserts and external deliveries when the handler intends to retry.
  - If persistence fails, call `recordFailedSubmission()` so the payload is queued across Redis/Supabase/file layers.
- Rate-limiting:
  - Use `getClientRateLimitKey(request)` to derive a stable key for rate-limits from headers (X-Forwarded-For/CF headers or a UA-based fallback).

### Environment variables (high-level list)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
- SUPABASE_SERVICE_ROLE_KEY (server only)
- ADMIN_USERNAME, ADMIN_PASSWORD
- ADMIN_SESSION_SECRET (>= 16 chars)
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
- GOOGLE_SHEETS_SPREADSHEET_ID, GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, GOOGLE_SHEETS_SHEET_NAME
- UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
- API_RECOVERY_LOG_DIR (optional override for .recovery-logs)
- NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, NEXT_PUBLIC_SITE_URL
- GEMINI_API_KEY (optional)

### Where to look first (important files)
- `lib/admin-auth.ts` — admin session format and verification
- `lib/supabase.ts`, `lib/supabase-admin.ts` — Supabase clients
- `lib/api-audit.ts`, `lib/submission-recovery.ts` — audit + recovery behaviors
- `lib/participant-delivery.ts`, `lib/google-sheets.ts`, `lib/email.ts` — delivery pipeline
- `app/api/mentor-application/route.ts` — mentor multipart/form handling, headshot upload
- `app/api/participant-registration/route.ts` — participant JSON handling and background delivery
- `app/api/admin/*` — admin-only endpoints (export, retry, mentor updates)
- `supabase-schema.sql`, `mentor.sql`, `participants.sql` — database schema & migrations

### AI assistant / rules files
- No other assistant-specific rule files (CLAUDE.md, AGENTS.md, .cursorrules, .windsurfrules, etc.) were found. This file has been extended with key details from README and source.

---

If you'd like these changes committed to the repo as-is, I can commit the updated file. Otherwise tell me which sections to keep/remove or any wording changes.
