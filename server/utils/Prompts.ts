import { readFile } from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

export function getPromptFileData(fileName: string) {
  let prefix = '.'

  if (process.env.dev) {
    prefix = '../..'
  }

  return readFile(
    fileURLToPath(
      new URL(`${prefix}/public/prompts/${fileName}.md`, import.meta.url),
    ),
    'utf-8',
  )
}
