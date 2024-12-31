import { GoogleModelEnum, PromptEnum } from '../../shared/utils/internal'

export const GOOGLE_MODELS = {
  [GoogleModelEnum.thinking]: {
    name: 'gemini-2.0-flash-thinking-exp-1219',
    contentIndex: 1,
  },
  [GoogleModelEnum.pro]: {
    name: 'gemini-exp-1206',
    contentIndex: 0,
  },
  [GoogleModelEnum.flash]: {
    name: 'gemini-2.0-flash-exp',
    contentIndex: 0,
  },
} as const

export const PROMPTS = {
  [PromptEnum.Correction]: 'Correction',
  [PromptEnum.EmotinalTriggers]: 'EmotinalTriggers',
} as const
