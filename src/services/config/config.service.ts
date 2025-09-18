import { injectable } from "inversify";

import * as core from "@actions/core";
import { isEmpty } from "@earlyai/core";
import { RequestSource } from "@earlyai/ts-agent";

import type { Config, ConfigInterface } from "./config.types.js";
import { ConfigSchema } from "./config.types.js";
//add tests
@injectable("Singleton")
export class ConfigService implements ConfigInterface {
  private readonly config: Config;

  constructor() {
    this.config = this.initializeConfig();
  }

  public getConfig(): Config {
    return this.config;
  }

  public getConfigValue<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }

  private initializeConfig(): Config {
    try {
      // Get raw configuration values from GitHub Actions inputs
      const rawConfig = this.getRawConfigFromInputs();

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
      testSuffix: core.getInput("test-file-suffix"),
      testFileName: core.getInput("test-file-naming"),
      calculateCoverage: core.getInput("calculate-coverage"),
      requestSource: RequestSource.CLI,
      concurrency: core.getInput("max-concurrency"),
      backendURL: core.getInput("base-host"),
      secretToken: core.getInput("api-key"),
      autoCommit: core.getInput("auto-commit"),
      githubToken: core.getInput("token") || (process.env.GITHUB_TOKEN as string),
    };

    return Object.fromEntries(Object.entries(config).filter(([, value]) => !isEmpty(value)));
  }
}
