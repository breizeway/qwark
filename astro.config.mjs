// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // https://v4-test.tailwindcss.com/docs/installation/framework-guides/astro
  vite: { plugins: [tailwindcss()] },
});
