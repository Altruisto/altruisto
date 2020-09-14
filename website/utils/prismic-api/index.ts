import PrismicApi from "./prismic-api"
import { AlternateLanguage } from "prismic-javascript/types/documents"

export type PrismicDocument<PrismicData> = {
  id: string
  uid?: string
  type: string
  href: string
  tags: string[]
  first_publication_date: string
  last_publication_date: string
  lang?: string
  alternate_languages: AlternateLanguage[]
  data: PrismicData
}

export { getMetaTags, MetaTagCards } from "./prismic-meta-tags"

export { getBlogMeta, getBlogTags } from "./prismic-meta-data"

export { prismicApiUrl, default as PrismicApi } from "./prismic-api"

export { getDataFromPostsList, BlogPages } from "./prismic-posts-list"

export default PrismicApi
