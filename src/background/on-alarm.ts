import { browser } from "webextension-polyfill-ts"
import { getPartnersList } from "../helpers/get-partners-list"
import axios from "../helpers/api"
import { formatDate } from "../helpers/format-date"
import { PublicNotifications, User, PrivateNotification } from "../types/types.js"
import { sendMessageToActiveTab } from "../helpers/send-message-to-active-tab"
import { isValidJSON } from "../helpers/is-valid-json"

type GetNotificationsResponse = Array<{
  id: string
  content: string
  mode: string
  created_at: string
  updated_at: string
}>

const ignoreRejections = (promises: Promise<any>[]) => promises.map(p => p.catch(() => undefined))

export const onAlarm = () => {
  browser.alarms.onAlarm.addListener(details => {
    switch (details.name) {
      case "clearClosedWebsites":
        browser.storage.local.remove(["closedWebsites"])
        break

      case "clearDisabledWebsites":
        browser.storage.local.remove(["disabledWebsites"])
        break

      case "getPartnersList":
        getPartnersList()
        break

      case "getPublicNotificationsAndShowFirst":
        const today = formatDate(new Date())

        browser.storage.sync
          .get({
            publicNotifications: {
              since: today,
              notificationsToShow: []
            }
          })
          .then(value => {
            const result = value as { publicNotifications: PublicNotifications }
            let updatedNotificationsQueue = [...result.publicNotifications.notificationsQueue]

            const showFirstNotification = sendMessageToActiveTab({
              action: "showNotification",
              payload: JSON.parse(updatedNotificationsQueue[0])
            }).then(response => {
              if (response === "success") {
                updatedNotificationsQueue.shift()
              } else {
                console.warn("UNABLE TO DISPLAY PUBLIC NOTIFICATION")
              }
            })

            const getPublicNotifications = axios
              .get<GetNotificationsResponse>("/notifications", {
                params: {
                  since_date: result.publicNotifications.lastUpdated
                }
              })
              .then(response => {
                response.data.forEach(notification => {
                  if (
                    !updatedNotificationsQueue.includes(notification.content) &&
                    isValidJSON(notification.content)
                  ) {
                    updatedNotificationsQueue.push(notification.content)
                  }
                })
              })

            Promise.all(ignoreRejections([showFirstNotification, getPublicNotifications])).then(
              () => {
                browser.storage.sync.set({
                  publicNotifications: {
                    since: today,
                    notificationsQueue: updatedNotificationsQueue
                  }
                })
              }
            )
          })
        break

      case "getPrivateNotificationsAndShowFirst":
        browser.storage.sync
          .get({
            user: null,
            privateNotifications: []
          })
          .then(value => {
            const result = value as {
              user: User | null
              privateNotifications: PrivateNotification[]
            }
            if (result.user) {
              let updatedPrivateNotifications = [...result.privateNotifications]
              const notificationToShow = updatedPrivateNotifications[0]

              const showFirstNotification = sendMessageToActiveTab({
                action: "showNotification",
                payload: JSON.parse(notificationToShow.content)
              }).then(response => {
                if (response === "success") {
                  return axios
                    .patch(
                      `/user/notifications/${notificationToShow.id}`,
                      {
                        status: "seen"
                      },
                      {
                        headers: {
                          "X-AUTH-TOKEN": result.user!.apiKey
                        }
                      }
                    )
                    .then(() => {
                      updatedPrivateNotifications.shift()
                    })
                    .catch(e => console.warn("UNABLE TO MARK NOTIFICATION AS SEEN", e))
                } else {
                  console.warn("UNABLE TO DISPLAY PRIVATE NOTIFICATION")
                }
              })

              const getPrivateNotifications = axios
                .get<GetNotificationsResponse>("user/notifications?status=unseen", {
                  headers: {
                    "X-AUTH-TOKEN": result.user.apiKey
                  }
                })
                .then(response => {
                  response.data.forEach(notification => {
                    if (
                      updatedPrivateNotifications.every(v => v.id !== notification.id) &&
                      isValidJSON(notification.content)
                    ) {
                      updatedPrivateNotifications.push({
                        id: notification.id,
                        content: notification.content
                      })
                    }
                  })
                })

              Promise.all(ignoreRejections([showFirstNotification, getPrivateNotifications])).then(
                () => {
                  browser.storage.sync.set({
                    privateNotifications: updatedPrivateNotifications
                  })
                }
              )
            }
          })
        break
    }
  })
}
