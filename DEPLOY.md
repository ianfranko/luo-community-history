# Deploying Luo League of Nations (Vercel + Neon)

Hosting model: **Vercel** builds and serves the Next.js app; **Neon** is the Postgres
database. Every `git push` to `main` triggers an automatic build + deploy — no more
File Manager uploads.

| Thing | Value |
|---|---|
| App host | Vercel (free Hobby tier is enough) |
| Database | Neon Postgres (free tier) |
| Repo | `github.com/ianfranko/luo-community-history` |
| Domain | `luoleagueofnations.com` (registered at Namecheap — stays there) |
| Stack | Next.js 15 · Prisma 6 · NextAuth v5 · Postgres |

> The old Namecheap cPanel/Passenger setup is retired. `server.js` remains in the
> repo only as a fallback for a self-hosted Node deploy; Vercel ignores it.

---

## Step 1 — Create the Neon database

1. Sign up at [neon.tech](https://neon.tech) → **New Project** (pick a region near your users).
2. Open **Connection Details**. You need **two** strings:
   - **Pooled** (host contains `-pooler`) → this is `DATABASE_URL`. Append `?sslmode=require&pgbouncer=true`.
   - **Direct** (no `-pooler`) → this is `DIRECT_URL`. Append `?sslmode=require`.
3. Keep both handy for Step 3.

Why two? The app runs serverless on Vercel and opens many short-lived connections, so
it uses Neon's **pooled** link. `prisma migrate` needs a **direct** link. The schema
already wires this up (`url` + `directUrl` in `prisma/schema.prisma`).

---

## Step 2 — Import the repo into Vercel

1. Sign up at [vercel.com](https://vercel.com) with GitHub.
2. **Add New… → Project** → import `luo-community-history`.
3. Framework preset auto-detects **Next.js**. Leave build/output settings default —
   the `build` script (`prisma migrate deploy && next build`) applies migrations and
   builds in one step, and `postinstall` generates the Prisma client.
4. **Don't deploy yet** — add env vars first (Step 3), otherwise the first build fails
   at `prisma migrate deploy`.

---

## Step 3 — Environment variables (Vercel → Settings → Environment Variables)

Add these for **Production** (and Preview, if you want preview deploys to work). See
`.env.example` for the exact format.

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon **pooled** URL (`…-pooler…?sslmode=require&pgbouncer=true`) |
| `DIRECT_URL` | Neon **direct** URL (`…?sslmode=require`) |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_SECRET` | same value (v5 beta reads both) |
| `AUTH_URL` | `https://www.luoleagueofnations.com` |
| `NEXTAUTH_URL` | `https://www.luoleagueofnations.com` |
| `AUTH_TRUST_HOST` | `true` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | only if using Google login |
| `NEXT_PUBLIC_GOOGLE_ENABLED` | `false` to hide the Google button when not using it |
| `NEXT_PUBLIC_GA_ID` | Google Analytics id (optional) |

> `NEXT_PUBLIC_*` are inlined at build time — after changing one, redeploy.

Then click **Deploy**. The first build runs `prisma migrate deploy`, which creates all
tables in the empty Neon database from `prisma/migrations/`.

---

## Step 4 — Point the domain at Vercel

1. Vercel → Project → **Settings → Domains** → add `luoleagueofnations.com` and
   `www.luoleagueofnations.com`. Vercel shows the DNS records to set.
2. At **Namecheap → Domain List → Manage → Advanced DNS**, set the records Vercel gave
   you (typically an `A` record `@ → 76.76.21.21` and a `CNAME` `www → cname.vercel-dns.com`
   — use whatever Vercel currently displays).
3. Vercel issues SSL automatically once DNS resolves. No Cloudflare needed (Vercel is
   already a CDN with free SSL). If you *want* Cloudflare in front, set its SSL mode to
   **Full (strict)** and proxy only — but it's redundant here.

For **Google OAuth**, add the authorized redirect URI in Google Cloud Console:
`https://www.luoleagueofnations.com/api/auth/callback/google`.

---

## Everyday updates (the whole point)

```bash
git add -A
git commit -m "…"
git push          # → Vercel auto-builds & deploys in ~1 min
```
Schema change? Generate the migration locally against Neon, commit it, push — the deploy
runs `prisma migrate deploy` for you:
```bash
# .env has your Neon DIRECT_URL as DATABASE_URL for this local command
npx prisma migrate dev --name <describe_change>
git add prisma/migrations && git commit -m "<describe_change>" && git push
```

---

## Local development

```bash
cp .env.example .env      # fill in Neon URLs (or a local Postgres) + AUTH_SECRET
npm install
npx prisma migrate deploy # or `prisma db push` for a throwaway local DB
npm run dev
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| First deploy fails at `prisma migrate deploy` | env vars missing/incomplete | Set `DATABASE_URL` + `DIRECT_URL` in Vercel **before** deploying |
| `Can't reach database server` during build | using pooled URL for migrations | `DIRECT_URL` must be the **non-pooler** host |
| Auth redirect loop / callback errors | wrong public URL | `AUTH_URL`/`NEXTAUTH_URL` must match the live domain; `AUTH_TRUST_HOST=true` |
| `prepared statement already exists` | pooled URL missing pgbouncer flag | `DATABASE_URL` needs `&pgbouncer=true` |
| Google button errors | provider not configured | set Google keys, or `NEXT_PUBLIC_GOOGLE_ENABLED=false` |
