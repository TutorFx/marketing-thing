import type { PrismaClient } from '@prisma/client'

export function defineUserConnectionsData(ip: string) {
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
      connections: defineUserConnectionsData(connectionIp),
    },
  })
}

export function checkUserConnections(prisma: PrismaClient, userId: string) {
  const today = new Date(new Date().toDateString())
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      connections: {
        select: {
          ip: true,
          user: {
            select: {
              id: true,
              budget: {
                where: {
                  id: today,
                },
              },
            },
          },
        },
      },
    },
  })
}
