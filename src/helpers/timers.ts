import { intervalToDuration } from "date-fns";
import type { DbTimer, TimerDuration } from "../db/types";

export interface TimerState {
  status: "not-started" | "running" | "paused" | "finished";
  durationLeft: TimerDuration;
  progress: number;
}

const getMsFromDuration = (duration: TimerDuration): number => {
  return (
    (duration.hours ?? 0) * 60 * 60 * 1000 +
    (duration.minutes ?? 0) * 60 * 1000 +
    (duration.seconds ?? 0) * 1000
  );
};

const calcTimerProgress = (msLeft: number, msDuration: number) => {
  if (msLeft === 0 || msDuration === 0) return 1;
  const rawProgress = 1 - msLeft / msDuration;
  return Math.round(rawProgress * 10_000) / 10_000;
};

export const getTimerState = (timer: DbTimer): TimerState => {
  const msDuration = getMsFromDuration(timer.duration);
  let msLeft = msDuration;

  let start = 0;
  for (const nextEvent of timer.events) {
    if (nextEvent.time > new Date().getTime()) break;

    if (nextEvent?.action === "start") {
      start = nextEvent.time;
    }

    if (nextEvent?.action === "stop") {
      const timeUsed = nextEvent.time - start;
      msLeft -= timeUsed;
      start = 0;
    }
  }
  if (start) {
    const timeUsed = new Date().getTime() - start;
    msLeft -= timeUsed;
  }
  msLeft = msLeft < 0 ? 0 : msLeft;

  const timerState: TimerState = {
    status: "running",
    durationLeft: {},
    progress: calcTimerProgress(msLeft, msDuration),
  };
  const lastEvent = timer.events.at(-1);
  if ((lastEvent?.time ?? 0) > new Date().getTime()) {
    timerState.status = "not-started";
  } else if (msLeft > 0 && lastEvent?.action === "stop") {
    timerState.status = "paused";
  } else if (msLeft > 0 && lastEvent?.action === "start") {
    timerState.status = "running";
  } else {
    timerState.status = "finished";
  }

  timerState.durationLeft = intervalToDuration({
    start: 0,
    end: Math.ceil(msLeft / 1000) * 1000,
  });

  return timerState;
};

export const formatTimeLeft = (duration: TimerDuration): string => {
  let timeLeft = [
    duration.hours ?? 0,
    duration.minutes ?? 0,
    duration.seconds ?? 0,
  ]
    .map((t) => String(t).padStart(2, "0"))
    .join(":");

  while (timeLeft.startsWith("00:")) timeLeft = timeLeft.replace("00:", "");
  if (timeLeft === "00") timeLeft = "--:--";
  return timeLeft;
};

export const formatTimeOriginal = (duration: TimerDuration): string =>
  Object.entries(duration)
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${v}${k[0]}`)
    .join(", ");

const TIMER_DURATION_KEYS: (keyof TimerDuration)[] = [
  "hours",
  "minutes",
  "seconds",
];

const isTimerDurationKey = (key: unknown): key is keyof TimerDuration =>
  TIMER_DURATION_KEYS.includes(key as keyof TimerDuration);

export const timerDurationFromForm = (formData: FormData): TimerDuration => {
  const duration: TimerDuration = {};

  formData.forEach((value, key) => {
    if (isTimerDurationKey(key) && typeof value === "string" && !!value) {
      const valueInt = parseInt(value);
      if (!!valueInt) duration[key] = valueInt;
    }
  });
  return duration;
};

export const getProgressGradient = (
  progress: number
): React.HTMLAttributes<HTMLDivElement>["style"] => {
  const stop = Math.round(progress * 10000) / 100;
  const color = "var(--color-timer-progress)";
  return {
    backgroundImage: `linear-gradient(to left, oklch(0% 0 0 / 0%) 0%, oklch(0% 0 0 / 0%) ${stop}%, ${color} ${stop}%, ${color} 100%)`,
  };
};
