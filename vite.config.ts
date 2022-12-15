import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "t-console-ui",
      fileName: "index",
    },

    rollupOptions: {
      // external every thing from packages.json deps and peers
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
  },
});
