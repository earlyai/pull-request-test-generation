import { Container } from "inversify";

import { createTSAgent } from "@earlyai/ts-agent";

import { ITSAgent, TYPES } from "./container.types.js";
import { ConfigService } from "./services/config/config.service.js";

// Create and configure the container with autobind
export const container = new Container({ autobind: true });

// Bind external services that can't use autobind
container.bind<ITSAgent>(TYPES.TSAgent).toDynamicValue(async (context) => {
  const configService = context.get(ConfigService);
  const agent = createTSAgent(configService.getConfig());

  await agent.init();

  return agent;
});
