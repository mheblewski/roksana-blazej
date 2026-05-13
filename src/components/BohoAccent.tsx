import React from 'react';

interface BohoAccentProps {
  className?: string;
}

export function BohoAccent({ className }: BohoAccentProps) {
  return (
    <svg
      className={`boho-accent ${className ?? ''}`}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon
        points="150,10 265,75 265,225 150,290 35,225 35,75"
        stroke="currentColor" strokeWidth="1.2" opacity="0.13"
      />
      <polygon
        points="150,40 240,90 240,210 150,260 60,210 60,90"
        stroke="currentColor" strokeWidth="0.7" opacity="0.09"
        transform="rotate(30 150 150)"
      />
    </svg>
  );
}
