import type { $Fetch, NitroFetchRequest } from 'nitropack'

enum BaseUrl {
  V1 = '/api/v1',
}

enum Path {
  Guest = '/Auth/Guest/',
  Budget = '/Budget/',
  Tips = '/Tips',
}

export function requestRepositoryV1<T>(fetch: $Fetch<T, NitroFetchRequest>) {
  return {
    GuestGet(): Promise<IGuestApiResponse> {
      return fetch(BaseUrl.V1 + Path.Guest)
    },
    BudgetGet(): Promise<IAiUsage | null> {
      return fetch(BaseUrl.V1 + Path.Budget)
    },
    Tips(message: string, agent: GoogleModelEnum, prompt: PromptEnum): Promise<ITipsResponse> {
      return fetch(BaseUrl.V1 + Path.Tips, {
        method: 'POST',
        body: {
          redaction: message,
          agent,
          prompt,
        } satisfies IAiSugestionRequest,
      })
    },
  }
}
