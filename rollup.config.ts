// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
    exports: 'auto'
  },
  external: [
    '@prisma/schema-engine-wasm',
    '@prisma/prisma-schema-wasm',
    'vitest'
  ],
  plugins: [
    typescript(),
    nodeResolve({ 
      preferBuiltins: true,
      exportConditions: ['node']
    }),
    commonjs({
      ignoreDynamicRequires: true,
      transformMixedEsModules: true
    }),
    json()
  ]
}

export default config
