import axios from "axios"

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.altruisto.com"
    : "http://api.altruisto.localhost:8001"
export const api = axios.create({
  baseURL: apiUrl
})
