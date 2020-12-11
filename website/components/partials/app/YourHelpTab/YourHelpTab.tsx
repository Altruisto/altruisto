import React, { ReactNode } from "react"
import { UserDetails } from "pages/app"
import { Loader } from "components/ui/Loader"
import Tile from "components/ui/Tile"
import ExtremePoverty from "./ExtremePoverty"
import Covid from "./Covid"
import AnimalsSufferingReduction from "./AnimalSufferingReduction"
import { CauseArea } from "../../../../../shared/types/user"

type Props = {
  userDetails: UserDetails
  isActive: boolean
  onGoToShops: () => void
}

export const YourHelpTab: React.FC<Props> = ({ userDetails, onGoToShops, isActive }) => {
  if (!userDetails) {
    return (
      <>
        <div className="justify-center fill-height text-center" style={{ marginTop: 200 }}>
          <Loader color={"red"} size={42} />
          <span className="m-b-10">Calculating your impact...</span>
        </div>
      </>
    )
  }

  if (userDetails.moneyRaised === 0) {
    return (
      <div className="mobile-app__content d-flex column-center">
        <h5 className="text-center">
          Make your first purchase with Altruisto to see how much impact you can have!
        </h5>
        <button className="button mobile-app__main-button" onClick={onGoToShops}>
          See our partner shops
        </button>
        <small className="text-center">
          Some purchases take up to several weeks to be processed{" "}
        </small>
      </div>
    )
  }

  const moneyRaisedInUSD = Number(userDetails.moneyRaised / 100)

  return (
    <div className="mobile-app__content">
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
