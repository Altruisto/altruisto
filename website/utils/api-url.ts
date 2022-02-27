import axios from "axios"

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.altruisto.com"
    : "https://altruisto-backend-playground.herokuapp.com"
export const api = axios.create({
  baseURL: apiUrl
})
export const api2Url =
  process.env.NODE_ENV === "production"
    ? "https://api2.altruisto.com/v2"
    : "https://altruisto-api-playground.herokuapp.com/v2"
export const api2 = axios.create({
  baseURL: apiUrl
})
