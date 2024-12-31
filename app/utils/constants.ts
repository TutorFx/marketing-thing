import { GoogleModelEnum, PromptEnum } from '../../shared/utils/internal'

export const MODELS = [
  {
    name: 'Raciocínio',
    isPro: false,
    id: GoogleModelEnum.thinking,
  },
  {
    name: 'Fodão',
    isPro: true,
    id: GoogleModelEnum.pro,
  },
  {
    name: 'Rápido',
    isPro: false,
    id: GoogleModelEnum.flash,
  },
] as const

export const PROMPTS = [
  {
    name: 'Neutralizar',
    isPro: false,
    id: PromptEnum.EmotinalTriggers,
    icon: 'tdesign:emo-emotional',
  },
  {
    name: 'Corrigir',
    isPro: false,
    id: PromptEnum.Correction,
    icon: 'fluent:autocorrect-20-filled',
  },
] as const
