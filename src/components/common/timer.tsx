import { intervalToDuration } from "date-fns";
import type { Timer as TimerData } from "../../db/types";
import {
  formatTimerDuration,
  getProgressGradient,
  getTimerState,
} from "../../helpers/timers";
import { useDeleteTimer } from "../../react-hooks/use-delete-timer";
import { useToggleTimer } from "../../react-hooks/use-toggle-timer";
import { useEffect, useState } from "react";
import Pause from "../icons/pause";
import Play from "../icons/play";

interface TimerProps {
  timer: TimerData;
}

export const Timer: React.FC<TimerProps> = ({ timer }) => {
  const [_refresh, _setRefresh] = useState<{}>({});
  const refresh = () => _setRefresh({});

  const timerState = getTimerState(timer);
  const timeLefthuration = intervalToDuration({
    start: 0,
    end: timerState.msLeft,
  });
  const originalDuration = formatTimerDuration(timer.duration);
  const timeLeft = formatTimerDuration(timeLefthuration);

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
    <tr
      style={getProgressGradient(timerState.progress)}
      className="my-1 border-2 border-(--color-timer-progress) p-2 timer [&_th]:border-(--color-timer-progress) [&_th]:border-y-2 [&_th:first-child]:border-l-2 [&_th:last-child]:border-r-2 [&_th]:p-1"
    >
      <th align="left">{timer.name}</th>
      <th align="left">{timerState.status}</th>
      <th align="left">{originalDuration + " - " + timeLeft}</th>
      <th align="right">
        <div className="flex w-fit gap-2">
          <button className="icon-button" onClick={() => toggleTimer(timer)}>
            {timerState.status === "running" ? (
              <Pause className="icon" />
            ) : (
              <Play className="icon" />
            )}
          </button>
          <button onClick={() => deleteTimer(timer.id)}>Delete</button>
        </div>
      </th>
    </tr>
  );
};
