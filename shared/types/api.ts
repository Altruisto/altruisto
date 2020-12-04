import { CauseArea, Currency } from "./user"

export type GetPartnersResponse = Array<{
  name: string
  domain: string
  checkoutUrlPartial: string | null
  cookieExpiration: number
  donation: string
  excludedPages: string[]
  excludedSubdomains: string[]
}>

export type PostLoginResponse = {
  apiKey: string
}

export type GetUserResponse = {
  id: number
  username: string
  email: string
  api_key: string
  cause_area: CauseArea
  money_raised: number
  currency: Currency
  ref: string
  referred_by: string
  created_at: string
  updated_at: string
  registration_source: string
  referrals_count: number
}
