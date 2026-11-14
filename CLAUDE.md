# Manaal Fatima — portfolio (instructions for Claude Code)

Personal portfolio for Manaal Fatima: business analyst, MS Business Analytics (UC Irvine, 2026).
Audience: recruiters hiring for Business Analyst, Strategy & Operations, and Business Operations roles. The site should read as
"a business analyst who is creative," not "a creative." Substance first; personality in the
badge, the type, and the writing voice.

## Stack
Next.js 15 App Router, TypeScript, plain CSS (no Tailwind, no UI libraries), Geist fonts via the
`geist` npm package. Deployed on Vercel from GitHub.

## Where things live
- `data/projects.ts` — all project copy; homepage rows and /work/[slug] pages are generated from it
- `app/page.tsx` — homepage (hero, work, about, experience); role data at top of file
- `app/work/[slug]/page.tsx` — case-study template
- `components/Lanyard.tsx` — hanging ID badge (Verlet rope physics, writes to DOM via refs)
- `components/Bars.tsx` — toggle bar chart; `components/Contact.tsx` — contact + footer
- `data/decks.ts` — executive decks; `components/DeckViewer.tsx` shows them
- `components/JourneyMap.tsx`, `MiniChart.tsx`, `Scatter.tsx`, `DotGrid.tsx` — charts
- `app/globals.css` — all styles; design tokens at the top

## Design rules (keep these)
- Palette: paper #f2f0eb, ink #1a1917, muted #6c6861, rule #d6d1c7, one accent #1f4a42. Use the CSS variables, never new colors.
- Type: Geist Sans for everything, Geist Mono only for small `.label` text. Weight 400/500 only.
- Layout: big confident headings, hairline rules, generous whitespace. No cards-with-shadows grids, no gradients, no particles, no skill bars, no stat boxes.
- Projects are titled as the question they answered; the answer comes right under it.
- Motion: only the badge, the map flight, and user-triggered transitions. No scroll-triggered fade-ins.
- Must work on mobile and respect prefers-reduced-motion.

## Content rules
- Never invent facts, numbers, roles, or dates. Use `[placeholder in brackets]` instead.
- Claims must be defensible in an interview (e.g. Python work was AI-assisted; say "built with AI-assisted development" or "directed").
- Name is spelled Manaal Fatima. Email: manaalfatimaq@gmail.com.

## Workflow
- Explain what you changed and why, briefly. Run `npm run build` after changes to catch errors.
- Write files directly; don't rely on pasted code (pasting in Cursor has stripped `<a>` tags before).

## Source of truth for project facts
- Capstone: the PAN Group executive deck (the version presented to the client) wins over the GitHub README.
- Yelp: the GitHub repo (re-analysis) wins over the old class deck.
- Never put a teammate's name on the site. Team size is fine ("Team of 5").
