import * as browser from "webextension-polyfill"
import React, { useState, useEffect, ChangeEvent } from "react"
import { Switch } from "../../ui/Switch"
import { useSnackbar } from "notistack"
import { useAuthContext } from "../../../common/auth"
import "./Settings.scss"
import { Currency } from "./Currency"
import { CauseArea } from "./CauseArea"
import { ChangeEmail } from "./ChangeEmail"
import { ChangePassword } from "./ChangePassword"
import axios from "../../../../helpers/api"

type Props = {
  onRequestLogin?: () => void
}

export const Settings: React.FC<Props> = (props: Props) => {
  const auth = useAuthContext()
  const [notifications, setNotifications] = useState(true)
  const [searchResults, setSearchResults] = useState(true)
  const [currency, setCurrency] = useState("USD")
  const [causeArea, setCauseArea] = useState("extreme_poverty")
  const { enqueueSnackbar } = useSnackbar()

  // TODO: we should defer this call until user swipes to this page for the first time
  useEffect(() => {
    if (auth.user && auth.user.apiKey) {
      browser.storage.sync.get({ userSettings: null }).then(items => {
        setCauseArea(items.userSettings.causeArea)
        setCurrency(items.userSettings.currency)
      })
    }

    browser.storage.sync
      .get({
        showNotifications: true,
        highlightSearchResults: true
      })
      .then(settings => {
        setNotifications(settings.showNotifications)
        setSearchResults(settings.highlightSearchResults)
      })
  }, [])

  // TODO: fix patch method in backend so it gets only what it changes
  const updateSettings = settingToUpdate => {
    if (auth.user && auth.user.apiKey) {
      const currentSettings = {
        email: auth.user.email,
        causeArea,
        currency
      }
      const newSettings = { ...currentSettings, ...settingToUpdate }

      settingToUpdate.currency && setCurrency(settingToUpdate.currency)
      settingToUpdate.causeArea && setCauseArea(settingToUpdate.causeArea)

      enqueueSnackbar("Your settings have been updated", {
        variant: "success"
      })

      // possible race conditions when user starts changing back and fourth very quickly
      axios
        .patch(
          "/user",

          newSettings,
          {
            headers: {
              "X-AUTH-TOKEN": auth.user.apiKey
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            browser.storage.sync.set({
              userSettings: {
                causeArea: newSettings.causeArea,
                currency: newSettings.currency
              }
            })
          }
        })
        .catch(() => {
          enqueueSnackbar(
            "Something went wrong, we have been notified about it. Please try again in a moment.",
            {
              variant: "error"
            }
          )
        })
    } else {
      enqueueSnackbar("You have to be logged in to change this setting.", {
        variant: "error"
      })
    }
  }

  const handleLogout = () => {
    auth.logout()
    enqueueSnackbar("You have been logged out.", { variant: "success" })
  }

  return (
    <div className="page">
      <div className="container fill-height">
        <div className="page__title">
          <h1>Settings</h1>
        </div>
        <div>
          <div className="settings__option">
            <span className="settings__label">Notifications</span>
            <Switch
              on={notifications}
              onClick={() =>
                setNotifications(v => {
                  browser.storage.sync.set({ showNotifications: !v })
                  return !v
                })
              }
            />
          </div>
          <p className="settings__description">
            Show me a notification when I visit one of Altruisto's partners'
            shop and have an opportunity to raise money for charities with my
            purchases
          </p>

          <div className="settings__option m-t-20">
            <span className="settings__label">
              Highlight partners in search results
            </span>
            <Switch
              on={searchResults}
              onClick={() =>
                setSearchResults(v => {
                  browser.storage.sync.set({ highlightSearchResults: !v })
                  return !v
                })
              }
            />
          </div>
        </div>
        {auth.user ? (
          <div className="m-t-20">
            <Currency
              value={currency}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                updateSettings({ currency: event.target.value })
              }
            />
            <CauseArea
              value={causeArea}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                updateSettings({ causeArea: event.target.value })
              }
            />
            <ChangeEmail />
            <ChangePassword />

            <div className="settings__option">
              <button
                className="button-link uppercase-link m-b-20"
                onClick={handleLogout}
              >
                LOG OUT
              </button>
            </div>
          </div>
        ) : (
          <div className="settings__info-for-unlogged">
            <p>
              By default the help from unlogged users goes to: Against Malaria
              Foundation, Schistosomiasis Control Initiative, and Give Directly.
            </p>
            <p>
              <button
                className="button-link p-l-0"
                onClick={props.onRequestLogin}
              >
                <span className="text-gradient">Sign up</span>
              </button>{" "}
              to choose different charities.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
