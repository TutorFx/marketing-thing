import { Plan } from '@prisma/client'
import { LocalPlan } from './internal'

export interface IFeatureFlag {
  tokenCount: number
}

type FeatureFlagObject = Record<LocalPlan | Plan, IFeatureFlag>

export const FEATURE_FLAGS: FeatureFlagObject = {
  [LocalPlan.GUEST]: {
    tokenCount: 1500,
  },
  [Plan.HOBBY]: {
    tokenCount: 100000,
  },
  [Plan.PRO]: {
    tokenCount: 1000000,
  },
} as const
