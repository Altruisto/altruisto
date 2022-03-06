import axios from "axios"

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.altruisto.com"
    : "https://altruisto-backend-playground.herokuapp.com"
export const api = axios.create({
  baseURL: apiUrl
})

export const api2 = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL_2}/v2`
})

export const getStripeApiKey = () => process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
