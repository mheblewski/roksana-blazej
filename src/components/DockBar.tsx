import React, { ReactNode } from 'react';
import { CARD_SECTIONS } from '../data/sections';

const SECTION_ICONS: Record<string, ReactNode> = {
  envelope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
  ),
  intro: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  when: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  where: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  countdown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  finale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

interface DockDotProps {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function DockDot({ icon, label, active, onClick }: DockDotProps) {
  return (
    <button
      type="button"
      className={`dock-dot${active ? ' active' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className="dock-icon">{icon}</span>
      <span className="dock-tip" aria-hidden="true">{label}</span>
    </button>
  );
}

interface DockBarProps {
  step: number;
  goToStep: (step: number) => boolean;
}

export function DockBar({ step, goToStep }: DockBarProps) {
  return (
    <div className="dock-bar" aria-label="Nawigacja">
      <DockDot
        icon={SECTION_ICONS.envelope}
        label="Koperta"
        active={step === 0}
        onClick={() => goToStep(0)}
      />
      {CARD_SECTIONS.map((section, index) => (
        <DockDot
          key={section.id}
          icon={SECTION_ICONS[section.id]}
          label={section.tag}
          active={step === index + 1}
          onClick={() => goToStep(index + 1)}
        />
      ))}
    </div>
  );
}
