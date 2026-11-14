"use client";

// A small horizontal bar chart built from plain divs (no chart library).
// - Several scenarios get a toggle, and bars animate between them so the
//   reader sees exactly how much changed (used for Yelp with/without location).
// - If min is below zero, bars grow left or right from a zero line, which is
//   how the impulse-purchase effects (positive and negative) are shown.

import { useState } from "react";

type Format = "auc" | "int" | "pp" | "r";
type Props = {
  caption: string;
  scenarios: { label: string; values: { name: string; value: number; muted?: boolean }[] }[];
  min: number;
  max: number;
  format: Format;
};

function show(v: number, f: Format) {
  if (f === "auc") return v.toFixed(3);
  if (f === "int") return Math.round(v).toLocaleString("en-US");
  if (f === "r") return `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}`;
  return `${v > 0 ? "+" : ""}${v.toFixed(1)} pts`;
}

export default function Bars({ caption, scenarios, min, max, format }: Props) {
  const [active, setActive] = useState(0);
  const pos = (v: number) => ((v - min) / (max - min)) * 100;
  const zero = min < 0 ? pos(0) : 0;

  return (
    <figure className="chart" style={{ margin: "0 0 36px" }}>
      <div className="chart-head">
        <p>{caption}</p>
        {scenarios.length > 1 && (
          <div className="toggle" role="group" aria-label="Scenario">
            {scenarios.map((s, i) => (
              <button key={s.label} aria-pressed={active === i} onClick={() => setActive(i)}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {scenarios[active].values.map((v) => {
        const p = pos(v.value);
        const left = Math.min(zero, p);
        const width = Math.max(1.5, Math.abs(p - zero));
        return (
          <div className="bar-row" key={v.name}>
            <span>{v.name}{v.muted && format === "pp" && <span className="bar-ns"> (not significant)</span>}</span>
            <div className="bar-track" style={{ position: "relative" }}>
              {min < 0 && <div className="bar-zero" style={{ left: `${zero}%` }} />}
              <div
                className={`bar-fill${v.value < 0 ? " bar-neg" : ""}${v.muted ? " bar-muted" : ""}`}
                style={{ position: "absolute", top: 0, bottom: 0, left: `${left}%`, width: `${width}%` }}
              />
            </div>
            <span className="bar-val">{show(v.value, format)}</span>
          </div>
        );
      })}
      {format === "auc" && (
        // The axis starts at 0.5 because that's what a coin flip scores
        <div className="chart-axis">
          <span>{min.toFixed(1)} (chance)</span>
          <span>{max.toFixed(1)}</span>
        </div>
      )}
    </figure>
  );
}
