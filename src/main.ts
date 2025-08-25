import * as core from '@actions/core'
import { TsScoutService } from '@early/ts-scout'
/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const apiKey: string = core.getInput('apiKey')
    const scoutService = new TsScoutService()
    await scoutService.generateCoverage()
    const coverageTree = await scoutService.getCoverageTree()
    core.debug(JSON.stringify(coverageTree, null, 2))

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`)

    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
