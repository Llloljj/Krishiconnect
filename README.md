# KrishiConnect

AI-powered contract farming platform connecting farmers, companies, and FPOs.

## Quick start

```bash
# Install dependencies
npm run install:all

# 1. Run SQL schema in Supabase (Dashboard → SQL → paste server/supabase_schema.sql)
# 2. Seed demo data (optional)
npm run seed

# Start backend + frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Environment

Copy `server/.env.example` to `server/.env` and set:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY` (publishable key)
- `SUPABASE_SERVICE_ROLE_KEY` (secret key)

Optional: `GEMINI_API_KEY` for live Gemini responses (otherwise smart fallbacks are used).
You can override the default model with `GEMINI_MODEL`; the default is `gemini-2.5-flash`.

## API highlights

| Endpoint | Description |
|----------|-------------|
| `POST /api/auth/signup` | Register user |
| `POST /api/auth/login` | Login |
| `POST /api/farmers` | Farmer profile |
| `POST /api/company/requirements` | Company crop demand |
| `GET /api/matches/requirements/:id` | AI farmer matching |
| `POST /api/ai/consult` | AI agriculture assistant |
| `GET /api/dashboard/farmer` | Farmer dashboard data |
| `GET /api/dashboard/company` | Company dashboard data |
