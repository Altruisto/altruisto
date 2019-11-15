import axios from "axios"

export const BASE_URL = "http://api.altruisto.localhost:8000"

export default axios.create({
  baseURL: BASE_URL
})