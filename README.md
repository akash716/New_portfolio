# Akash OS Portfolio

Responsive portfolio built with React, TypeScript, Vite, Tailwind CSS, and Motion. The site is a static client-side app; it does not require a backend or environment variables to deploy.

## Local development

Requires Node.js 20.19+ (or 22.12+) and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The interface uses a full-screen layout on phones and a centered phone frame on larger screens.

## Checks and production build

```bash
npm run lint
npm run build
npm run preview
```

The production site is written to `dist/`. Deploy the contents of that folder to a static host such as Vercel, Netlify, or Cloudflare Pages. Set the project root to this folder and the build command to `npm run build`; no output-directory rewrite rules are required because app navigation uses URL hashes.

The résumé is served from `public/Akash_Patankar_Resume.pdf`. `npm run build` leaves that provided PDF unchanged. `npm run generate:resume` is an optional local script that regenerates it from the résumé template.

## Portfolio content and assets

- Edit personal details, experience, project copy, skills, and education in `src/data/portfolio.ts`.
- Project screenshots and the wallpaper are stored in `src/assets/images/` as WebP to reduce initial and on-demand transfer size.
- App screens are loaded on demand; the project detail, résumé, and settings screens are split from the initial bundle.
- Theme, reduced motion, and other preferences are stored in the browser's local storage.

The app uses Google Fonts when a network connection is available and falls back to system fonts when it is not.
