import { useState, useEffect, useRef } from 'react';

type FlipPhase = 'idle' | 'out' | 'in';

interface CardFlip {
  displayIndex: number;
  flipPhase: FlipPhase;
}

export function useCardFlip(activeIndex: number, halfDurationMs = 350): CardFlip {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [flipPhase, setFlipPhase] = useState<FlipPhase>('idle');
  const prevIndexRef = useRef(activeIndex);

  useEffect(() => {
    if (activeIndex === prevIndexRef.current) return;
    prevIndexRef.current = activeIndex;
    setFlipPhase('out');
    const timer = setTimeout(() => {
      setDisplayIndex(activeIndex);
      setFlipPhase('in');
    }, halfDurationMs);
    return () => clearTimeout(timer);
  }, [activeIndex, halfDurationMs]);

  return { displayIndex, flipPhase };
}
