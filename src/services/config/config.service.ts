import { injectable, postConstruct } from 'inversify'
import * as core from '@actions/core'
import type { IConfigService, Config } from './config.types.js'
import { ConfigSchema } from './config.types.js'
import { isEmpty } from '@earlyai/core'

/**
 * Configuration service for retrieving and validating GitHub Actions configuration
 */
@injectable()
export class ConfigService implements IConfigService {
  private config: Config | undefined
  private validationErrors: string[] = []
  private isValidConfig = false

  /**
   * Gets the validated configuration from GitHub Actions inputs
   * @returns Promise resolving to validated configuration
   */
  @postConstruct()
  public getConfig(): Config {
    try {
      // Get raw configuration values from GitHub Actions inputs
      const rawConfig = this.getRawConfigFromInputs()
      core.setSecret(rawConfig.token)
      core.setSecret(rawConfig.apiKey)

      // Validate using Zod schema (which handles defaults)
      const validatedConfig = ConfigSchema.parse(rawConfig)

      this.config = validatedConfig
      this.isValidConfig = true
      this.validationErrors = []

      core.info('Configuration validated successfully')
      core.debug(`Configuration: ${JSON.stringify(validatedConfig, null, 2)}`)

      return validatedConfig
    } catch (error) {
      this.isValidConfig = false

      if (error instanceof Error) {
        this.validationErrors = [error.message]
        core.warning(`Configuration validation failed: ${error.message}`)
      } else {
        this.validationErrors = ['Unknown configuration validation error']
        core.warning('Configuration validation failed with unknown error')
      }

      // Let Zod handle defaults - no need for fallback config
      throw error
    }
  }

  /**
   * Gets a specific configuration value by key
   * @param key The configuration key
   * @returns The configuration value or undefined if not found
   */
  public getConfigValue<K extends keyof Config>(key: K): Config[K] | undefined {
    return this.config?.[key]
  }

  /**
   * Checks if the configuration is valid
   * @returns True if configuration is valid, false otherwise
   */
  public isValid(): boolean {
    return this.isValidConfig
  }

  /**
   * Gets validation errors if any
   * @returns Array of validation error messages
   */
  public getValidationErrors(): readonly string[] {
    return this.validationErrors
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
      baseURL: core.getInput('base-url'),
      apiKey: core.getInput('apiKey'),
      token: core.getInput('token') || (process.env.GITHUB_TOKEN as string)
    }

    // Filter out empty strings to let Zod handle defaults
    return Object.fromEntries(
      Object.entries(config).filter(([, value]) => !isEmpty(value))
    )
  }
}
