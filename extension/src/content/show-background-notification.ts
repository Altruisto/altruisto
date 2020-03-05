import { browser } from "webextension-polyfill-ts"
import { notification } from "./templates/notification"
import { Message, MessageResponse } from "../types/types"

type MessageListener = (
  request: Message,
  sender: any,
  sendResponse: (status: MessageResponse) => void
) => void
type MessageListenerAdder = (listener: MessageListener) => void

export const showBackgroundNotification = () => {
  const addListener = browser.runtime.onMessage.addListener as MessageListenerAdder

  addListener((request, _, sendResponse) => {
    if (request.action === "showNotification") {
      try {
        notification(request.payload)
        sendResponse("success")
      } catch (e) {
        sendResponse("failure")
      }
    }
  })
}
