import React, { useMemo } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { CARD_SECTIONS, TOTAL_STEPS } from './data/sections';
import { useCountdown } from './hooks/useCountdown';
import { useIsMobile } from './hooks/useIsMobile';
import { useStepStory } from './hooks/useStepStory';
import { useCardFlip } from './hooks/useCardFlip';
import { BohoAccent } from './components/BohoAccent';
import { InvitationCard } from './components/InvitationCard';
import { MobileFullCard } from './components/MobileFullCard';
import { MobileEnvelope } from './components/MobileEnvelope';
import { ContextPanel } from './components/ContextPanel';
import { DockBar } from './components/DockBar';

export default function App() {
  const isMobile = useIsMobile();
  const countdown = useCountdown('2027-05-27T17:00:00');
  const { step, direction, isAnimating, goToStep } = useStepStory(TOTAL_STEPS, 760, isMobile);
  const cardIsOpen = step > 0;
  const activeIndex = Math.max(0, step - 1);
  const { displayIndex, flipPhase } = useCardFlip(activeIndex, 350);
  const activeSection = useMemo(() => CARD_SECTIONS[activeIndex], [activeIndex]);
  const displaySection = useMemo(() => CARD_SECTIONS[displayIndex], [displayIndex]);

  return (
    <>
      <BohoAccent className="accent-left" />
      <BohoAccent className="accent-right" />
      <div
        className={`app direction-${direction > 0 ? 'down' : 'up'}`}
        data-open={cardIsOpen ? 'true' : 'false'}
        data-animating={isAnimating ? 'true' : 'false'}
      >
        <div className="background-grain" aria-hidden="true" />

        <header className="topbar">
          <span>Roksana &amp; Błażej</span>
          <span>27 maja 2027</span>
        </header>

        {isMobile ? (
          <main className="mobile-stage">
            {step === 0 ? (
              <MobileEnvelope isVisible={step === 0} goToStep={goToStep} />
            ) : (
              <div className="mobile-card-holder">
                <div className={`card-anim-wrapper card-flip-${flipPhase}`}>
                  <MobileFullCard section={displaySection} countdown={countdown} />
                </div>
              </div>
            )}
          </main>
        ) : (
          <main className="invitation-stage">
            <div className="envelope-scene" onClick={() => !cardIsOpen && goToStep(1)}>
              <div className="card-holder">
                <div className={`card-anim-wrapper card-flip-${flipPhase}`}>
                  <InvitationCard section={displaySection} />
                </div>
              </div>

              <button
                className="envelope-button"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goToStep(cardIsOpen ? step : 1);
                }}
              >
                <span className="envelope" aria-hidden="true">
                  <span className="envelope-back" />
                  <span className="envelope-flap" />
                  <span className="envelope-front" />
                  <span className="envelope-seal">
                    <img src={`${process.env.PUBLIC_URL}/rb.svg`} alt="R & B" className="monogram-svg seal-svg" />
                  </span>
                </span>
                <span className="sr-only">{cardIsOpen ? 'Karta z zaproszeniem' : 'Otwórz kopertę'}</span>
              </button>

              <div className="scroll-hint">
                <span className="scroll-hint-text">Przesuń aby otworzyć</span>
                <span className="scroll-hint-arrow" aria-hidden="true">↓</span>
              </div>
            </div>

            <ContextPanel section={activeSection} countdown={countdown} sectionKey={activeIndex} />
          </main>
        )}

        <footer className="controls">
          <DockBar step={step} goToStep={goToStep} />
        </footer>
      </div>
    </>
  );
}
