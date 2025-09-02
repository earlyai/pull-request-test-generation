import { Container } from 'inversify'
import { ITSScout, TYPES } from './container.types.js'
import { createTSScout } from '@earlyai/ts-scout'
import { ConfigService } from './services/config/config.service.js'

// Create and configure the container with autobind
export const container = new Container({ autobind: true })

// Bind external services that can't use autobind
container.bind<ITSScout>(TYPES.TsScoutService).toDynamicValue((ctx) => {
    const config = ctx.get(ConfigService)
    // Ensure config is initialized before creating ts-scout
    config.getConfig()
    return createTSScout(config.createTsScoutConfig())
})
