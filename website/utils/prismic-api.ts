import Prismic from "prismic-javascript"
import { Client } from "prismic-javascript/types/client"
import axios from "axios"

const prismicApiUrl =
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

type BlogMeta = {
  types: Array<string>
  tags: Array<string>
}

async function getBlogMeta(): Promise<BlogMeta> {
  const { data } = await axios.get(prismicApiUrl)
  const { types, tags } = data
  return { types: Object.values(types), tags }
}

function getBlogPostTypes({ types }: BlogMeta): Array<string> {
  const blogPostRegexp = /^blog-post/
  return [...types].filter((type) => blogPostRegexp.test(type))
}

const getBlogTags = ({ tags }: BlogMeta): Array<string> => tags

export default PrismicApi
export { getBlogMeta, getBlogPostTypes, getBlogTags }
