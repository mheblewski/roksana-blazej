import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const CARD_SECTIONS = [
  {
    id: 'intro',
    tag: 'Save the Date',
    title: 'Roksana\n& Błażej',
    cardLead: '27 maja 2027',
    cardNote: 'Stodoła Jordanów',
    sideTitle: 'Boho, ale spokojnie',
    sideLead: 'Ciepłe światło, drewno, zieleń i wieczór bez nadęcia.',
    sideText:
      'Zapraszamy na kameralny ślub i przyjęcie w miejscu, które dobrze pasuje do naturalnego, swobodnego klimatu tej historii.',
    facts: [
      ['Data', '27 maja 2027'],
      ['Miejsce', 'Stodoła Jordanów'],
      ['Charakter', 'ceremonia i przyjęcie'],
    ],
    visual: 'date',
  },
  {
    id: 'when',
    tag: 'Kiedy',
    title: 'Czwartek,\nBoże Ciało',
    cardLead: 'Start: 17:00',
    cardNote: '27 maja 2027',
    sideTitle: 'Plan wieczoru',
    sideLead: 'Najpierw ceremonia, później kolacja, muzyka i taniec.',
    sideText:
      'Przyjedź chwilę wcześniej, żeby spokojnie wejść, przywitać się i znaleźć swoje miejsce przed rozpoczęciem ceremonii.',
    facts: [
      ['17:00', 'ceremonia ślubna'],
      ['po ceremonii', 'przyjęcie weselne'],
      ['wieczorem', 'kolacja, muzyka i taniec'],
    ],
    visual: 'calendar',
  },
  {
    id: 'where',
    tag: 'Gdzie',
    title: 'Stodoła\nJordanów',
    cardLead: 'Jordanów 4B',
    cardNote: '95-060 Jordanów',
    sideTitle: 'Lokalizacja',
    sideLead: 'Jordanów 4B, 95-060 Jordanów',
    sideText: 'Mapa Google pokazuje punkt przy obiekcie. Przycisk otwiera trasę w osobnej karcie.',
    facts: [],
    visual: 'map',
  },
  {
    id: 'countdown',
    tag: 'Odliczanie',
    title: 'Do wielkiego\ndnia',
    cardLead: 'Czekamy razem',
    cardNote: '27 maja 2027, 17:00',
    sideTitle: 'Coraz bliżej',
    sideLead: 'Licznik prowadzi do rozpoczęcia ceremonii.',
    sideText:
      'To mały detal, ale dobrze oddaje tempo oczekiwania. Każda zmiana slajdu zostawia najważniejsze informacje po lewej, a kontekst po prawej.',
    facts: [],
    visual: 'countdown',
  },
  {
    id: 'finale',
    tag: 'Do zobaczenia',
    title: 'Będzie nam\nbardzo miło',
    cardLead: 'że będziesz z nami',
    cardNote: 'Roksana & Błażej',
    sideTitle: 'Do zobaczenia',
    sideLead: 'Zapisz datę i widzimy się 27 maja 2027.',
    sideText:
      'To zaproszenie ma być pierwszym prostym sygnałem wieczoru: elegancko, naturalnie i z miejscem na wspólne świętowanie.',
    facts: [
      ['Para', 'Roksana i Błażej'],
      ['Data', '27 maja 2027'],
      ['Start', '17:00'],
    ],
    visual: 'note',
  },
];

