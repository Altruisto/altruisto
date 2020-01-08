import axios from "axios"

export const BASE_URL = "http://api.altruisto.localhost:8001"

export default axios.create({
  baseURL: BASE_URL
})