import Prismic from "prismic-javascript"
import { Client } from "prismic-javascript/types/client"

export const prismicApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://altruisto.cdn.prismic.io/api/v2"
    : "https://altruisto-beta.cdn.prismic.io/api/v2"

const PrismicApi = (req = null): Client => Prismic.client(prismicApiUrl, createClientOptions(req))

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  return {
    ...reqOption,
    ...accessTokenOption
  }
}

export default PrismicApi
