import { browser } from "webextension-polyfill-ts"
import { extractDomain } from "../helpers/extract-domain"
import { addOrUpdate } from "../helpers/add-or-update"
import { ActivatedAffiliate } from "../types/types"

const updateActivatedAffiliates = (activatedAffiliate: ActivatedAffiliate) => {
  browser.storage.local.get("activatedAffiliates").then(value => {
    const result = value as { activatedAffiliates: ActivatedAffiliate[] }
    let updatedStorageData: ActivatedAffiliate[] = []

    if (result.activatedAffiliates === null) {
      updatedStorageData = [activatedAffiliate]
    } else {
      updatedStorageData = addOrUpdate<ActivatedAffiliate>(
        result.activatedAffiliates,
        activatedAffiliate,
        "timestamp"
      )
    }

    browser.storage.local.set({
      activatedAffiliates: updatedStorageData
    })
  })
}

// We recognize when partner is activated by monitoring
// requests to api.altruisto.com/redirect?url=partnersDomain.com
export const monitorActivatedPartners = () => {
  browser.webRequest.onBeforeRequest.addListener(
    request => {
      const redirectUrlParameter = request.url.split("?url=")[1]
      const redirectDomain = extractDomain(redirectUrlParameter)

      if (redirectDomain) {
        const activatedAffiliate = {
          domain: redirectDomain,
          timestamp: request.timeStamp
        }

        updateActivatedAffiliates(activatedAffiliate)
      }
    },
    {
      urls: [`${BASE_URL}/redirect*`],
      types: ["main_frame"]
    }
  )
}
