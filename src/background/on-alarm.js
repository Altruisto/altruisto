import * as browser from "webextension-polyfill"
import {
  getPartnersList
} from "../helpers/get-partners-list.js"
import axios from "../helpers/api"
import {
  formatDate
} from "../helpers/format-date.ts"

const isValidJSON = (source) => {
  try {
    return JSON.parse(source) && true
  } catch (e) {
    return false
  }
}

export function onAlarm() {
  browser.alarms.onAlarm.addListener(function (details) {
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
        const now = formatDate(new Date())

        browser.storage.sync.get({
          publicNotifications: {
            since: now,
            notificationsToShow: []
          }
        }).then(items => {
          const publicNotifications = items.publicNotifications
          const updatedNotificationsToShow = [...publicNotifications.notificationsToShow]

          const sendNotificationMessage = browser.tabs.query({
            active: true,
            lastFocusedWindow: true
          }).then(tabs => {
            const notificationToShow = updatedNotificationsToShow[0]
            return browser.tabs.sendMessage(tabs[0].id, {
              action: "showNotification",
              payload: JSON.parse(notificationToShow)
            })
          }).then(response => {
            if (response === 'success') {
              updatedNotificationsToShow.shift()
            } else {
              console.warn('UNABLE TO DISPLAY PUBLIC NOTIFICATION')
            }
          })

          const getNewNotifications = axios.get('/notifications', {
            params: {
              since_date: publicNotifications.since
            }
          }).then(response => {
            response.data.forEach(notification => {
              if (updatedNotificationsToShow.every(v => v !== notification.content) &&
                isValidJSON(notification.content)) {
                updatedNotificationsToShow.push(notification.content)
              }
            })
          })

          Promise.all([sendNotificationMessage, getNewNotifications].map(p => p.catch(() => undefined))).then(() => {
            browser.storage.sync.set({
              publicNotifications: {
                since: now,
                notificationsToShow: updatedNotificationsToShow
              }
            })
          })
        })
        break

      case 'getPrivateNotificationsAndShowFirst':
        browser.storage.sync.get({
          user: null,
          privateNotifications: []
        }).then(result => {
          if (result.user) {
            const updatedPrivateNotifications = [...result.privateNotifications]
            const notificationToShow = updatedPrivateNotifications[0]


            const sendNotificationMessage = browser.tabs.query({
              active: true,
              lastFocusedWindow: true
            }).then(tabs => {
              if (tabs.length !== 0 && notificationToShow) {
                return browser.tabs.sendMessage(tabs[0].id, {
                  action: "showNotification",
                  payload: JSON.parse(notificationToShow.content)
                })
              }
            }).then(response => {
              if (response === 'success') {
                return axios.patch(`/user/notifications/${notificationToShow.id}`, {
                    "status": "seen"
                  }, {
                    headers: {
                      "X-AUTH-TOKEN": result.user.apiKey
                    }
                  })
                  .then(() => {
                    updatedPrivateNotifications.shift()
                  })
                  .catch(e => console.warn("UNABLE TO MARK NOTIFICATION AS SEEN", e))

              } else {
                console.warn('UNABLE TO DISPLAY PRIVATE NOTIFICATION')
              }
            })

            const getNewNotifications = axios.get('user/notifications?status=unseen', {
              headers: {
                "X-AUTH-TOKEN": result.user.apiKey
              }
            }).then(response => {
              response.data.forEach(notification => {
                if (updatedPrivateNotifications.every(v => v.id !== notification.id) &&
                  isValidJSON(notification.content)) {
                  updatedPrivateNotifications.push({
                    id: notification.id,
                    content: notification.content
                  })
                }
              })
            })

            Promise.all([sendNotificationMessage, getNewNotifications].map(p => p.catch(() => undefined))).then(() => {
              browser.storage.sync.set({
                privateNotifications: updatedPrivateNotifications
              })
            })
          }
        })
        break
    }
  })
}