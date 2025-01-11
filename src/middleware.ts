import { defineMiddleware } from "astro:middleware";
import { getReadableId } from "./helpers/readable-id";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.searchParams.get("instance")) {
    context.url.searchParams.set("instance", getReadableId());
    return context.redirect(context.url.pathname + context.url.search);
  }

  next();
});
