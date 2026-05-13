import React from 'react';

export function CalendarVisual() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
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
        {Array.from({ length: 5 }).map((_, i) => (
          <span className="empty-day" key={`empty-${i}`} />
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
