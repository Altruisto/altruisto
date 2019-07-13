import * as browser from "webextension-polyfill"
import displayTopbar from "./content/topbar.js"

/* Load settings and act accordingly */

browser.storage.sync
  .get({
    addTopBar: true
  })
  .then(items => items && displayTopbar())
