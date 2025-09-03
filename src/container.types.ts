import { CoverageReport, SerializedTestable } from "@earlyai/ts-scout";

export const TYPES = {
  TsScoutService: Symbol.for("TsScoutService"),
} as const;

export interface ITSScout {
  getTestables(pattern: string): Promise<[string, SerializedTestable[]][]>; // replace with actual return type
  generateCoverage(): Promise<unknown>; // refine return type
  getCoverageTree(): Promise<CoverageReport | null>; // refine return type
  generateTests(filePath: string, testable: SerializedTestable): Promise<unknown>;
  bulkGenerateTests(testablesToGenerate: { filePath: string; testable: SerializedTestable }[]): Promise<unknown>;
}
