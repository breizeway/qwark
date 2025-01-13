import { useFormStatus } from "react-dom";
import { useClearTimers } from "../../react-hooks/use-clear-timers";
import { useCreateTimer } from "../../react-hooks/use-create-timer";
import { useTimers } from "../../react-hooks/use-timers";
import { Timer } from "./timer";
import { useRef } from "react";
import { timerDurationFromForm } from "../../helpers/timers";

interface TimersProps {}

export const Timers: React.FC<TimersProps> = ({}) => {
  const { timers, loading } = useTimers();
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
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th align="left">name</th>
            <th align="left">status</th>
            <th align="left">time left</th>
            <th align="right">actions</th>
          </tr>
        </thead>
        <tbody>
          {!timers.length && !loading ? (
            <tr>
              <th colSpan={5}>No timers here. 👀</th>
            </tr>
          ) : (
            timers.map((timer) => <Timer key={timer.id} {...{ timer }} />)
          )}
        </tbody>
      </table>
    </div>
  );
};

function TimerForm() {
  const clearTimers = useClearTimers();
  const formStatus = useFormStatus();
  const { pending, data } = formStatus;
  const formEmpty = false;

  return (
    <div className="mb-4 flex flex-wrap gap-4 [&_label]:whitespace-nowrap">
      <label>
        <input
          name="hours"
          type="number"
          inputMode="numeric"
          min="0"
          max="23"
        ></input>
        &nbsp;hours
      </label>
      <label>
        <input
          name="minutes"
          type="number"
          inputMode="numeric"
          min="0"
          max="59"
        ></input>
        &nbsp;minutes
      </label>
      <label>
        <input
          name="seconds"
          type="number"
          inputMode="numeric"
          min="0"
          max="59"
        ></input>
        &nbsp;seconds
      </label>
      <label>
        name (optional)&nbsp;
        <input name="name" type="text"></input>
      </label>
      <button className="themed" type="submit" disabled={pending || formEmpty}>
        Create Timer
      </button>
      <button type="button" onClick={clearTimers}>
        Clear Timers
      </button>
    </div>
  );
}
