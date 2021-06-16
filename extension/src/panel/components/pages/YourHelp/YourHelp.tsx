import { browser } from "webextension-polyfill-ts"
import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../../common/auth"

import axios from "../../../../helpers/api"
import { Loader } from "../../ui/Loader"
import { ExtremePoverty } from "./ExtremePoverty"
import { Animals } from "./Animals"
import { storage } from "../../../../helpers/storage"
import { Covid } from "./Covid"
import { CauseArea } from "../../../../../../shared/types/user"
import {
  spreadUSDBetweenCharitiesForMaxImpact,
  ImpactSpreadingResult
} from "../../../common/utils/transform-usd-to-beings-saved"

type Props = {
  onRequestLogin: () => void
  isActive: boolean
}

export type Help = {
  moneyRaised: number
  impact: ImpactSpreadingResult
  moneyLeft: number
}

// TODO: put the correct url for "FIND OUT WHY" link
// TODO: make currency used based on user's settings
export const YourHelp: React.FC<Props> = (props: Props) => {
  const auth = useAuthContext()
  const [help, setHelp] = useState<Help | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [causeArea, setCauseArea] = useState<CauseArea | null>(null)

  useEffect(() => {
    if (auth.user) {
      axios
        .get("/user", {
          headers: {
            "X-AUTH-TOKEN": auth.user.apiKey
          }
        })
        .then(response => {
          // const moneyRaised = 25000
          const moneyRaised = Number(response.data.money_raised / 100)
          const [impact, moneyLeft] = spreadUSDBetweenCharitiesForMaxImpact(moneyRaised)
          setHelp({
            moneyRaised,
            impact,
            moneyLeft
          })
        })
        .catch(() => {
          setError(browser.i18n.getMessage("weCouldNotGetDataAboutImpact"))
        })

      storage
        .get("sync", "userSettings")
        .then(({ userSettings }) => setCauseArea(userSettings.causeArea))
    }
  }, [])

  if (!auth.user) {
    return (
      <div className="page">
        <div className="container fill-height">
          <div className="justify-center fill-height">
            <h2 className="text-center">
            {browser.i18n.getMessage("toSeeTheImpactSingUp")}
            </h2>
            <button
              className="button m-b-20"
              onClick={() => props.onRequestLogin && props.onRequestLogin()}
            >
              {browser.i18n.getMessage("signUp")}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!help) {
    return (
      <div className="page">
        <div className="container fill-height">
          <div className="justify-center fill-height text-center">
            <span className="m-b-10">{error ? error : browser.i18n.getMessage("calculatingYourImpact")}</span>
            <Loader color={"red"} size={42} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container fill-height">
        <div className="justify-center fill-height">
          {help.moneyRaised === 0 ? (
            <>
              <h2 className="text-center">
                {browser.i18n.getMessage("makeYourFirstPurchaseToSeeImpact")}
              </h2>
              <a href="https://altruisto.com/partners" target="_blank" rel="noreferrer noopener">
                <button className="button m-b-20">{browser.i18n.getMessage("seeOurPartnerShops")}</button>
              </a>
              <p className="text-center">
                {browser.i18n.getMessage("somePurchasesTakeUpToSeveralWeeksToBeProcessed")}
              </p>
              <a
                href="https://altruisto.com/purchase-processing"
                target="_blank"
                rel="noreferrer noopener"
                className="button-link uppercase-link m-b-20 text-center"
              >
                {browser.i18n.getMessage("findOutWhy")}
              </a>
            </>
          ) : (
            (() => {
              switch (causeArea) {
                case "extreme_poverty":
                  return <ExtremePoverty {...{ ...help, isActive: props.isActive }} />
                case "animals":
                  return (
                    <Animals
                      {...{
                        moneyRaised: help.moneyRaised,
                        isActive: props.isActive
                      }}
                    />
                  )
                case "covid":
                  return (
                    <Covid
                      {...{
                        moneyRaised: help.moneyRaised,
                        isActive: props.isActive
                      }}
                    />
                  )
                default:
                  return <ExtremePoverty {...{ ...help, isActive: props.isActive }} />
              }
            })()
          )}
        </div>
      </div>
    </div>
  )
}
