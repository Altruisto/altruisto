import React from "react"
import { Help } from "./YourHelp"
import Tile from "../../ui/Tile"
import mosquito from "../../../assets/mosquito.svg"
import medicine from "../../../assets/medicine.svg"
import family from "../../../assets/family.svg"
import { IMPACT_COST_IN_USD } from "../../../common/utils/transform-usd-to-beings-saved"
import { ProgressBar } from "../../ui/ProgressBar"

type Props = Help & { isActive: boolean }

export const ExtremePoverty: React.FC<Props> = ({
  moneyRaised,
  impact,
  moneyLeft,
  isActive
}: Props) => (
  <div className="fill-height">
    <div className="col-6">
      <div className="page__title m-b-0">
        <h1>Your help:</h1>
      </div>
      {impact["SCI"] ? (
        <Tile
          title={String(impact["SCI"])}
          icon={
            <img
              src={medicine}
              style={{
                maxHeight: "24px",
                maxWidth: "24px",
                minHeight: "24px",
                minWidth: "24px"
              }}
            />
          }
          className="m-b-20"
        >
          children <strong>cured from parasites</strong>
        </Tile>
      ) : (
        <>
          <strong>You are so close to helping first person!</strong>
          <br />
          <span>
            Collect another $
            {Math.round((IMPACT_COST_IN_USD["SCI"] - moneyLeft) * 100) / 100} to
            help cure first child from parasites
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
      )}

      {impact["AMF"] ? (
        <Tile
          title={String(impact["AMF"])}
          icon={
            <img
              src={mosquito}
              style={{
                maxHeight: "24px",
                maxWidth: "24px",
                minHeight: "24px",
                minWidth: "24px"
              }}
            />
          }
          className="m-b-20"
        >
          people <strong>protected from malaria</strong>
        </Tile>
      ) : null}

      {impact["GD"] ? (
        <Tile
          title={String(impact["GD"])}
          icon={
            <img
              src={family}
              style={{
                maxHeight: "24px",
                maxWidth: "24px",
                minHeight: "24px",
                minWidth: "24px"
              }}
            />
          }
          className="m-b-20"
        >
          weeks of aid for 1 family living <strong>in extreme poverty</strong>
        </Tile>
      ) : null}
    </div>
    <div className="col-6">
      <h1>
        You have collected:{" "}
        <span className="text-gradient">${moneyRaised}</span>
      </h1>
      <p>Some puchases take up to several weeks to be processed </p>
      <a
        href="https://altruisto.com/purchase-processing"
        target="_blank"
        rel="noreferrer noopener"
        className="button-link uppercase-link m-b-20"
      >
        FIND OUT WHY
      </a>
    </div>
  </div>
)
