export default defineOAuthGoogleEventHandler({
  config: {},
  async onSuccess(event, { user }) {
    const prisma = usePrisma()
    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        picture: user.picture,
        firstname: user.given_name,
        lastname: user.family_name,
      },
      create: {
        email: user.email,
        picture: user.picture,
        firstname: user.given_name,
        lastname: user.family_name,
      },
    })
    await setUserSession(event, {
      user: {
        name: user.name,
        picture: user.picture,
        email: user.email,
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
