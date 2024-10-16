import { MailerError } from '@/infra/error/ErrorCatalog'
import nodemailer from 'nodemailer'

export interface Mailer {
  sendMail: (to: string, subject: string, text: string) => Promise<void>
}

export class NodemailerAdapter implements Mailer {
  async sendMail (to: string, subject: string, text: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER_MAIL,
          pass: process.env.SMTP_USER_PASS
        }
      })
      const mailOptions = {
        from: process.env.SMTP_FROM_MAIL ?? process.env.SMTP_USER_MAIL,
        to,
        subject,
        text
      }
      await transporter.sendMail(mailOptions)
    } catch {
      throw new MailerError()
    }
  }
}
