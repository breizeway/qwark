import { useFormStatus } from "react-dom";
import { useClearTimers } from "../../react-hooks/use-clear-timers";
import { useCreateTimer } from "../../react-hooks/use-create-timer";
import { useTimers } from "../../react-hooks/use-timers";
import { Timer } from "./timer";
import { useRef } from "react";
import { timerDurationFromForm } from "../../helpers/timers";

interface TimersProps {}

export const Timers: React.FC<TimersProps> = ({}) => {
  const timers = useTimers();
  const createTimer = useCreateTimer();

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div>
      <form
        ref={formRef}
        action={async (formData) => {
          const duration = timerDurationFromForm(formData);
          createTimer(duration);
          formRef.current?.reset();
        }}
      >
        <TimerForm />
      </form>
      <div className="flex flex-col gap-2">
        {!!timers.length ? (
          timers.map((timer) => <Timer key={timer.id} {...{ timer }} />)
        ) : (
          <span>No timers here</span>
        )}
      </div>
    </div>
  );
};

function TimerForm() {
  const clearTimers = useClearTimers();
  const { pending } = useFormStatus();
  return (
    <div className="mb-4 space-x-4">
      <label>
        <input type="number" name="hours" min="0" max="23"></input>
        &nbsp;hours
      </label>
      <label>
        <input type="number" name="minutes" min="0" max="59"></input>
        &nbsp;minutes
      </label>
      <label>
        <input type="number" name="seconds" min="0" max="59"></input>
        &nbsp;seconds
      </label>
      <button type="submit" disabled={pending}>
        Create Timer
      </button>
      <button type="button" onClick={clearTimers}>
        Clear Timers
      </button>
    </div>
  );
}
