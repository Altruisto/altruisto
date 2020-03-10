import axios from "../helpers/api"
import { storage } from "./storage"
import { GetPartnersResponse } from "../../../shared/types/api"

export const getPartnersList = () =>
  axios.get<GetPartnersResponse>("/partners").then(response =>
    storage.set("local", {
      partners: response.data.map(partner => partner.domain)
    })
  )
