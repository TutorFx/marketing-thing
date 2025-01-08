import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

let _prisma: PrismaClient

export function usePrisma() {
  if (!_prisma) {
    _prisma = new PrismaClient()
  }
  return _prisma
}
