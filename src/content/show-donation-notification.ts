import * as browser from "webextension-polyfill"
import { extractDomain } from "../helpers/extract-domain.js"
import { notification } from "./templates/notification.ts"
import { StorageData } from "../types/types.js"
import { isAlreadyActivated } from "../helpers/is-already-activated.ts"
import { getTracker } from "../helpers/get-tracker.ts"

const domain = extractDomain(location.href)

const saveAsClosed = () => {
  browser.storage.local
    .get({ closedWebsites: [] })
    .then((items: { closedWebsites: string[] }) => {
      if (!items.closedWebsites.includes(domain)) {
        const updatedClosedWebsites = items.closedWebsites
        updatedClosedWebsites.push(domain)
        browser.storage.local.set({ closedWebsites: updatedClosedWebsites })
      }
    })
}

const isCheckoutPage = (location: string) => {
  const checkoutPages = {
    "booking.com": "book.html",
    "etsy.com": "/cart/",
    "aliexpress.com": "/confirm_order.htm",
    "barnesandnoble.com": "/checkout/"
  }
  return (
    domain in checkoutPages &&
    location.includes(checkoutPages[domain as keyof typeof checkoutPages])
  )
}

export const showDonationNotification = () => {
  const getStorageData = browser.storage.local.get({
    activatedAffiliates: [],
    closedWebsites: [],
    disabledWebsites: [],
    partners: []
  }) as Promise<StorageData>

  const getSettings = browser.storage.sync.get({ showNotifications: true })

  let notificationElement = null as HTMLElement | null

  Promise.all([getStorageData, getTracker, getSettings]).then(
    ([items, tracker, settings]) => {
      const showNotification = () =>
        isAlreadyActivated(items.activatedAffiliates, domain)
          ? notification({
              text:
                "You are now collecting money for charities with this website.",
              autoclose: true,
              onAutoclose: saveAsClosed,
              onClose: saveAsClosed
            })
          : notification({
              text:
                "Start raising money for charities with this website by clicking here: ",
              primaryButtonLabel: "Activate donation",
              primaryButtonDestination: `${BASE_URL}/redirect?url=${
                location.href
              }&lang=${browser.i18n.getUILanguage()}&tracker=${tracker}`,
              onClose: saveAsClosed
            })

      if (settings.showNotifications && items.partners.includes(domain)) {
        if (
          !items.closedWebsites.includes(domain) &&
          !items.disabledWebsites.includes(domain)
        ) {
          notificationElement = showNotification()
        }

        if (
          items.closedWebsites.includes(domain) &&
          isCheckoutPage(location.href)
        ) {
          notificationElement = showNotification()
        }
      }
    }
  )

  // TODO: show notification with confirmation of activated donation in other tabs (second if condition)
  // The problem is that it also displays it in the main tab before reloading, so it looks weird.
  browser.storage.onChanged.addListener(changes => {
    if (
      changes.closedWebsites &&
      changes.closedWebsites.newValue.includes(domain) &&
      notificationElement
    ) {
      notificationElement.classList.remove("altruisto-notification--in")
    } else if (
      changes.activatedAffiliates &&
      changes.activatedAffiliates.newValue.find(
        (activated: { domain: string; timestamp: number }) =>
          activated.domain === domain
      ) &&
      notificationElement
    ) {
      notificationElement!.classList.remove("altruisto-notification--in")
    }
  })
}
