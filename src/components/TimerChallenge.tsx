import React, { useState, useRef, useEffect } from 'react';
import type { ResultModalHandle, TimerChallengeProps } from '../utils/type-utils';
import ResultModal from './ResultModal.tsx';

const TimerChallenge: React.FC<TimerChallengeProps> = ({ title, targetTime }) => {
  const timer = useRef<number | null>(null);
  const dialog = useRef<ResultModalHandle>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (timer.current) {
        clearInterval(timer.current);
      }
      dialog.current?.open();
      return () => {
        if (timer.current) {
          clearInterval(timer.current);
        }
      };
    }
  }, [timeRemaining, timer]);

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    dialog.current?.open();
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Timer is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
};

export default TimerChallenge;
