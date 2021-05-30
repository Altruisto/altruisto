import { browser } from "webextension-polyfill-ts"
import React from "react"
import { Help } from "./YourHelp"
import Tile from "../../ui/Tile"
import mosquito from "../../../assets/mosquito.svg"
import medicine from "../../../assets/medicine.svg"
import family from "../../../assets/family.svg"
import { ProgressBar } from "../../ui/ProgressBar"
import { IMPACT_COST_IN_USD } from "../../../common/utils/transform-usd-to-beings-saved"

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
        <h1>{browser.i18n.getMessage("yourHelp")}:</h1>
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
          {browser.i18n.getMessage("children")}
          <strong>{browser.i18n.getMessage("curedFromParasites")}</strong>
        </Tile>
      ) : (
        <>
          <strong>{browser.i18n.getMessage("youAreCloseToHelpingFirstPerson")}</strong>
          <br />
          <span>
          {browser.i18n.getMessage("collectAnother")}${Math.round((IMPACT_COST_IN_USD["SCI"] - moneyLeft) * 100) / 100}
          {browser.i18n.getMessage("toHelpCureFirstChildFromParasites")}          
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
          {browser.i18n.getMessage("people")}
          <strong>{browser.i18n.getMessage("protectedFromMalaria")}</strong>
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
          {browser.i18n.getMessage("weeksOfAidFor1FamilyLiving")}
          <strong>{browser.i18n.getMessage("inExtremePoverty")}</strong>
        </Tile>
      ) : null}
    </div>
    <div className="col-6">
      <h1>
        {browser.i18n.getMessage("youHaveCollected")}
        <span className="text-gradient">${moneyRaised}</span>
      </h1>
      <p>{browser.i18n.getMessage("somePurchasesTakeUpToSeveralWeeksToBeProcessed")}</p>
      <a
        href="https://altruisto.com/purchase-processing"
        target="_blank"
        rel="noreferrer noopener"
        className="button-link uppercase-link m-b-20"
      >
        {browser.i18n.getMessage("findOutWhy")}
      </a>
    </div>
  </div>
)
