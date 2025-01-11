// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // https://v4-test.tailwindcss.com/docs/installation/framework-guides/astro
  output: "server",

  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
});