import { browser } from "webextension-polyfill-ts"
import { extractDomain } from "../helpers/extract-domain"
import { storage } from "../helpers/storage"
import { addIfNotIncluded } from "../helpers/add-if-not-included"

const isAltruistoLink = (url: string) => {
  const altruistoStamps = ["id=XK9XruzkyUo", "8106588"]
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
        if (!isAltruistoLink(details.url) && !isAltruistoLink(details.redirectUrl)) {
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

const EBAY_ALTRUISTO_CAMPID = '5338164459'
const EBAY_ALTRUISTO_PUB = '5575312620'

export function recognizeEbayAffiliates() {
  let tabsIdsToDisablePartners = new Set<number>()

  browser.webRequest.onBeforeRequest.addListener(details => {
    const isGetRequest = details.method === "GET"
    const isRedirectionToEbay = extractDomain(details.url).includes('ebay.')
    const hasCampId = details.url.includes('campid')
    const hasPubOrPubID = details.url.includes('pub') || details.url.includes('pubid')
    const initiatorDomain = extractDomain((details as any).initiator || '')

    if(!isGetRequest) {
      return
    }
    if (!isRedirectionToEbay) {
      return
    }
    if(hasCampId && details.url.includes(`campid=${EBAY_ALTRUISTO_CAMPID}`)){
      return
    }
    if(hasPubOrPubID && details.url.includes(`=${EBAY_ALTRUISTO_PUB}`)) {
      return
    }
    if(initiatorDomain.includes('google.') || initiatorDomain.includes('bing.')) {
      return
    }
    if(!details.url.includes('mkevt') || !details.url.includes('mkcid') || !details.url.includes('campid')) {
      return
    }
    tabsIdsToDisablePartners.add(details.tabId)
  },  { urls: ["<all_urls>"], types: ["main_frame"] })

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
