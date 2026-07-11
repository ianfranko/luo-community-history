# Deploying Luo League of Nations to Namecheap (Stellar / cPanel)

This guide is written for **this account specifically**:

| Thing | Value |
|---|---|
| cPanel user | `housgyhk` |
| Home directory | `/home/housgyhk` |
| Shared server IP | `66.29.146.110` |
| Site domain | `luoleagueofnations.com` (addon domain, already created) |
| App folder (Application Root) | `/home/housgyhk/luoleagueofnations.com` |
| Hosting plan | Stellar (CloudLinux 8, ~1 GB RAM, 1 core, no swap) |
| Stack | Next.js 15.5.6 (App Router) · Prisma 6 · NextAuth v5 · **MySQL/MariaDB** |

> **Why this exact procedure?** It was verified against current Namecheap, cPanel, Phusion Passenger, Prisma and Next.js docs. The two things that make most cPanel Next.js deploys fail are baked in here:
> 1. **Passenger** runs a startup file (`server.js`), not `next start`.
> 2. **Prisma's query engine is OS-specific** — a Windows build crashes on Linux. We fix this by installing + generating Prisma **on the server**, never uploading `node_modules`.

---

## ⚠️ Read first: what changed locally, and what this costs you

The repo has been switched from **SQLite → MySQL**. That means:

- **Local development now needs a MySQL/MariaDB**, not the old `dev.db` file. Easiest option:
  ```bash
  docker run --name luo-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=luo -p 3306:3306 -d mysql:8
  ```
  then set local `.env`: `DATABASE_URL="mysql://root:root@localhost:3306/luo"`
- The old SQLite migrations **have already been regenerated for MySQL** — `prisma/migrations/` now holds a single MySQL `init` migration and `migration_lock.toml` reads `provider = "mysql"`. On the server you just run `prisma migrate deploy` (Step 6). No local MySQL is required to deploy.

Changes already made for you:
- `prisma/schema.prisma`: provider → `mysql`; added `binaryTargets`; added `@db.Text` to NextAuth token fields + `bio`.
- `prisma/migrations/`: regenerated for MySQL (SQLite migrations + tracked `dev.db` removed; `dev.db` is now gitignored).
- `package.json`: added `"postinstall": "prisma generate"`.
- `server.js`: created (Passenger entry point).
- `next.config.ts`: **left unchanged** — `output: 'standalone'` is deliberately NOT used (see note above).

---

## Step 1 — Migrations (already done)

The MySQL migration is already committed (`prisma/migrations/20260626114338_init/`), so there's **nothing to regenerate**. Just run `npx prisma migrate deploy` on the server in Step 6.

If you ever change `schema.prisma`, generate the follow-up migration locally against a MySQL instance:
```bash
# with a local MySQL running and DATABASE_URL pointing at it:
npx prisma migrate dev --name <describe_change>
git add prisma/migrations && git commit -m "<describe_change>"
```

---

## Step 2 — Create the MySQL database in cPanel

cPanel → **MySQL® Databases**:
1. **Create New Database** → type a short name, e.g. `luohist`. cPanel saves it as **`housgyhk_luohist`**.
2. **Add New User** → e.g. `app` → becomes **`housgyhk_app`**. Use a strong password; **avoid `@ : / # $`** to skip URL-encoding headaches (or encode them later).
3. **Add User To Database** → select the user + db → **ALL PRIVILEGES** → Make Changes.

> Username cap is 32 chars *including* the `housgyhk_` prefix — keep the suffix short.

Your `DATABASE_URL` will be (note the **low** connection limit — shared MySQL caps total connections):
```
mysql://housgyhk_app:PASSWORD@localhost:3306/housgyhk_luohist?connection_limit=3&pool_timeout=20&connect_timeout=15
```
- Percent-encode special chars in the password (`@`→`%40`, `$`→`%24`, `#`→`%23`).
- If you later get **P1001 "Can't reach database server at localhost:3306"**, change `localhost` → `127.0.0.1`.

---

## Step 3 — Build locally (NEVER on the server)

Stellar has ~1 GB RAM and no swap; `next build` will likely be OOM-killed (a bare `Killed`). Build on your machine:
```bash
npm install          # ensures Prisma client is generated locally
npm run build        # produces .next/
```
Confirm your local Node major version so it matches cPanel:
```bash
node -v
```

---

## Step 4 — Get the code onto the server

Upload into **`/home/housgyhk/luoleagueofnations.com`**. Two ways:

**Zip upload (simplest):** zip the project **excluding** `node_modules`, `.git`, and `.next/cache`. Include: `.next/`, `public/`, `src/`, `prisma/` (with the **new MySQL** migrations), `package.json`, `package-lock.json`, `next.config.ts`, `server.js`. Upload via **File Manager** and Extract.

