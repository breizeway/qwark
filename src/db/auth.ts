import type { DexieCloudOptions } from "dexie-cloud-addon";

const dexieDbUrl = import.meta.env.PUBLIC_DEXIE_DB_URL;
const dexieClientId = import.meta.env.PUBLIC_DEXIE_CLIENT_ID;
const dexieClientSecret = import.meta.env.PUBLIC_DEXIE_CLIENT_SECRET;

export const fetchTokens: DexieCloudOptions["fetchTokens"] = (tokenParams) =>
  fetch(`${dexieDbUrl}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      scopes: ["ACCESS_DB"],
      public_key: tokenParams.public_key,
      client_id: dexieClientId,
      client_secret: dexieClientSecret,
      claims: {
        sub: "public", // or user.email. Your framework must provide this.
      },
    }),
  }).then((res) => res.json());
