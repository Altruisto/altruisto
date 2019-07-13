import * as browser from "webextension-polyfill"

export const ASSETS_PATHS = {
  icons: {
    cancel: browser.extension.getURL("assets/img/cancel.png"),
    settings: browser.extension.getURL("assets/img/settings.png"),
    icon: browser.extension.getURL("assets/img/icon.png"),
    icon16: browser.extension.getURL("assets/img/icon16.png")
  },
  pages: {
    options: browser.extension.getURL("pages/options.html")
  }
}
