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
        {timers.map((timer) => (
          <Timer key={timer.id} {...{ timer }} />
        ))}
      </div>
    </div>
  );
};

function TimerForm() {
  const clearTimers = useClearTimers();
  const { pending } = useFormStatus();
  return (
    <div className="flex items-end gap-4 mb-4">
      <label className="flex flex-col">
        hours
        <input type="number" name="hours"></input>
      </label>
      <label className="flex flex-col">
        minutes
        <input type="number" name="minutes"></input>
      </label>
      <label className="flex flex-col">
        seconds
        <input type="number" name="seconds"></input>
      </label>
      <button type="submit" disabled={pending}>
        + Timer
      </button>
      <button type="button" onClick={clearTimers}>
        Clear Timers
      </button>
    </div>
  );
}
