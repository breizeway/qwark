import { defineMiddleware } from "astro:middleware";
import { getInstance } from "./helpers/instance";

export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.searchParams.get("instance")) {
    context.url.searchParams.set("instance", getInstance());
    return context.redirect(context.url.pathname + context.url.search);
  }

  next();
});
