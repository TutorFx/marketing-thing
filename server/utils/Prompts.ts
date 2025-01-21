import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export function getPromptFileData(fileName: string) {
  let prefix = 'public/prompts/'

  if (process.env.dev) {
    prefix = 'public/prompts/'
  }

  if (process.env.VERCEL_DEPLOYMENT_ID) {
    prefix = 'prompts/'
  }

  return readFile(
    path.join(process.cwd(), `${prefix}${fileName}.md`),
    'utf-8',
  )
}
