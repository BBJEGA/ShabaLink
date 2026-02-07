# Shabalink VTU

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase Keep-Alive

To prevent Supabase from pausing the project due to inactivity, a GitHub Action is configured in `.github/workflows/keep_alive.yml`.

### Setup
1.  Go to your GitHub Repository Settings > Secrets and variables > Actions.
2.  Add the following Repository Secrets:
    -   `SUPABASE_URL`: Your Supabase Project URL.
    -   `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key (found in Project Settings > API).

The script `scripts/supabase-ping.js` will run every 48 hours to fetch a row from the database, keeping it active.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
