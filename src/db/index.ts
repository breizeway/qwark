import dexieCloud from "dexie-cloud-addon";
import Dexie, { type EntityTable } from "dexie";
import { fetchTokens } from "./auth";

const dexieDbUrl = import.meta.env.PUBLIC_DEXIE_DB_URL;

interface Timer {
  id: string;
  instance: string;
}

const db = new Dexie("test_1", { addons: [dexieCloud] }) as Dexie & {
  timers: EntityTable<
    Timer,
    "id" // primary key "id" (for the typings only)"
  >;
};

db.version(1).stores({
  timers: "@id, instance", // '@' = auto-generated global ID
});

db.cloud.configure({
  databaseUrl: dexieDbUrl,
  requireAuth: true,
  fetchTokens,
});

export type { Timer };
export { db };
