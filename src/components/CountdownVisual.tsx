import React from 'react';
import { CountdownTime } from '../types';

interface CountdownBoxProps {
  value: number;
  label: string;
}

function CountdownBox({ value, label }: CountdownBoxProps) {
  return (
    <div className="countdown-box">
      <span className="countdown-value">{String(value).padStart(2, '0')}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

interface CountdownVisualProps {
  countdown: CountdownTime;
}

export function CountdownVisual({ countdown }: CountdownVisualProps) {
  return (
    <div className="context-countdown">
      <div className="countdown-boxes">
        <CountdownBox value={countdown.days} label="dni" />
        <CountdownBox value={countdown.hours} label="godz" />
        <CountdownBox value={countdown.minutes} label="min" />
        <CountdownBox value={countdown.seconds} label="sek" />
      </div>
    </div>
  );
}
