import React, { useState, useEffect } from "react"
import { Switch } from "../../ui/Switch"
import { useSnackbar } from "notistack"
import { useAuthContext } from "../../../common/auth"
import "./Settings.scss"
import { Currency } from "./Currency"
import { CauseArea } from "./CauseArea"
import { ChangeEmail } from "./ChangeEmail"
import { ChangePassword } from "./ChangePassword"
import axios from "../../../../helpers/api"
import { storage } from "../../../../helpers/storage"
import { Currency as CurrencyType, CauseArea as CauseAreaType } from "../../../../types/types"

type Props = {
  onRequestLogin?: () => void
}

export const Settings: React.FC<Props> = (props: Props) => {
  const auth = useAuthContext()
  const { enqueueSnackbar } = useSnackbar()
  const [notifications, setNotifications] = useState(true)
  const [searchResults, setSearchResults] = useState(true)
  const [currency, setCurrency] = useState<CurrencyType>("USD")
  const [causeArea, setCauseArea] = useState<CauseAreaType>("covid")

  // TODO: we should defer this call until user swipes to this page for the first time
  useEffect(() => {
    if (auth.user && auth.user.apiKey) {
      storage.get("sync", "userSettings").then(({ userSettings }) => {
        setCauseArea(userSettings.causeArea)
        setCurrency(userSettings.currency)
      })
    }

    storage
      .get("sync", ["showNotifications", "highlightSearchResults"])
      .then(({ showNotifications, highlightSearchResults }) => {
        setNotifications(showNotifications)
        setSearchResults(highlightSearchResults)
      })
  }, [])

  // TODO: fix patch method in backend so it gets only what it changes
  const updateSettings = (settingToUpdate: {
    currency?: CurrencyType
    causeArea?: CauseAreaType
  }) => {
    if (auth.user && auth.user.apiKey) {
      const currentSettings = {
        email: auth.user.email,
        causeArea,
        currency
      }
      const newSettings = { ...currentSettings, ...settingToUpdate }

      settingToUpdate.currency && setCurrency(settingToUpdate.currency)
      settingToUpdate.causeArea && setCauseArea(settingToUpdate.causeArea)

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
            enqueueSnackbar("Your settings have been updated", {
              variant: "success"
            })

            storage.set("sync", {
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
                  storage.set("sync", { showNotifications: !v })
                  return !v
                })
              }
            />
          </div>
          <p className="settings__description">
            Show me a notification when I visit one of Altruisto's partners' shop and have an
            opportunity to raise money for charities with my purchases
          </p>

          <div className="settings__option m-t-20">
            <span className="settings__label">Highlight partners in search results</span>
            <Switch
              on={searchResults}
              onClick={() =>
                setSearchResults(v => {
                  storage.set("sync", { highlightSearchResults: !v })
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
              onChange={event => updateSettings({ currency: event.target.value as CurrencyType })}
            />
            <CauseArea
              value={causeArea}
              onChange={event => updateSettings({ causeArea: event.target.value as CauseAreaType })}
            />
            <ChangeEmail />
            <ChangePassword />

            <div className="settings__option">
              <button className="button-link uppercase-link m-b-20" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          </div>
        ) : (
          <div className="settings__info-for-unlogged">
            <p>
              By default the help from unlogged users goes to: Against Malaria Foundation,
              Schistosomiasis Control Initiative, and Give Directly.
            </p>
            <p>
              <button className="button-link p-l-0" onClick={props.onRequestLogin}>
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
