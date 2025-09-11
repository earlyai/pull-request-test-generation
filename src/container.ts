import { Container } from "inversify";

import { createTSAgent } from "@earlyai/ts-agent";

import { ITSAgent, TYPES } from "./container.types.js";
import { ConfigService } from "./services/config/config.service.js";
import { GitService } from "./services/git/git.service.js";

// Create and configure the container with autobind
export const container = new Container({ autobind: true });

// Bind external services that can't use autobind
container.bind<ITSAgent>(TYPES.TSAgent).toDynamicValue(async (context) => {
  const configService = context.get(ConfigService);
  const gitService = context.get(GitService);
  const gitInfo = await gitService.getGitInfo();
  const agent = createTSAgent({ ...configService.getConfig(), context: { git: gitInfo } });

  await agent.init();

  return agent;
});
