import { z } from 'zod'
export const ContactSchema = z.object({
  intent: z.enum(['role', 'project', 'hi']),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot: must stay empty
})
export type ContactInput = z.infer<typeof ContactSchema>
