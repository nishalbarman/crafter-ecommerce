import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "@reduxjs/toolkit",
    "redux-persist",
    "@reduxjs/toolkit/query",
    "@reduxjs/toolkit/query/react",
  ],
});