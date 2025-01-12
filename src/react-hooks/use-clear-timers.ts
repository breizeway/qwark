import { db } from "../db";

export const useClearTimers = () => {
  async function clearTimers() {
    try {
      await db.timers.clear();
    } catch (error) {
      console.error(`Failed to clear timers table`);
    }
  }

  return clearTimers;
};
