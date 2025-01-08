import type { H3Error } from 'h3'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { fromZodError } from 'zod-validation-error'
import { AiSugestionRequest } from '~~/shared/utils/schemas'

export default defineEventHandler<Promise<ITipsResponse | H3Error | void>>(async (event) => {
  const session = await getUserSession(event)
  const plan = getCurrentPlan(session)
  const budget = await getCurrentBudget(event, session)

  const featureFlags = FEATURE_FLAGS[plan]

  if (!budget) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'error.budget.404',
      }),
    )
  }

  const result = await readValidatedBody(event, (body) => {
    return AiSugestionRequest.safeParse(body)
  })

  if (!result.success)
    throw fromZodError(result.error).toString()

  const config = useRuntimeConfig()
  const agent = GOOGLE_MODELS[result.data.agent]
  const prompt = PROMPTS[result.data.prompt]

  const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: agent.name, systemInstruction: await getPromptFileData(prompt) })

  const chat = model.startChat({
    generationConfig: GOOGLE_GENERATION_SETTINGS,
    safetySettings: GOOGLE_SAFETY_SETTINGS,
  })

  const isAmountAvailable = checkBudget(budget, featureFlags)

  if (!isAmountAvailable) {
    return sendError(
      event,
      createError({
        statusCode: 402,
        statusMessage: 'error.payment.402',
      }),
    )
  }

  const apiResponse = await chat.sendMessage(result.data.redaction)
  const { candidates, usageMetadata } = apiResponse.response

  if (!usageMetadata) {
    return sendError(
      event,
      createError({
        statusCode: 402,
        statusMessage: 'error.invalidAiMetadata.502',
      }),
    )
  }

  const responseMessage = makeContentJson(candidates?.at(-1)?.content.parts?.at(agent.contentIndex)?.text?.replaceAll(/\\"/g, '"') ?? '')

  if (!responseMessage) {
    return sendError(
      event,
      createError({
        statusCode: 502,
        statusMessage: 'error.invalidAiResponse.502',
      }),
    )
  }

  const usage = await increaseUsage(budget, usageMetadata)

  return {
    responseMessage,
    usage,
  }
})
