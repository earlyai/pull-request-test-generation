import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  minify: true,
  sourcemap: true,
  failOnWarn: true
})
