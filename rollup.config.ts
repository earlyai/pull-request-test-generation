// See: https://rollupjs.org/introduction/

import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
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
    '@actions/core',
    '@actions/github',
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
    copy({
      targets: [
        {
          src: 'node_modules/@prisma/prisma-schema-wasm/src/prisma_schema_build_bg.wasm',
          dest: 'dist'
        },
        {
          src: 'node_modules/@prisma/schema-engine-wasm/schema_engine_bg.wasm',
          dest: 'dist'
        }
      ]
    }),
    json()
  ]
}

export default config
