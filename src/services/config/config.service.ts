import { injectable } from 'inversify'
import * as core from '@actions/core'
import type { IConfigService, Config } from './config.types.js'
import { ConfigSchema } from './config.types.js'
import { isEmpty } from '@earlyai/core'

/**
 * Configuration service for retrieving and validating GitHub Actions configuration
 */
@injectable('Singleton')
export class ConfigService implements IConfigService {
  private readonly config: Config

  constructor() {
    this.config = this.initializeConfig()
  }

  /**
   * Gets the validated configuration from GitHub Actions inputs
   * @returns Validated configuration
   */
  public getConfig(): Config {
    return this.config
  }

  /**
   * Gets a specific configuration value by key
   * @param key The configuration key
   * @returns The configuration value or undefined if not found
   */
  public getConfigValue<K extends keyof Config>(key: K): Config[K] | undefined {
    return this.config[key]
  }

  /**
   * Initializes and validates configuration from GitHub Actions inputs
   * @returns Validated configuration
   */
  private initializeConfig(): Config {
    try {
      // Get raw configuration values from GitHub Actions inputs
      const rawConfig = this.getRawConfigFromInputs()
      core.setSecret(rawConfig.token)
      core.setSecret(rawConfig.secretToken)

      // Validate using Zod schema (which handles defaults)
      const validatedConfig = ConfigSchema.parse(rawConfig)
      core.info('Configuration validated successfully')
      core.debug(`Configuration: ${JSON.stringify(validatedConfig, null, 2)}`)

      return validatedConfig
    } catch (error) {
      if (error instanceof Error) {
        core.warning(`Configuration validation failed: ${error.message}`)
      } else {
        core.warning('Configuration validation failed with unknown error')
      }

      throw error
    }
  }

  /**
   * Retrieves raw configuration values from GitHub Actions inputs
   * @returns Raw configuration object
   */
  private getRawConfigFromInputs(): Record<string, string> {
    const config = {
      testStructure: core.getInput('test-structure'),
      testFramework: core.getInput('test-framework'),
      testSuffix: core.getInput('test-suffix'),
      testFileName: core.getInput('test-file-name'),
      calculateCoverage: core.getInput('calculate-coverage'),
      coverageThreshold: core.getInput('coverage-threshold'),
      requestSource: 'CLI', // Fixed value for GitHub Actions
      scoutConcurrency: core.getInput('scout-concurrency'),
      backendURL: core.getInput('base-url'),
      secretToken: core.getInput('apiKey'),
      token: core.getInput('token') || (process.env.GITHUB_TOKEN as string)
    }

    // Filter out empty strings to let Zod handle defaults
    return Object.fromEntries(
      Object.entries(config).filter(([, value]) => !isEmpty(value))
    )
  }
}
