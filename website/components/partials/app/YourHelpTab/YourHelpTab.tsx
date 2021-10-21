import React, { ReactNode } from "react"
import { UserDetails } from "pages/app"
import { Loader } from "components/ui/Loader"
import Tile from "components/ui/Tile"
import ExtremePoverty from "./ExtremePoverty"
import Covid from "./Covid"
import AnimalsSufferingReduction from "./AnimalSufferingReduction"
import { CauseArea } from "../../../../../shared/types/user"
import { useIntl } from "translations/useIntl"

type Props = {
  userDetails: UserDetails
  isActive: boolean
  onGoToShops: () => void
}

export const YourHelpTab: React.FC<Props> = ({ userDetails, onGoToShops, isActive }) => {
  const { formatMessage } = useIntl()

  if (!userDetails) {
    return (
      <>
        <div className="justify-center fill-height text-center">
          <Loader color={"red"} size={42} />
          <span className="m-b-10">{formatMessage({ id: "calculatingYourImpact" })}</span>
        </div>
      </>
    )
  }

  if (userDetails.moneyRaised === 0) {
    return (
      <div className="web-app__content d-flex column-start">
        <h5 className="text-center">
          {formatMessage({ id: "makeYourFirstPurchaseToSeeImpact" })}
        </h5>
        <button className="button web-app__main-button" onClick={onGoToShops}>
          {formatMessage({ id: "seeOurPartnerShops" })}
        </button>
        <small className="text-center">
          {formatMessage({ id: "somePurchasesTakeUpToSeveralWeeksToBeProcessed" })}{" "}
        </small>
      </div>
    )
  }

  const moneyRaisedInUSD = Number(userDetails.moneyRaised / 100)

  return (
    <div className="web-app__content">
      {(() => {
        switch (userDetails.causeArea) {
          case "animals":
            return (
              <AnimalsSufferingReduction moneyRaisedInUSD={moneyRaisedInUSD} isActive={isActive} />
            )
          case "covid":
            return <Covid moneyRaisedInUSD={moneyRaisedInUSD} isActive={isActive} />
          case "extreme_poverty":
            return <ExtremePoverty moneyRaisedInUSD={moneyRaisedInUSD} isActive={isActive} />
        }
      })()}
    </div>
  )
}
