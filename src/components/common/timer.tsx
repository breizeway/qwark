import { intervalToDuration } from "date-fns";
import type { Timer as TimerData } from "../../db/types";
import {
  formatTimeLeft,
  formatTimeOriginal,
  getProgressGradient,
  getTimerState,
} from "../../helpers/timers";
import { useDeleteTimer } from "../../react-hooks/use-delete-timer";
import { useToggleTimer } from "../../react-hooks/use-toggle-timer";
import { useEffect, useState } from "react";
import Pause from "../icons/pause";
import Play from "../icons/play";
import XMark from "../icons/x-mark";

interface TimerProps {
  timer: TimerData;
}

export const Timer: React.FC<TimerProps> = ({ timer }) => {
  const [_refresh, _setRefresh] = useState<{}>({});
  const refresh = () => _setRefresh({});

  const timerState = getTimerState(timer);
  const timeLeftDuration = intervalToDuration({
    start: 0,
    end: timerState.msLeft,
  });
  const timeOriginal = formatTimeOriginal(timer.duration);
  const timeLeft = formatTimeLeft(timeLeftDuration);

  const toggleTimer = useToggleTimer();
  const deleteTimer = useDeleteTimer();

  useEffect(() => {
    const { status } = timerState;

    const updateTimer = () => {
      if (document.hasFocus()) refresh();
    };

    let interval: number | null = null;
    if (status === "not-started" || status === "running") {
      interval = setInterval(updateTimer, 100);
    }

    return () => {
      interval !== null && clearInterval(interval);
    };
  }, [timerState, refresh]);

  return (
    <div
      style={getProgressGradient(timerState.progress)}
      className="border-2 border-(--color-timer-progress) p-2 flex justify-between gap-2 timer"
    >
      <span>{timer.name}</span>
      <span>{timeOriginal}</span>
      <span className="font-bold">{timeLeft}</span>
      <div className="flex gap-2">
        <button className="icon-button" onClick={() => toggleTimer(timer)}>
          {timerState.status === "running" ? (
            <Pause className="icon" />
          ) : (
            <Play className="icon" />
          )}
        </button>
        <button className="icon-button" onClick={() => deleteTimer(timer.id)}>
          <XMark className="icon" />
        </button>
      </div>
    </div>
  );
};
