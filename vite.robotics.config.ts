import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  publicDir: false,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(projectRoot, "src/robotics-ui.tsx"),
      formats: ["es"],
      fileName: () => "ui.js",
    },
    outDir: resolve(projectRoot, "public/site/robotics"),
    emptyOutDir: false,
    minify: "esbuild",
    sourcemap: false,
  },
});
