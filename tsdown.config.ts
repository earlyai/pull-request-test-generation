import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs"],
  minify: true,
  sourcemap: true,
  failOnWarn: true,
  noExternal: () => true,
  copy: [
    {
      from: "node_modules/@prisma/prisma-schema-wasm/src/prisma_schema_build_bg.wasm",
      to: "dist/prisma_schema_build_bg.wasm",
    },
    {
      from: "node_modules/@prisma/schema-engine-wasm/schema_engine_bg.wasm",
      to: "dist/schema_engine_bg.wasm",
    },
  ],
});
