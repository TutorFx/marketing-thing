import { LoginSchema } from '~~/shared/utils/schemas'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, LoginSchema.safeParse)
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

  const prisma = usePrisma()

  const user = await prisma.user.findUnique({
    where: {
      email: body.data.email,
    },
  })

  if (!user?.password) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'error.login.401',
      }),
    )
  }

  const valid = await VerifyPassword(user.password, body.data.password)

  if (!valid) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: 'error.login.401',
      }),
    )
  }

  await Promise.all([
    linkUserConnection(prisma, user.id, network.ip),
    setUserSession(event, {
      // User data
      user: {
        email: user.email,
        id: user.id,
        picture: user.picture,
        name: user.firstname,
      },
      // Any extra fields for the session data
      loggedInAt: new Date(),
    }),
  ])

  setResponseStatus(event, 200)
})
