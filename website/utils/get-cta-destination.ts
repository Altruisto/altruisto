import useragent from "express-useragent"
export const getCtaDestination = (ua: useragent.Details) => {
  switch (true) {
    case ua.isMobile && ua.browser === "Firefox":
      return "https://addons.mozilla.org/firefox/addon/altruisto-com/"
    case ua.isMobile:
      return "/waiting"
    case ua.browser === "Firefox":
      return "https://addons.mozilla.org/firefox/addon/altruisto-com/"
    case ua.browser === "Chrome":
    case ua.browser === "Opera":
      return "https://chrome.google.com/webstore/detail/djennkbadhfcmhlbejdidgmdgnacbcmi"
    default:
      return "/waiting"
  }
}
