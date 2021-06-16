import { browser } from "webextension-polyfill-ts"
import React from "react"
import { ProgressBar } from "../../ui/ProgressBar"

type Props = { moneyRaised: number; isActive: boolean }

const MILESTONES = [1, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

export const Covid: React.FC<Props> = ({ moneyRaised, isActive }: Props) => {
  const currentMilestone = MILESTONES.find(v => v > moneyRaised) || 1
  return (
    <div className="fill-height">
      <h1 style={{ lineHeight: 1.33 }}>
        {browser.i18n.getMessage("youHaveCollected")}
        <span className="text-gradient">${moneyRaised}</span>
      </h1>

      <span>
        {browser.i18n.getMessage("collect")}${currentMilestone - moneyRaised}
        {browser.i18n.getMessage("moreToReachMilestoneOf")}${currentMilestone}!
      </span>

      {isActive ? (
        <ProgressBar
          color="secondary"
          variant="determinate"
          value={Math.round((moneyRaised / currentMilestone) * 100)}
          className="m-t-10"
        />
      ) : null}
    </div>
  )
}
