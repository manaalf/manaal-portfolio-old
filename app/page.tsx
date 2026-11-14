import Link from "next/link";
import Lanyard from "@/components/Lanyard";
import { LINKS } from "@/data/links";
import Contact from "@/components/Contact";
import JourneyMap from "@/components/JourneyMap";
import MiniChart from "@/components/MiniChart";
import { projects } from "@/data/projects";

// Experience and leadership rows. Kept here because they're short.
const roles = [
  { years: "2026", title: "Project Manager, Capstone Consulting Engagement", org: "PAN Group (UC Irvine)", note: "Led a 5-person team as primary contact for the client’s CEO; automated about a day of review per company across 904 firms." },
  { years: "2025", title: "Project Trainee", org: "Habib Bank Limited", note: "Placed 100+ trainees in the bank’s flagship program from 2,000+ applicants; built the tracker the program adopted as its working tool." },
  { years: "2023", title: "Government Relations Intern", org: "Engro Corporation", note: "Formalized Engro’s first written policy for engaging government officials, and mapped 80+ decision-makers into a working directory." },
];

const leadership = [
  { years: "Founder", title: "HER Empowerment", org: "Community for corporate women in Pakistan", note: "Built a 550+ member LinkedIn community and launched weekly padel networking sessions." },
  { years: "Ambassador", title: "UC Irvine Paul Merage School of Business", org: "Student Ambassador", note: "Co-led workshops for 50+ prospective students, including a 2-hour hands-on SQL session." },
];

const facts: [string, React.ReactNode][] = [
  [
    "Education",
    <>
      <span className="degree">MS Business Analytics</span>
      <span className="school">University of California, Irvine · 2026</span>
      <span className="degree">BS Economics</span>
      <span className="school">Institute of Business Administration, Karachi · 2024</span>
    </>,
  ],
  ["Based in", "Orange County, California. US permanent resident."],
  ["Looking for", "Business Analyst, Strategy & Operations, and Business Operations roles"],
];

export default function Home() {
  return (
    <main>
      {/* Hero ------------------------------------------------------------ */}
      <section className="hero" id="top">
        <Lanyard variant="hero" />
        <div className="wrap hero-grid">
          <div>
            <h1 className="hero-name">Manaal<br />Fatima</h1>
            <p className="hero-line">I don’t start with the data. I start with what we’re actually trying to solve.</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href="#work">See the work</a>
              <a className="btn btn-line" href="/resume.pdf" target="_blank" rel="noreferrer">Download resume</a>
            </div>
            <div className="hero-status">
              <span className="dot" aria-hidden="true" />
              <span>Business Analyst · Strategy & Operations · Business Operations</span>
              <span className="hero-icons">
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.8 3.44-1.8 3.7 0 4.2 2.3 4.2 5.3v6h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8v5.4h-4v-11Z"/></svg>
                </a>
                <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Work ------------------------------------------------------------ */}
      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head">
            <p className="label">(01) Selected work</p>
            <h2 className="section-title">Questions I’ve answered</h2>
          </div>
          <div className="projects">
            {projects.map((p, i) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="project">
                <div className="project-num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <p className="label">{p.category}</p>
                  <h3 className="project-q">{p.question}</h3>
                  <p className="project-a">{p.answer}</p>
                  <div className="project-cta">Read the case study <span aria-hidden="true">→</span></div>
                </div>
                <div className="project-chart"><MiniChart slug={p.slug} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About ----------------------------------------------------------- */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="about">
            <div>
              <p className="label">(02) About</p>
              <h2 className="about-title">A business analyst who starts with the problem, not the numbers.</h2>
              <div className="about-body">
                <p>
                  Most of my work starts the same way: sitting with the people who run a process, understanding what
                  they need to decide, and turning that into a question data can answer.
                </p>
                <p>
                  Economics taught me to look for the incentives behind a problem; analytics taught me to test what’s
                  actually happening. Off the clock: women’s basketball and football, art museums, and biographies.
                </p>
              </div>
            </div>
            <div className="about-side">
            <div className="facts">
              {facts.map(([label, value]) => (
                <div className="fact" key={label}>
                  <div className="label">{label}</div>
                  <div className="fact-value">{value}</div>
                </div>
              ))}
            </div>
              <JourneyMap compact />
            </div>
          </div>
        </div>
      </section>

      {/* Experience ------------------------------------------------------ */}
      <section className="section" id="experience">
        <div className="wrap">
          <div className="section-head">
            <p className="label">(03) Experience</p>
            <h2 className="section-title">Where I’ve worked</h2>
          </div>
          <div className="roles">
            {roles.map((r) => (
              <div className="role" key={r.title + r.years}>
                <div className="label">{r.years}</div>
                <div><div className="role-title">{r.title}</div><div className="role-org">{r.org}</div></div>
                <div className="role-note">{r.note}</div>
              </div>
            ))}
          </div>
          <p className="label roles-sub">Leadership</p>
          <div className="roles">
            {leadership.map((r) => (
              <div className="role" key={r.title}>
                <div className="label">{r.years}</div>
                <div><div className="role-title">{r.title}</div><div className="role-org">{r.org}</div></div>
                <div className="role-note">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
