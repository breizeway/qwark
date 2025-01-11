import { useCreateTimer } from "../../react-hooks/use-create-timer";
import { useTimers } from "../../react-hooks/use-timers";

interface TimersProps {}

export const Timers: React.FC<TimersProps> = ({}) => {
  const timers = useTimers();
  const createTimer = useCreateTimer();

  return (
    <div>
      <button onClick={createTimer}>+ Timer</button>
      {JSON.stringify(timers)}
    </div>
  );
};
