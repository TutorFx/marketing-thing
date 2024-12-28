// @ts-expect-error - Replace in soon future
import safeEval from 'safe-eval'
import { AiSugestionResponses } from '~~/utils/schemas'

export function extractContent(originalText: string, firstMatch: string, lastMatch: string) {
  const startIndex = originalText.indexOf(firstMatch)
  const endIndex = originalText.indexOf(lastMatch, startIndex + firstMatch.length)

  if (startIndex === -1 || endIndex === -1) {
    return null
  }

  const conteudoInicio = startIndex + firstMatch.length
  return originalText.slice(conteudoInicio, endIndex)
}

export function makeContentJson(content: string) {
  const JSONdata = extractContent(content, '```javascript', '```')
  if (!JSONdata)
    return null
  const parsedData = safeEval(JSONdata)
  return AiSugestionResponses.parse(parsedData)
}
