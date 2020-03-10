import { browser } from "webextension-polyfill-ts"

export const ASSETS_PATHS = {
  icons: {
    close: browser.extension.getURL("assets/img/close.png"),
    close2x: browser.extension.getURL("assets/img/close@2x.png"),
    close3x: browser.extension.getURL("assets/img/close@3x.png"),
    settings: browser.extension.getURL("assets/img/settings.png"),
    icon: browser.extension.getURL("assets/img/icon.png"),
    icon16: browser.extension.getURL("assets/img/icon16.png"),
    icon48: browser.extension.getURL("assets/img/icon48.png"),
    logo: browser.extension.getURL("assets/img/logo.svg")
  },
  pages: {
    options: browser.extension.getURL("options/index.html")
  }
}

export type AssetsPaths = typeof ASSETS_PATHS
