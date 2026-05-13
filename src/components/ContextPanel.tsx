import React from 'react';
import { CardSection, CountdownTime } from '../types';
import { KeyVisual } from './KeyVisual';
import { FactList } from './FactList';

interface ContextPanelProps {
  section: CardSection;
  countdown: CountdownTime;
  sectionKey: number;
}

export function ContextPanel({ section, countdown, sectionKey }: ContextPanelProps) {
  return (
    <aside className={`context-panel context-${section.id}`}>
      <div key={sectionKey} className="context-anim-wrapper">
        <div className="context-media">
          <KeyVisual section={section} countdown={countdown} />
        </div>
        <div className="context-copy">
          <p>{section.tag}</p>
          <h2>{section.sideTitle}</h2>
          <strong>{section.sideLead}</strong>
          <FactList facts={section.facts} />
        </div>
      </div>
    </aside>
  );
}
