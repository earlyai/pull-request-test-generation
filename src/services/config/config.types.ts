import { z } from "zod";

import {
  CalculateCoverageOption,
  CONCURRENCY,
  COVERAGE_THRESHOLD,
  RequestSource,
  TestFileName,
  TestFramework,
  TestStructureVariant,
  TestSuffix,
} from "@earlyai/ts-agent";

// defaults are in action.yml
export const ConfigSchema = z.object({
  // ts-agent fields
  testStructure: z.enum(TestStructureVariant),
  testFramework: z.enum(TestFramework),
  testSuffix: z.enum(TestSuffix),
  testFileName: z.enum(TestFileName),
  calculateCoverage: z.enum(CalculateCoverageOption),
  coverageThreshold: z.coerce.number().min(COVERAGE_THRESHOLD.MIN).max(COVERAGE_THRESHOLD.MAX),
  requestSource: z.literal(RequestSource.CLI),
  concurrency: z.coerce.number().min(CONCURRENCY.MIN).max(CONCURRENCY.MAX),
  backendURL: z.string(),
  secretToken: z.string(),
  modelName: z.string().optional(),
  // github action fields
  githubToken: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;
