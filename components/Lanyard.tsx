"use client";

// ---------------------------------------------------------------------------
// The hanging ID badge, used twice: in the hero (front facing out) and in the
// contact section (back facing out, with contact details).
//
// Physics: the strap is a chain of points simulated with Verlet integration
// (each point remembers its previous position, so velocity is implicit).
// Each frame we apply gravity, then pull neighbouring points back together if
// they drift further apart than one segment. That "max distance only" rule
// makes it behave like a rope, so the badge drops in, goes slack, and snaps
// taut with a bounce. The badge drops the first time it scrolls into view.
//
// Interaction: drag to swing it; a quick tap (no real movement) flips it.
// Everything is written straight to the DOM inside requestAnimationFrame, so
// React doesn't re-render 60 times a second.
// ---------------------------------------------------------------------------

import { useEffect, useId, useRef, useState } from "react";
import { LINKS } from "@/data/links";

type P = { x: number; y: number; px: number; py: number };
type Props = { variant?: "hero" | "contact" };

const SEGMENTS = 12;
const GRAVITY = 2600; // px/s²
const DAMPING = 0.987; // velocity kept per step; lower = settles faster
const ITERATIONS = 24; // constraint passes per step; higher = less stretchy
const STEP = 1 / 60;
const TAP_PX = 6; // moved less than this = a tap, not a drag


