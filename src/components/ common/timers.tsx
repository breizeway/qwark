import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

interface TimersProps {}

async function addTimer(instance: string) {
  try {
    await db.timers.add({
      instance,
      // realmId: "rlm-public",
      // owner: "any",
    });
  } catch (error) {
    console.error(`Failed to add`);
  }
}

export const Timers: React.FC<TimersProps> = ({}) => {
  const timers = useLiveQuery(() => db.timers.toArray());
  console.log(`:::TIMERS::: `, timers);

  return (
    <div>
      <button onClick={() => addTimer("test")}>+ Timer</button>
      {JSON.stringify(timers)}
    </div>
  );
};
