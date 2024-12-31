import { RegisterSchema } from '~~/shared/utils/schemas'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, RegisterSchema.safeParse)

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
    },
  })

  await setUserSession(event, {
    // User data
    user: {
      email: user.email,
    },
    // Any extra fields for the session data
    loggedInAt: new Date(),
  })

  return null
})
