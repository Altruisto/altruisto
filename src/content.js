import * as browser from "webextension-polyfill"
import displayTopbar from "./content/topbar.js"

/* Load settings and act accordingly */

browser.storage.sync.get(
  {
    addTopBar: true
  },
  function(items) {
    /*if(items.addSuggestionBox){
        suggestionBox();
    }*/

    if (items.addTopBar) {
      displayTopbar()
    }
  }
)
