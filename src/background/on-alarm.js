import * as browser from "webextension-polyfill"
import { getPartnersList } from "../helpers/get-partners-list.js"

export function onAlarm() {
  browser.alarms.onAlarm.addListener(function(details) {
    switch (details.name) {
      case "clearClosedWebsites":
        browser.storage.local.remove(["closedWebsites"])
        break

      case "clearDisabledWebsites":
        browser.storage.local.remove(["disabledWebsites"])
        break

      case "getPartnersList":
        getPartnersList()
        break
    }
  })
}
