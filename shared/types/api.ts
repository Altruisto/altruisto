export type GetPartnersResponse = Array<{
  name: string
  domain: string
  checkoutUrlPartial: string | null
  cookieExpiration: number
  donation: string
  excludedPages: string[]
  excludedSubdomains: string[]
}>
