import { useFormStatus } from "react-dom";
import { useClearTimers } from "../../react-hooks/use-clear-timers";
import { useCreateTimer } from "../../react-hooks/use-create-timer";
import { useTimers } from "../../react-hooks/use-timers";
import { Timer } from "./timer";
import { useRef } from "react";
import { timerDurationFromForm } from "../../helpers/timers";
import Play from "../icons/play";
import ExclamationTriangle from "../icons/exclamation-triangle";

interface TimersProps {}

export const Timers: React.FC<TimersProps> = ({}) => {
  const { timers, loading } = useTimers();
  const createTimer = useCreateTimer();
  const clearTimers = useClearTimers();

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div>
      <form
        ref={formRef}
        action={async (formData) => {
          const duration = timerDurationFromForm(formData);
          const unsafeName = formData.get("name");
          const name = typeof unsafeName === "string" ? unsafeName : undefined;

          // TODO: figure out form validation
          if (Object.values(duration).some((v) => !!v))
            createTimer(duration, { name });

          formRef.current?.reset();
        }}
      >
        <button className="mb-2" type="button" onClick={clearTimers}>
          <ExclamationTriangle className="icon" /> Clear Timers Table
        </button>
        <TimerForm />
      </form>
      <div className="flex flex-col gap-2">
        {!timers.length && !loading ? (
          <span>No timers here 👀</span>
        ) : (
          timers.map((timer) => <Timer key={timer.id} {...{ timer }} />)
        )}
      </div>
    </div>
  );
};

function TimerForm() {
  const formStatus = useFormStatus();
  const { pending, data } = formStatus;
  const formEmpty = false;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 [&_label]:whitespace-nowrap">
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
        name (optional):&nbsp;
        <input name="name" type="text"></input>
      </label>
      <button
        className="icon-button"
        type="submit"
        disabled={pending || formEmpty}
      >
        <Play className="icon size-8" />
      </button>
    </div>
  );
}
