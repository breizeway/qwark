import { type DbTimer } from "../../db/types";
import {
  formatTimeLeft,
  formatTimeOriginal,
  getProgressGradient,
} from "../../helpers/timers";
import { useDeleteTimer } from "../../react-hooks/use-delete-timer";
import { useToggleTimer } from "../../react-hooks/use-toggle-timer";
import Pause from "../icons/pause";
import Play from "../icons/play";
import { useTimekeeper } from "../../react-hooks/use-timekeeper";
import { twMerge } from "tailwind-merge";
import Refresh from "../icons/refresh";
import { useCreateTimer } from "../../react-hooks/use-create-timer";
import Trash from "../icons/trash";
import { useRef } from "react";
import { dispatchTimerEvent } from "../../react-hooks/use-timer-events";

interface TimerProps {
  timer: DbTimer;
  row: number;
}

export const Timer: React.FC<TimerProps> = ({ timer, row }) => {
  const { progress, status, durationLeft } = useTimekeeper(timer);

  const checkedIfFinished = useRef<boolean>(status === "finished");
  if (!checkedIfFinished.current && status === "finished") {
    dispatchTimerEvent({ timerId: timer.id, eventId: "finished" });
    checkedIfFinished.current = true;
  }

  const timeOriginal = formatTimeOriginal(timer.duration);
  const timeLeft = formatTimeLeft(durationLeft);

  const createTimer = useCreateTimer();
  const toggleTimer = useToggleTimer();
  const deleteTimer = useDeleteTimer();

  const rowStyle = { gridRow: row };

  return (
    <div className="contents *:p-2 *:my-auto *:overflow-ellipsis *:overflow-hidden *:whitespace-nowrap">
      <span
        style={rowStyle}
        className={twMerge(
          "col-start-1",
          timer.name ? "col-end-2" : "col-end-3"
        )}
      >
        {timeOriginal}
      </span>
      <span style={rowStyle} className="col-start-2 col-end-3">
        {timer.name}
      </span>
      <span
        style={rowStyle}
        className="col-start-3 col-end-4 text-xl font-mono"
      >
        {timeLeft}
      </span>
      <div
        style={rowStyle}
        className="col-start-4 col-end-5 flex-1 flex gap-2 justify-end"
      >
        {status === "running" ? (
          <button className="icon-button" onClick={() => toggleTimer(timer)}>
            <Pause className="icon" />
          </button>
        ) : status === "paused" ? (
          <button className="icon-button" onClick={() => toggleTimer(timer)}>
            <Play className="icon" />
          </button>
        ) : (
          <button className="icon-button" onClick={() => createTimer(timer)}>
            <Refresh className="icon" />
          </button>
        )}
        <button className="icon-button" onClick={() => deleteTimer(timer.id)}>
          <Trash className="icon" />
        </button>
      </div>
      <div
        style={{ ...getProgressGradient(progress), ...rowStyle }}
        className={twMerge(
          "timer-progress col-start-1 col-end-5 h-full z-[-1] border-2 border-(--color-timer-progress) p-2 flex justify-between gap-2"
        )}
      />
    </div>
  );
};
