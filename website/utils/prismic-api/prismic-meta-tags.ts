import { MetaTags } from "components/partials/DefaultHead"
import getNestedPropertyFromObject from "lodash.get"
import removeUndefinedValuesFromObject from "../remove-undefined-values-from-object"
import { PrismicDocument } from "."

export enum MetaTagCards {
  Seo = "seo_card",
  Og = "og_card",
  Twitter = "twitter_card"
}

enum PrismicTwitterCards {
  "Standard Summary Card" = "summary",
  "Summary Card with Large Image" = "summary_large_image"
}

export type PrismicMetaTag = {
  slice_type: MetaTagCards
  primary: {
    title?: string
    description?: string
    keywords?: string
  }
}

type PrismicDocumentData = {
  meta_tags?: PrismicMetaTag[]
}

const _convertPrismicTwitterCard = (cardType) => PrismicTwitterCards[cardType]

export function getMetaTags(prismicDocument: PrismicDocument<PrismicDocumentData>): MetaTags {
  const prismicMetaTagsData = getNestedPropertyFromObject(prismicDocument, "data.meta_tags", [])

  const seoMetaTagsData = getNestedPropertyFromObject(
    prismicMetaTagsData.find((metaTagsData) => metaTagsData.slice_type === MetaTagCards.Seo),
    "primary",
    {}
  )
  const ogMetaTagsData = getNestedPropertyFromObject(
    prismicMetaTagsData.find((metaTagsData) => metaTagsData.slice_type === MetaTagCards.Og),
    "primary",
    {}
  )
  const twitterMetaTagsData = getNestedPropertyFromObject(
    prismicMetaTagsData.find((metaTagsData) => metaTagsData.slice_type === MetaTagCards.Twitter),
    "primary",
    {}
  )

  const seoMetaTags = removeUndefinedValuesFromObject({
    title: seoMetaTagsData.title,
    description: seoMetaTagsData.description,
    keywords: seoMetaTagsData.keywords
  })

  const ogMetaTags = removeUndefinedValuesFromObject({
    url: ogMetaTagsData.url,
    title: ogMetaTagsData.title,
    description: ogMetaTagsData.description,
    image: getNestedPropertyFromObject(ogMetaTagsData, "image.url", undefined)
  })

  const twitterMetaTags = removeUndefinedValuesFromObject({
    card: _convertPrismicTwitterCard(twitterMetaTagsData.card_type),
    site: twitterMetaTagsData.site,
    creator: twitterMetaTagsData.creator,
    title: twitterMetaTagsData.title,
    description: twitterMetaTagsData.description,
    image:
      getNestedPropertyFromObject(twitterMetaTagsData, "image.url", undefined) ||
      getNestedPropertyFromObject(twitterMetaTagsData, "large_image.url", undefined)
  })
  return {
    seoMetaTags,
    ogMetaTags,
    twitterMetaTags
  }
}
