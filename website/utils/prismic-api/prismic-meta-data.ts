import axios from "axios"
import { prismicApiUrl } from "./prismic-api"

export type BlogMeta = {
  types: Array<string>
  tags: Array<string>
}

export async function getBlogMeta(): Promise<BlogMeta> {
  const { data } = await axios.get(prismicApiUrl)
  const { types, tags } = data
  return { types: Object.values(types), tags }
}

export const getBlogTags = ({ tags }: BlogMeta): Array<string> => tags
