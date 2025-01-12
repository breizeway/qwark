import { db } from "../db";
import type { TimerDuration, TimerEvent } from "../db/types";
import { useInstance } from "./use-instance";
import { add } from "date-fns";

interface TimerOptions {
  startAdjustment?: TimerDuration;
  name?: string;
}

export const useCreateTimer = () => {
  const instance = useInstance();

  async function addTimer(
    duration: TimerDuration,
    options: TimerOptions | undefined = {}
  ) {
    let startEvent: TimerEvent = {
      action: "start",
      time: new Date().getTime(),
    };
    if (options.startAdjustment) {
      startEvent.time = add(new Date(), options.startAdjustment).getTime();
    }

    try {
      await db.timers.add({
        instance,
        duration,
        events: [startEvent],
        name: options.name,
      });
    } catch (error) {
      console.error(`Failed to add`);
    }
  }

  return addTimer;
};
