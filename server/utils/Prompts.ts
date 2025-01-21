import type { H3Event } from 'h3'
import fs from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export function getPromptFileData(fileName: string, event: H3Event) {
  return queryCollection(event, 'prompts')
    .select('rawbody')
    .where('id', '=', `prompts/prompts/${fileName}.md`)
    .first()
    .then(data => data.rawbody)
}
