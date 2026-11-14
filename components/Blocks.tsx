// Renders one content block from data/projects.ts. Shared by the case-study
// pages and the deck viewer so a chart looks identical in both.
import type { Block } from "@/data/projects";
import Bars from "./Bars";
import Scatter from "./Scatter";
import DotGrid from "./DotGrid";

export default function BlockView({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return <div>{b.body.map((t, i) => <p key={i}>{t}</p>)}</div>;
    case "steps":
      return (
        <ol className="steps">
          {b.items.map((s) => (
            <li key={s.title}><strong>{s.title}</strong><span>{s.body}</span></li>
          ))}
        </ol>
      );
    case "list":
      return (
        <div className="points">
          {b.items.map((s) => (
            <div className="point" key={s.title}><h3>{s.title}</h3><p>{s.body}</p></div>
          ))}
        </div>
      );
    case "stats":
      return (
        <figure className="chart stats-block" style={{ margin: "0 0 36px" }}>
          {b.note && <div className="chart-head"><p>{b.note}</p></div>}
          <div className="stats-row">
            {b.items.map((s) => (
              <div key={s.label}><div className="stat-v">{s.value}</div><div className="stat-l">{s.label}</div></div>
            ))}
          </div>
        </figure>
      );
    case "bars":
      return <Bars caption={b.caption} scenarios={b.scenarios} min={b.min} max={b.max} format={b.format} />;
    case "scatter":
      return <Scatter caption={b.caption} />;
    case "dotgrid":
      return <DotGrid caption={b.caption} items={b.items} />;
    case "qa":
      return (
        <div className="qa">
          <div className="label">{b.note}</div>
          <p className="qa-q">{b.question}</p>
          <p>{b.answer}</p>
          <div className="qa-src">Source: {b.source}</div>
        </div>
      );
  }
}
