// Mock for @earlyai/ts-agent package to avoid ES modules issues in Jest

// Mock enum arrays for Zod (must be arrays for z.enum())
const testStructureValues = ["ROOT_FOLDER", "SIBLING_FOLDER"] as const;
const testFrameworkValues = ["JEST", "VITEST", "MOCHA"] as const;
const testSuffixValues = ["SPEC", "TEST"] as const;
const testFileNameValues = ["KEBAB_CASE", "CAMEL_CASE", "SNAKE_CASE"] as const;

// Export arrays for Zod enum validation, with object properties added via casting
export const TestStructureVariant = testStructureValues as any;
export const TestFramework = testFrameworkValues as any;
export const TestSuffix = testSuffixValues as any;
export const TestFileName = testFileNameValues as any;

// Add object properties for TypeScript dot notation access
TestStructureVariant.ROOT_FOLDER = "ROOT_FOLDER";
TestStructureVariant.SIBLING_FOLDER = "SIBLING_FOLDER";

TestFramework.JEST = "JEST";
TestFramework.VITEST = "VITEST";
TestFramework.MOCHA = "MOCHA";

TestSuffix.SPEC = "SPEC";
TestSuffix.TEST = "TEST";

TestFileName.KEBAB_CASE = "KEBAB_CASE";
TestFileName.CAMEL_CASE = "CAMEL_CASE";
TestFileName.SNAKE_CASE = "SNAKE_CASE";

// Mock constants
export const CONCURRENCY = {
  MIN: 1,
  MAX: 4,
} as const;

export const COVERAGE_THRESHOLD = {
  DEFAULT: 0,
  MIN: 0,
  MAX: 100,
} as const;
