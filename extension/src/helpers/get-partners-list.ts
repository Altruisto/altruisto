import axios from "../helpers/api"
import { storage } from "./storage"

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
  axios.get<GetPartnersResponse>("/partners").then(response =>
    storage.set("local", {
      partners: response.data.map(partner => partner.domain)
    })
  )
