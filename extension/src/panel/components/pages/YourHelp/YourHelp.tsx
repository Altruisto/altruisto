import React, { useEffect, useState } from "react"
import { useAuthContext } from "../../../common/auth"
import {
  spreadUSDBetweenAllForMaxImpact,
  ImpactSpreadingResult
} from "../../../common/utils/transform-usd-to-beings-saved"

import axios from "../../../../helpers/api"
import { Loader } from "../../ui/Loader"
import { ExtremePoverty } from "./ExtremePoverty"
import { Animals } from "./Animals"
import { storage } from "../../../../helpers/storage"
import { CauseArea } from "../../../../types/types"

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
          const moneyRaised = Number(response.data.money_raised / 100)
          const [impact, moneyLeft] = spreadUSDBetweenAllForMaxImpact(moneyRaised)
          setHelp({
            moneyRaised,
            impact,
            moneyLeft
          })
        })
        .catch(() => {
          setError("We couldn't get the data about yout impact. Please try again in a moment.")
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
              To see the exact impact you had with your online shopping you need to sign up.
            </h2>
            <button
              className="button m-b-20"
              onClick={() => props.onRequestLogin && props.onRequestLogin()}
            >
              Sign up
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
            <span className="m-b-10">{error ? error : "Calculating your impact..."}</span>
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
                Make your first purchase with Altruisto to see how much impact you can have!
              </h2>
              <a href="https://altruisto.com/partners" target="_blank" rel="noreferrer noopener">
                <button className="button m-b-20">See our partner shops</button>
              </a>
              <p className="text-center">Some puchases take up to several weeks to be processed </p>
              <a
                href="https://altruisto.com/purchase-processing"
                target="_blank"
                rel="noreferrer noopener"
                className="button-link uppercase-link m-b-20 text-center"
              >
                FIND OUT WHY
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
