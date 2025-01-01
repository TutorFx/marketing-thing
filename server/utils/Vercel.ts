import type { H3Event } from 'h3'

export function readVercelHeaders(event: H3Event) {
  const host = getHeader(event, 'host') ?? null
  const cityHeader = getHeader(event, 'x-vercel-ip-city') ?? null
  const city = cityHeader ? decodeURIComponent(cityHeader) : null
  const stateHeader = getHeader(event, 'x-vercel-ip-country-region') ?? null
  const state = stateHeader ? decodeURIComponent(stateHeader) : null
  const ipHeader = getHeader(event, 'x-forwarded-for') ?? null
  const ip = ipHeader ? ipHeader.split(',')[0] : 'localhost'

  return {
    host,
    cityHeader,
    city,
    stateHeader,
    state,
    ipHeader,
    ip,
  }
}
