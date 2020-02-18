export type ShowNotificationMessage = {
  action: "showNotification"
  payload: Notification
}

export type Message = ShowNotificationMessage

export type MessageResponse = "success" | "failure"

export type CauseArea = "extreme_poverty" | "animals"

export type Currency = "USD" | "PLN" | "EUR" | "GBP" | "NOK"
