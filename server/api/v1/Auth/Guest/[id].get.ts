export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const network = readVercelHeaders(event)
  const prisma = usePrisma()

  if (typeof id !== 'string') {
    return prisma.guest.create({
      data: {
        connection: defineConnectionData(network.ip),
      },
      include: {
        connection: true,
      },
    })
  }

  return prisma.guest.upsert({
    where: {
      id,
    },
    update: {
      connection: defineConnectionData(network.ip),
    },
    create: {
      connection: defineConnectionData(network.ip),
    },
    select: {
      id: true,
    },
  })
})
