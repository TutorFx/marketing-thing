export default defineOAuthGoogleEventHandler({
  config: {},
  async onSuccess(event, { user }) {
    const prisma = usePrisma()
    const network = readVercelHeaders(event)

    const definedUser = await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        picture: user.picture,
        firstname: user.given_name,
        lastname: user.family_name,
        connection: defineConnectionData(network.ip),
      },
      create: {
        email: user.email,
        picture: user.picture,
        firstname: user.given_name,
        lastname: user.family_name,
        connection: defineConnectionData(network.ip),
      },
    })
    await setUserSession(event, {
      user: {
        name: user.given_name,
        picture: user.picture,
        email: user.email,
        id: definedUser.id,
      },
    })

    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
