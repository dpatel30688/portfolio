# Dharmesh Patel — Portfolio

A single-page portfolio built with React + TypeScript + Tailwind CSS, architected
for ultra-low-cost static hosting on AWS S3. All resume content lives in
`public/data/*.json` — none of it is hardcoded into components.

## Project structure

```
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── data/
│       ├── profile.json      # name, title, contact, summary
│       ├── skills.json       # { "Category Name": ["Skill", ...] }
│       ├── experience.json   # [{ role, company, location, period, bullets[] }]
│       └── portfolio.json    # [{ id, domain, tagline, summary, featuredProjects[] }]
└── src/
    ├── main.tsx
    ├── App.tsx               # header, hero, portfolio domains, skills matrix, timeline, footer
    ├── types.ts              # Profile / SkillMatrix / ExperienceEntry / DomainSection types
    ├── usePortfolioData.ts   # Promise.all fetch + cache-buster hook
    └── index.css
```

## Editing content

Open any file in `public/data/` and edit it directly — no rebuild required if
you're only changing text, since the app fetches these files at runtime. Keep
the same shape:

- `profile.json`: `name`, `title`, `location`, `mobile`, `email` (array), `summary`
- `skills.json`: an object where each key is a category label and each value
  is an array of skill strings
- `experience.json`: an array of `{ role, company, location, period, bullets }`
- `portfolio.json`: an array of domain objects containing `id`, `domain`, `tagline`, `summary`, and `featuredProjects` (with `technologies`, `integrations`, `highlights`)

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Outputs a static `dist/` folder (HTML, JS, CSS, and `dist/data/*.json`) ready
to upload as-is.

## Deploying to S3

1. Create (or reuse) an S3 bucket and enable **Static website hosting**
   (Properties → Static website hosting → index document: `index.html`).
2. Sync the build output:
   ```bash
   aws s3 sync dist/ s3://YOUR_BUCKET_NAME --delete
   ```
3. (Optional) Put a CloudFront distribution in front of the bucket for HTTPS
   and edge caching — the `?v=<timestamp>` cache-buster on the JSON fetches
   means content edits still show up instantly for visitors even behind a CDN,
   without needing to invalidate the cache.
4. To update content later, just edit the relevant file in `public/data/`,
   rerun `npm run build`, and re-sync — or, since the JSON files are static
   assets, you can `aws s3 cp` a single updated JSON file straight into the
   bucket's `data/` folder without rebuilding the whole app at all.

## Notes on the cache-buster

`usePortfolioData.ts` appends `?v=<Date.now()>` to every JSON fetch. Because
the query string changes on every page load, browsers and most CDNs treat it
as a new URL and skip serving a stale cached copy — so content updates pushed
to S3 are visible on the very next visit.
