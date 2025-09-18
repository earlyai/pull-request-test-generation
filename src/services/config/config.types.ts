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
  rootPath: z.string().default(process.env.GITHUB_WORKSPACE ?? process.cwd()),
  testStructure: z.enum(TestStructureVariant),
  testFramework: z.enum(TestFramework),
  testSuffix: z.enum(TestSuffix),
  testFileName: z.enum(TestFileName),
  calculateCoverage: z.enum(CalculateCoverageOption),
  coverageThreshold: z.coerce
    .number()
    .min(COVERAGE_THRESHOLD.MIN)
    .max(COVERAGE_THRESHOLD.MAX)
    .default(COVERAGE_THRESHOLD.DEFAULT),
  requestSource: z.literal(RequestSource.CLI),
  concurrency: z.coerce.number().min(CONCURRENCY.MIN).max(CONCURRENCY.MAX),
  backendURL: z.string(),
  secretToken: z.string(),
  // github action fields
  githubToken: z.string(),
  autoCommit: z.string().transform((value) => value === "true"),
  maxTestables: z.coerce.number().int().min(0).max(30).default(30),
});

export type Config = z.infer<typeof ConfigSchema>;

/**
 * Result of committing files
 */
export interface CommitResult {
  /** List of file paths that were committed */
  readonly committedFiles: readonly string[];
  /** Error message if an error occurred, empty string if successful */
  readonly error: string;
}

export interface ConfigInterface {
  getConfig(): Config;
  getConfigValue<K extends keyof Config>(key: K): Config[K];
}
