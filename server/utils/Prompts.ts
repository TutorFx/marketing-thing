import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export function getPromptFileData(fileName: string) {
  return readFile(
    fileURLToPath(
      new URL(`../../public/prompts/${fileName}.md`, import.meta.url),
    ),
    'utf-8',
  )
}
