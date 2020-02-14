import { browser } from "webextension-polyfill-ts"

export const getTracker = browser.storage.sync
  .get({
    user: null,
    userSettings: { causeArea: "extreme_poverty" },
    ref: "",
    referredBy: ""
  })
  .then(items => {
    let ref = items.ref
    if (!items.user) {
      ref = "" // when user is not logged in we do not track
    }
    return `${ref}-${items.userSettings.causeArea}-${items.referredBy}`
  })
