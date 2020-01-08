import * as browser from "webextension-polyfill"

/**
 * Get the list of partner stores' domain and save it locally
 */
// TODO: change pure xhr to axios
export function getPartnersList() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", `${BASE_URL}/partners`)
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.responseText) {
        var partners = JSON.parse(xhr.responseText)
        browser.storage.local.remove(["partners"])
        browser.storage.local.set({
          partners: partners.map(partner => partner.domain)
        })
      }
    }
  }
  xhr.send()
}
