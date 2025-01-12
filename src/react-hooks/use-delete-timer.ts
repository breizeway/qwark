import { db } from "../db";

export const useDeleteTimer = () => {
  async function deleteTimer(timerId: string) {
    try {
      await db.timers.delete(timerId);
    } catch (error) {
      console.error(`Failed to delete timer`);
    }
  }

  return deleteTimer;
};
