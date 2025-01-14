import type { Timer as TimerData } from "../../db/types";
import {
  formatTimeLeft,
  formatTimeOriginal,
  getProgressGradient,
} from "../../helpers/timers";
import { useDeleteTimer } from "../../react-hooks/use-delete-timer";
import { useToggleTimer } from "../../react-hooks/use-toggle-timer";
import Pause from "../icons/pause";
import Play from "../icons/play";
import XMark from "../icons/x-mark";
import { useTimekeeper } from "../../react-hooks/use-timekeeper";
import { twMerge } from "tailwind-merge";

interface TimerProps {
  timer: TimerData;
}

export const Timer: React.FC<TimerProps> = ({ timer }) => {
  const { progress, status, durationLeft, msLeft } = useTimekeeper(timer);
  console.log(`:::MSLEFT::: `, msLeft);
  const timeOriginal = formatTimeOriginal(timer.duration);
  const timeLeft = formatTimeLeft(durationLeft);

  const toggleTimer = useToggleTimer();
  const deleteTimer = useDeleteTimer();

  return (
    <div
      style={getProgressGradient(progress)}
      className="border-2 border-(--color-timer-progress) p-2 flex justify-between gap-2 timer"
    >
      <span className={twMerge(timer.name ? "flex-1" : "flex-2")}>
        {timeOriginal}
      </span>
      <span className={twMerge(timer.name ? "flex-1" : "flex-0")}>
        {timer.name}
      </span>
      <span className="flex-1 font-bold">{timeLeft}</span>
      <div className="flex-1 flex gap-2 justify-end">
        <button className="icon-button" onClick={() => toggleTimer(timer)}>
          {status === "running" ? (
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
