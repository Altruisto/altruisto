import { browser } from "webextension-polyfill-ts"
import { getPartnersList } from "../helpers/get-partners-list"
import axios from "../helpers/api"
import { formatDate } from "../helpers/format-date"
import { sendMessageToActiveTab } from "../helpers/send-message-to-active-tab"
import { isValidJSON } from "../helpers/is-valid-json"
import { storage } from "../helpers/storage"

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

        storage.set("sync", current => {
          let updatedNotificationsQueue = [...current.publicNotifications.notificationsQueue]

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
                since_date: current.publicNotifications.lastUpdated
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

          return Promise.all(
            ignoreRejections([showFirstNotification, getPublicNotifications])
          ).then(() => ({
            publicNotifications: {
              lastUpdated: today,
              notificationsQueue: updatedNotificationsQueue
            }
          }))
        })
        break

      case "getPrivateNotificationsAndShowFirst":
        storage.set("sync", current => {
          if (!current.user) {
            return Promise.resolve(current)
          } else {
            let updatedPrivateNotifications = [...current.privateNotifications]
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
                        "X-AUTH-TOKEN": current.user!.apiKey
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
                  "X-AUTH-TOKEN": current.user.apiKey
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

            return Promise.all(
              ignoreRejections([showFirstNotification, getPrivateNotifications])
            ).then(() => ({
              privateNotifications: updatedPrivateNotifications
            }))
          }
        })
        break
    }
  })
}
