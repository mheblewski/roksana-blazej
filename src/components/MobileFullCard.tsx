import React from 'react';
import { CardSection, CountdownTime } from '../types';
import { KeyVisual } from './KeyVisual';
import { FactList } from './FactList';

interface MobileFullCardProps {
  section: CardSection;
  countdown: CountdownTime;
}

export function MobileFullCard({ section, countdown }: MobileFullCardProps) {
  const isWhen = section.id === 'when';
  return (
    <article className={`mobile-full-card mobile-card-${section.id}`} aria-label="Karta z zaproszeniem">
      <div className="card-monogram">
        <img src={`${process.env.PUBLIC_URL}/rb.svg`} alt="R & B" className="monogram-svg" />
      </div>
      <div className="mobile-card-content">
        <p className="section-tag">{section.tag}</p>
        <h1 className="mobile-card-title">
          {section.title.split('\n').map((line) => (
            <span key={`${section.id}-${line}`}>{line}</span>
          ))}
        </h1>
        <div className="card-divider" aria-hidden="true" />
        {isWhen ? (
          <div className="mobile-when-content">
            <div className="mobile-card-visual">
              <KeyVisual section={section} countdown={countdown} />
            </div>
            <p className="mobile-when-date">Czwartek (Boże Ciało), 27 maja 2027</p>
            <p className="mobile-when-line">Ceremonia o 17:00</p>
            <p className="mobile-when-line">Przyjęcie po ceremonii</p>
          </div>
        ) : (
          <>
            {section.visual !== 'note' && (
              <div className="mobile-card-visual">
                <KeyVisual section={section} countdown={countdown} />
              </div>
            )}
            {section.sideLead && <p className="mobile-card-lead">{section.sideLead}</p>}
            {section.facts.length > 0 && <FactList facts={section.facts} />}
          </>
        )}
      </div>
    </article>
  );
}
