import { browser } from "webextension-polyfill-ts"
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
import {
  Currency as CurrencyType,
  CauseArea as CauseAreaType
} from "../../../../../../shared/types/user"

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
            enqueueSnackbar(browser.i18n.getMessage("settingsHaveBeenUpdated"), {
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
            browser.i18n.getMessage("somethingWentWrongTryAgain"),
            {
              variant: "error"
            }
          )
        })
    } else {
      enqueueSnackbar(browser.i18n.getMessage("youHaveToBeLoggedToChangeSettings"), {
        variant: "error"
      })
    }
  }

  const handleLogout = () => {
    auth.logout()
    enqueueSnackbar(browser.i18n.getMessage("youHaveBeenLoggedOut"), { variant: "success" })
  }

  return (
    <div className="page">
      <div className="container fill-height">
        <div className="page__title">
          <h1>{browser.i18n.getMessage("settings")}</h1>
        </div>
        <div>
          <div className="settings__option">
            <span className="settings__label">{browser.i18n.getMessage("notifications")}</span>
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
            {browser.i18n.getMessage("showMeNotificationWhenIVisitPartners")}
          </p>
          <div className="settings__option m-t-20">
            <span className="settings__label">{browser.i18n.getMessage("highlightPartners")}</span>
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
                {browser.i18n.getMessage("logOut")}
              </button>
            </div>
          </div>
        ) : (
          <div className="settings__info-for-unlogged">
            <p>
              {browser.i18n.getMessage("defaultHelp")}
            </p>
            <p>
              <button className="button-link p-l-0" onClick={props.onRequestLogin}>
                <span className="text-gradient">{browser.i18n.getMessage("signUp")}</span>
              </button>
              {browser.i18n.getMessage("toChooseDifferentCharities")}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
