import axios from "axios"

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.altruisto.com"
    : "https://altruisto-backend-playground.herokuapp.com"
export const api = axios.create({
  baseURL: apiUrl
})
