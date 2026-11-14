// ---------------------------------------------------------------------------
// All project content lives in this one file. The homepage rows, every
// /work/[slug] case study, and the mini charts are generated from it, so to
// edit copy you never touch layout code. Order here = order on the homepage.
// Executive decks live in data/decks.ts.
// ---------------------------------------------------------------------------

export type Block =
  | { kind: "text"; body: string[] }
  | { kind: "steps"; items: { title: string; body: string }[] }
  | { kind: "list"; items: { title: string; body: string }[] }
  | { kind: "stats"; note?: string; items: { value: string; label: string }[] }
  | {
      kind: "bars";
      caption: string;
      // One scenario = plain chart. Two or more = a toggle between them.
      scenarios: { label: string; values: { name: string; value: number; muted?: boolean }[] }[];
      min: number;
      max: number;
      format: "auc" | "int" | "pp" | "r";
    }
  | { kind: "scatter"; caption: string }
  | { kind: "dotgrid"; caption: string; items: { hit: number; total: number; label: string }[] }
  | { kind: "qa"; question: string; answer: string; source: string; note: string };

export type Section = { label: string; heading: string; blocks: Block[] };

export type Project = {
  slug: string;
  category: string;
  name: string;
  question: string; // headline on the homepage and the case page
  answer: string; // the one-sentence answer under it
  facts: { label: string; value: string }[];
  summary: { label: string; value: string }[]; // the "In short" box
  sections: Section[];
  links: { label: string; href: string }[];
};

// Sector correlations from the PAN Group executive deck (slide 12)
const SECTORS: { name: string; value: number }[] = [
  { name: "Software & Services", value: 0.51 },
  { name: "Media & Entertainment", value: 0.48 },
  { name: "Tech Hardware", value: 0.36 },
  { name: "Consumer Services", value: 0.3 },
  { name: "Energy", value: 0.28 },
  { name: "Food, Beverage & Tobacco", value: 0.25 },
  { name: "Pharma & Biotech", value: 0.24 },
  { name: "Commercial Services", value: 0.23 },
  { name: "Household Products", value: 0.23 },
  { name: "Insurance", value: 0.2 },
  { name: "Consumer Durables", value: 0.19 },
  { name: "Financial Services", value: 0.17 },
  { name: "Capital Goods", value: 0.16 },
  { name: "Health Care Equipment", value: 0.12 },
  { name: "Automobiles", value: 0.1 },
  { name: "Materials", value: 0.07 },
  { name: "Utilities", value: 0.06 },
  { name: "Retail Distribution", value: 0.05 },
  { name: "Banks", value: -0.04 },
  { name: "Transportation", value: -0.51 },
];

