import { intervalToDuration } from "date-fns";
import type { Timer as TimerData } from "../../db/types";
import { formatTimerDuration, getTimerState } from "../../helpers/timers";
import { useDeleteTimer } from "../../react-hooks/use-delete-timer";
import { useToggleTimer } from "../../react-hooks/use-toggle-timer";
import { useEffect, useState } from "react";

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
  const originalDuration = formatTimerDuration(timer.duration);
  const timeLeft = formatTimerDuration(timeLeftDuration);

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
    <div className="border border-divider rounded-sm p-2 flex justify-between gap-2">
      <span>{timer.name}</span>
      <span>{timerState.status}</span>
      <span>{originalDuration + " - " + timeLeft}</span>
      <button onClick={() => toggleTimer(timer)}>
        {timerState.status === "running" ? "Pause" : "Resume"}
      </button>
      <button onClick={() => deleteTimer(timer.id)}>Delete</button>
    </div>
  );
};
