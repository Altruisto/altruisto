import * as browser from "webextension-polyfill"
import { notification } from "./templates/notification.ts"
import { Message, MessageResponse } from "../types/types"

export const showBackgroundNotification = () => {
  browser.runtime.onMessage.addListener(
    (
      request: Message,
      _: any,
      sendResponse: (status: MessageResponse) => void
    ) => {
      if (request.action === "showNotification") {
        try {
          notification(request.payload)
          sendResponse("success")
        } catch (e) {
          sendResponse("failure")
        }
      }
    }
  )
}
