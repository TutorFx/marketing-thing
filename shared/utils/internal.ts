import { Plan } from '@prisma/client'

export enum GoogleModelEnum {
  thinking,
  flash,
  pro,
}

export enum PromptEnum {
  Correction,
  EmotinalTriggers,
}

export enum LocalPlan {
  GUEST = 'GUEST',
}

export enum CacheKeys {
  Guest = 'guestId',
}

export enum BudgetPeriod {
  Monthly,
  Weekly,
  Daily,
}
