import React, { useEffect, useRef, useState } from 'react';
import { CARD_SECTIONS } from '../data/sections';

interface MobileEnvelopeProps {
  isVisible: boolean;
  goToStep: (step: number) => boolean;
}

export function MobileEnvelope({ isVisible, goToStep }: MobileEnvelopeProps) {
  const [envProgress, setEnvProgress] = useState(0);
  const [envSnapping, setEnvSnapping] = useState(false);
  const envProgressRef = useRef(0);
  const envelopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    const el = envelopeRef.current;
    if (!el) return;

    let startY: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      setEnvSnapping(false);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (startY === null) return;
      e.preventDefault();
      const p = Math.max(0, Math.min(1, (startY - e.touches[0].clientY) / 180));
      envProgressRef.current = p;
      setEnvProgress(p);
    };
    const onTouchEnd = () => {
      if (startY === null) return;
      startY = null;
      const p = envProgressRef.current;
      setEnvSnapping(true);
      if (p > 0.35) {
        setEnvProgress(1);
        setTimeout(() => { goToStep(1); setEnvProgress(0); setEnvSnapping(false); }, 420);
      } else {
        setEnvProgress(0);
        setTimeout(() => setEnvSnapping(false), 350);
      }
    };
    const onClick = () => {
      if (envProgressRef.current > 0.1) return;
      setEnvSnapping(true);
      setEnvProgress(1);
      setTimeout(() => { goToStep(1); setEnvProgress(0); setEnvSnapping(false); }, 420);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('click', onClick);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('click', onClick);
    };
  }, [isVisible, goToStep]);

  return (
    <div className="mobile-env-scene" ref={envelopeRef}>
      <div
        className={`mobile-env-bounds${envSnapping ? ' is-snapping' : ''}`}
        style={{ '--env-p': envProgress } as React.CSSProperties}
      >
        <span className="mob-env-back" aria-hidden="true">
          {/* <span className="mob-env-stamp" aria-hidden="true">
            <img src={`${process.env.PUBLIC_URL}/rb.svg`} alt="" className="stamp-svg" />
            <small>2027</small>
          </span> */}
        </span>
        <article className="mob-peek-card">
          <div className="card-monogram">
            <img src={`${process.env.PUBLIC_URL}/rb.svg`} alt="R & B" className="monogram-svg" />
          </div>
          <p className="section-tag">{CARD_SECTIONS[0].tag}</p>
          <h1 className="mobile-card-title">
            {CARD_SECTIONS[0].title.split('\n').map(line => <span key={line}>{line}</span>)}
          </h1>
          <div className="card-divider" aria-hidden="true" />
          <p className="mobile-card-lead">{CARD_SECTIONS[0].cardLead}</p>
        </article>
        <span className="mob-env-front" aria-hidden="true" />
        <span className="mob-env-seal" aria-hidden="true">
          <img src={`${process.env.PUBLIC_URL}/rb.svg`} alt="" className="monogram-svg seal-svg" />
        </span>
        <span className="mob-env-flap" aria-hidden="true" />
      </div>
      <div
        className="mobile-envelope-hint"
        style={{ opacity: Math.max(0, 1 - envProgress * 4) }}
      >
        <span className="mobile-hint-text">Przesuń aby otworzyć</span>
        <span className="mobile-hint-arrow" aria-hidden="true">↓</span>
      </div>
    </div>
  );
}
