import * as browser from "webextension-polyfill"
// import displayTopbar from "./content/topbar.js"

import { notification } from "./content/templates/notification.ts"

notification({
  text:
    "Start raising money for charities with this website by clicking here: ",
  primaryButtonLabel: "Activate donation"
})

browser.storage.sync
  .get({
    addTopBar: true
  })
  .then(items => items && displayTopbar())
