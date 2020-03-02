import { browser } from "webextension-polyfill-ts"
import { extractDomain } from "../helpers/extract-domain"
import { addOrUpdate } from "../helpers/add-or-update"
import { storage } from "../helpers/storage"

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

        storage.set("local", current => ({
          activatedAffiliates: addOrUpdate(
            current.activatedAffiliates,
            activatedAffiliate,
            "domain"
          )
        }))
      }
    },
    {
      urls: [`${BASE_URL}/redirect*`],
      types: ["main_frame"]
    }
  )
}
