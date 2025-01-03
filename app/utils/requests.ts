import type { $Fetch, NitroFetchRequest } from 'nitropack'

enum BaseUrl {
  V1 = '/api/v1',
}

enum Path {
  Guest = '/Auth/Guest/:id',
  Tips = '/Tips',
}

export function requestRepositoryV1<T>(fetch: $Fetch<T, NitroFetchRequest>) {
  return {
    async Guest(id: string) {
      return fetch(BaseUrl.V1 + Path.Guest, {
        params: {
          id,
        },
      })
    },
    async Tips(message: string, agent: GoogleModelEnum, prompt: PromptEnum): Promise<IAiSugestionResponses> {
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
