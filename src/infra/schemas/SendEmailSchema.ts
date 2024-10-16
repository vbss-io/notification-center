import { z } from 'zod'

export const SendEmailSchema = z.object({
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string'
  }).min(5, {
    message: 'name must have a minimum length of 5'
  }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  }).email({
    message: 'must be a valid e-mail'
  }),
  message: z.string({
    required_error: 'message is required',
    invalid_type_error: 'message must be a string'
  }).min(10, {
    message: 'message must have a minimum length of 5'
  })
})

export type SendEmailInput = z.infer<typeof SendEmailSchema>
