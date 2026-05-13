import { useState, useEffect, useRef, useCallback } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

interface StepStory {
  step: number;
  direction: number;
  isAnimating: boolean;
  goToStep: (nextStep: number) => boolean;
}

export function useStepStory(totalSteps: number, durationMs = 700, isMobile = false): StepStory {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const stepRef = useRef(0);
  const lockedRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchInScrollableRef = useRef(false);
  const isMobileRef = useRef(isMobile);

  useEffect(() => { stepRef.current = step; }, [step]);
  useEffect(() => { isMobileRef.current = isMobile; }, [isMobile]);

  const lockTransition = useCallback(() => {
    lockedRef.current = true;
    setIsAnimating(true);
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = setTimeout(() => {
      lockedRef.current = false;
      wheelAccumulatorRef.current = 0;
      setIsAnimating(false);
    }, durationMs);
  }, [durationMs]);

  const goToStep = useCallback((nextStep: number): boolean => {
    if (lockedRef.current) return false;
    const bounded = clamp(nextStep, 0, totalSteps - 1);
    const current = stepRef.current;
    if (bounded === current) return false;
    setDirection(bounded > current ? 1 : -1);
    setStep(bounded);
    lockTransition();
    return true;
  }, [lockTransition, totalSteps]);

  const moveStep = useCallback((delta: number) => {
    goToStep(stepRef.current + delta);
  }, [goToStep]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (lockedRef.current) return;
      wheelAccumulatorRef.current += event.deltaY;
      if (Math.abs(wheelAccumulatorRef.current) < 44) return;
      moveStep(wheelAccumulatorRef.current > 0 ? 1 : -1);
      wheelAccumulatorRef.current = 0;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (lockedRef.current) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && !event.shiftKey)) {
        event.preventDefault();
        moveStep(1);
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp' || (event.key === ' ' && event.shiftKey)) {
        event.preventDefault();
        moveStep(-1);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      if (isMobileRef.current && stepRef.current === 0) return;
      touchStartRef.current = event.touches[0]?.clientY ?? null;
      touchInScrollableRef.current = !!(event.target as Element)?.closest?.('.context-anim-wrapper');
    };

    const onTouchMove = (event: TouchEvent) => {
      if (touchInScrollableRef.current) return;
      if (isMobileRef.current) return;
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (lockedRef.current || touchStartRef.current == null) return;
      if (isMobileRef.current && stepRef.current === 0) {
        touchStartRef.current = null;
        return;
      }
      if (touchInScrollableRef.current) {
        touchStartRef.current = null;
        return;
      }
      const endY = event.changedTouches[0]?.clientY ?? touchStartRef.current;
      const deltaY = touchStartRef.current - endY;
      touchStartRef.current = null;
      if (Math.abs(deltaY) < 36) return;
      moveStep(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [moveStep]);

  return { step, direction, isAnimating, goToStep };
}
