import type { Timer, TimerDuration, TimerEventAction } from "../db/types";

export interface TimerState {
  status: "not-started" | "running" | "paused" | "finished";
  msLeft: number;
  lastAction: TimerEventAction;
}

const getMsFromDuration = (duration: TimerDuration): number => {
  return (
    (duration.hours ?? 0) * 60 * 60 * 1000 +
    (duration.minutes ?? 0) * 60 * 1000 +
    (duration.seconds ?? 0) * 1000
  );
};

export const getTimerState = (timer: Timer): TimerState => {
  const msDuration = getMsFromDuration(timer.duration);
  let msLeft = msDuration;

  let start = 0;
  for (const nextEvent of timer.events) {
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
  msLeft = Math.ceil(msLeft / 1000) * 1000;

  const timerState: TimerState = {
    status: "running",
    msLeft,
    lastAction: timer.events.at(-1)?.action ?? "start",
  };
  const lastEvent = timer.events.at(-1);
  if (
    timer.events.length === 1 &&
    (lastEvent?.time ?? 0) > new Date().getTime()
  ) {
    timerState.status = "not-started";
    timerState.msLeft = msDuration;
  } else if (msLeft > 0 && lastEvent?.action === "stop") {
    timerState.status = "paused";
  } else if (msLeft > 0 && lastEvent?.action === "start") {
    timerState.status = "running";
  } else {
    timerState.status = "finished";
    timerState.msLeft = 0;
  }

  return timerState;
};

export const formatTimerDuration = (duration: TimerDuration): string => {
  const hours = duration.hours;
  const minutes = duration.minutes;
  const seconds = duration.seconds ?? 0;

  return [hours, minutes, seconds].filter((t) => t !== undefined).join(":");
};