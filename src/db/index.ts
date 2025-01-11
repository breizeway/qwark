import dexieCloud from "dexie-cloud-addon";
import Dexie, { type EntityTable } from "dexie";

interface Timer {
  id: string;
  instance: string;
}

const db = new Dexie("qwark", { addons: [dexieCloud] }) as Dexie & {
  timers: EntityTable<
    Timer,
    "id" // primary key "id" (for the typings only)
  >;
};

db.version(1).stores({
  timers: "@id, instance", // '@' = auto-generated global ID
  realms: "@realmId",
});

db.cloud.configure({
  databaseUrl: "https://zmy8x2754.dexie.cloud",
  requireAuth: true,
  fetchTokens: (tokenParams) =>
    fetch("https://zmy8x2754.dexie.cloud/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        scopes: ["ACCESS_DB"],
        public_key: tokenParams.public_key,
        client_id: "wz31k3fmdm8oee8d",
        client_secret: "JHntL1v8+suGBFdXNViBlbz8jaSfVmqg9ji2FnlCEIU=",
        claims: {
          sub: "public", // or user.email. Your framework must provide this.
        },
      }),
    }).then((res) => res.json()),
});

export type { Timer };
export { db };
