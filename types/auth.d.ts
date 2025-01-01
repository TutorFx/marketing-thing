declare module '#auth-utils' {
  interface User {
    id: string
    picture: string | null
    name: string | null
    email: string
  }

  interface UserSession {
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}
