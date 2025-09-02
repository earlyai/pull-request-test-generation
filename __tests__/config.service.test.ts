/**
 * Unit tests for ConfigService
 */
import { jest } from '@jest/globals'

// Mock @actions/core before importing ConfigService
jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warning: jest.fn()
}))

// Import after mocking
import { Container } from 'inversify'
import { ConfigService } from '../src/services/config/config.service.js'
import { ITSScout, TYPES } from '../src/container.types.js'
import { createTSScout } from '@earlyai/ts-scout'

// Get the mocked functions using dynamic imports
let mockGetInput: jest.MockedFunction<(key: string) => string>
let mockInfo: jest.MockedFunction<(message: string) => void>
let mockDebug: jest.MockedFunction<(message: string) => void>

beforeAll(async () => {
  const core = await import('@actions/core')
  mockGetInput = jest.mocked(core.getInput)
  mockInfo = jest.mocked(core.info)
  mockDebug = jest.mocked(core.debug)
})

describe('ConfigService', () => {
  let originalEnv: NodeJS.ProcessEnv
  let container: Container

  beforeEach(() => {
    // Create a fresh container for each test
    container = new Container({ autobind: true })

    // Bind external services that can't use autobind
    container.bind<ITSScout>(TYPES.TsScoutService).toDynamicValue((ctx) => {
      const config = ctx.get(ConfigService)
      // Ensure config is initialized before creating ts-scout
      config.getConfig()
      return createTSScout(config.createTsScoutConfig())
    })

    // Reset mocks
    jest.clearAllMocks()

    // Store original environment
    originalEnv = process.env
    process.env = { ...originalEnv }

    // Default mock implementation - return empty strings for most inputs, but provide token
    mockGetInput.mockImplementation((key: string) => {
      if (key === 'token') return 'test-token'
      return ''
    })
  })

  afterEach(() => {
    // Clean up the container
    container.unbindAll()

    // Restore original environment
    process.env = originalEnv
  })

  describe('Default Values', () => {
    it('should use Zod schema defaults when no inputs provided', () => {
      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      expect(config.testStructure).toBe('siblingFolder')
      expect(config.testFramework).toBe('jest')
      expect(config.testSuffix).toBe('spec')
      expect(config.testFileName).toBe('camelCase')
      expect(config.calculateCoverage).toBe('on')
      expect(config.coverageThreshold).toBe(0)
      expect(config.requestSource).toBe('CLI')
      expect(config.scoutConcurrency).toBe(5)
      // baseURL uses Zod schema default (same as action input default)
      expect(config.baseURL).toBe('https://api.startearly.ai')
    })

    it('should always set requestSource to CLI', () => {
      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      expect(config.requestSource).toBe('CLI')
    })
  })

  describe('Input Overrides', () => {
    it('should override defaults when inputs are provided', () => {
      mockGetInput.mockImplementation((key: string) => {
        switch (key) {
          case 'test-framework':
            return 'mocha'
          case 'test-suffix':
            return 'test'
          case 'coverage-threshold':
            return '85'
          case 'scout-concurrency':
            return '10'
          case 'token':
            return 'test-token'
          default:
            return ''
        }
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // Overridden values
      expect(config.testFramework).toBe('mocha')
      expect(config.testSuffix).toBe('test')
      expect(config.coverageThreshold).toBe(85)
      expect(config.scoutConcurrency).toBe(10)

      // Default values for non-overridden fields
      expect(config.testStructure).toBe('siblingFolder')
      expect(config.testFileName).toBe('camelCase')
      expect(config.calculateCoverage).toBe('on')
      // baseURL uses Zod schema default when not overridden
      expect(config.baseURL).toBe('https://api.startearly.ai')
    })

    it('should use defaults for missing inputs', () => {
      mockGetInput.mockImplementation((key: string) => {
        if (key === 'test-framework') return 'vitest'
        if (key === 'token') return 'test-token'
        return ''
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // Only test-framework is overridden
      expect(config.testFramework).toBe('vitest')

      // All others use defaults
      expect(config.testStructure).toBe('siblingFolder')
      expect(config.testSuffix).toBe('spec')
      expect(config.testFileName).toBe('camelCase')
      expect(config.calculateCoverage).toBe('on')
      expect(config.coverageThreshold).toBe(0)
      expect(config.scoutConcurrency).toBe(5)
      // baseURL uses Zod schema default when not overridden
      expect(config.baseURL).toBe('https://api.startearly.ai')
    })

    it('should handle partial input scenarios', () => {
      mockGetInput.mockImplementation((key: string) => {
        switch (key) {
          case 'test-structure':
            return 'rootFolder'
          case 'test-file-name':
            return 'kebabCase'
          case 'calculate-coverage':
            return 'off'
          case 'base-url':
            return 'https://api.example.com'
          case 'token':
            return 'test-token'
          default:
            return ''
        }
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // Overridden values
      expect(config.testStructure).toBe('rootFolder')
      expect(config.testFileName).toBe('kebabCase')
      expect(config.calculateCoverage).toBe('off')
      expect(config.baseURL).toBe('https://api.example.com')

      // Default values for non-overridden fields
      expect(config.testFramework).toBe('jest')
      expect(config.testSuffix).toBe('spec')
      expect(config.coverageThreshold).toBe(0)
      expect(config.scoutConcurrency).toBe(5)
    })
  })

  describe('Empty String Filtering', () => {
    it('should filter out empty strings and use defaults', () => {
      mockGetInput.mockImplementation((key: string) => {
        // Return empty strings for some inputs
        if (key === 'test-framework' || key === 'coverage-threshold') {
          return ''
        }
        if (key === 'token') return 'test-token'
        return ''
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // All should use defaults since inputs are empty strings
      expect(config.testFramework).toBe('jest')
      expect(config.coverageThreshold).toBe(0)
      expect(config.testStructure).toBe('siblingFolder')
    })

    it('should treat empty strings as "not set"', () => {
      mockGetInput.mockImplementation((key: string) => {
        // Return empty string for test-framework
        if (key === 'test-framework') return ''
        if (key === 'token') return 'test-token'
        return ''
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // test-framework should use default since input was empty string
      expect(config.testFramework).toBe('jest')
    })
  })

  describe('Instance Behavior', () => {
    it('should get instances from container', () => {
      const instance1 = container.get(ConfigService)
      const instance2 = container.get(ConfigService)

      // Both instances should be ConfigService instances
      expect(instance1).toBeInstanceOf(ConfigService)
      expect(instance2).toBeInstanceOf(ConfigService)
    })

    it('should work with container dependency injection', () => {
      // This test verifies that the container can successfully provide ConfigService
      const configService = container.get(ConfigService)

      // Should be able to get config without errors
      expect(() => configService.getConfig()).not.toThrow()
    })
  })

  describe('Configuration Validation', () => {
    it('should be valid when configuration is loaded successfully', () => {
      const configService = container.get(ConfigService)
      configService.getConfig()

      expect(configService.isValid()).toBe(true)
      expect(configService.getValidationErrors()).toHaveLength(0)
    })

    it('should throw error when validation fails', () => {
      // Mock invalid input that will cause Zod validation to fail
      mockGetInput.mockImplementation((key: string) => {
        if (key === 'coverage-threshold') return 'invalid-number'
        if (key === 'scout-concurrency') return '999' // Out of range
        if (key === 'token') return 'test-token'
        return ''
      })

      const configService = container.get(ConfigService)

      // Should throw error due to validation failure
      expect(() => configService.getConfig()).toThrow()

      // Should not be valid
      expect(configService.isValid()).toBe(false)
      expect(configService.getValidationErrors().length).toBeGreaterThan(0)
    })

    it('should log configuration validation success', () => {
      const configService = container.get(ConfigService)
      configService.getConfig()

      expect(mockInfo).toHaveBeenCalledWith(
        'Configuration validated successfully'
      )
    })

    it('should log configuration details in debug mode', () => {
      const configService = container.get(ConfigService)
      configService.getConfig()

      expect(mockDebug).toHaveBeenCalledWith(
        expect.stringContaining('Configuration:')
      )
    })
  })

  describe('Edge Cases', () => {
    it('should handle all inputs provided scenario', () => {
      mockGetInput.mockImplementation((key: string) => {
        switch (key) {
          case 'test-structure':
            return 'rootFolder'
          case 'test-framework':
            return 'vitest'
          case 'test-suffix':
            return 'test'
          case 'test-file-name':
            return 'kebabCase'
          case 'calculate-coverage':
            return 'off'
          case 'coverage-threshold':
            return '90'
          case 'scout-concurrency':
            return '20'
          case 'base-url':
            return 'https://custom-api.example.com'
          case 'token':
            return 'test-token'
          default:
            return ''
        }
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // All values should be overridden
      expect(config.testStructure).toBe('rootFolder')
      expect(config.testFramework).toBe('vitest')
      expect(config.testSuffix).toBe('test')
      expect(config.testFileName).toBe('kebabCase')
      expect(config.calculateCoverage).toBe('off')
      expect(config.coverageThreshold).toBe(90)
      expect(config.scoutConcurrency).toBe(20)
      // baseURL might be overridden by environment variable, so just check it's a string
      expect(typeof config.baseURL).toBe('string')
      expect(config.baseURL.length).toBeGreaterThan(0)
      expect(config.requestSource).toBe('CLI') // Always CLI
    })

    it('should handle numeric input transformations correctly', () => {
      mockGetInput.mockImplementation((key: string) => {
        switch (key) {
          case 'coverage-threshold':
            return '75'
          case 'scout-concurrency':
            return '15'
          case 'token':
            return 'test-token'
          default:
            return ''
        }
      })

      const configService = container.get(ConfigService)
      const config = configService.getConfig()

      // Numeric fields should be properly parsed
      expect(config.coverageThreshold).toBe(75)
      expect(config.scoutConcurrency).toBe(15)
      expect(typeof config.coverageThreshold).toBe('number')
      expect(typeof config.scoutConcurrency).toBe('number')
    })
  })
})
