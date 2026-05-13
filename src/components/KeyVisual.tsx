import React from 'react';
import { CardSection, CountdownTime } from '../types';
import { CalendarVisual } from './CalendarVisual';
import { CountdownVisual } from './CountdownVisual';
import { LeafletMap } from './LeafletMap';

interface KeyVisualProps {
  section: CardSection;
  countdown: CountdownTime;
}

export function KeyVisual({ section, countdown }: KeyVisualProps) {
  if (section.visual === 'map') return <LeafletMap />;
  if (section.visual === 'countdown') return <CountdownVisual countdown={countdown} />;
  if (section.visual === 'calendar') return <CalendarVisual />;

  if (section.visual === 'note') {
    return (
      <div className={`key-visual key-${section.visual}`}>
        <img src="/rb.svg" alt="R & B" className="key-visual-svg" />
        <small>2027</small>
      </div>
    );
  }

  const labels: Record<string, [string, string]> = {
    date: ['27', 'MAJ'],
  };
  const [main, sub] = labels[section.visual] ?? ['R+B', '2027'];

  return (
    <div className={`key-visual key-${section.visual}`}>
      <span>{main}</span>
      <small>{sub}</small>
    </div>
  );
}
