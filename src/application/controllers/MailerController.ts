import { type SendMailContact } from '@/application/usecases/SendContactMail'
import { inject } from '@/infra/dependency-injection/Registry'
import type { HttpServer } from '@/infra/http/HttpServer'
import { HttpStatusCodes } from '@/infra/http/HttpStatusCodes'
import { type SendEmailInput } from '@/infra/schemas/SendEmailSchema'
import { type InputValidate } from '@/infra/validate/InputValidate'

export class MailerController {
  @inject('httpServer')
  private readonly httpServer!: HttpServer

  @inject('contactMailValidate')
  private readonly contactMailValidate!: InputValidate<SendEmailInput>

  @inject('sendMailContact')
  private readonly sendMailContact!: SendMailContact

  constructor () {
    this.httpServer.register('post', '/mail', async (params: SendEmailInput) => {
      const inputParsed = this.contactMailValidate.validate(params)
      await this.sendMailContact.execute(inputParsed)
    }, HttpStatusCodes.OK)
  }
}
