import 'dotenv/config'
import 'express-async-errors'

import { MailerModule } from '@/application/modules/MailerModule'
import { StatusModule } from '@/application/modules/StatusModule'
import { Registry } from '@/infra/dependency-injection/Registry'
import { ExpressErrorHandler } from '@/infra/error/ErrorHandler'
import { ExpressAdapter, type HttpServer } from '@/infra/http/HttpServer'

const isTestEnvironment = process.env.NODE_ENV === 'test'
let httpServer: HttpServer

async function main (): Promise<any> {
  const errorHandler = new ExpressErrorHandler()
  Registry.getInstance().provide('errorHandler', errorHandler)
  httpServer = new ExpressAdapter()
  Registry.getInstance().provide('httpServer', httpServer)
  new StatusModule()
  new MailerModule()
  if (!isTestEnvironment) void httpServer.start(Number(process.env.PORT))
}
void main()

export { httpServer }
