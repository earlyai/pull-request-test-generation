import { Container } from 'inversify'
import { ITSScout, TYPES } from './container.types.js'
import { createTSScout } from '@earlyai/ts-scout'
import { ConfigService } from './services/config/config.service.js'

// Create and configure the container with autobind
export const container = new Container({ autobind: true })

// Bind external services that can't use autobind
container.bind<ITSScout>(TYPES.TsScoutService).toDynamicValue(async (ctx) => {
  const configService = ctx.get(ConfigService)
  const scout =  createTSScout(configService.getConfig())
  await scout.init()
  return scout
})
