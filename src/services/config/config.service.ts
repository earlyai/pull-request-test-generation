import { injectable } from "inversify";

import * as core from "@actions/core";
import { isEmpty } from "@earlyai/core";
import { RequestSource } from "@earlyai/ts-agent";

import type { Config } from "./config.types";
import { ConfigSchema } from "./config.types";

@injectable("Singleton")
export class ConfigService {
  private readonly config: Config;

  constructor() {
    this.config = this.initializeConfig();
  }

  public getConfig(): Config {
    return this.config;
  }

  public getConfigValue<K extends keyof Config>(key: K): Config[K] | undefined {
    return this.config[key];
  }

  private initializeConfig(): Config {
    try {
      // Get raw configuration values from GitHub Actions inputs
      const rawConfig = this.getRawConfigFromInputs();

      core.setSecret(rawConfig.token);
      core.setSecret(rawConfig.secretToken);

      // Validate using Zod schema (which handles defaults)
      const validatedConfig = ConfigSchema.parse(rawConfig);

      core.info("Configuration validated successfully");
      core.debug(`Configuration: ${JSON.stringify(validatedConfig, null, 2)}`);

      return validatedConfig;
    } catch (error) {
      if (error instanceof Error) {
        core.warning(`Configuration validation failed: ${error.message}`);
      } else {
        core.warning("Configuration validation failed with unknown error");
      }

      throw error;
    }
  }

  private getRawConfigFromInputs(): Record<string, string> {
    const config = {
      testStructure: core.getInput("test-structure"),
      testFramework: core.getInput("test-framework"),
      testSuffix: core.getInput("test-suffix"),
      testFileName: core.getInput("test-file-name"),
      calculateCoverage: core.getInput("calculate-coverage"),
      coverageThreshold: core.getInput("coverage-threshold"),
      requestSource: RequestSource.CLI,
      concurrency: core.getInput("concurrency"),
      backendURL: core.getInput("base-host"),
      secretToken: core.getInput("api-key"),
      githubToken: core.getInput("token") || (process.env.GITHUB_TOKEN as string),
    };

    return Object.fromEntries(Object.entries(config).filter(([, value]) => !isEmpty(value)));
  }
}
