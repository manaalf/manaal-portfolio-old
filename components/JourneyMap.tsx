"use client";

// ---------------------------------------------------------------------------
// Dotted world map: a dashed route from Karachi to Irvine, drawn by a plane
// the first time the map scrolls into view. The land dots are precomputed
// (data/worldDots.ts), so the browser does no geography work at all.
// ---------------------------------------------------------------------------

import { useEffect, useRef } from "react";
import { DOTS, MAP_W, MAP_H, KARACHI, IRVINE } from "@/data/worldDots";

// Curved route: a quadratic arc that peaks well above both cities
const MX = (KARACHI[0] + IRVINE[0]) / 2;
const MY = Math.min(KARACHI[1], IRVINE[1]) - 150;
const ROUTE = `M ${KARACHI[0]} ${KARACHI[1]} Q ${MX} ${MY} ${IRVINE[0]} ${IRVINE[1]}`;

// size: font size in map units; the compact map is drawn smaller, so it uses bigger labels
function Pill({ x, y, label, solid, size = 15 }: { x: number; y: number; label: string; solid?: boolean; size?: number }) {
  const w = label.length * size * 0.6 + size * 2;
  const h = size * 2.1;
  return (
    <g transform={`translate(${x - w / 2} ${y + 16})`}>
      <rect width={w} height={h} rx={h / 2} fill={solid ? "var(--accent)" : "var(--card)"} stroke="var(--accent)" strokeWidth={1.5} />
      <text x={w / 2} y={h * 0.67} textAnchor="middle" className="map-pill-text" style={{ fontSize: size }} fill={solid ? "var(--paper)" : "var(--accent)"}>
        {label}
      </text>
    </g>
  );
}

export default function JourneyMap({ compact = false }: { compact?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const route = routeRef.current!;
    const plane = planeRef.current!;
    const len = route.getTotalLength();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Put the plane at fraction k of the route, nose pointing along it
    function placePlane(k: number) {
      const a = route.getPointAtLength(len * k);
      const b = route.getPointAtLength(Math.min(len, len * k + 1));
      const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      plane.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
    }

    if (reduced) { placePlane(0.5); return; }
    plane.classList.remove("landed");

    // Hide the route until the flight starts; the dash is "drawn" behind the plane
    route.style.strokeDasharray = `${len}`;
    route.style.strokeDashoffset = `${len}`;
    placePlane(0.001);

    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      let t0 = 0;
      const fly = (ts: number) => {
        if (!t0) t0 = ts;
        const k = Math.min(1, (ts - t0) / 3200);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; // ease in-out
        route.style.strokeDashoffset = `${len * (1 - e)}`;
        placePlane(Math.min(0.999, Math.max(0.001, e)));
        if (k < 1) raf = requestAnimationFrame(fly);
        else { route.style.strokeDasharray = "5 6"; route.style.strokeDashoffset = "0"; plane.classList.add("landed"); }
      };
      raf = requestAnimationFrame(fly);
    }, { threshold: 0.4 });
    io.observe(wrapRef.current!);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className={`journey${compact ? " journey-compact" : ""}`} ref={wrapRef}>
      {/* Compact = cropped to the stretch between the two cities, so labels stay legible in a narrow column */}
      <svg viewBox={compact ? "30 40 760 330" : `0 0 ${MAP_W} ${MAP_H}`} role="img" aria-labelledby="journey-title">
        <title id="journey-title">Map of my move from Karachi, Pakistan to Irvine, California: 13,485 km</title>
        <g className="map-dots">
          {DOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={1.7} />)}
        </g>
        <path ref={routeRef} d={ROUTE} className="map-route" style={{ strokeDasharray: "5 6" }} />
        {[KARACHI, IRVINE].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={6} className="map-ring" />
            <circle cx={x} cy={y} r={6} fill={i === 0 ? "var(--paper)" : "var(--accent)"} stroke="var(--accent)" strokeWidth={2.5} />
          </g>
        ))}
        <g ref={planeRef} className="map-plane" transform={`translate(${MX} ${MY + 75})`}>
          <path d="M-11 -1.5 L-3 -1.5 L3 -9 L6 -9 L2 -1.5 L9 -1.5 L12 -4 L14 -4 L12 0 L14 4 L12 4 L9 1.5 L2 1.5 L6 9 L3 9 L-3 1.5 L-11 1.5 Z" fill="var(--accent)" />
        </g>
        <Pill x={KARACHI[0]} y={KARACHI[1]} label="Karachi, PK" size={compact ? 22 : 15} />
        <Pill x={IRVINE[0]} y={IRVINE[1]} label="Irvine, CA" solid size={compact ? 22 : 15} />
        <g transform={`translate(${MX - (compact ? 125 : 92)} ${(KARACHI[1] + IRVINE[1]) / 2 - 22}) rotate(-3)`}>
          <rect width={compact ? 250 : 184} height={compact ? 40 : 30} rx={6} className="map-chip" />
          <text x={compact ? 125 : 92} y={compact ? 27 : 20} textAnchor="middle" className="map-chip-text" style={{ fontSize: compact ? 18 : 13 }}>13,485 km · 8,379 mi</text>
        </g>
      </svg>
      <p className="journey-caption label">Karachi → Irvine, 2025</p>
    </div>
  );
}
