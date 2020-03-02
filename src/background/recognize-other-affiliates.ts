import { browser } from "webextension-polyfill-ts"
import { extractDomain } from "../helpers/extract-domain"
import { storage } from "../helpers/storage"
import { addIfNotIncluded } from "../helpers/add-if-not-included"

const isAltruistoLink = (url: string) => {
  const altruistoStamps = ["id=XK9XruzkyUo", "8106588"] // @TODO: move to .env or webpack
  return new RegExp(altruistoStamps.join("|")).test(url)
}

const isOtherAffiliateLink = (domain: string) => {
  const trackedDomains = [
    "anrdoezrs.net",
    "commission-junction.com",
    "dpbolvw.net",
    "apmebf.com",
    "jdoqocy.com",
    "kqzyfj.com",
    "qksrv.net",
    "tkqlhce.com",
    "ww.qksz.net",
    "emjcd.com",
    "afcyhf.com",
    "awltovhc.com",
    "ftjcfx.com",
    "lduhtrp.net",
    "tqlkg.com",
    "awxibrm.com",
    "cualbr.com",
    "rnsfpw.net",
    "vofzpwh.com",
    "yceml.net",
    "linksynergy.com"
  ]

  return trackedDomains.includes(domain)
}

const disablePartner = (domain: string) =>
  storage.set("local", current => ({
    disabledWebsites: addIfNotIncluded(current.disabledWebsites, domain)
  }))

// if user is redirected through other affiliate's link, we disable ability
// to activate donation (affiliate networks' requirement)
export function recognizeOtherAffiliates() {
  let tabsIdsToDisablePartners = new Set<number>()

  browser.webRequest.onBeforeRedirect.addListener(
    function(details) {
      const fromDomain = extractDomain(details.url)
      const toDomain = extractDomain(details.redirectUrl)

      if (isOtherAffiliateLink(fromDomain) || isOtherAffiliateLink(toDomain)) {
        if (!isAltruistoLink(details.url) || !isAltruistoLink(details.redirectUrl)) {
          tabsIdsToDisablePartners.add(details.tabId)
        }
      }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
  )

  browser.webRequest.onCompleted.addListener(
    details => {
      const currentTabId = details.tabId
      const currentDomain = extractDomain(details.url)

      if (tabsIdsToDisablePartners.has(currentTabId)) {
        disablePartner(currentDomain).then(() => tabsIdsToDisablePartners.delete(currentTabId))
      }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
  )
}
