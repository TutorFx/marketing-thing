import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { GoogleModelEnum, PromptEnum } from './internal'

export const AiSugestionRequest = z.object({
  redaction: z.string().min(5),
  agent: z.nativeEnum(GoogleModelEnum),
  prompt: z.nativeEnum(PromptEnum),
})

export const AiSugestionResponse = z.object({
  title: z.string().min(1),
  diff: z.object({
    before: z.string().min(1),
    after: z.string().min(0),
  }),
  tip: z.string().min(1),
})

export const AiSugestionResponses = z.array(AiSugestionResponse)

export type IAiSugestionRequest = z.infer<typeof AiSugestionRequest>
export type IAiSugestionResponse = z.infer<typeof AiSugestionResponse>
export type IAiSugestionResponses = z.infer<typeof AiSugestionResponses>

export interface IAiUsage {
  candidatesTokenCount: number
  promptTokenCount: number
}
export interface ITipsResponse {
  responseMessage: IAiSugestionResponses
  usage: IAiUsage
}

// user

export const email = z.string().email()
export const name = z.string().min(3)
export const password = z.string().min(1)

export const LoginSchema = z.object({
  email,
  password,
}).strict()

export const RegisterSchema = z.object({
  email,
  password,
}).strict() satisfies z.ZodSchema<Prisma.UserCreateInput>

// guest

export const GuestApiQuerySchema = z.object({
  id: z.string(),
}) satisfies z.ZodSchema<IGuestApiQuery>
