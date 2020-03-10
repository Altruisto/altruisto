import { browser } from "webextension-polyfill-ts"
import { Message, MessageResponse } from "../types/types"

// send to content.ts
export const sendMessageToActiveTab = (
  message: Message
): Promise<MessageResponse> =>
  browser.tabs
    .query({
      active: true,
      lastFocusedWindow: true
    })
    .then(tabs => {
      if (tabs.length !== 0 && tabs[0].id) {
        return browser.tabs.sendMessage(tabs[0].id, message)
      } else {
        return new Promise(resolve => resolve("failure"))
      }
    })
