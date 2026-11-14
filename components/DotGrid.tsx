// A row of dots per measure: filled = judged correct. Shows small samples
// honestly (16 of 20) instead of hiding them behind a percentage.
export default function DotGrid({ caption, items }: { caption: string; items: { hit: number; total: number; label: string }[] }) {
  return (
    <figure className="chart" style={{ margin: "0 0 36px" }}>
      <div className="chart-head"><p>{caption}</p></div>
      {items.map((it) => (
        <div className="dg-row" key={it.label}>
          <div className="dg-dots" role="img" aria-label={`${it.hit} of ${it.total}`}>
            {Array.from({ length: it.total }, (_, i) => <span key={i} className={i < it.hit ? "dg-dot on" : "dg-dot"} />)}
          </div>
          <div className="dg-meta"><strong>{it.hit} of {it.total}</strong><span>{it.label}</span></div>
        </div>
      ))}
    </figure>
  );
}
