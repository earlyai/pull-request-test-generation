# Early-Catch Action


A GitHub Action that automatically generates unit tests for TypeScript/Javascript code changes in pull requests. The action analyzes changed files, identifies testable functions, and generates comprehensive test coverage.

## Features

- **Automatic Test Generation**: Analyzes PR changes and generates unit tests for uncovered code
- **Coverage Analysis**: Calculates test coverage before and after test generation
- **Smart Filtering**: Focuses on files with low coverage that need tests
- **Multiple Test Frameworks**: Supports Jest, Mocha, and Vitest
- **Flexible Configuration**: Customizable test structure, naming conventions, and coverage thresholds
- **Auto-commit**: Automatically commits generated test files to the PR branch

## Usage

Add this action to your workflow to automatically generate tests for pull requests:

```yaml
name: early-catch

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  early-catch:
    permissions:
      contents: write
      pull-requests: read
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.head_ref }}
      

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: '**/package-lock.json'

      - name: Install dependencies
        run: npm ci --prefer-offline

      - name: Generate Tests
        uses: earlyai/agent
        with:
          api-key: ${{ secrets.EARLY_API_KEY }}
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Print Coverage Results
        run: echo "Coverage: ${{ steps.test-action.outputs.pre-coverage }}% -> ${{ steps.test-action.outputs.post-coverage }}%"
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `api-key` | API key for authenticating with the backend service | Yes | - |
| `token` | GitHub token for accessing PR information | No | `GITHUB_TOKEN` |
| `base-host` | Base host for the API endpoint | No | `https://api.startearly.ai` |
| `test-framework` | Test framework to use (jest, mocha, vitest) | No | `jest` |
| `test-structure` | Test file structure (siblingFolder or rootFolder) | No | `siblingFolder` |
| `test-suffix` | Test file suffix (spec or test) | No | `spec` |
| `test-file-name` | Test file naming convention (camelCase or kebabCase) | No | `camelCase` |
| `calculate-coverage` | Whether to calculate coverage (on or off) | No | `on` |
| `coverage-threshold` | Coverage threshold percentage (0-100) | No | `0` |
| `concurrency` | Number of concurrent processes (1-50) | No | `5` |
| `auto-commit` | Whether to auto-commit files (true or false) | No | `true` |
| `max-testables` | Maximum number of testables to generate tests for (-1 for unlimited) | No | `-1` |

## Outputs

| Output | Description |
|--------|-------------|
| `pre-coverage` | Coverage percentage before test generation |
| `post-coverage` | Coverage percentage after test generation |

## Requirements

- Node.js 20 or later
- TypeScript/Javascript project with existing test setup
- Valid API key for the Early AI service
