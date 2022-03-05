import axios from "axios"

export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.altruisto.com"
    : "https://altruisto-backend-playground.herokuapp.com"
export const api = axios.create({
  baseURL: apiUrl
})
// export const api2Url =
//   process.env.NODE_ENV === "production"
//     ? "https://altruisto-api-playground.herokuapp.com/v2"
//     : "https://altruisto-api-playground.herokuapp.com/v2"
export const api2 = axios.create({
  baseURL: "http://localhost:9091/v2"
})

export const getStripeApiKey = () =>
  process.env.NODE_ENV === "production"
    ? "pk_test_51KWgX8ATvvx9S1LEtXxgh0aWJFEbYI2Ab2L0pGrAiwUKGWqT0qDwn5QOB64Rb684fh3dMKtZG1gg2M8zpVvmmShm00Iz9frXnN"
    : "pk_test_51KWgX8ATvvx9S1LEtXxgh0aWJFEbYI2Ab2L0pGrAiwUKGWqT0qDwn5QOB64Rb684fh3dMKtZG1gg2M8zpVvmmShm00Iz9frXnN"
