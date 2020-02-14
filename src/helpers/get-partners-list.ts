import { browser } from "webextension-polyfill-ts"
import axios from "../helpers/api"

type GetPartnersResponse = Array<{
  name: string
  domain: string
  checkoutUrlPartial: string | null
  cookieExpiration: number
  donation: string
  excludedPages: string[]
  excludedSubdomains: string[]
}>

export const getPartnersList = () =>
  axios.get<GetPartnersResponse>("/partners").then(response => {
    browser.storage.local.remove(["partners"])
    browser.storage.local.set({
      partners: response.data.map(partner => partner.domain)
    })
  })
