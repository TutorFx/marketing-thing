import type { PrismaClient } from '@prisma/client'

export function defineConnectionData(ip: string) {
  return {
    connectOrCreate: {
      where: {
        ip,
      },
      create: {
        ip,
      },
    },
  }
}

export function linkUserConnection(prisma: PrismaClient, userId: string, connectionIp: string) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      connection: defineConnectionData(connectionIp),
    },
  })
}
