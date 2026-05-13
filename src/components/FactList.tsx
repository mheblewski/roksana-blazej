import React from 'react';

interface FactListProps {
  facts: [string, string][];
}

export function FactList({ facts }: FactListProps) {
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
