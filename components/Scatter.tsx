// ---------------------------------------------------------------------------
// The capstone quadrant chart: all 904 companies by purpose score (x) and
// performance score (y), split at 0.5. Pure SVG, no library, renders on the
// server. Quadrant counts are computed from the data, so they can't drift.
// ---------------------------------------------------------------------------

import { CAPSTONE_POINTS } from "@/data/capstonePoints";

const W = 600, H = 420, PAD = 44;
const sx = (v: number) => PAD + v * (W - PAD * 2);
const sy = (v: number) => H - PAD - v * (H - PAD * 2);

const count = (fx: (x: number) => boolean, fy: (y: number) => boolean) =>
  CAPSTONE_POINTS.filter(([x, y]) => fx(x) && fy(y)).length;
const hi = (v: number) => v >= 0.5, lo = (v: number) => v < 0.5;

const QUADS = [
  { name: "Value Extraction", n: count(lo, hi), x: PAD + 10, y: PAD + 20 },
  { name: "Purpose Leaders", n: count(hi, hi), x: W - PAD - 10, y: PAD + 20, end: true, lead: true },
  { name: "Dual Weakness", n: count(lo, lo), x: PAD + 10, y: H - PAD - 14 },
  { name: "Purpose Promise", n: count(hi, lo), x: W - PAD - 10, y: H - PAD - 14, end: true },
];

export default function Scatter({ caption }: { caption: string }) {
  return (
    <figure className="chart" style={{ margin: "0 0 36px" }}>
      <div className="chart-head"><p>{caption}</p></div>
      <svg viewBox={`0 0 ${W} ${H}`} className="scatter" role="img" aria-label="Scatter plot of 904 companies by purpose and performance score, in four quadrants">
        <rect x={sx(0.5)} y={sy(1)} width={sx(1) - sx(0.5)} height={sy(0.5) - sy(1)} className="sc-lead-bg" />
        <line x1={sx(0.5)} x2={sx(0.5)} y1={sy(0)} y2={sy(1)} className="sc-cut" />
        <line x1={sx(0)} x2={sx(1)} y1={sy(0.5)} y2={sy(0.5)} className="sc-cut" />
        <line x1={sx(0)} x2={sx(1)} y1={sy(0)} y2={sy(0)} className="sc-axis" />
        <line x1={sx(0)} x2={sx(0)} y1={sy(0)} y2={sy(1)} className="sc-axis" />
        {CAPSTONE_POINTS.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y)} r={3.2} className={hi(x) && hi(y) ? "sc-dot sc-dot-lead" : "sc-dot"} />
        ))}
        {QUADS.map((q) => (
          <text key={q.name} x={q.x} y={q.y} textAnchor={q.end ? "end" : "start"} className={q.lead ? "sc-q sc-q-lead" : "sc-q"}>
            {q.name} · {q.n}
          </text>
        ))}
        <text x={sx(1)} y={H - 12} textAnchor="end" className="sc-ax-label">Purpose score →</text>
        <text x={14} y={sy(1)} className="sc-ax-label" transform={`rotate(-90 14 ${sy(1)})`} textAnchor="end">Performance score →</text>
      </svg>
    </figure>
  );
}
