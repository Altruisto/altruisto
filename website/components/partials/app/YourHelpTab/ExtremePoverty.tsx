import React from "react"
import {
  spreadUSDBetweenCharitiesForMaxImpact,
  IMPACT_COST_IN_USD
} from "utils/transform-usd-to-beings-saved"
import dynamic from "next/dynamic"
import Tile from "components/ui/Tile"
import { useIntl } from "translations/useIntl"

type Props = {
  moneyRaisedInUSD: number
  isActive: boolean
}

const ProgressBar = dynamic(() => import("../../../ui/ProgressBar"), {
  ssr: false
})

const ExtremePoverty: React.FC<Props> = ({ moneyRaisedInUSD, isActive }) => {
  const [impact, moneyLeft] = spreadUSDBetweenCharitiesForMaxImpact(moneyRaisedInUSD)
  const cheapestImpactCharity = "SCI"
  const { formatMessage } = useIntl()

  if (!impact[cheapestImpactCharity]) {
    return (
      <>
        <strong>{formatMessage({ id: "youAreCloseToHelpingTheFirstPerson" })}</strong>
        <br />
        <span>
          {formatMessage({ id: "collectAnother" })}
          ${Math.round(IMPACT_COST_IN_USD["SCI"] - moneyLeft)}
          {formatMessage({ id: "toHelpCureFirstChildFromParasites" })}
        </span>
        {isActive ? (
          <ProgressBar
            color="secondary"
            variant="determinate"
            value={Math.round((moneyLeft / IMPACT_COST_IN_USD["SCI"]) * 100)}
            className="m-t-10"
          />
        ) : null}
      </>
    )
  }
  return (
    <>
      {impact["SCI"] ? (
        <Tile
          title={String(impact["SCI"])}
          icon={
            <img
              src="/images/medicine.svg"
              style={{
                maxHeight: "24px",
                maxWidth: "24px",
                minHeight: "24px",
                minWidth: "24px"
              }}
            />
          }
          className="mb-3"
        >
          {formatMessage(
            { 
              id: "childrenCuredFromParasites" 
            },
            {
              strong: (...chunks: string[]) => (
                <strong>
                  {chunks}
                </strong>
              ),
            }
          )}
        </Tile>
      ) : null}

      {impact["AMF"] ? (
        <Tile
          title={String(impact["AMF"])}
          icon={
            <img
              src="/images/mosquito.svg"
              style={{
                maxHeight: "24px",
                maxWidth: "24px",
                minHeight: "24px",
                minWidth: "24px"
              }}
            />
          }
          className="mb-3"
        >
          {formatMessage(
            { 
              id: "peopleProtectedFromMalaria" 
            },
            {
              strong: (...chunks: string[]) => (
                <strong>
                  {chunks}
                </strong>
              ),
            }
          )}
        </Tile>
      ) : null}

      {impact["GD"] ? (
        <Tile
          title={String(impact["GD"])}
          icon={
            <img
              src="/images/family.svg"
              style={{
                maxHeight: "24px",
                maxWidth: "24px",
                minHeight: "24px",
                minWidth: "24px"
              }}
            />
          }
          className="mb-3"
        >
          {formatMessage(
            { 
              id: "weeksOfAidForOneFamilyLivinginExtremePoverty" 
            },
            {
              strong: (...chunks: string[]) => (
                <strong>
                  {chunks}
                </strong>
              ),
            }
          )}
        </Tile>
      ) : null}
      <div className="pt-3">
        <h3>
          {formatMessage({ id: "youHaveCollected" })}
          <span className="text-gradient">${moneyRaisedInUSD}</span>
        </h3>
        <p>{formatMessage({ id: "somePurchasesTakeUpToSeveralWeeksToBeProcessed" })}</p>
      </div>
    </>
  )
}

export default ExtremePoverty
