import React from 'react';
import { CardSection } from '../types';

interface InvitationCardProps {
  section: CardSection;
}

export function InvitationCard({ section }: InvitationCardProps) {
  return (
    <article className="invitation-card" aria-label="Karta z najważniejszymi informacjami o ślubie">
      <div className="card-monogram">
        <img src="/rb.svg" alt="R & B" className="monogram-svg" />
      </div>
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
