import { defineMiddleware } from "astro:middleware";
import { getNaturalUuid } from "./helpers/uuid";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  const naturalUuid = getNaturalUuid();
  console.log(`:::CONTEXT::: `, context);
  console.log(`:::NATURALUUID::: `, naturalUuid);

  next();
});
