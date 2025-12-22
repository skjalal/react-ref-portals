import type { Ref } from 'react';

type TimerChallengeProps = {
  title: string;
  targetTime: number;
};
type ResultModalProps = {
  targetTime: number;
  remainingTime: number;
  ref: Ref<ResultModalHandle>;
  onReset: () => void;
};
type ResultModalHandle = {
  open: () => void;
  close: () => void;
};

export { type TimerChallengeProps, type ResultModalProps, type ResultModalHandle };
