import dexieCloud from "dexie-cloud-addon";
import Dexie, { type EntityTable } from "dexie";
import { fetchTokens } from "./auth";
import type { DbTimer } from "./types";

const dexieDbUrl = import.meta.env.PUBLIC_DEXIE_DB_URL;

const db = new Dexie("test_4", { addons: [dexieCloud] }) as Dexie & {
  timers: EntityTable<
    DbTimer,
    "id" // primary key "id" (for the typings only)"
  >;
};

db.version(1).stores({
  timers: "@id, instance, duration, events, name",
});

db.cloud.configure({
  databaseUrl: dexieDbUrl,
  requireAuth: true,
  fetchTokens,
});

export { db };
