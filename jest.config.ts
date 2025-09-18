import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.(spec|test).(ts|tsx)", "**/*.early.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@earlyai/ts-agent$": "<rootDir>/src/__mocks__/@earlyai/ts-agent.ts",
    "^@actions/core$": "<rootDir>/src/__mocks__/@actions/core.ts",
  },

  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/", ".*\\.early\\.ts$"],
  testPathIgnorePatterns: ["/node_modules/"],
  watchPathIgnorePatterns: ["<rootDir>/\\.early\\.coverage/"],
  workerIdleMemoryLimit: "1024MB",
  projects: ["<rootDir>"],
};

export default config;
