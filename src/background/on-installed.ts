import { browser } from "webextension-polyfill-ts"
import { getPartnersList } from "../helpers/get-partners-list"
import axios from "../helpers/api"
import { storage } from "../helpers/storage"

const setUpAlarms = () => {
  browser.alarms.create("clearClosedWebsites", {
    periodInMinutes: 60
  })
  browser.alarms.create("clearDisabledWebsites", {
    periodInMinutes: 1440
  })
  browser.alarms.create("getPartnersList", {
    periodInMinutes: 1440
  })
  browser.alarms.create("getPublicNotificationsAndShowFirst", {
    periodInMinutes: 60
  })
  browser.alarms.create("getPrivateNotificationsAndShowFirst", {
    periodInMinutes: 60
  })
}

const openWelcomePage = () =>
  browser.tabs.create({
    url: "https://altruisto.com/welcome/"
  })

const logInstallationAndSetUpStorage = () => {
  const getRefCookie = browser.cookies.get({
    url: "https://altruisto.com",
    name: "r"
  })

  getRefCookie.then(refCookie => {
    let installationId = ""
    let ref = ""
    const referredBy = refCookie ? refCookie.value : ""

    axios
      .post("/installations", {
        referredBy
      })
      .then(response => {
        installationId = response.data.installation_id
        ref = response.data.ref
      })
      .catch(() => {})
      .finally(() => {
        storage.set("local", { installationId })
        storage.set("sync", { ref, referredBy })
      })
  })
}

export const onInstalled = () => {
  browser.runtime.onInstalled.addListener(details => {
    if (details.reason == "install") {
      openWelcomePage()
      setUpAlarms()
      getPartnersList()
      logInstallationAndSetUpStorage()
    }
  })
}
