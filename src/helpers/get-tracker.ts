import { storage } from "./storage"

export const getTracker = storage
  .get("sync", ["user", "userSettings", "ref", "referredBy"])
  .then(result => {
    let ref = result.ref
    if (!result.user) {
      ref = "" // when user is not logged in we do not track
    }
    return `${ref}-${result.userSettings.causeArea}-${result.referredBy}`
  })