export default function Lanyard({ variant = "hero" }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const strapRef = useRef<SVGPathElement>(null);
  const textPathId = useId().replace(/:/g, "");
  // The contact badge starts with its back (contact details) facing out
  const [flipped, setFlipped] = useState(variant === "contact");

  useEffect(() => {
    const stage = stageRef.current!;
    const card = cardRef.current!;
    const strap = strapRef.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, bw = 0, segLen = 0, ax = 0;
    let pts: P[] = [];
    let angle = 0;
    let dragging = false;
    let downAt = { x: 0, y: 0 };
    let moved = 0;
    let grab = { dx: 0, dy: 0 };
    let target = { x: 0, y: 0 };
    let raf = 0;
    let running = false;
    let dropped = false;

    function measure() {
      const r = stage.getBoundingClientRect();
      W = r.width;
      H = r.height;
      bw = Math.min(250, Math.max(170, W * (W < 600 ? 0.5 : 0.6)));
      stage.style.setProperty("--bw", `${bw}px`);
      ax = W * 0.5;
      const cardH = bw * 1.42;
      const ropeLen = Math.max(110, Math.min(H * 0.36, H - cardH - 40));
      segLen = ropeLen / SEGMENTS;
    }

    // Lay the rope out: bunched above the stage (to drop in) or hanging still
    function init(drop: boolean) {
      pts = [];
      for (let i = 0; i <= SEGMENTS; i++) {
        const x = drop ? ax + i * 7 : ax;
        const y = drop ? -i * segLen * 0.35 - bw * 1.6 : i * segLen;
        pts.push({ x, y, px: x, py: y });
      }
      pts[0].x = pts[0].px = ax;
      pts[0].y = pts[0].py = 0;
      angle = 0;
    }

    function simulate() {
      const g = GRAVITY * STEP * STEP;
      const last = pts.length - 1;
      for (let i = 1; i <= last; i++) {
        const p = pts[i];
        if (dragging && i === last) {
          // Follows the pointer; px/py one frame behind = real throw velocity
          p.px = p.x; p.py = p.y;
          p.x = target.x; p.y = target.y;
          continue;
        }
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + g;
      }
      for (let k = 0; k < ITERATIONS; k++) {
        for (let i = 0; i < last; i++) {
          const a = pts[i], b = pts[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d <= segLen) continue; // slack is allowed: it's a rope
          const wa = i === 0 ? 0 : 1; // anchor never moves
          const wb = i + 1 === last ? (dragging ? 0 : 0.35) : 1; // heavy badge end
          const sum = wa + wb || 1;
          const diff = (d - segLen) / d;
          a.x += dx * diff * (wa / sum); a.y += dy * diff * (wa / sum);
          b.x -= dx * diff * (wb / sum); b.y -= dy * diff * (wb / sum);
        }
      }
    }

    function render() {
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i].x + pts[i + 1].x) / 2;
        const my = (pts[i].y + pts[i + 1].y) / 2;
        d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
      }
      const end = pts[pts.length - 1];
      d += ` L ${end.x} ${end.y}`;
      strap.setAttribute("d", d);
      // The badge follows the last strap segment, eased so it lags a little
      const prev = pts[pts.length - 3];
      const targetAngle = (-Math.atan2(end.x - prev.x, end.y - prev.y) * 180) / Math.PI;
      angle += (targetAngle - angle) * 0.22;
      card.style.transform = `translate(${end.x - bw / 2}px, ${end.y}px) rotate(${angle}deg)`;
    }

    function frame() { simulate(); render(); raf = requestAnimationFrame(frame); }
    function start() { if (running || reduced) return; running = true; raf = requestAnimationFrame(frame); }
    function stop() { running = false; cancelAnimationFrame(raf); }

    // --- Drag and tap ---------------------------------------------------------
    function local(e: PointerEvent) {
      const r = stage.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function onDown(e: PointerEvent) {
      // Links on the back of the badge must stay clickable
      if ((e.target as Element).closest("a")) return;
      const p = local(e);
      downAt = p;
      moved = 0;
      if (reduced || !pts.length) { dragging = false; card.setPointerCapture(e.pointerId); return; }
      const end = pts[pts.length - 1];
      grab = { dx: p.x - end.x, dy: p.y - end.y };
      target = { x: end.x, y: end.y };
      dragging = true;
      card.setPointerCapture(e.pointerId);
      start();
    }
    function onMove(e: PointerEvent) {
      if (!card.hasPointerCapture(e.pointerId)) return;
      const p = local(e);
      moved = Math.max(moved, Math.hypot(p.x - downAt.x, p.y - downAt.y));
      if (!dragging) return;
      let tx = p.x - grab.dx, ty = p.y - grab.dy;
      const max = segLen * SEGMENTS * 1.3; // strap stretches at most ~30%
      const dx = tx - ax, dy = ty;
      const dist = Math.hypot(dx, dy);
      if (dist > max) { tx = ax + (dx / dist) * max; ty = (dy / dist) * max; }
      target = { x: tx, y: ty };
    }
    function onUp(e: PointerEvent) {
      if (!card.hasPointerCapture(e.pointerId)) return;
      card.releasePointerCapture(e.pointerId);
      dragging = false;
      if (moved < TAP_PX) setFlipped((f) => !f); // a tap flips the badge
    }

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", () => (dragging = false));

    // --- Lifecycle --------------------------------------------------------------
    measure();
    function settle() {
      init(false);
      render();
      card.style.transform = `translate(${ax - bw / 2}px, ${segLen * SEGMENTS}px)`;
    }

    // Drop in the first time the stage is on screen; pause when it isn't
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!dropped) {
          dropped = true;
          if (reduced) settle();
          else init(true);
        }
        start();
      } else stop();
    }, { threshold: 0.25 });
    io.observe(stage);

    const ro = new ResizeObserver(() => {
      const oldW = W, oldH = H;
      measure();
      if (dropped && (Math.abs(W - oldW) > 2 || Math.abs(H - oldH) > 40)) { init(false); render(); }
    });
    ro.observe(stage);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className={`lanyard-stage lanyard-${variant}`} ref={stageRef}>
      <svg aria-hidden="true">
        <defs>
          <path id={textPathId} ref={strapRef} d="M 0 0" />
        </defs>
        <use href={`#${textPathId}`} fill="none" stroke="var(--accent)" strokeWidth={24} strokeLinecap="round" />
        <text fill="var(--paper)" fontFamily="var(--mono)" fontSize={10.5} letterSpacing={2.5} dominantBaseline="central">
          <textPath href={`#${textPathId}`} startOffset={18}>
            {"MANAAL FATIMA\u00A0\u00A0\u00A0\u00A0\u00A0MANAAL FATIMA"}
          </textPath>
        </text>
      </svg>

      <div
        className="badge"
        ref={cardRef}
        style={{ transform: "translate(-9999px, 0)" }}
        title="Drag to swing it, tap to flip it"
      >
        <div className="badge-clip" aria-hidden="true" />
        <div className={`badge-flip${flipped ? " is-flipped" : ""}`}>
          {/* Front: the ID card */}
          <div className="badge-card badge-front" aria-hidden={flipped}>
            <div className="badge-slot" />
            <div className="badge-top">
              <span className="badge-open"><span className="badge-dot" />OPEN TO WORK</span>
            </div>
            <div className="badge-name">Manaal<br />Fatima</div>
            <div className="badge-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photo.jpg" alt="Manaal Fatima" draggable={false} />
            </div>
            <div className="badge-foot">
              <div className="barcode" />
              <div className="badge-dept">DEPT. OF<br />ASKING WHY</div>
            </div>
          </div>

          {/* Back: contact details, like the back of a real ID */}
          <div className="badge-card badge-back" aria-hidden={!flipped}>
            <div className="badge-slot" />
            <div className="badge-top"><span>IF FOUND, PLEASE RETURN TO</span></div>
            <div className="badge-back-name">Manaal Fatima</div>
            <ul className="badge-links">
              <li><a href={`mailto:${LINKS.email}`} tabIndex={flipped ? 0 : -1}>Email</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noreferrer" tabIndex={flipped ? 0 : -1}>LinkedIn</a></li>
              <li><a href={LINKS.github} target="_blank" rel="noreferrer" tabIndex={flipped ? 0 : -1}>GitHub</a></li>
              <li><a href={LINKS.resume} target="_blank" rel="noreferrer" tabIndex={flipped ? 0 : -1}>Resume</a></li>
            </ul>
            <div className="badge-foot">
              <div className="barcode" />
              <div className="badge-dept">TAP TO<br />FLIP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