**Git (cleaner for updates):** cPanel → **Git™ Version Control** → clone your GitHub repo into the app folder. Because `.next` and `.env` are gitignored, after each pull you still **upload the locally-built `.next/` separately** and set env vars in the UI (Step 5). Use `.cpanel.yml` only to copy files — **do not** run `npm run build` in it (OOM + deploy-timeout risk).

> First clear any placeholder `index.html`/`default` files Namecheap put in the addon-domain folder.

---

## Step 5 — Create the Node.js app

cPanel → **Setup Node.js App** → **Create Application**:
- **Node.js version:** match your local major (verify 18.18+ / 20 is offered for Next 15).
- **Application mode:** **Production** ← sets `NODE_ENV=production` (also makes `src/lib/prisma.ts` use the singleton).
- **Application root:** `luoleagueofnations.com`
- **Application URL:** `luoleagueofnations.com`
- **Application startup file:** `server.js`
- **Create.**

Then **Add Variable** (this replaces your gitignored `.env`):
| Variable | Value |
|---|---|
| `DATABASE_URL` | the MySQL URL from Step 2 |
| `AUTH_SECRET` | a long random string (`openssl rand -base64 32`) |
| `NEXTAUTH_SECRET` | same value (set both — v5 is on beta here) |
| `AUTH_URL` | `https://luoleagueofnations.com` |
| `NEXTAUTH_URL` | `https://luoleagueofnations.com` |
| `AUTH_TRUST_HOST` | `true` (required behind the cPanel/Passenger reverse proxy) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | only if using Google login (otherwise omit — it's optional in `auth.ts`) |
| `NEXT_PUBLIC_GOOGLE_ENABLED` | `false` to hide the Google button when you're not using Google login (build-time; must be set before `npm run build`) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics id like `G-XXXXXXXXXX` (optional; build-time — set before `npm run build`) |

> **Build-time vars:** `NEXT_PUBLIC_*` values are inlined at `npm run build`, not read at runtime. Set them in your local `.env` **before** Step 3, not just in the cPanel UI.

---

## Step 6 — Install deps + set up the DB on the server

In the Node.js App page, click **Run NPM Install** (or via **Terminal**):
```bash
source /home/housgyhk/nodevenv/luoleagueofnations.com/<VER>/bin/activate
cd ~/luoleagueofnations.com
npm install                 # postinstall runs `prisma generate` → builds the LINUX engine
npx prisma migrate deploy   # applies the committed MySQL migration to your DB
```
(Optional sanity check: `openssl version` → `1.1.1` means CloudLinux 8; `3.x` means CL9. Both engines are already bundled, so this is informational only.)

---

## Step 7 — Start & point DNS

1. In **Setup Node.js App** → **Restart** (Passenger doesn't watch files; restart after every deploy).
2. cPanel → check the addon domain's A record points to **`66.29.146.110`** (Namecheap → `luoleagueofnations.com` → Advanced DNS, A record `@` → `66.29.146.110`; also `www`).
3. **SSL:** you already own a PositiveSSL for this domain (active → Nov 7 2026). Install it via cPanel → **SSL/TLS** → *Manage SSL sites*, or let **AutoSSL** issue one.

---

## Step 8 — Verify
- Load `https://luoleagueofnations.com` — confirm CSS/JS/images load (no 404s in devtools).
- Test **login** (Credentials provider exercises bcryptjs + a Prisma round-trip to MySQL).
- Check `/family-tree` renders and `/clan-tree.svg` loads.

---

## Redeploying later
```
build locally → upload new .next/ + changed files → (if schema changed) npx prisma migrate deploy → Restart app
```

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `Killed` during build | OOM on Stellar | Build locally only (Step 3) |
| `Query engine ... could not be found` / `libssl` error | Windows Prisma engine uploaded | Don't upload `node_modules`; run `npm install` + `prisma generate` on server |
| `P1001 Can't reach database server at localhost:3306` | socket vs TCP | Change `localhost` → `127.0.0.1` in `DATABASE_URL` |
| `Too many connections` / `P2024` | pool too big for shared MySQL | Keep `connection_limit=3` in URL |
| CSS/JS 404, unstyled site | static assets missing | Ensure full `.next/` and `public/` uploaded; Restart |
| 503 / app won't start | wrong startup file or Node version | Startup file = `server.js`; match Node version; check stderr log in Node.js App page |
| `migration_lock.toml` provider mismatch | stray old SQLite migration re-added | `migration_lock.toml` must read `provider = "mysql"`; remove any SQLite migration folder |

## Items to confirm on your account (low-confidence in research)
- Exact **MySQL max_connections** on Stellar isn't published — `connection_limit=3` is safe; raise only after checking.
- **Node version** parity: ensure the cPanel dropdown offers your local major version.
- **CloudLinux 8 vs 9**: both Prisma targets are bundled, so either works; `openssl version` confirms which.
