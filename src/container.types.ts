import { createTSAgent } from "@earlyai/ts-agent";

export const TYPES = {
  TSAgent: Symbol.for("TSAgent"),
} as const;

//todo: expose TSAgent type from lib
export type ITSAgent = ReturnType<typeof createTSAgent>;
