// ---------------------------------------------------------------------------
// One small chart per project for the homepage rows: each one tells that
// project's finding at a glance. All numbers come from the same sources as the
// case studies. Pure SVG, rendered on the server.
// ---------------------------------------------------------------------------

import { CAPSTONE_POINTS } from "@/data/capstonePoints";

const W = 220, H = 140;

function Capstone() {
  // Every 2nd company keeps it light; Purpose Leaders (top right) in accent
  const pts = CAPSTONE_POINTS.filter((_, i) => i % 2 === 0);
  const sx = (v: number) => 8 + v * (W - 16), sy = (v: number) => H - 22 - v * (H - 30);
  return (
    <>
      <rect x={sx(0.5)} y={sy(1)} width={sx(1) - sx(0.5)} height={sy(0.5) - sy(1)} className="mc-soft" />
      <line x1={sx(0.5)} x2={sx(0.5)} y1={sy(0)} y2={sy(1)} className="mc-rule" />
      <line x1={sx(0)} x2={sx(1)} y1={sy(0.5)} y2={sy(0.5)} className="mc-rule" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={sx(x)} cy={sy(y)} r={1.6} className={x >= 0.5 && y >= 0.5 ? "mc-on" : "mc-off"} />
      ))}
      <text x={W - 6} y={H - 4} textAnchor="end" className="mc-label">12% are purpose leaders</text>
    </>
  );
}

function Seller() {
  const x0 = 6, w = W - 12, sp = 0.6;
  return (
    <>
      <text x={x0} y={34} className="mc-big">60%</text>
      <text x={x0} y={52} className="mc-label">of sellers are in one state</text>
      <rect x={x0} y={70} width={w * sp} height={26} rx={4} className="mc-on" />
      <rect x={x0 + w * sp + 3} y={70} width={w * (1 - sp) - 3} height={26} rx={4} className="mc-off" />
      <text x={x0 + 8} y={88} className="mc-in">São Paulo</text>
      <text x={W - 6} y={114} textAnchor="end" className="mc-label">Rest of Brazil 40%</text>
    </>
  );
}

function Impulse() {
  const rows = [
    { v: 10.05, l: "Hygiene" }, { v: 8.29, l: "6–8 AM" }, { v: 2.86, l: "Monday" },
    { v: 1.53, l: "Discount", ns: true }, { v: -10.06, l: "Mid spend" }, { v: -12.22, l: "High spend" },
  ];
  const zero = 120, scale = 7.2;
  return (
    <>
      <line x1={zero} x2={zero} y1={2} y2={H - 16} className="mc-axis" />
      {rows.map((r, i) => {
        const y = 6 + i * 19, len = Math.abs(r.v) * scale;
        return (
          <g key={r.l}>
            <rect x={r.v >= 0 ? zero : zero - len} y={y} width={len} height={12} rx={2} className={r.ns ? "mc-off" : r.v >= 0 ? "mc-on" : "mc-neg"} />
            <text x={r.v >= 0 ? zero - 5 : zero + 5} y={y + 10} textAnchor={r.v >= 0 ? "end" : "start"} className="mc-tiny">{r.l}</text>
          </g>
        );
      })}
      <text x={W - 6} y={H - 2} textAnchor="end" className="mc-label">Discounts: not significant</text>
    </>
  );
}

function Yelp() {
  // XGBoost AUC with and without location, on an axis starting at 0.5 (chance)
  const base = 112, scale = (v: number) => (v - 0.5) * 300;
  const bars = [{ v: 0.7896, l: "With location", on: true }, { v: 0.779, l: "Without", on: false }];
  return (
    <>
      {bars.map((b, i) => (
        <g key={b.l}>
          <rect x={30 + i * 90} y={base - scale(b.v)} width={60} height={scale(b.v)} rx={3} className={b.on ? "mc-on" : "mc-off"} />
          <text x={60 + i * 90} y={base - scale(b.v) - 6} textAnchor="middle" className="mc-val">{b.v.toFixed(2)}</text>
          <text x={60 + i * 90} y={base + 15} textAnchor="middle" className="mc-tiny">{b.l}</text>
        </g>
      ))}
      <line x1={18} x2={W - 18} y1={base} y2={base} className="mc-axis" />
      <text x={W - 6} y={H - 2} textAnchor="end" className="mc-label">AUC barely moves</text>
    </>
  );
}

function PolicyPal() {
  return (
    <>
      {/* a policy page with one highlighted clause */}
      <rect x={10} y={8} width={84} height={108} rx={4} className="mc-paper" />
      {[22, 32, 42, 62, 72, 82, 92, 102].map((y) => <rect key={y} x={20} y={y} width={y % 20 === 2 ? 50 : 64} height={4} rx={2} className="mc-off" />)}
      <rect x={18} y={50} width={68} height={8} rx={2} className="mc-hl" />
      {/* arrow to the answer */}
      <path d="M 100 54 C 116 54 116 54 126 54" className="mc-arrow" />
      <path d="M 122 49 L 128 54 L 122 59" className="mc-arrow" />
      <rect x={132} y={30} width={82} height={52} rx={10} className="mc-on" />
      <text x={173} y={56} textAnchor="middle" className="mc-in mc-in-big">$500</text>
      <text x={173} y={72} textAnchor="middle" className="mc-in">deductible</text>
      <text x={W - 6} y={H - 2} textAnchor="end" className="mc-label">Answer, with its source</text>
    </>
  );
}

function DateAJob() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={i} cx={22 + (i % 10) * 20} cy={36 + Math.floor(i / 10) * 22} r={7} className={i < 16 ? "mc-on" : "mc-off"} />
      ))}
      <text x={6} y={98} className="mc-big-sm">16 of 20</text>
      <text x={W - 6} y={H - 2} textAnchor="end" className="mc-label">recommendations were relevant</text>
    </>
  );
}

const CHARTS: Record<string, () => React.ReactElement> = {
  "purpose-and-performance": Capstone,
  "seller-network-gap": Seller,
  "impulse-purchases": Impulse,
  "yelp-rating-signals": Yelp,
  policypal: PolicyPal,
  "date-a-job": DateAJob,
};

export default function MiniChart({ slug }: { slug: string }) {
  const C = CHARTS[slug];
  if (!C) return null;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="minichart" aria-hidden="true">
      <C />
    </svg>
  );
}
