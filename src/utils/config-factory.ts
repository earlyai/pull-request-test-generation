import { container } from "@/container";
import { ConfigService } from "@/services/config/config.service";
import { type ConfigInterface } from "@/services/config/config.types";

export const getConfigService = (): ConfigInterface => container.get<ConfigService>(ConfigService);
