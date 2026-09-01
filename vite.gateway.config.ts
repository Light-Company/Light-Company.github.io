import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  publicDir: false,
  build: {
    lib: {
      entry: resolve(projectRoot, "src/experience-gateway.ts"),
      formats: ["es"],
      fileName: () => "animation.js",
    },
    outDir: resolve(projectRoot, "public/site/gateway"),
    emptyOutDir: false,
    minify: "esbuild",
    sourcemap: false,
  },
});
