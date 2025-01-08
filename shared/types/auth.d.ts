import type { Plan } from '@prisma/client'

declare module '#auth-utils' {
  interface User {
    id: string
    picture: string | null
    name: string | null
    email: string
    plan: Plan
  }

  interface UserSession {
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}
