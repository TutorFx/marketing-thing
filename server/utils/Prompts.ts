import { readFile } from 'node:fs/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

export function getPromptFileData(fileName: string) {
  let prefix = './public/prompts/'

  if (process.env.dev) {
    prefix = '../../public/prompts/'
  }

  if (process.env.VERCEL_DEPLOYMENT_ID) {
    prefix = './prompts/'
  }

  return readFile(
    fileURLToPath(
      new URL(`${prefix}${fileName}.md`, import.meta.url),
    ),
    'utf-8',
  )
}
