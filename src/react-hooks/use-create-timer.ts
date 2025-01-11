import { useInstance } from "./use-instance";
import { db } from "../db";

export const useCreateTimer = () => {
  const instance = useInstance();

  async function addTimer() {
    try {
      await db.timers.add({
        instance,
      });
    } catch (error) {
      console.error(`Failed to add`);
    }
  }

  return addTimer;
};
