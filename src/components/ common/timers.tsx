import { useFormStatus } from "react-dom";
import { useClearTimers } from "../../react-hooks/use-clear-timers";
import { useCreateTimer } from "../../react-hooks/use-create-timer";
import { useTimers } from "../../react-hooks/use-timers";
import { Timer } from "./timer";
import { useRef } from "react";
import type { TimerDuration } from "../../db/types";

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
          const duration: TimerDuration = { hours: 0, minutes: 0, seconds: 0 };
          const hours = formData.get("hours");
          duration.hours = parseInt(
            typeof hours === "string" ? hours || "0" : "0"
          );
          const minutes = formData.get("minutes");
          duration.minutes = parseInt(
            typeof minutes === "string" ? minutes || "0" : "0"
          );
          const seconds = formData.get("seconds");
          duration.seconds = parseInt(
            typeof seconds === "string" ? seconds || "0" : "0"
          );
          createTimer(duration);
          formRef.current?.reset();
        }}
        className="flex gap-4 mb-4"
      >
        <TimerForm />
      </form>
      <div className="flex flex-col gap-1">
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
    <>
      <input type="number" name="hours"></input>
      <input type="number" name="minutes"></input>
      <input type="number" name="seconds"></input>
      <button type="submit" disabled={pending}>
        + Timer
      </button>
      <button type="button" onClick={clearTimers}>
        Clear Timers
      </button>
    </>
  );
}
