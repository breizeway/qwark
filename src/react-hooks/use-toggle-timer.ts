import { db } from "../db";
import type { DbTimer, TimerEvent } from "../db/types";

export const useToggleTimer = () => {
  async function toggleTimer(timer: DbTimer) {
    const lastAction = timer.events.at(-1)?.action ?? "start";
    const nextEvent: TimerEvent = {
      action: lastAction === "start" ? "stop" : "start",
      time: new Date().getTime(),
    };
    const events = [...timer.events, nextEvent];

    try {
      await db.timers.update(timer.id, { events });
    } catch (error) {
      console.error(`Failed to toggle timer`);
    }
  }

  return toggleTimer;
};
