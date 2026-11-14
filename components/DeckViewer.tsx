"use client";

// ---------------------------------------------------------------------------
// The executive-deck viewer: one 16:9 slide at a time. Arrow keys, the
// buttons, or a swipe move between slides; Escape goes back to the case study.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Slide } from "@/data/decks";
import BlockView from "./Blocks";

function SlideBody({ s }: { s: Slide }) {
  if (s.kind === "cover") {
    return (
      <div className="slide-cover">
        <p className="label">{s.kicker}</p>
        <h2 className="slide-cover-title">{s.title}</h2>
        <p className="slide-sub">{s.sub}</p>
      </div>
    );
  }
  return (
    <div className="slide-inner">
      <p className="label">{s.kicker}</p>
      <h2 className="slide-title">{s.title}</h2>
      {s.kind === "stats" && (
        <div className="slide-stats">
          {s.items.map((it) => (
            <div key={it.label}><div className="slide-stat-v">{it.value}</div><div className="slide-stat-l">{it.label}</div></div>
          ))}
        </div>
      )}
      {s.kind === "list" && (
        <div className="slide-list">
          {s.items.map((it) => (
            <div key={it.title}><h3>{it.title}</h3><p>{it.body}</p></div>
          ))}
        </div>
      )}
      {s.kind === "chart" && <div className="slide-chart"><BlockView b={s.block} /></div>}
    </div>
  );
}

export default function DeckViewer({ slug, name, slides }: { slug: string; name: string; slides: Slide[] }) {
  const [i, setI] = useState(0);
  const router = useRouter();
  const touchX = useRef<number | null>(null);
  const go = useCallback((d: number) => setI((n) => Math.max(0, Math.min(slides.length - 1, n + d))), [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(1); }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") router.push(`/work/${slug}`);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, router, slug]);

  return (
    <main className="deck">
      <div className="wrap deck-top">
        <Link href={`/work/${slug}`} className="back">← Back to the case study</Link>
        <span className="label">{name} · executive deck</span>
      </div>
      <div className="wrap">
        <div
          className="slide"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          aria-live="polite"
        >
          <SlideBody s={slides[i]} key={i} />
          <span className="slide-num">{String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        </div>
        <div className="deck-controls">
          <button className="btn btn-line" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide">←</button>
          <div className="deck-dots">
            {slides.map((_, n) => (
              <button key={n} className={`deck-dot${n === i ? " on" : ""}`} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} />
            ))}
          </div>
          <button className="btn btn-solid" onClick={() => go(1)} disabled={i === slides.length - 1} aria-label="Next slide">→</button>
        </div>
        <p className="deck-hint label">Use the arrow keys or swipe</p>
      </div>
    </main>
  );
}
