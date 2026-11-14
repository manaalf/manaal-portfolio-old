import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import BlockView from "@/components/Blocks";

// Pre-render one static page per project at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — Manaal Fatima`, description: p.answer };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <main>
      <div className="wrap case-top">
        <Link href="/#work" className="back">← All work</Link>
        <p className="label" style={{ marginTop: 40 }}>{p.category} · {p.name}</p>
        <h1 className="case-title">{p.question}</h1>
        <p className="case-answer">{p.answer}</p>

        <div className="case-links case-links-top">
          {p.links.map((l, i) => {
            const internal = l.href.startsWith("/work/");
            return internal ? (
              <Link key={l.label} className={`btn ${i === 0 ? "btn-solid" : "btn-line"}`} href={l.href}>{l.label} <span aria-hidden="true">→</span></Link>
            ) : (
              <a key={l.label} className={`btn ${i === 0 ? "btn-solid" : "btn-line"}`} href={l.href} target="_blank" rel="noreferrer">{l.label} <span aria-hidden="true">↗</span></a>
            );
          })}
        </div>

        <div className="case-facts">
          {p.facts.map((f) => (
            <div className="fact" key={f.label}><div className="label">{f.label}</div><div className="fact-value">{f.value}</div></div>
          ))}
        </div>

        {/* Executive summary: the whole story for someone who reads nothing else */}
        <section className="summary" aria-labelledby="summary-h">
          <h2 id="summary-h" className="label">In short</h2>
          {p.summary.map((s) => (
            <div className="summary-row" key={s.label}><div className="label">{s.label}</div><p>{s.value}</p></div>
          ))}
        </section>

        {p.sections.map((s) => (
          <section className="case-section" key={s.label}>
            <p className="label">{s.label}</p>
            <div>
              <h2>{s.heading}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
            </div>
          </section>
        ))}

        <div className="case-end">
          <Link href="/#work" className="back back-big">← Back to all work</Link>
        </div>
      </div>
    </main>
  );
}
