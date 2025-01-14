import { useEffect, useState } from "react";
import type { Timer, TimerDuration } from "../db/types";
import { getTimerState, type TimerState } from "../helpers/timers";

const timerStateShouldUpdate = (
  oldState: TimerState,
  newState: TimerState
): boolean => {
  const durationHasChanged = Object.entries(oldState.durationLeft).some(
    ([k, v]) => newState.durationLeft[k as keyof TimerDuration] !== v
  );
  const statusHasChanged = oldState.status !== newState.status;

  return durationHasChanged || statusHasChanged;
};

export const useTimekeeper = (timer: Timer): TimerState => {
  const [timerState, setTimerState] = useState<TimerState>(
    getTimerState(timer)
  );

  useEffect(() => {
    const state = getTimerState(timer);
    const updateTimer = () => {
      const newState = getTimerState(timer);
      if (document.hasFocus())
        setTimerState((oldState) =>
          // interval runs every 100 ms; this checks if the state has changed enough for a rerender
          timerStateShouldUpdate(oldState, newState) ? newState : oldState
        );
    };

    let interval: number | null = null;
    if (state.status === "not-started" || state.status === "running") {
      interval = setInterval(
        updateTimer,
        state.status === "not-started" ? 1000 : 100
      );
    } else updateTimer();

    return () => {
      interval !== null && clearInterval(interval);
    };
  }, [timer, setTimerState]);

  return timerState;
};
