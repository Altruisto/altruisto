import * as browser from "webextension-polyfill"
import { getPartnersList } from "../helpers/get-partners-list.js"
import axios from "../helpers/api"

export function onInstalled() {
  browser.runtime.onInstalled.addListener(async function(details) {
    //add alarms - these are used sort of like cron jobs here
    browser.alarms.create("clearClosedWebsites", { periodInMinutes: 60 }) //every 60 min redisplay topbar on the websites that users closed it
    browser.alarms.create("clearDisabledWebsites", { periodInMinutes: 1440 }) //every 24h redisplay topbar on websites that user visited through other affiliate's link
    browser.alarms.create("getPartnersList", { periodInMinutes: 1440 }) // every 24h update partners list from api

    //get list of partner shops from api
    getPartnersList()

    //open welcome page for new installs
    if (details.reason == "install") {
      const refCookie = await browser.cookies.get({
        url: "https://altruisto.com",
        name: "r"
      })
      const { installationId, ref } = await axios
        .post("/installations", {
          referredBy: refCookie ? refCookie.value : ""
        })
        .then(response => ({
          installationId: response.data.installation_id,
          ref: response.data.ref
        }))

      browser.storage.local.set({
        refferedBy: refCookie ? refCookie.value : "",
        installationId
      })

      browser.storage.sync.set({
        ref
      })

      browser.tabs.create({ url: "https://altruisto.com/welcome/" })
    }
  })
}
