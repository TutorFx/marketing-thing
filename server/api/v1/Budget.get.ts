export default defineEventHandler<Promise<IAiUsage | null>>(async (event) => {
  const session = await getUserSession(event)
  const budget = await getCurrentBudget(event, session)

  if (!budget)
    return null

  return {
    candidatesTokenCount: budget.candidatesTokenCount,
    promptTokenCount: budget.promptTokenCount,
  }
})
