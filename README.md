# Portfolio

Personal portfolio site at `robertdamiano-dev.web.app`.

## Tech

- Next.js (App Router) + Tailwind CSS
- MDX content for `/projects`, `/blog`, `/lab`
- Firebase Hosting (SSR via `frameworksBackend`)

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Copy env template:
   ```bash
   cp .env.local.example .env.local
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Deploy to Firebase (SSR)

1. Create/select a Firebase project (Blaze plan required for SSR).
2. Set the project id in `.firebaserc` (or run `firebase use --add`).
3. Deploy:
   ```bash
   npm run firebase:deploy
   ```

## CI deploy (GitHub Actions)

Deploys run automatically on pushes to `main` via `.github/workflows/deploy.yml`.

1. Create a Firebase/GCP service account key with permission to deploy Hosting and update the SSR framework backend (Cloud Run–related roles are often required in addition to Hosting; expand IAM if deploy logs show permission errors).
2. In GitHub repo settings, add secret `GOOGLE_APPLICATION_CREDENTIALS` with the full JSON key.
3. Push to `main`; workflow will run `npm ci`, `npm run lint`, `npm run build`, then enable the web frameworks experiment and deploy:
   ```bash
   npx firebase experiments:enable webframeworks
   npx firebase deploy --only hosting --project robertdamiano-dev --force
   ```

If CI deploy fails and you need local recovery:

```bash
npx firebase login --reauth
npx firebase experiments:enable webframeworks
npx firebase deploy --only hosting --project robertdamiano-dev --force
```

## Adding content

Content lives in the `content/` directory as MDX files, organized by collection:

```
content/
  blog/          → /blog/:slug
  projects/      → /projects/:slug
  lab/           → /lab/:slug
```

### Create a new post

1. Add a `.mdx` file in the appropriate collection folder. The filename becomes the URL slug (e.g. `content/blog/my-post.mdx` → `/blog/my-post`).
2. Include frontmatter at the top of the file:

```mdx
---
title: My Post Title # required
summary: A short description # optional, shown in lists and meta tags
date: "2026-01-15" # optional, used for sorting blog posts
featured: true # optional; featured projects sort first on /projects; up to two appear on the homepage
liveUrl: https://example.com # optional, "Live" link on project pages
repoUrl: https://github.com/… # optional, "Source" link on project pages
---

Your markdown/MDX content here.
```

### Images

Place images in `public/images/` and reference them in MDX as `![alt text](/images/filename.png)`. Local paths under `public/` go through `next/image` with optimization. Remote image URLs (`http`/`https` in MDX) use the same component but are loaded unoptimized.

### Formatting

Run `npm run format` to auto-format all files with Prettier, or `npm run format:check` to verify formatting without writing changes.

## Custom domain (optional)

To use a custom domain, add it in Firebase Hosting and follow the DNS instructions.
