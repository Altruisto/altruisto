import useragent from "express-useragent"
export const getCtaDestination = (ua: useragent.Details) => {
  switch (true) {
    case ua.isMobile:
      return "/signup"
    case ua.browser === "Firefox":
      return "https://addons.mozilla.org/firefox/addon/altruisto-com/"
    case ua.browser === "Chrome":
    case ua.browser === "Opera":
      return "https://chrome.google.com/webstore/detail/altruistocom/djennkbadhfcmhlbejdidgmdgnacbcmi"
    default:
      return "/signup"
  }
}

export const getCtaText = (ua: useragent.Details) => {
  switch (true) {
    case ua.isMobile:
      return "Sign up for free"
    case ua.browser === "Firefox":
    case ua.browser === "Opera":
    case ua.browser === "Chrome":
    case ua.browser === "Edge":
      return "Install now for free"
    default:
      return "Sign up for free"
  }
}
