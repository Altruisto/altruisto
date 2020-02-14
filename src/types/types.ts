export type StorageData = {
  activatedAffiliates: ActivatedAffiliate[]
  closedWebsites: string[]
  disabledWebsites: string[]
  partners: string[]
}

export type ActivatedAffiliate = { domain: string; timestamp: number }

export type Notification = {
  text: string
  primaryButtonLabel?: string
  primaryButtonDestination?: string
  secondaryButtonLabel?: string
  secondaryButtoDestination?: string
}

type StringifiedNotification = string
export type PublicNotifications = {
  lastUpdated: string
  notificationsQueue: StringifiedNotification[]
}

export type PrivateNotification = {
  id: string
  content: StringifiedNotification
}

export type ShowNotificationMessage = {
  action: "showNotification"
  payload: Notification
}

export type Message = ShowNotificationMessage

export type MessageResponse = "success" | "failure"

export type User = {
  email: string
  apiKey: string
}
