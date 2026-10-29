import path from "node:path";
import type { WebpackOverrideFn } from "@remotion/bundler";

/** Lets the film import site content with the same `@/` alias as Next.js. */
export const webpackOverride: WebpackOverrideFn = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...(config.resolve?.alias ?? {}),
      "@": path.join(process.cwd(), "src"),
    },
  },
});
