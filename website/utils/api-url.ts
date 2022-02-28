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
  baseURL: api2Url
})

export const getStripeApiKey = () =>
  process.env.NODE_ENV === "production"
    ? "pk_live_51KWgX8ATvvx9S1LEKpR6T42uxh2gSFAoriu1GHPQq0nntuzLfVyubQMn2qndQxulU5A9KwdhfmOnE9IIJAv6zAdY00gFpGUouh"
    : "pk_test_51KWgX8ATvvx9S1LEtXxgh0aWJFEbYI2Ab2L0pGrAiwUKGWqT0qDwn5QOB64Rb684fh3dMKtZG1gg2M8zpVvmmShm00Iz9frXnN"
