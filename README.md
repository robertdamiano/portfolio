# Portfolio

Personal portfolio site for `robertdamiano.dev`.

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

1. Create a Firebase service account key with permissions to deploy Hosting.
2. In GitHub repo settings, add secret `GOOGLE_APPLICATION_CREDENTIALS` with the full JSON key.
3. Push to `main`; workflow will run `npm ci`, `npm run lint`, `npm run build`, then:
   ```bash
   npx firebase deploy --only hosting --project robertdamiano-dev
   ```

If CI deploy fails and you need local recovery:

```bash
npx firebase login --reauth
npx firebase deploy --only hosting --project robertdamiano-dev
```

## Custom domain

After the first deploy, add `robertdamiano.dev` as a custom domain in Firebase Hosting and follow the DNS instructions.
