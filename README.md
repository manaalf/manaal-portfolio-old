# Manaal Fatima — portfolio

Next.js 15 (App Router), TypeScript, plain CSS. No UI libraries.

## Where things live
- `data/projects.ts` — ALL project copy. The homepage rows and every case-study page are generated from it. Search for `[` to find placeholders.
- `app/page.tsx` — homepage: hero, work, about, experience (roles are at the top of the file).
- `app/work/[slug]/page.tsx` — the case-study page template.
- `components/Lanyard.tsx` — the hanging badge (rope physics), used in the hero and, flipped, in Contact.
- `data/decks.ts` — the executive decks (slide viewer at /work/[slug]/deck).
- `data/worldDots.ts` and `data/capstonePoints.ts` — generated data for the map and the capstone scatter. Don't edit by hand.
- `components/JourneyMap.tsx` — the Karachi → Irvine map. `components/MiniChart.tsx` — the small chart on each homepage row.
- `components/Bars.tsx`, `Scatter.tsx`, `DotGrid.tsx` — the case-study charts. `components/DeckViewer.tsx` — the slide viewer.
- `app/globals.css` — every style. Colors and fonts are the variables at the top.
- `public/photo.jpg` — badge photo. `public/resume.pdf` — the resume behind the Download button. Replace the file to update it (keep the name).

## Put it online as a new site
1. Create an empty repository on GitHub (e.g. `portfolio-2026`).
2. Unzip this folder and open it in Cursor. (Your resume is already in `public/resume.pdf`; replace that file whenever you update it.)
3. In the terminal:
   ```
   npm install
   npm run dev          # preview at http://localhost:3000, Ctrl+C to stop
   git init
   git add -A
   git commit -m "New portfolio"
   git branch -M main
   git remote add origin https://github.com/manaalf/portfolio-2026.git
   git push -u origin main
   ```
4. Vercel: Add New → Project → import the repo → Deploy.
5. Project → Settings → Domains to set the address.

After that, every `git push` to main updates the live site.
