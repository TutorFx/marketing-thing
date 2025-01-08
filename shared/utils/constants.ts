import { Plan } from '@prisma/client'
import { LocalPlan } from './internal'

export interface IFeatureFlag {
  promptTokenCount: number
  candidatesTokenCount: number
}

type FeatureFlagObject = Record<LocalPlan | Plan, IFeatureFlag>

export const FEATURE_FLAGS: FeatureFlagObject = {
  [LocalPlan.GUEST]: {
    promptTokenCount: 1500,
    candidatesTokenCount: 1500,
  },
  [Plan.HOBBY]: {
    promptTokenCount: 100000,
    candidatesTokenCount: 100000,
  },
  [Plan.PRO]: {
    promptTokenCount: 1000000,
    candidatesTokenCount: 1000000,
  },
} as const