const TOTAL_STEPS = CARD_SECTIONS.length + 1;
const MAP_CENTER = { lat: 51.76211465664362, lng: 19.68033310659993 };
const MAP_ZOOM = 15;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function useStepStory(totalSteps, durationMs = 700) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const stepRef = useRef(0);
  const lockedRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const unlockTimerRef = useRef(null);
  const touchStartRef = useRef(null);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const lockTransition = useCallback(() => {
    lockedRef.current = true;
    setIsAnimating(true);
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = setTimeout(() => {
      lockedRef.current = false;
      wheelAccumulatorRef.current = 0;
      setIsAnimating(false);
    }, durationMs);
  }, [durationMs]);

  const goToStep = useCallback(
    (nextStep) => {
      if (lockedRef.current) return false;
      const bounded = clamp(nextStep, 0, totalSteps - 1);
      const current = stepRef.current;
      if (bounded === current) return false;

      setDirection(bounded > current ? 1 : -1);
      setStep(bounded);
      lockTransition();
      return true;
    },
    [lockTransition, totalSteps]
  );

  const moveStep = useCallback(
    (delta) => {
      goToStep(stepRef.current + delta);
    },
    [goToStep]
  );

  useEffect(() => {
    const onWheel = (event) => {
      event.preventDefault();
      if (lockedRef.current) return;

      wheelAccumulatorRef.current += event.deltaY;
      if (Math.abs(wheelAccumulatorRef.current) < 44) return;

      moveStep(wheelAccumulatorRef.current > 0 ? 1 : -1);
      wheelAccumulatorRef.current = 0;
    };

    const onKeyDown = (event) => {
      if (lockedRef.current) return;

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey)) {
        event.preventDefault();
        moveStep(1);
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)) {
        event.preventDefault();
        moveStep(-1);
      }
    };

    const onTouchStart = (event) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event) => {
      event.preventDefault();
    };

    const onTouchEnd = (event) => {
      if (lockedRef.current || touchStartRef.current == null) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartRef.current;
      const deltaY = touchStartRef.current - endY;
      touchStartRef.current = null;
      if (Math.abs(deltaY) < 36) return;

      moveStep(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [moveStep]);

  return { step, direction, isAnimating, goToStep };
}

