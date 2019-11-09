import axios from "axios"

export default axios.create({
  baseURL: "http://api.altruisto.localhost:8000"
})