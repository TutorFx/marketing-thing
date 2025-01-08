import type { UserSession } from '#auth-utils'
import type { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { startOfDay, startOfMonth, startOfWeek } from 'date-fns'

export const defaultPeriodStart = BudgetPeriod.Daily

export function getPeriodStart(period: BudgetPeriod = defaultPeriodStart) {
  const today = new Date()
  switch (period) {
    case BudgetPeriod.Daily: {
      return startOfDay(today)
    }
    case BudgetPeriod.Weekly: {
      return startOfWeek(today)
    }
    case BudgetPeriod.Monthly: {
      return startOfMonth(today)
    }
  }
}

export async function getCurrentBudget(event: H3Event, session: UserSession, period: BudgetPeriod = defaultPeriodStart) {
  const prisma = usePrisma()
  const guestId = getCookie(event, CacheKeys.Guest)
  const currentPeriod = getPeriodStart(period)

  if (session.user) {
    const userId = session.user.id
    let userBudget = await prisma.dailyBudget.findUnique({
      where: {
        id_userId: {
          id: currentPeriod,
          userId,
        },
      },
    })
      .catch(() => null)

    if (!userBudget) {
      userBudget = await prisma.dailyBudget.create({
        data: {
          userId,
          id: currentPeriod,
        },
      })
        .catch(() => null)
    }

    return userBudget
  }
  else if (guestId) {
    let guestBudget = await prisma.dailyBudget.findUnique({
      where: {
        id_guestId: {
          id: currentPeriod,
          guestId,
        },
      },
    })
      .catch(() => null)

    if (!guestBudget) {
      guestBudget = await prisma.dailyBudget.create({
        data: {
          guestId,
          id: currentPeriod,
        },
      })
        .catch(() => null)
    }

    return guestBudget
  }
  else {
    return null
  }
}

export function checkBudget(budget: Prisma.$DailyBudgetPayload['scalars'], flag: IFeatureFlag) {
  return (
    flag.promptTokenCount > budget.promptTokenCount
    && flag.candidatesTokenCount > budget.candidatesTokenCount
  )
}

export async function increaseUsage(budget: Prisma.$DailyBudgetPayload['scalars'], usageMetadata: IFeatureFlag) {
  const prisma = usePrisma()

  const candidatesTokenCount = budget.promptTokenCount + usageMetadata.candidatesTokenCount
  const promptTokenCount = budget.promptTokenCount + usageMetadata.promptTokenCount

  const newBudget = await prisma.dailyBudget.update({
    where: {
      internalId: budget.internalId,
    },
    data: {
      candidatesTokenCount,
      promptTokenCount,
    },
  })

  return {
    candidatesTokenCount: newBudget.candidatesTokenCount,
    promptTokenCount: newBudget.promptTokenCount,
  }
}
