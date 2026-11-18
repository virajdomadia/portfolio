import { z } from 'zod'
import { MESSAGE, NAME, NAME_RE } from './contact-rules'
export const ContactSchema = z.object({
  intent: z.enum(['role', 'project', 'hi']),
  name: z.string().trim().min(NAME.min).max(NAME.max).regex(NAME_RE), // no line breaks, control characters or tags (it goes into the email subject)
  email: z.string().trim().email(),
  message: z.string().trim().min(MESSAGE.min).max(MESSAGE.max),
  website: z.string().max(0).optional(), // honeypot: must stay empty
})
export type ContactInput = z.infer<typeof ContactSchema>
