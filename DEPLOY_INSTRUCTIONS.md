# Deploying Shabalink to Vercel

Since your code is already on GitHub, deploying to Vercel is very straightforward.

## Step 1: Login to Vercel
1.  Go to [vercel.com](https://vercel.com) and log in.
2.  If you don't have an account, sign up using your **GitHub account**.

## Step 2: Import Project
1.  On your Vercel Dashboard, click **"Add New..."** -> **"Project"**.
2.  Find your `Shabalink` repository in the list and click **"Import"**.

## Step 3: Configure Project
1.  **Framework Preset**: It should automatically detect **Next.js**.
2.  **Root Directory**: Leave as `./`.
3.  **Environment Variables**:
    *   For the landing page to work, you don't strictly need API keys yet.
    *   However, for future Supabase connection, you should add:
        *   `NEXT_PUBLIC_SUPABASE_URL`: (From your Supabase Settings > API)
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (From your Supabase Settings > API)

## Step 4: Deploy
1.  Click **"Deploy"**.
2.  Vercel will build your project. This takes about a minute.
3.  Once done, you will get a live URL (e.g., `shabalink.vercel.app`).

## Future Updates
*   Every time you push code to your GitHub repository (using `git push origin main`), Vercel will automatically redeploy your site with the changes!
