import { type SendContactMailInput } from '@/application/usecases/dto/SendContactMail.dto'
import { inject } from '@/infra/dependency-injection/Registry'
import { type Mailer } from '@/infra/mailer/Mailer'

export class SendMailContact {
  @inject('mailer')
  private readonly mailer!: Mailer

  async execute (input: SendContactMailInput): Promise<void> {
    const subject = `${input.name} - ${input.email}`
    await this.mailer.sendMail('vitor@vbss.io', subject, input.message)
  }
}
