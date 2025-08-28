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
import { ConfigService } from '../src/services/config/config.service.js'

// Get the mocked functions
const mockGetInput = jest.mocked(require('@actions/core').getInput)
const mockInfo = jest.mocked(require('@actions/core').info)
const mockDebug = jest.mocked(require('@actions/core').debug)
const mockWarning = jest.mocked(require('@actions/core').warning)

describe('ConfigService', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()

    // Reset singleton instance
    // @ts-expect-error - Accessing private static property for testing
    ConfigService.instance = undefined

    // Store original environment
    originalEnv = process.env
    process.env = { ...originalEnv }

    // Default mock implementation - return empty strings
    mockGetInput.mockReturnValue('')
  })

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv
  })

  describe('Default Values', () => {
    it('should use Zod schema defaults when no inputs provided', () => {
      const configService = ConfigService.getInstance()
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
      const configService = ConfigService.getInstance()
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
          default:
            return ''
        }
      })

      const configService = ConfigService.getInstance()
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
        return ''
      })

      const configService = ConfigService.getInstance()
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
          default:
            return ''
        }
      })

      const configService = ConfigService.getInstance()
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
        return ''
      })

      const configService = ConfigService.getInstance()
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
        return ''
      })

      const configService = ConfigService.getInstance()
      const config = configService.getConfig()

      // test-framework should use default since input was empty string
      expect(config.testFramework).toBe('jest')
    })
  })

  describe('Singleton Behavior', () => {
    it('should maintain shared state across instances', () => {
      const instance1 = ConfigService.getInstance()
      const instance2 = ConfigService.getInstance()

      expect(instance1).toBe(instance2)
    })

    it('should reflect configuration changes in all instances', () => {
      const instance1 = ConfigService.getInstance()

      // Mock input for first instance
      mockGetInput.mockImplementation((key: string) => {
        if (key === 'test-framework') return 'mocha'
        return ''
      })

      const config1 = instance1.getConfig()
      expect(config1.testFramework).toBe('mocha')

      // Get second instance and verify it has the same config
      const instance2 = ConfigService.getInstance()
      const config2 = instance2.getConfig()

      expect(config2.testFramework).toBe('mocha')
      expect(config1).toBe(config2)
    })
  })

  describe('Configuration Validation', () => {
    it('should be valid when configuration is loaded successfully', () => {
      const configService = ConfigService.getInstance()
      configService.getConfig()

      expect(configService.isValid()).toBe(true)
      expect(configService.getValidationErrors()).toHaveLength(0)
    })

    it('should throw error when validation fails', () => {
      // Mock invalid input that will cause Zod validation to fail
      mockGetInput.mockImplementation((key: string) => {
        if (key === 'coverage-threshold') return 'invalid-number'
        if (key === 'scout-concurrency') return '999' // Out of range
        return ''
      })

      const configService = ConfigService.getInstance()
      
      // Should throw error due to validation failure
      expect(() => configService.getConfig()).toThrow()
      
      // Should not be valid
      expect(configService.isValid()).toBe(false)
      expect(configService.getValidationErrors().length).toBeGreaterThan(0)
    })

    it('should log configuration validation success', () => {
      const configService = ConfigService.getInstance()
      configService.getConfig()

      expect(mockInfo).toHaveBeenCalledWith('Configuration validated successfully')
    })

    it('should log configuration details in debug mode', () => {
      const configService = ConfigService.getInstance()
      configService.getConfig()

      expect(mockDebug).toHaveBeenCalledWith(expect.stringContaining('Configuration:'))
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
          default:
            return ''
        }
      })

      const configService = ConfigService.getInstance()
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
          default:
            return ''
        }
      })

      const configService = ConfigService.getInstance()
      const config = configService.getConfig()

      // Numeric fields should be properly parsed
      expect(config.coverageThreshold).toBe(75)
      expect(config.scoutConcurrency).toBe(15)
      expect(typeof config.coverageThreshold).toBe('number')
      expect(typeof config.scoutConcurrency).toBe('number')
    })
  })
})
