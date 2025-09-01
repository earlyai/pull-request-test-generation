import { Container } from 'inversify'
import { TsScoutService } from '@earlyai/ts-scout'

// Create and configure the container with autobind
export const container = new Container({ autobind: true })

// Bind external services that can't use autobind
container.bind(TsScoutService).toSelf().inSingletonScope()
