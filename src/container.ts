import { Container } from "inversify";

import { createTSScout } from "@earlyai/ts-scout";

import { ITSScout, TYPES } from "./container.types.js";
import { ConfigService } from "./services/config/config.service.js";

// Create and configure the container with autobind
export const container = new Container({ autobind: true });

// Bind external services that can't use autobind
container.bind<ITSScout>(TYPES.TsScoutService).toDynamicValue((context) => {
  const config = context.get(ConfigService);

  return createTSScout(config.getConfig());
});
