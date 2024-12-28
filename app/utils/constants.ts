import { GoogleModelEnum } from '../../utils/internal'

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
