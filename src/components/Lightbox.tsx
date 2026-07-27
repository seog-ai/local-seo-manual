import React, { useState, useEffect, useCallback, useRef } from 'react';

/**
 * One delegated lightbox for the whole manual.
 *
 *   click any content <img>       → zoomable, pannable overlay
 *   click any Mermaid diagram     → the same, on the inline <svg>
 *
 * Images get the SAME zoom/pan stage as diagrams rather than a simple
 * fit-to-screen. Most of this manual's screenshots are full-page captures —
 * several are over 4,000px tall — and fitting one of those to the viewport
 * scales the UI text down to an unreadable smear, which defeats the point of
 * opening it. Instead the image opens at viewport width (so its text is
 * legible) and you pan down it.
 *
 * For the same reason a too-tall image opens anchored to its TOP edge. Centring
 * a 4,000px screenshot drops the reader into the middle of it with no idea
 * which way is up.
 *
 * Mermaid renders inline <svg>, not <img>, so it needs its own branch.
 */
type Overlay = { kind: 'img'; src: string; alt: string } | { kind: 'diagram'; svg: string } | null;

const clamp = (s: number) => Math.min(6, Math.max(0.2, s));

export default function Lightbox(): React.ReactElement | null {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [grabbing, setGrabbing] = useState(false);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  const reset = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setOverlay(null);
    reset();
  }, [reset]);

  // Delegated open. One listener for the document beats a wrapper per image,
  // and it keeps the content as plain Markdown — no MDX component to write.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('.lightbox-overlay')) return;

      const mermaid = t.closest('.docusaurus-mermaid-container') as HTMLElement | null;
      if (mermaid) {
        const svg = mermaid.querySelector('svg');
        if (svg) {
          reset();
          setOverlay({ kind: 'diagram', svg: svg.outerHTML });
        }
        return;
      }

      if (t.tagName !== 'IMG' || !t.closest('article')) return;
      // Leave linked images alone — the link is the author's intent.
      if (t.closest('a')) return;
      const img = t as HTMLImageElement;
      reset();
      setOverlay({ kind: 'img', src: img.currentSrc || img.src, alt: img.alt ?? '' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [reset]);

  // Esc closes; background scroll is locked while open.
  useEffect(() => {
    if (!overlay) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [overlay, close]);

  if (!overlay) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    setGrabbing(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setPan({
      x: drag.current.px + (e.clientX - drag.current.x),
      y: drag.current.py + (e.clientY - drag.current.y),
    });
  };
  const onPointerUp = () => {
    drag.current = null;
    setGrabbing(false);
  };

  /** Anchor a taller-than-viewport image to its top edge instead of its middle. */
  const anchorTop = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    const overflow = el.clientHeight - window.innerHeight;
    if (overflow > 0) setPan({ x: 0, y: overflow / 2 });
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-btn" onClick={() => setScale((s) => clamp(s * 1.25))} aria-label="Zoom in">
          ＋
        </button>
        <button className="lightbox-btn" onClick={() => setScale((s) => clamp(s / 1.25))} aria-label="Zoom out">
          －
        </button>
        <button className="lightbox-btn" onClick={reset} aria-label="Reset view">
          Reset
        </button>
        <button className="lightbox-btn" onClick={close} aria-label="Close">
          ✕
        </button>
      </div>

      <div
        className={`lightbox-stage${grabbing ? ' grabbing' : ''}`}
        onWheel={(e) => setScale((s) => clamp(s * (e.deltaY < 0 ? 1.12 : 0.89)))}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="lightbox-pan" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}>
          {overlay.kind === 'img' ? (
            <img src={overlay.src} alt={overlay.alt} onLoad={anchorTop} draggable={false} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: overlay.svg }} />
          )}
        </div>
      </div>

      <div className="lightbox-hint">Scroll to zoom · drag to pan · Esc to close</div>
    </div>
  );
}
