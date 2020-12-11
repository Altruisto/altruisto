import { PrismicDocument } from "."
import getNestedPropertyFromObject from "lodash.get"

export enum BlogPages {
  MainPage = "main page",
  Categories = "categories"
}

export type PostsList = {}

type PrismicDocumentData = {
  [k: string]: any
}

export const getDataFromPostsList = (
  prismicDocument: PrismicDocument<PrismicDocumentData>
): PostsList => ({
  title: getNestedPropertyFromObject(prismicDocument, 'data["blog-title"][0].text', ""),
  supportText: getNestedPropertyFromObject(prismicDocument, 'data["blog-support-text"][0].text', "")
})
