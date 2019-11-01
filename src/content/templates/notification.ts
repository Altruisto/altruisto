import template from "./notification.hbs"
import styles from "./notification.scss"
import fonts from "../../assets/css/fonts.css"
import { fromHtml } from "../../helpers/from-html.ts"
import { ASSETS_PATHS } from "../../helpers/assets-paths.js"

type NotificationOptions = {
  text: string
  primaryButtonLabel?: string
  primaryButtonDestination?: string
  secondaryButtonLabel?: string
  secondaryButtoDestination?: string
  onClose?: () => void
}

export const notification = (options: NotificationOptions) => {
  let styleElement = document.createElement("style")
  styleElement.innerHTML = `${styles.toString()}${fonts.toString()}`

  const notificationElement = fromHtml(template({ ...options, ASSETS_PATHS }))
  const closeButton = notificationElement.querySelector(
    ".altruisto-notification__close"
  )
  closeButton.addEventListener("click", () => {
    notificationElement.classList.remove("altruisto-notification--in")
    options.onClose && options.onClose()
  })

  document.documentElement.prepend(styleElement)
  document.documentElement.prepend(notificationElement)
  setTimeout(
    () => notificationElement.classList.add("altruisto-notification--in"),
    0
  )
}
