import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

export const GOOGLE_SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

export const GOOGLE_GENERATION_SETTINGS = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 8000,
}

export const GOOGLE_MODEL_SETTINGS = { model: 'gemini-2.0-flash-thinking-exp-1219' }
