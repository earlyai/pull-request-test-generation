import { z } from "zod";

/**
 * Schema for changed files report data
 */
export const ChangedFilesDataSchema = z.object({
  changedFilesCount: z.number(),
  candidateFilesCount: z.number(),
  functionCount: z.number(),
  testablesToGenerateCount: z.number(),
});

/**
 * Schema for coverage data
 */
export const CoverageDataSchema = z.object({
  before: z.number(),
  after: z.number(),
});

/**
 * Schema for test generation data
 */
export const TestGenerationDataSchema = z.object({
  generated: z.number(),
});

/**
 * Schema for auto-commit status
 */
export const AutoCommitDataSchema = z.object({
  enabled: z.boolean(),
});

/**
 * Schema for warning messages
 */
export const WarningDataSchema = z.object({
  message: z.string(),
});

/**
 * Schema for complete summary data
 */
export const SummaryDataSchema = z.object({
  changedFiles: ChangedFilesDataSchema.optional(),
  coverage: CoverageDataSchema.optional(),
  testGeneration: TestGenerationDataSchema.optional(),
  autoCommit: AutoCommitDataSchema.optional(),
  warnings: z.array(WarningDataSchema).default([]),
});

/**
 * Type definitions inferred from schemas
 */
export type ChangedFilesData = z.infer<typeof ChangedFilesDataSchema>;
export type CoverageData = z.infer<typeof CoverageDataSchema>;
export type TestGenerationData = z.infer<typeof TestGenerationDataSchema>;
export type AutoCommitData = z.infer<typeof AutoCommitDataSchema>;
export type WarningData = z.infer<typeof WarningDataSchema>;
export type SummaryData = z.infer<typeof SummaryDataSchema>;
