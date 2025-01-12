import { useClearTimers } from "../../react-hooks/use-clear-timers";
import { useCreateTimer } from "../../react-hooks/use-create-timer";
import { useTimers } from "../../react-hooks/use-timers";
import { Timer } from "./timer";

interface TimersProps {}

export const Timers: React.FC<TimersProps> = ({}) => {
  const timers = useTimers();
  const createTimer = useCreateTimer();
  const clearTimers = useClearTimers();

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() =>
            createTimer({ minutes: 5 }, { name: `timer ${timers.length + 1}` })
          }
        >
          + Timer
        </button>
        <button onClick={clearTimers}>Clear Timers</button>
      </div>
      <div className="flex flex-col gap-1">
        {timers.map((timer) => (
          <Timer key={timer.id} {...{ timer }} />
        ))}
      </div>
    </div>
  );
};
