import { MailerController } from '@/application/controllers/MailerController'
import { SendMailContact } from '@/application/usecases/SendContactMail'
import { Registry } from '@/infra/dependency-injection/Registry'
import { NodemailerAdapter } from '@/infra/mailer/Mailer'
import { SendEmailSchema } from '@/infra/schemas/SendEmailSchema'
import { ZodAdapter } from '@/infra/validate/InputValidate'

export class MailerModule {
  constructor () {
    const mailer = new NodemailerAdapter()
    Registry.getInstance().provide('mailer', mailer)
    const contactMailValidate = new ZodAdapter(SendEmailSchema)
    Registry.getInstance().provide('contactMailValidate', contactMailValidate)
    const sendMailContact = new SendMailContact()
    Registry.getInstance().provide('sendMailContact', sendMailContact)
    new MailerController()
  }
}
