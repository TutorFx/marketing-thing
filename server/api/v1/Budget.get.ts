export default defineEventHandler<Promise<IAiUsage | null>>(async (event) => {
  const session = await getUserSession(event)
  const plan = getCurrentPlan(session)
  const current = await getCurrentBudget(event, session)

  const available = FEATURE_FLAGS[plan]

  if (!current)
    return null

  return {
    current: {
      tokenCount: current.candidatesTokenCount + current.promptTokenCount,
    },
    available,
  }
})
