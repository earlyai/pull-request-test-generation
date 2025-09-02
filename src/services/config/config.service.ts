import { injectable } from 'inversify'
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
  public getConfig(): Config {
    try {
      // Get raw configuration values from GitHub Actions inputs
      const rawConfig = this.getRawConfigFromInputs()

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

  /**
   * Creates TsScoutService configuration from current config
   * @returns Configuration object for ts-scout
   */
  public createTsScoutConfig() {
    if (!this.config) {
      throw new Error('Config not initialized. Call getConfig() first.')
    }

    return {
      rootPath: process.cwd(),
      isSiblingFolderStructured: this.config.testStructure === 'siblingFolder',
      gitURL: process.env.GITHUB_REPOSITORY
        ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
        : '',
      testFramework: this.config.testFramework,
      greyTestBehaviour: 'keep' as const,
      redTestBehaviour: 'keep' as const,
      generatedTestStructure: 'categories' as const,
      generateTestsLLMModelName: 'gpt-4',
      isRootFolderStructured: this.config.testStructure === 'rootFolder',
      llmTemperature: 0.7,
      llmTopP: 1,
      clientSource: 'github-action' as const,
      backendURL: this.config.baseURL,
      requestSource: this.config.requestSource,
      firebaseWebApiKey: process.env.FIREBASE_WEB_API_KEY || '',
      exchangeEndpoint: process.env.EXCHANGE_ENDPOINT || 'auth/exchange',
      userPrompt: '',
      testLocation:
        this.config.testStructure === 'siblingFolder' ? '__tests__' : 'tests',
      threshold: this.config.coverageThreshold,
      concurrency: this.config.scoutConcurrency,
      testFileFormat: 'ts',
      generateTestsConcurrency: this.config.scoutConcurrency,
      outputType: 'newCodeFile' as const,
      shouldRefreshCoverage: this.config.calculateCoverage === 'on',
      kebabCaseFileName: this.config.testFileName === 'kebabCase',
      earlyTestFilenameSuffix: '.early',
      testSuffix: this.config.testSuffix,
      isAppendPrompt: false
    }
  }
}
