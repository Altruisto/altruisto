export type StorageData = {
  activatedAffiliates: Array<ActivatedAffiliate>
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

export type PublicNotifications = {
  lastUpdatedAt: string
  notificationsToShow: Array<Notification>
}

export type ShowNotificationMessage = {
  action: "showNotification"
  payload: Notification
}

export type Message = ShowNotificationMessage

export type MessageResponse = "success" | "failure"
