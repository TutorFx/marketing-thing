import { GoogleGenerativeAI } from '@google/generative-ai'
import { fromZodError } from 'zod-validation-error'
import { AiSugestionRequest } from '~~/shared/utils/schemas'

export default defineEventHandler(async (event) => {
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

  const response = await chat.sendMessage(result.data.redaction)

  const responseMessage = makeContentJson(response.response.candidates?.at(-1)?.content.parts?.at(agent.contentIndex)?.text?.replaceAll(/\\"/g, '"') ?? '')

  if (!responseMessage)
    return createError('Invalid Response')

  return responseMessage
})
