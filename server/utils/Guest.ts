import type { H3Event } from 'h3'

export async function setupGuest(event: H3Event) {
  const id = getCookie(event, CacheKeys.Guest)
  const network = readVercelHeaders(event)
  const prisma = usePrisma()

  const guest = await prisma.guest.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  })
    .catch(() => null)

  if (!guest) {
    const createdGuest = await prisma.guest.create({
      data: {
        connection: defineConnectionData(network.ip),
      },
      select: {
        id: true,
      },
    })

    setCookie(event, CacheKeys.Guest, createdGuest.id)

    return createdGuest
  }

  const updatedGuest = await prisma.guest.update({
    where: {
      id: guest.id,
    },
    data: {
      connection: defineConnectionData(network.ip),
    },
    select: {
      id: true,
    },
  })

  setCookie(event, CacheKeys.Guest, updatedGuest.id)

  return updatedGuest
}
