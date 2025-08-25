import { z } from 'zod'

import { ObjectValues } from '@earlyai/core'

export const TEST_STRUCTURE_VARIANT = {
  SIBLING_FOLDER: 'siblingFolder',
  ROOT_FOLDER: 'rootFolder'
} as const

export type TestStructureVariant = ObjectValues<typeof TEST_STRUCTURE_VARIANT>

export const TEST_FRAMEWORK = {
  JEST: 'jest',
  MOCHA: 'mocha',
  VITEST: 'vitest'
} as const

export type TestFramework = ObjectValues<typeof TEST_FRAMEWORK>

export const TEST_SUFFIX = {
  SPEC: 'spec',
  TEST: 'test'
} as const

export type TestSuffix = ObjectValues<typeof TEST_SUFFIX>

export const TEST_FILE_NAME = {
  CAMEL_CASE: 'camelCase',
  KEBAB_CASE: 'kebabCase'
} as const

export const SETTING_OPTION = {
  ON: 'on',
  OFF: 'off'
} as const

export const PYTHON_TESTING_FRAMEWORK = {
  PYTEST: 'pytest'
} as const

export const REQUEST_SOURCE = {
  CLI: 'CLI'
} as const

export const COVERAGE_THRESHOLD = {
  DEFAULT: 0,
  MIN: 0,
  MAX: 100
} as const

export const SCOUT_CONCURRENCY = {
  DEFAULT: 5,
  MIN: 1,
  MAX: 50
} as const

export type TestFileName = ObjectValues<typeof TEST_FILE_NAME>

export type TestAutoRefreshCoverage = ObjectValues<typeof SETTING_OPTION>

export type CalculateCoverage = ObjectValues<typeof SETTING_OPTION>

export type RequestSource = ObjectValues<typeof REQUEST_SOURCE>

export type ScoutConcurrency = ObjectValues<typeof SCOUT_CONCURRENCY>

export const ConfigSchema = z.object({
  testStructure: z.enum([
    TEST_STRUCTURE_VARIANT.SIBLING_FOLDER,
    TEST_STRUCTURE_VARIANT.ROOT_FOLDER
  ]),
  testFramework: z.enum([
    TEST_FRAMEWORK.JEST,
    TEST_FRAMEWORK.MOCHA,
    TEST_FRAMEWORK.VITEST
  ]),
  testSuffix: z.enum([TEST_SUFFIX.SPEC, TEST_SUFFIX.TEST]),
  testFileName: z.enum([TEST_FILE_NAME.CAMEL_CASE, TEST_FILE_NAME.KEBAB_CASE]),
  testAutoRefreshCoverage: z.enum(['on', 'off']),
  calculateCoverage: z.enum(['on', 'off']),
  coverageThreshold: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .pipe(z.number().min(COVERAGE_THRESHOLD.MIN).max(COVERAGE_THRESHOLD.MAX)),
  requestSource: z.enum([REQUEST_SOURCE.CLI]),
  scoutConcurrency: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .pipe(z.number().min(SCOUT_CONCURRENCY.MIN).max(SCOUT_CONCURRENCY.MAX))
})

export type Config = z.infer<typeof ConfigSchema>
