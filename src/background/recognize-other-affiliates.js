import * as browser from "webextension-polyfill"
import { extractDomain } from "../helpers/extract-domain.js"

/**
 * Check if given URL is altruisto's affiliate link by comparing it against our stamps
 *
 * @returns {boolean}
 */
function isAltruistoLink(url) {
  var altruistoStamps = ["id=XK9XruzkyUo", "8106588"]
  return new RegExp(altruistoStamps.join("|")).test(url)
}

/**
 * Check if given URL is affiliate redirect link by compating it against list of domains of affiliate networks
 *
 * @returns {boolean}
 */
function isAffiliateRedirectLink(domain) {
  var trackedDomains = [
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

  return trackedDomains.indexOf(domain) === -1
}

/**
 * Add given domain to the list of websites that are monetized by other affiliates, so the top bar is not being shown on them.
 *
 * @param {string} domain Domain of the website that is already monetized by other affiliate.
 */
function disableAffiliate(domain) {
  var updatedDisabledWebsites = []
  browser.storage.local.get({ disabledWebsites: [] }, function(items) {
    updatedDisabledWebsites = items.disabledWebsites
    if (items.disabledWebsites.indexOf(domain) == -1) {
      updatedDisabledWebsites.push(domain)
      browser.storage.local.set({ disabledWebsites: updatedDisabledWebsites })
    }
  })
}

/**
 * If user vists website through some other affiliates' link, prevent showing topbar by adding it to disabledWebsites list                                                                                                                                                                           link, we add the website to the locally stored list, so content.js does not show the top bar at this website.
 */
export function recognizeOtherAffiliates() {
  var affiliateRedirectDetected = false
  var altruistoRedirectDetected = false
  var redirectTabId

  browser.webRequest.onBeforeRedirect.addListener(
    function(details) {
      var urlDomain = extractDomain(details.url)
      var redirectDomain = extractDomain(details.redirectUrl)
      var currentTab = details.tabId

      if (
        isAffiliateRedirectLink(urlDomain) ||
        isAffiliateRedirectLink(redirectDomain)
      ) {
        affiliateRedirectDetected = true
        if (
          isAltruistoLink(details.url) ||
          isAltruistoLink(details.redirectUrl)
        ) {
          altruistoRedirectDetected = true
        } else {
          redirectTabId = currentTab
        }
      }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
  )

  browser.webRequest.onCompleted.addListener(
    function(details) {
      var currentTab = details.tabId

      if (affiliateRedirectDetected && !altruistoRedirectDetected) {
        if (redirectTabId == currentTab) {
          disableAffiliate(extractDomain(details.url))

          //reset triggers
          affiliateRedirectDetected = false
          altruistoRedirectDetected = false
          redirectTabId = 0
        }
      } else if (affiliateRedirectDetected && altruistoRedirectDetected) {
        //reset triggers
        affiliateRedirectDetected = false
        altruistoRedirectDetected = false
      }
    },
    { urls: ["<all_urls>"], types: ["main_frame"] }
  )
}
