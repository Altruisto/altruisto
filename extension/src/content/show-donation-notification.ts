import { browser } from "webextension-polyfill-ts"
import { extractDomain } from "../helpers/extract-domain"
import { notification } from "./templates/notification"
import { isAlreadyActivated } from "../helpers/is-already-activated"
import { getTracker } from "../helpers/get-tracker"
import { storage } from "../helpers/storage"
import { addIfNotIncluded } from "../helpers/add-if-not-included"

const currentDomain = extractDomain(location.href)

const saveAsClosed = () =>
  storage.set("local", current => ({
    closedWebsites: addIfNotIncluded(current.closedWebsites, currentDomain)
  }))

const isCheckoutPage = (location: string) => {
  const checkoutPages = {
    "booking.com": "book.html",
    "etsy.com": "/cart/",
    "aliexpress.com": "/confirm_order.htm",
    "barnesandnoble.com": "/checkout/"
  }
  return (
    currentDomain in checkoutPages &&
    location.includes(checkoutPages[currentDomain as keyof typeof checkoutPages])
  )
}

export const showDonationNotification = () => {
  const getWebsitesData = storage.get("local", [
    "activatedAffiliates",
    "closedWebsites",
    "disabledWebsites",
    "partners"
  ])

  const getSettings = storage.get("sync", "showNotifications")

  let notificationElement: HTMLElement | null = null

  Promise.all([getWebsitesData, getTracker, getSettings]).then(([items, tracker, settings]) => {
    const showNotification = () =>
      isAlreadyActivated(items.activatedAffiliates, currentDomain)
        ? notification({
            text: browser.i18n.getMessage('notificationActivated'),
            autoclose: true,
            onAutoclose: saveAsClosed,
            onClose: saveAsClosed
          })
        : notification({
            text: browser.i18n.getMessage('notificationActivate'),
            primaryButtonLabel: browser.i18n.getMessage('notificationButtonLabel'),
            primaryButtonDestination: `${BASE_URL}/redirect?url=${
              location.href
            }&lang=${browser.i18n.getUILanguage()}&tracker=${tracker}`,
            onClose: saveAsClosed
          })

    if (settings.showNotifications && items.partners.includes(currentDomain)) {
      if (
        !items.closedWebsites.includes(currentDomain) &&
        !items.disabledWebsites.includes(currentDomain)
      ) {
        notificationElement = showNotification()
      }

      if (items.closedWebsites.includes(currentDomain) && isCheckoutPage(location.href)) {
        notificationElement = showNotification()
      }
    }
  })

  const hideWhenClosedOrDisabledInOtherTab = (changes: any) => {
    if (
      changes.closedWebsites &&
      changes.closedWebsites.newValue.includes(currentDomain) &&
      notificationElement
    ) {
      notificationElement.classList.remove("altruisto-notification--in")
    } else if (
      changes.activatedAffiliates &&
      changes.activatedAffiliates.newValue.find(
        (activated: { domain: string; timestamp: number }) => activated.domain === currentDomain
      ) &&
      notificationElement
    ) {
      notificationElement!.classList.remove("altruisto-notification--in")
    }
  }

  // TODO: show notification with confirmation of activated donation in other tabs (second if condition)
  // The problem is that it also displays it in the main tab before reloading, so it looks weird.
  browser.storage.onChanged.addListener(hideWhenClosedOrDisabledInOtherTab)
}
