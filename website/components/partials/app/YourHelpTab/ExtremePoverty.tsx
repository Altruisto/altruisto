import React from "react"
import {
  spreadUSDBetweenCharitiesForMaxImpact,
  IMPACT_COST_IN_USD
} from "utils/transform-usd-to-beings-saved"
import dynamic from "next/dynamic"
import Tile from "components/ui/Tile"

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

  if (!impact[cheapestImpactCharity]) {
    return (
      <>
        <strong>You are so close to helping the first person!</strong>
        <br />
        <span>
          Collect another ${Math.round(IMPACT_COST_IN_USD["SCI"] - moneyLeft)} to help cure first
          child from parasites
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
          children <strong>cured from parasites</strong>
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
          people <strong>protected from malaria</strong>
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
          weeks of aid for 1 family living <strong>in extreme poverty</strong>
        </Tile>
      ) : null}
      <div className="pt-3">
        <h3>
          You have collected: <span className="text-gradient">${moneyRaisedInUSD}</span>
        </h3>
        <p>Some purchases take up to several weeks to be processed.</p>
      </div>
    </>
  )
}

export default ExtremePoverty
