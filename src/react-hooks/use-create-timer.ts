import { db } from "../db";
import type { DbTimer, TimerEvent } from "../db/types";
import { useInstance } from "./use-instance";

type NonInputTimerKeys = "id" | "instance" | "events";
type CreateTimerInput = Omit<DbTimer, NonInputTimerKeys>;

const isNonInputTimerKey = (key: any): key is NonInputTimerKeys => {
  const check: { [keys in NonInputTimerKeys]: {} } = {
    id: {},
    instance: {},
    events: {},
  };
  return !!check[key as NonInputTimerKeys];
};

export const useCreateTimer = () => {
  const instance = useInstance();

  async function addTimer(input: CreateTimerInput) {
    const scrubbedInput = Object.fromEntries(
      Object.entries(input).filter(([k]) => !isNonInputTimerKey(k))
    ) as CreateTimerInput;

    let startEvent: TimerEvent = {
      action: "start",
      time: new Date().getTime(),
    };

    try {
      await db.timers.add({
        instance,
        events: [startEvent],
        ...scrubbedInput,
      });
    } catch (error) {
      console.error(`Failed to add`);
    }
  }

  return addTimer;
};
