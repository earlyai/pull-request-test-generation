import * as core from "@actions/core";
import { isDefined } from "@earlyai/core";

import { container } from "./container.js";
import { AgentService } from "./services/agent/agent.service.js";

import "reflect-metadata";

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Get GitHub token from inputs or environment
    const githubToken = core.getInput("token") ?? process.env.GITHUB_TOKEN;

    if (!isDefined(githubToken)) {
      throw new Error("GITHUB_TOKEN is required but not set");
    }

    // Get the AgentService from the container and run the PR context flow
    const agentService = await container.getAsync(AgentService);

    await agentService.runPRContextFlow();
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
