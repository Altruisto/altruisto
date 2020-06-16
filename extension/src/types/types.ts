export type Notification = {
  text: string
  primaryButtonLabel?: string
  primaryButtonDestination?: string
  secondaryButtonLabel?: string
  secondaryButtoDestination?: string
}

export type ShowNotificationMessage = {
  action: "showNotification"
  payload: Notification
}

export type Message = ShowNotificationMessage

export type MessageResponse = "success" | "failure"
