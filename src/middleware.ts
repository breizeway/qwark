import { defineMiddleware } from "astro:middleware";
import { getNaturalUuid } from "./helpers/uuid";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.searchParams.get("id")) {
    context.url.searchParams.set("id", getNaturalUuid());
    return context.redirect(context.url.pathname + context.url.search);
  }

  next();
});
