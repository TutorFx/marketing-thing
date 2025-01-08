import type { UserSession } from '#auth-utils'
import type { Plan } from '@prisma/client'

export function getCurrentPlan(session: UserSession): LocalPlan | Plan {
  if (session.user) {
    return session.user.plan
  }
  return LocalPlan.GUEST
}