export const projects: Project[] = [
  // -------------------------------------------------------------------------
  {
    slug: "purpose-and-performance",
    category: "Consulting engagement",
    name: "Purpose & Performance",
    question: "Is corporate purpose a strategy or a slogan?",
    answer:
      "A strategy, but only when it lasts. Across 904 NYSE companies, purpose moved with performance, and ten years of consistency was the one purpose signal that predicted shareholder returns.",
    facts: [
      { label: "Client", value: "PAN Group" },
      { label: "Role", value: "Project manager" },
      { label: "Team", value: "Team of 5" },
      { label: "Timeline", value: "January to June 2026" },
    ],
    summary: [
      { label: "Question", value: "Does corporate purpose correlate with financial performance?" },
      {
        label: "Answer",
        value:
          "Yes. Purpose and performance move together (r = 0.14, p = 0.0002), the signal holds up after industry controls (0.265, p = 0.00003), and it shows up in 18 of 20 sectors.",
      },
      { label: "My role", value: "Project manager and primary client contact for PAN Group’s CEO and Head of Innovation." },
      { label: "Impact", value: "Purpose is now a quantified score PAN can use in due diligence, with a repeatable pipeline for re-scoring." },
    ],
    sections: [
      {
        label: "Context",
        heading: "Purpose is easy to claim. Hard to measure.",
        blocks: [
          {
            kind: "text",
            body: [
              "PAN Group runs on a simple philosophy: purpose-driven business changes the world. They wanted evidence, a way to quantify purpose in large public companies and see whether it shows up in results.",
              "Our hypothesis: companies that operationalise their purpose outperform those that merely communicate it.",
            ],
          },
        ],
      },
      {
        label: "Approach",
        heading: "Two scores, built to be compared.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Score purpose", body: "Five dimensions (mission clarity, ten-year consistency, language signals, structural embedding, and stakeholder integration) combined into one 0–1 score." },
              { title: "Score performance", body: "Four metrics against sector peers (10-year shareholder return, capital efficiency, EBITDA margin, and revenue growth) combined into one 0–1 score." },
              { title: "Pilot by hand", body: "Scored a pilot company manually, starting with Nike, so the client could review and sign off on the method first." },
              { title: "Automate and check", body: "Built an LLM scoring pipeline on the Anthropic Batch API over 10-K, 20-F, and proxy filings, pressure-testing it against the manual scores before scaling. It replaced about a day of review per company." },
              { title: "Test", body: "Correlation and OLS regression with industry controls, then the same test sector by sector." },
            ],
          },
        ],
      },
      {
        label: "Findings",
        heading: "Consistency beats communication.",
        blocks: [
          { kind: "scatter", caption: "Every company, by purpose score and performance score. Quadrant cut-offs at 0.5." },
          {
            kind: "list",
            items: [
              { title: "The relationship is real", body: "r = 0.14 (p = 0.0002) across all 904 companies, and it strengthens after controlling for industry." },
              { title: "Consistency is what pays", body: "Ten-year consistency was the only purpose dimension that significantly predicted 10-year shareholder return." },
              { title: "Purpose leaders are rare", body: "Only 111 companies (12%) scored high on both. Another 246 deliver strong returns with weak purpose." },
            ],
          },
          {
            kind: "bars",
            caption: "Correlation between purpose and performance within each sector.",
            min: -0.6,
            max: 0.6,
            format: "r",
            scenarios: [{ label: "Correlation", values: SECTORS.map((s) => ({ ...s, muted: s.value >= 0 && s.value < 0.16 })) }],
          },
        ],
      },
      {
        label: "Impact",
        heading: "How PAN is better off.",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "From intuition to evidence", body: "Purpose is now a quantified, comparable score instead of a qualitative conviction." },
              { title: "Usable at the deal level", body: "904 companies on a 0–1 scale and a sector-level map of where purpose pays, ready for due diligence." },
              { title: "A credible narrative", body: "A statistically significant link (p < 0.001) backs the investment thesis." },
              { title: "Built to repeat", body: "A pipeline for re-scoring holdings, recommended every 18 to 24 months." },
            ],
          },
        ],
      },
      {
        label: "Lessons",
        heading: "What I took away",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Define it in the client’s language", body: "The framework landed because purpose was defined the way PAN talks about it." },
              { title: "Validate every source", body: "Capital IQ and SEC EDGAR don’t always agree; every figure was checked." },
              { title: "Present weekly", body: "Weekly client presentations kept the work aligned and decisions fast." },
              { title: "Agree on the deliverable early", body: "Aligning on format early saved a scramble at the end." },
            ],
          },
        ],
      },
    ],
    links: [
      { label: "View the executive deck", href: "/work/purpose-and-performance/deck" },
      { label: "Code on GitHub", href: "https://github.com/manaalf/pan_capstone" },
      // Add the Tableau dashboard here once it's republished:
      // { label: "View in Tableau", href: "https://public.tableau.com/..." },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "seller-network-gap",
    category: "SQL and market strategy",
    name: "Seller Network Gap",
    question: "Where should Amazon find its next sellers in Brazil?",
    answer:
      "Where buyers already are and sellers aren’t. 60% of sellers sit in São Paulo, while five states with over 1,000 customers each have fewer than 50 sellers.",
    facts: [
      { label: "Setting", value: "UC Irvine MSBA database project" },
      { label: "Team", value: "Team of 3" },
      { label: "Data", value: "99,000+ Brazilian marketplace orders (public Kaggle dataset)" },
      { label: "Tools", value: "MySQL, relational design" },
    ],
    summary: [
      { label: "Question", value: "Which Brazilian states have the largest gap between customer demand and seller supply, and how can Amazon close it?" },
      { label: "Answer", value: "Supply is concentrated in São Paulo. Bahia, Pernambuco, Espírito Santo, the Federal District, and Goiás have proven demand and almost no local sellers." },
      { label: "Built", value: "A normalized five-table database and ten SQL queries, from simple counts to joins, subqueries, and derived tables." },
      { label: "Delivered", value: "A prioritized seller-recruitment list, a template for who to recruit, and a KPI to track it." },
    ],
    sections: [
      {
        label: "Context",
        heading: "Amazon is second in Brazil, and the gap is supply.",
        blocks: [
          {
            kind: "text",
            body: [
              "Brazil’s e-commerce market is worth about $69 billion. MercadoLibre leads with roughly 35% share to Amazon’s 20%, and its edge is a deeper seller network: more sellers, closer to buyers.",
              "Walmart left Brazil after 23 years with a $4.5 billion loss, expanding without understanding the customer. We used its marketplace data to make sure Amazon doesn’t repeat that.",
            ],
          },
        ],
      },
      {
        label: "Approach",
        heading: "Design the database properly, then ask it ten questions.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Model the business", body: "Five entities (customers, orders, order items, payments, and sellers) with an ER diagram and full attribute metadata." },
              { title: "Normalize", body: "Mapped functional dependencies and brought the tables to third normal form, so each fact lives in one place." },
              { title: "Measure demand and supply", body: "Counted customers and sellers by state to see where the two diverge." },
              { title: "Find the gaps", body: "Combined demand and supply with subqueries to isolate states with many buyers and few sellers." },
              { title: "Turn it into a plan", body: "Ranked target states, profiled top sellers as a recruitment template, and set a measurable KPI." },
            ],
          },
        ],
      },
      {
        label: "Findings",
        heading: "Proven demand, missing supply.",
        blocks: [
          {
            kind: "bars",
            caption: "Customers per seller. São Paulo shown for comparison.",
            min: 0,
            max: 120,
            format: "int",
            scenarios: [
              {
                label: "Customers per seller",
                values: [
                  { name: "São Paulo", value: 14, muted: true },
                  { name: "Pernambuco", value: 114 },
                  { name: "Bahia", value: 110 },
                  { name: "Espírito Santo", value: 55 },
                  { name: "Federal District", value: 45 },
                  { name: "Goiás", value: 30 },
                ],
              },
            ],
          },
          {
            kind: "list",
            items: [
              { title: "One state holds the supply", body: "São Paulo has 1,849 of 3,095 sellers (60%) and nearly three times as many customers as the next state." },
              { title: "Five states are under-served", body: "Bahia has 2,093 customers and 19 sellers; Pernambuco has 1,028 customers and 9 sellers." },
            ],
          },
        ],
      },
      {
        label: "Recommendation",
        heading: "Recruit locally, and measure it.",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Start with the five gap states", body: "A ready-made recruitment list, each backed by the number of buyers already waiting." },
              { title: "Copy what works", body: "Use the profile of top sellers (volume, product mix, and location) as the template for who to recruit." },
              { title: "Set a KPI", body: "Bring each flagged state’s average freight cost below the national average within 12 months of recruitment." },
              { title: "Match local payment habits", body: "Payment preferences vary by region; make each state’s preferred methods easy to find." },
            ],
          },
        ],
      },
      {
        label: "Next",
        heading: "With more time and data",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Benchmark the leader", body: "Add MercadoLibre’s public seller and delivery data to measure the gap directly." },
              { title: "Forecast demand", body: "Predict which states will grow fastest, so recruiting starts before demand peaks." },
              { title: "Score sellers", body: "Rank sellers on volume, delivery reliability, and ratings to prioritize partnerships." },
              { title: "Make it live", body: "Connect the queries to a weekly-refreshed dashboard for the strategy team." },
            ],
          },
        ],
      },
    ],
    links: [{ label: "View the executive deck", href: "/work/seller-network-gap/deck" }],
  },

  // -------------------------------------------------------------------------
  {
    slug: "impulse-purchases",
    category: "Economics research",
    name: "Impulse Purchases",
    question: "Do discounts make people buy on impulse?",
    answer:
      "Not on their own. In 37,000+ real orders, who was buying and when mattered more: first-time customers, early mornings, and Mondays raised impulse buys, while discounts had no significant effect.",
    facts: [
      { label: "Setting", value: "Undergraduate thesis, BS Economics, IBA Karachi" },
      { label: "Team", value: "Team of 3" },
      { label: "Data", value: "37,000+ orders from Highfy, August to October 2023" },
      { label: "Method", value: "Logistic regression in Stata" },
    ],
    summary: [
      { label: "Question", value: "Which customer, product, and timing factors drive impulse purchases online?" },
      { label: "Answer", value: "First-time customers, health and hygiene products, early mornings, and Mondays raised the odds of an impulse buy. Higher spenders were less impulsive. Discounts had no significant effect." },
      { label: "Method", value: "Logistic regression with odds ratios and marginal effects, grounded in bounded rationality." },
      { label: "Data access", value: "Provided directly by the platform’s founder and CEO." },
    ],
    sections: [
      {
        label: "Context",
        heading: "Impulse buying drives online sales. Most of what’s written about it is theory.",
        blocks: [
          {
            kind: "text",
            body: [
              "Economics assumes shoppers weigh costs and benefits. Impulse purchases are the clearest case where they don’t, and e-commerce platforms design for exactly that gap.",
              "We wanted to test the usual assumptions against real transactions, so we asked Highfy, a beauty and wellness platform in Pakistan, for theirs.",
            ],
          },
        ],
      },
      {
        label: "Approach",
        heading: "Define impulse, then model it.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Get real data", body: "37,000+ orders with product, customer, and timing details, directly from the platform." },
              { title: "Define impulse", body: "Treated purchases that came through Facebook and Instagram ads as impulse buys, since they start from an ad rather than a search. A deliberate, stated assumption." },
              { title: "Link variables to behavior", body: "Tied each variable to a behavioral idea: first-time buyers and novelty, spending tier and mental accounting, discounts and anchoring." },
              { title: "Model it", body: "Ran a logistic regression and converted results into marginal effects: how many percentage points each factor moves the chance of an impulse buy." },
            ],
          },
        ],
      },
      {
        label: "Findings",
        heading: "When and what matter more than price.",
        blocks: [
          {
            kind: "bars",
            caption: "Change in the chance of an impulse purchase, in percentage points, vs. Sunday, midnight–2 AM, returning buyers, and low spenders.",
            min: -14,
            max: 12,
            format: "pp",
            scenarios: [
              {
                label: "Effect",
                values: [
                  { name: "Health & hygiene", value: 10.05 },
                  { name: "Bought 6–8 AM", value: 8.29 },
                  { name: "Monday", value: 2.86 },
                  { name: "First-time buyer", value: 2.2 },
                  { name: "Discount", value: 1.53, muted: true },
                  { name: "Wednesday", value: -2.0 },
                  { name: "Medium spender", value: -10.06 },
                  { name: "High spender", value: -12.22 },
                ],
              },
            ],
          },
          {
            kind: "list",
            items: [
              { title: "Discounts aren’t the trigger", body: "Not significant on their own (p = 0.17), which runs against much of the literature." },
              { title: "Timing matters", body: "Early mornings and Mondays raised impulse buying; Wednesdays and late afternoons lowered it." },
              { title: "Big spenders deliberate", body: "Medium and high spenders were 10 to 12 points less likely to buy on impulse than low spenders." },
            ],
          },
        ],
      },
      {
        label: "So what",
        heading: "What the results suggest",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Time the push", body: "Schedule promotions for early mornings and the start of the week, not uniformly." },
              { title: "Lead with the right categories", body: "Feature health, hygiene, and hair products on the homepage and in bundles." },
              { title: "Treat new and loyal customers differently", body: "Novelty and scarcity cues for first-timers; loyalty programs and bundles for returning buyers." },
            ],
          },
        ],
      },
      {
        label: "Limits",
        heading: "What this can’t tell you",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "A proxy, not a measurement", body: "Ad-driven purchases stand in for impulse buys; some were surely planned." },
              { title: "One platform", body: "Results reflect one beauty retailer in Pakistan and may not generalize." },
            ],
          },
        ],
      },
    ],
    links: [
      { label: "View the executive deck", href: "/work/impulse-purchases/deck" },
      { label: "Read the paper (PDF)", href: "/impulse-purchases-paper.pdf" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "yelp-rating-signals",
    category: "Machine learning",
    name: "Yelp Rating Signals",
    question: "Do Yelp ratings measure quality or popularity?",
    answer:
      "Mostly popularity. Review count was the strongest non-location predictor of a high rating, and the best model barely changed when location was removed entirely.",
    facts: [
      { label: "Setting", value: "UC Irvine MSBA machine learning course" },
      { label: "Team", value: "Team of 4, re-analyzed independently" },
      { label: "Data", value: "27,622 restaurants from the Yelp Open Dataset" },
      { label: "Models", value: "Five, from logistic regression to XGBoost" },
    ],
    summary: [
      { label: "Question", value: "Do Yelp ratings reflect restaurant quality, or visibility and engagement?" },
      { label: "Answer", value: "Mostly engagement. Review count, opening hours, and delivery predicted high ratings far better than parking, WiFi, or outdoor seating." },
      { label: "Key test", value: "Removing location cut the best model’s AUC only from 0.79 to 0.78." },
      { label: "So what", value: "Good new restaurants with few reviews are structurally under-ranked." },
    ],
    sections: [
      {
        label: "Context",
        heading: "Ratings are treated as a quality signal. Are they?",
        blocks: [
          {
            kind: "text",
            body: [
              "Diners use ratings to pick where to eat, platforms use them to decide what to surface, and owners worry about them constantly.",
              "The hypothesis: platform engagement signals predict high ratings as well as or better than physical amenities. If true, ratings measure visibility more than quality.",
            ],
          },
        ],
      },
      {
        label: "Approach",
        heading: "Five models, each one added for a reason.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Reshape the data", body: "Flattened nested JSON, turned opening hours into hours per week, collapsed parking into one flag, and binned 1,400+ cities into the top 10 plus other." },
              { title: "Set a fair baseline", body: "A majority-class model, so every result is compared with simply guessing." },
              { title: "Escalate deliberately", body: "Logistic regression for interpretability, L1 regularization to isolate predictors, random forest for interactions, and XGBoost for the strongest fit. Class imbalance handled with weighting." },
              { title: "Stress-test the finding", body: "Reran the best models without location to see whether geography was doing the work." },
            ],
          },
        ],
      },
      {
        label: "Findings",
        heading: "Take location away and the model barely notices.",
        blocks: [
          {
            kind: "bars",
            caption: "ROC-AUC by model. Toggle to remove location data.",
            min: 0.5,
            max: 0.8,
            format: "auc",
            scenarios: [
              { label: "With location", values: [{ name: "Random forest", value: 0.7797 }, { name: "XGBoost", value: 0.7896 }] },
              { label: "Without location", values: [{ name: "Random forest", value: 0.7476 }, { name: "XGBoost", value: 0.779 }] },
            ],
          },
          {
            kind: "list",
            items: [
              { title: "Review count leads", body: "It ranked first or second in importance in every model, consistent with a loop where visibility drives reviews and reviews drive visibility." },
              { title: "Amenities barely register", body: "WiFi, parking, outdoor seating, and TV sat at the bottom, and L1 regularization shrank many of them to zero." },
            ],
          },
        ],
      },
      {
        label: "So what",
        heading: "Why it matters for a platform",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Popular isn’t the same as good", body: "A ranking built on ratings may surface the most-reviewed places rather than the best ones." },
              { title: "A cold-start problem", body: "A great new restaurant with few reviews gets underranked next to an established mediocre one." },
              { title: "Ratings can be nudged", body: "Review prompts and QR codes at checkout may lift a restaurant’s rating class without changing the food." },
            ],
          },
        ],
      },
      {
        label: "Limits",
        heading: "What this can’t tell you",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Correlation, not causation", body: "Restaurant age or chain status could drive both reviews and ratings." },
              { title: "No review text", body: "Analyzing what reviews say would separate sentiment from volume." },
              { title: "One snapshot", body: "Tracking ratings as reviews accumulate would test the feedback loop directly." },
            ],
          },
        ],
      },
    ],
    links: [
      { label: "View the executive deck", href: "/work/yelp-rating-signals/deck" },
      { label: "Code on GitHub", href: "https://github.com/manaalf/yelp-ratings-signal-analysis" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "policypal",
    category: "Applied AI",
    name: "PolicyPal",
    question: "What does my insurance policy actually cover?",
    answer:
      "PolicyPal reads the policy for you: it answers questions in plain English, scores the risks, and compares two policies side by side, citing the passage behind each answer.",
    facts: [
      { label: "Team", value: "Team of 5" },
      { label: "Built with", value: "Python, Gemini, Streamlit" },
      { label: "Tested on", value: "20+ auto insurance policies" },
      { label: "Status", value: "Live on Streamlit" },
    ],
    summary: [
      { label: "Question", value: "Can someone with no insurance background get a straight, trustworthy answer from their own policy?" },
      { label: "Answer", value: "Yes, if the system answers only from the document and shows its source, so you can check it." },
      { label: "Built", value: "An auto-analysis dashboard, a 1–10 risk score, side-by-side comparison across six dimensions, and Ask Pal, a question-and-answer assistant." },
      { label: "Tested", value: "On 20+ auto insurance policies, with answers grounded in cited policy text." },
    ],
    sections: [
      {
        label: "Context",
        heading: "A required purchase nobody could explain.",
        blocks: [
          {
            kind: "text",
            body: [
              "It started with health insurance. As international students, we had to buy it and couldn’t understand what we’d bought. The answers were in the policy, just not in a form anyone could use.",
              "Public health policies turned out to be too scarce to build and test on, so we pivoted to auto insurance, where real policy documents were available, and built for the same problem: dense documents nobody reads until a claim is denied.",
            ],
          },
        ],
      },
      {
        label: "Product",
        heading: "Three ways into a policy.",
        blocks: [
          {
            kind: "stats",
            note: "The dashboard for a real auto policy, from our demo.",
            items: [
              { value: "$500", label: "Collision deductible" },
              { value: "$140.33", label: "Monthly premium" },
              { value: "7/10", label: "Risk level" },
            ],
          },
          {
            kind: "list",
            items: [
              { title: "Dashboard", body: "Pulls out the deductible, premium, out-of-pocket maximum, and a risk score, with a plain-English summary of what to watch." },
              { title: "Compare", body: "Scores two policies on six dimensions (coverage, affordability, flexibility, exclusion risk, ease of claims, and overall value) on one radar chart." },
              { title: "Ask Pal", body: "A Q&A assistant that recognizes whether you’re asking for information, a clarification, or a what-if scenario, and answers accordingly." },
            ],
          },
        ],
      },
      {
        label: "How it works",
        heading: "From a policy PDF to a sourced answer.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Read the policy", body: "Extract the text from uploaded PDFs and strip repeated headers and footers." },
              { title: "Break it up", body: "Split it into 800-token chunks with 100 tokens of overlap, so no clause gets cut in half." },
              { title: "Search two ways", body: "Combine keyword search (BM25) with Gemini semantic search, for better recall across long documents." },
              { title: "Route the question", body: "Classify it as informational, clarification, or scenario, and answer with a template built for that type." },
              { title: "Answer from the evidence", body: "Generate an answer only from the retrieved passages, with sources listed." },
            ],
          },
          {
            kind: "qa",
            question: "What is my collision deductible and when does it apply?",
            answer: "Your collision deductible is $500. It applies when your vehicle sustains damage from a collision with an object or another vehicle.",
            source: "State Farm auto policy, from our demo",
            note: "Ask Pal, in the live app",
          },
        ],
      },
      {
        label: "Design choices",
        heading: "A wrong answer about coverage is worse than no answer.",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Context-only answers", body: "The model may only use retrieved policy text. If the policy doesn’t say, PolicyPal says so." },
              { title: "A relevance floor", body: "Weak matches are filtered out, so a loosely related clause can’t become an answer." },
              { title: "Checked citations", body: "Source numbers are corrected automatically to match the passages actually retrieved." },
              { title: "No guessed numbers", body: "Extraction runs at temperature 0, and what-if questions always include the declarations page, where the figures live." },
            ],
          },
        ],
      },
      {
        label: "Next",
        heading: "What we’d build next",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Back to health insurance", body: "Return to the original problem once enough public health policies are available to test on." },
              { title: "Claims assistant", body: "Walk users through filing a claim, using their own policy’s terms." },
            ],
          },
        ],
      },
    ],
    links: [
      { label: "Try the live app", href: "https://gemini-policypal-35nyxxllhmj6k8djrgvxaw.streamlit.app/" },
      { label: "View the executive deck", href: "/work/policypal/deck" },
      { label: "Code on GitHub", href: "https://github.com/manaalf/PolicyPal" },
    ],
  },

  // -------------------------------------------------------------------------
  {
    slug: "date-a-job",
    category: "Product",
    name: "Date-a-Job",
    question: "Can AI match people to jobs better than keywords?",
    answer:
      "In our evaluation, yes: 16 of the top 20 recommendations were relevant, and the app correctly identified skill gaps for 9 of 10 jobs.",
    facts: [
      { label: "Role", value: "Product design and frontend" },
      { label: "Team", value: "Team of 5" },
      { label: "Scope", value: "8 screens, React + Vite on Vercel" },
      { label: "Status", value: "Live" },
    ],
    summary: [
      { label: "Question", value: "Can an LLM match early-career job seekers to roles better than keyword search?" },
      { label: "Answer", value: "In manual evaluation, yes: 80% match quality (16 of 20) and 90% skill-gap detection (9 of 10), against a keyword-search baseline." },
      { label: "Built", value: "Resume parsing, live job retrieval, a multi-stage matching pipeline, fit tiers, and skill-gap explanations." },
      { label: "My part", value: "Led the app’s product design and co-built the frontend across all 8 screens, from Figma wireframes to the deployed React app; helped shape the product concept." },
    ],
    sections: [
      {
        label: "Context",
        heading: "Early-career job search is broken.",
        blocks: [
          {
            kind: "text",
            body: [
              "Recent graduates spend hours applying to roles that don’t fit, with little idea which skills are holding them back.",
              "We built for three pains: finding jobs that truly match, seeing skill gaps before applying, and wasting time on poor-fit roles.",
            ],
          },
        ],
      },
      {
        label: "Design",
        heading: "From wireframe to deployed app.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Figma", body: "Wireframes and the functional logic of every screen." },
              { title: "Claude Code", body: "The UX build and interaction logic across all 8 screens." },
              { title: "Claude Design", body: "Full visual polish and a consistent design system." },
              { title: "Vercel", body: "Deployment and integration with the backend’s API." },
            ],
          },
          {
            kind: "text",
            body: ["The eight screens: onboarding, swipe feed, saved jobs, job detail, apply flow, skills and learning, profile, and dashboard."],
          },
        ],
      },
      {
        label: "How it works",
        heading: "Understand the person, then the role, then the gap.",
        blocks: [
          {
            kind: "steps",
            items: [
              { title: "Read the resume", body: "GPT-4o-mini turns a PDF or Word resume into a structured profile: skills, experience, and goals." },
              { title: "Pull real roles", body: "Live listings from the JSearch API, filtered to five years of experience or less." },
              { title: "Score the fit", body: "Match each role on goals and resume, assign a High, Mid, or Low fit tier, and list the missing skills." },
              { title: "Serve it as a feed", body: "A swipe queue with a live match percentage; saved jobs grouped by fit, with gaps shown before you apply." },
            ],
          },
        ],
      },
      {
        label: "Results",
        heading: "Measured against keyword search.",
        blocks: [
          {
            kind: "dotgrid",
            caption: "Manual evaluation. Filled dots were judged correct.",
            items: [
              { hit: 16, total: 20, label: "Top recommendations that were relevant" },
              { hit: 9, total: 10, label: "Jobs where skill gaps were correctly identified" },
            ],
          },
          {
            kind: "list",
            items: [
              { title: "Honest limits", body: "API rate limits capped retrieval at 9 results per search, and the retrieval-plus-scoring pipeline is slower than we’d like." },
            ],
          },
        ],
      },
      {
        label: "Next",
        heading: "The roadmap",
        blocks: [
          {
            kind: "list",
            items: [
              { title: "Phase 2", body: "Tailored resume and cover letter generation, plus an application dashboard and history." },
              { title: "Phase 3", body: "Learning paths for each skill gap, employer-side matching, and a paid tier with better fit scores." },
            ],
          },
        ],
      },
    ],
    links: [
      { label: "Try the live app", href: "https://date-a-job.vercel.app/" },
      { label: "View the executive deck", href: "/work/date-a-job/deck" },
      { label: "Code on GitHub", href: "https://github.com/sruthiraj03/Date-a-Job" },
    ],
  },
];
