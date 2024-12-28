import { z } from 'zod'
import { GoogleModelEnum } from './internal'

export const AiSugestionRequest = z.object({
  redaction: z.string().min(5),
  agent: z.nativeEnum(GoogleModelEnum),
})

export const AiSugestionResponse = z.object({
  title: z.string().min(1),
  diff: z.string().min(1),
  tip: z.string().min(1),
})

export const AiSugestionResponses = z.array(AiSugestionResponse)

export type IAiSugestionRequest = z.infer<typeof AiSugestionRequest>
export type IAiSugestionResponse = z.infer<typeof AiSugestionResponse>
export type IAiSugestionResponses = z.infer<typeof AiSugestionResponses>
