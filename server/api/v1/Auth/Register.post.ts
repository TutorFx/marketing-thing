import { RegisterSchema } from '~~/shared/utils/schemas'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, RegisterSchema.safeParse)
  const network = readVercelHeaders(event)

  if (body.success === false) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'error.login.400',
      }),
    )
  }

  const hash = await HashPassword(body.data.password)
  const prisma = usePrisma()

  const user = await prisma.user.create({
    data: {
      email: body.data.email,
      password: hash,

      connection: defineConnectionData(network.ip),
    },
  })

  await setUserSession(event, {
    // User data
    user: {
      name: user.firstname,
      email: user.email,
      id: user.id,
      picture: user.picture,
    },
    // Any extra fields for the session data
    loggedInAt: new Date(),
  })

  return null
})
