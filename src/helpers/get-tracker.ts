import * as browser from "webextension-polyfill"

export const getTracker = browser.storage.sync
  .get({
    user: null,
    userSettings: { causeArea: "extreme_poverty", currency: "USD" },
    ref: "",
    refferedBy: ""
  })
  .then(items => {
    let ref = items.ref
    if (!items.user) {
      ref = "" // when user is not logged in we do not track
    }
    return `${ref}-${items.userSettings.causeArea}-${items.refferedBy}`
  }) as Promise<string>