function CountdownBox({ value, label }) {
  return (
    <div className="countdown-box">
      <span className="countdown-value">{String(value).padStart(2, '0')}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

function CalendarVisual() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div className="calendar-visual" aria-label="Maj 2027 z zaznaczonym 27 maja">
      <div className="calendar-head">
        <span>Maj</span>
        <span>2027</span>
      </div>
      <div className="weekdays">
        {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: 5 }).map((_, index) => (
          <span className="empty-day" key={`empty-${index}`} />
        ))}
        {days.map((day) => (
          <span className={day === 27 ? 'marked-day' : ''} key={day}>
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}

function lngToTile(lng, zoom) {
  return ((lng + 180) / 360) * 2 ** zoom;
}

function latToTile(lat, zoom) {
  const latRad = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * 2 ** zoom;
}

function GoogleTileMap() {
  const centerTileX = lngToTile(MAP_CENTER.lng, MAP_ZOOM);
  const centerTileY = latToTile(MAP_CENTER.lat, MAP_ZOOM);
  const baseX = Math.floor(centerTileX) - 1;
  const baseY = Math.floor(centerTileY) - 1;
  const centerPixelX = (centerTileX - baseX) * 256;
  const centerPixelY = (centerTileY - baseY) * 256;
  const tiles = [];

  for (let y = 0; y < 3; y += 1) {
    for (let x = 0; x < 3; x += 1) {
      const tileX = baseX + x;
      const tileY = baseY + y;
      tiles.push({ x, y, tileX, tileY });
    }
  }

  return (
    <div className="google-map" aria-label="Mapa Google lokalizacji Stodoła Jordanów">
      <div
        className="google-tile-grid"
        style={{ transform: `translate(${-centerPixelX}px, ${-centerPixelY}px)` }}
        aria-hidden="true"
      >
        {tiles.map(({ x, y, tileX, tileY }) => (
          <img
            key={`${tileX}-${tileY}`}
            src={`https://mt${(x + y) % 4}.google.com/vt/lyrs=m&x=${tileX}&y=${tileY}&z=${MAP_ZOOM}`}
            alt=""
            loading="lazy"
            style={{ left: x * 256, top: y * 256 }}
          />
        ))}
      </div>
      <span className="map-marker" aria-hidden="true" />
      <span className="map-label">Stodoła Jordanów</span>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Jordan%C3%B3w%204B%2C%2095-060%20Jordan%C3%B3w"
        target="_blank"
        rel="noopener noreferrer"
      >
        Otwórz trasę w Google Maps
      </a>
    </div>
  );
}

function CountdownVisual({ countdown }) {
  return (
    <div className="context-countdown">
      <CountdownBox value={countdown.days} label="dni" />
      <CountdownBox value={countdown.hours} label="godz" />
      <CountdownBox value={countdown.minutes} label="min" />
      <CountdownBox value={countdown.seconds} label="sek" />
    </div>
  );
}

function KeyVisual({ section, countdown }) {
  if (section.visual === 'map') return <GoogleTileMap />;
  if (section.visual === 'countdown') return <CountdownVisual countdown={countdown} />;
  if (section.visual === 'calendar') return <CalendarVisual />;

  const labels = {
    date: ['27', 'MAJ'],
    note: ['R+B', '2027'],
  };
  const [main, sub] = labels[section.visual] || ['R+B', '2027'];

  return (
    <div className={`key-visual key-${section.visual}`}>
      <span>{main}</span>
      <small>{sub}</small>
    </div>
  );
}

function FactList({ facts }) {
  if (!facts.length) return null;

  return (
    <dl className="fact-list">
      {facts.map(([label, value]) => (
        <div className="fact-row" key={`${label}-${value}`}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function InvitationCard({ section }) {
  return (
    <article className="invitation-card" aria-label="Karta z najważniejszymi informacjami o ślubie">
      <div className="card-monogram">R B</div>
      <div className="card-divider" aria-hidden="true" />

      <section className="card-summary">
        <p className="section-tag">{section.tag}</p>
        <h1>
          {section.title.split('\n').map((line) => (
            <span key={`${section.id}-${line}`}>{line}</span>
          ))}
        </h1>
        <p className="section-lead">{section.cardLead}</p>
        <p className="section-note">{section.cardNote}</p>
      </section>
    </article>
  );
}

function ContextPanel({ section, countdown }) {
  return (
    <aside className={`context-panel context-${section.id}`}>
      <div className="context-media">
        <KeyVisual section={section} countdown={countdown} />
      </div>

      <div className="context-copy">
        <p>{section.tag}</p>
        <h2>{section.sideTitle}</h2>
        <strong>{section.sideLead}</strong>
        <span>{section.sideText}</span>
        <FactList facts={section.facts} />
      </div>
    </aside>
  );
}

export default function App() {
  const countdown = useCountdown('2027-05-27T17:00:00');
  const { step, direction, isAnimating, goToStep } = useStepStory(TOTAL_STEPS, 760);
  const cardIsOpen = step > 0;
  const activeIndex = Math.max(0, step - 1);
  const activeSection = useMemo(() => CARD_SECTIONS[activeIndex], [activeIndex]);

  return (
    <div
      className={`app direction-${direction > 0 ? 'down' : 'up'}`}
      data-open={cardIsOpen ? 'true' : 'false'}
      data-animating={isAnimating ? 'true' : 'false'}
    >
      <div className="background-grain" aria-hidden="true" />
      <div className="botanical-accent accent-left" aria-hidden="true" />
      <div className="botanical-accent accent-right" aria-hidden="true" />

      <header className="topbar">
        <span>Roksana &amp; Błażej</span>
        <span>27 maja 2027</span>
      </header>

      <main className="invitation-stage">
        <div className="envelope-scene" onClick={() => !cardIsOpen && goToStep(1)}>
          <div className="card-holder">
            <InvitationCard section={activeSection} />
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
              <span className="envelope-seal">R B</span>
            </span>
            <span className="sr-only">{cardIsOpen ? 'Karta z zaproszeniem' : 'Otwórz kopertę'}</span>
          </button>
        </div>

        <ContextPanel section={activeSection} countdown={countdown} />
      </main>

      <footer className="controls">
        <div className="dots" aria-label="Nawigacja">
          <button type="button" className={`dot ${step === 0 ? 'active' : ''}`} onClick={() => goToStep(0)}>
            <span className="sr-only">Koperta</span>
          </button>
          {CARD_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              className={`dot ${step === index + 1 ? 'active' : ''}`}
              onClick={() => goToStep(index + 1)}
            >
              <span className="sr-only">{section.tag}</span>
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
