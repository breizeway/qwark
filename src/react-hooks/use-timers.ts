import { useLiveQuery } from "dexie-react-hooks";
import { useInstance } from "./use-instance";
import { db } from "../db";

export const useTimers = () => {
  const instance = useInstance();

  const timers = useLiveQuery(() =>
    db.timers.where("instance").equals(instance).toArray()
  );

  return timers;
};
