import * as browser from "webextension-polyfill"
import {
  extractDomain
} from "../helpers/extract-domain"
import {
  ASSETS_PATHS
} from "../helpers/assets-paths"

const SEARCH_RESULT_QUERY = ".g"
const RESULT_URL_QUERY = "a:first-of-type"
const RESULT_HEADER_QUERY = ".r"

const highlightSearchResult = (result, domain) => {
  const header = result.querySelector(RESULT_HEADER_QUERY)
  const highlight = document.createElement("div")
  // TODO: fix scaling image with css
  highlight.innerHTML = `
    <a href="https://altruisto.com/partners/${domain}" target="_blank" rel="noreferrer noopener">
      <img src="${ASSETS_PATHS.icons.icon48}" alt="Altruisto logo" title="Altruisto logo" style="margin-left: -34px; max-width: 32px"/>
      <span style="background-image: linear-gradient(136deg, #e70f74, #ff2525);
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      font-weight: bold;"><strong>Click here</strong> to giveaway portion of your purchases to charities (for free!)</span>
    </a>
  `
  header.prepend(highlight)
}

browser.storage.sync.get({
  highlightSearchResults: true
}).then(settings => {
  if (settings.highlightSearchResults) {
    browser.storage.local.get("partners").then(storage => {
      const results = document.querySelectorAll(SEARCH_RESULT_QUERY)
      results.forEach(result => {
        const url = result.querySelector(RESULT_URL_QUERY).href
        const domain = extractDomain(url)
        if (storage.partners.indexOf(domain) !== -1) {
          highlightSearchResult(result, domain)
        }
      })
    })
  }
})

// get search result domains
// forEach - is in partners list?
// if so add button/link to altruisto.com/gateways/__DOMAIN__
// "click here to give 2-6% of your purchases to charities"