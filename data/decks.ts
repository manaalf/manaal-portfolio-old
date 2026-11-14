// ---------------------------------------------------------------------------
// Executive decks: the five-minute version of each project, shown in the
// slide viewer at /work/[slug]/deck. Slide titles are the conclusions.
// Charts reuse the same blocks as the case studies (see data/projects.ts).
// ---------------------------------------------------------------------------

import type { Block } from "./projects";
import { projects } from "./projects";

export type Slide =
  | { kind: "cover"; kicker: string; title: string; sub: string }
  | { kind: "stats"; kicker: string; title: string; items: { value: string; label: string }[] }
  | { kind: "list"; kicker: string; title: string; items: { title: string; body: string }[] }
  | { kind: "chart"; kicker: string; title: string; block: Block };

// Reuse a chart that already lives on a case study, so numbers never drift
function chartFrom(slug: string, kind: Block["kind"], index = 0): Block {
  const p = projects.find((x) => x.slug === slug)!;
  const blocks = p.sections.flatMap((s) => s.blocks).filter((b) => b.kind === kind);
  return blocks[index];
}

export const decks: Record<string, Slide[]> = {
  "purpose-and-performance": [
    { kind: "cover", kicker: "PAN Group · Capstone engagement", title: "Is corporate purpose a strategy or a slogan?", sub: "Quantifying purpose across 904 NYSE companies, 2015 to 2025." },
    { kind: "stats", kicker: "The answer", title: "Yes. Purpose and performance move together.", items: [
      { value: "0.14", label: "Correlation across 904 companies (p = 0.0002)" },
      { value: "0.265", label: "Holds up after industry controls (p = 0.00003)" },
      { value: "18 / 20", label: "Sectors where the link is positive" },
    ] },
    { kind: "list", kicker: "Method", title: "Two scores, built to be compared.", items: [
      { title: "Purpose score, 0 to 1", body: "Mission clarity, ten-year consistency, language signals, structural embedding, and stakeholder integration." },
      { title: "Performance score, 0 to 1", body: "10-year shareholder return, capital efficiency, EBITDA margin, and revenue growth, all vs. sector peers." },
      { title: "Scored at scale", body: "An LLM pipeline over SEC filings, validated against a manual pilot before scaling." },
    ] },
    { kind: "chart", kicker: "904 companies, mapped", title: "Purpose leaders are rare: just 12% score high on both.", block: chartFrom("purpose-and-performance", "scatter") },
    { kind: "chart", kicker: "Sector view", title: "The relationship is sector-contingent.", block: {
      kind: "bars", caption: "Correlation within sector: the strongest, weakest, and only negative sectors.", min: -0.6, max: 0.6, format: "r",
      scenarios: [{ label: "Correlation", values: [
        { name: "Software & Services", value: 0.51 }, { name: "Media & Entertainment", value: 0.48 }, { name: "Tech Hardware", value: 0.36 },
        { name: "Utilities", value: 0.06, muted: true }, { name: "Banks", value: -0.04 }, { name: "Transportation", value: -0.51 },
      ] }],
    } },
    { kind: "list", kicker: "Conclusion and impact", title: "Consistency beats communication.", items: [
      { title: "The one predictor", body: "Ten-year consistency is the only purpose dimension that significantly predicts 10-year shareholder return." },
      { title: "Usable at the deal level", body: "904 companies on a 0–1 scale and a sector deployment map, ready for due diligence." },
      { title: "Built to repeat", body: "Dataset, methodology, and pipeline handed over; re-score holdings every 18 to 24 months." },
    ] },
  ],

  "seller-network-gap": [
    { kind: "cover", kicker: "Amazon Brasil · Database analytics", title: "Where should Amazon find its next sellers in Brazil?", sub: "A data-driven strategy to close the gap with MercadoLibre in a $69 billion market." },
    { kind: "stats", kicker: "The business case", title: "Amazon is second, and the gap is supply.", items: [
      { value: "35%", label: "MercadoLibre market share" },
      { value: "20%", label: "Amazon market share" },
      { value: "$4.5B", label: "Walmart’s loss when it exited Brazil" },
    ] },
    { kind: "list", kicker: "Method", title: "Design the database, then ask it ten questions.", items: [
      { title: "Model", body: "Five entities with an ER diagram, normalized to third normal form." },
      { title: "Measure", body: "Customers and sellers by state, across 99,000+ orders." },
      { title: "Isolate", body: "States with proven demand and thin supply, using joins and subqueries." },
    ] },
    { kind: "stats", kicker: "Finding", title: "60% of sellers sit in one state.", items: [
      { value: "1,849", label: "Of 3,095 sellers are in São Paulo" },
      { value: "5", label: "States with 1,000+ customers but under 50 sellers" },
      { value: "114", label: "Customers per seller in Pernambuco, vs. 14 in São Paulo" },
    ] },
    { kind: "chart", kicker: "Where the gap is", title: "Proven demand, missing supply.", block: chartFrom("seller-network-gap", "bars") },
    { kind: "list", kicker: "Recommendation", title: "Recruit locally, and measure it.", items: [
      { title: "Target list", body: "Bahia, Pernambuco, Espírito Santo, the Federal District, and Goiás first." },
      { title: "Recruitment template", body: "Recruit sellers who look like today’s top performers." },
      { title: "KPI", body: "Each flagged state’s freight cost below the national average within 12 months." },
    ] },
  ],

  "impulse-purchases": [
    { kind: "cover", kicker: "Undergraduate thesis · Behavioral economics", title: "Do discounts make people buy on impulse?", sub: "37,000+ real orders from Highfy, a beauty and wellness platform in Pakistan." },
    { kind: "list", kicker: "Method", title: "Define impulse, then model it.", items: [
      { title: "Impulse, defined", body: "Orders that started from a Facebook or Instagram ad, not a search." },
      { title: "Factors", body: "Customer type, spending tier, product category, day, time, and discounts." },
      { title: "Model", body: "Logistic regression, reported as marginal effects in percentage points." },
    ] },
    { kind: "chart", kicker: "Results", title: "When and what matter more than price.", block: chartFrom("impulse-purchases", "bars") },
    { kind: "stats", kicker: "The surprise", title: "Discounts weren’t significant on their own.", items: [
      { value: "p = 0.17", label: "Discount effect, not significant" },
      { value: "+10.1", label: "Points for health and hygiene products" },
      { value: "−12.2", label: "Points for high spenders vs. low spenders" },
    ] },
    { kind: "list", kicker: "Recommendations", title: "Target the moment, not just the price.", items: [
      { title: "Time the push", body: "Promotions in the early morning and at the start of the week." },
      { title: "Lead with the right categories", body: "Health, hygiene, and hair products on the homepage and in bundles." },
      { title: "Segment", body: "Novelty for first-time buyers; loyalty and bundles for returning ones." },
    ] },
  ],

  "yelp-rating-signals": [
    { kind: "cover", kicker: "Machine learning · Yelp Open Dataset", title: "Do Yelp ratings measure quality or popularity?", sub: "Predicting which of 27,622 restaurants earn 3.5 stars or more." },
    { kind: "list", kicker: "Method", title: "Five models, each added for a reason.", items: [
      { title: "Baseline", body: "A majority-class model, so every result beats simply guessing." },
      { title: "Escalation", body: "Logistic regression, L1 regularization, random forest, then XGBoost." },
      { title: "Stress test", body: "Rerun the best models without location data." },
    ] },
    { kind: "chart", kicker: "The key test", title: "Take location away and the model barely notices.", block: chartFrom("yelp-rating-signals", "bars") },
    { kind: "list", kicker: "Findings", title: "Engagement, not amenities.", items: [
      { title: "Review count leads", body: "First or second in importance in every model." },
      { title: "Amenities barely register", body: "WiFi, parking, outdoor seating, and TV sit at the bottom." },
      { title: "Best model", body: "XGBoost: AUC 0.79, ranking a high-rated restaurant above a lower-rated one 79% of the time." },
    ] },
    { kind: "list", kicker: "Implications", title: "Popular isn’t the same as good.", items: [
      { title: "For platforms", body: "Rankings built on ratings may surface the most-reviewed places, not the best." },
      { title: "For new restaurants", body: "Few reviews means structural underranking, whatever the quality." },
      { title: "Next", body: "Add review text and track ratings over time to test the feedback loop." },
    ] },
  ],

  policypal: [
    { kind: "cover", kicker: "Applied AI · Retrieval-augmented generation", title: "What does my insurance policy actually cover?", sub: "PolicyPal turns dense policy PDFs into plain-English answers with sources." },
    { kind: "list", kicker: "The problem", title: "Policies are written to be skipped.", items: [
      { title: "Dense language", body: "Dozens of pages of jargon most people never read." },
      { title: "Hidden costs", body: "Deductibles and exclusions surface only when a claim is denied." },
      { title: "No neutral guide", body: "Agents sell; there’s no document-aware tool on the buyer’s side." },
    ] },
    { kind: "list", kicker: "The product", title: "Three ways into a policy.", items: [
      { title: "Dashboard", body: "Deductible, premium, out-of-pocket maximum, and a 1–10 risk score." },
      { title: "Compare", body: "Two policies scored on six dimensions on one radar chart." },
      { title: "Ask Pal", body: "Questions answered from the policy itself, with the source cited." },
    ] },
    { kind: "list", kicker: "How it works", title: "Built for accuracy, not speed-running.", items: [
      { title: "Hybrid search", body: "Keyword (BM25) plus Gemini semantic search across long documents." },
      { title: "Intent routing", body: "Informational, clarification, or scenario questions each get their own template." },
      { title: "Guardrails", body: "Context-only answers, a relevance floor, and corrected citations." },
    ] },
    { kind: "stats", kicker: "In the demo", title: "A real auto policy, read in seconds.", items: [
      { value: "$500", label: "Collision deductible, found and explained" },
      { value: "6", label: "Dimensions compared across two policies" },
      { value: "20+", label: "Auto insurance policies tested" },
    ] },
  ],

  "date-a-job": [
    { kind: "cover", kicker: "Product · AI job matching", title: "Can AI match people to jobs better than keywords?", sub: "Date-a-Job: where you are, meets where you want to be." },
    { kind: "list", kicker: "The problem", title: "Early-career job search is broken.", items: [
      { title: "Poor matches", body: "It’s hard to find jobs that truly fit your qualifications." },
      { title: "Invisible gaps", body: "Little sense of which skills are holding you back." },
      { title: "Wasted time", body: "Hours spent applying to poor-fit roles." },
    ] },
    { kind: "list", kicker: "The product", title: "From job hunting to job matching.", items: [
      { title: "Personal profile", body: "Skills, experience, and goals extracted from your resume." },
      { title: "Swipe feed", body: "Real roles with a live match percentage." },
      { title: "Gap visibility", body: "Saved jobs grouped by fit, with missing skills shown before you apply." },
    ] },
    { kind: "chart", kicker: "Results", title: "Better than keyword search, in manual evaluation.", block: chartFrom("date-a-job", "dotgrid") },
    { kind: "list", kicker: "What’s next", title: "Built to grow with early-career talent.", items: [
      { title: "Shipped", body: "Swipe matching, skill-gap visibility, and High / Mid / Low fit tiers." },
      { title: "Next", body: "Tailored resumes and cover letters, plus an application dashboard." },
      { title: "Scale", body: "Learning paths, employer-side matching, and a paid tier." },
    ] },
  ],
};
