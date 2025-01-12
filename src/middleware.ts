import { defineMiddleware } from "astro:middleware";
import { generateInstance } from "./helpers/instance";

export const onRequest = defineMiddleware((context, next) => {
  if (!context.url.searchParams.get("instance")) {
    context.url.searchParams.set("instance", generateInstance());
    return context.redirect(context.url.pathname + context.url.search);
  }

  next();
});
