import { extractDomain } from "../helpers/extract-domain"
import { ASSETS_PATHS } from "../helpers/assets-paths"
import { getTracker } from "../helpers/get-tracker"
import { storage } from "../helpers/storage"

const SEARCH_RESULT_QUERY = ".g"
const RESULT_URL_QUERY = "a:first-of-type"

const highlightSearchResult = (result: Element, url: string, tracker: string) => {
  const highlight = document.createElement("div")
  // TODO: fix scaling image with css
  highlight.innerHTML = `
    <a href="${BASE_URL}/redirect/?url=${url}&tracker=${tracker}" target="_blank" rel="noreferrer noopener" style="color: #e70f74">
      <img src="${ASSETS_PATHS.icons.icon48}" alt="Altruisto logo" title="Altruisto logo" style="margin-left: -34px; max-width: 32px"/>
      <span style="background-image: linear-gradient(136deg, #e70f74, #ff2525);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      font-weight: bold;"><strong>Click here</strong> to giveaway portion of your purchases to charities (for free!)</span>
    </a>
  `
  result.prepend(highlight)
}

storage.get("sync", "highlightSearchResults").then(({ highlightSearchResults }) => {
  if (highlightSearchResults) {
    storage.get("local", "partners").then(({ partners }) => {
      const results = document.querySelectorAll(SEARCH_RESULT_QUERY)
      results.forEach(result => {
        const url = result.querySelector<HTMLAnchorElement>(RESULT_URL_QUERY)!.href
        const domain = extractDomain(url)
        if (partners.includes(domain)) {
          getTracker.then(tracker => highlightSearchResult(result, url, tracker))
        }
      })
    })
  }
})
