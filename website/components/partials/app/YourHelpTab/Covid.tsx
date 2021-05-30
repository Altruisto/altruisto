import React from "react"
import dynamic from "next/dynamic"
import { useIntl } from "translations/useIntl"

type Props = {
  moneyRaisedInUSD: number
  isActive: boolean
}

const ProgressBar = dynamic(() => import("../../../ui/ProgressBar"), {
  ssr: false
})

const MILESTONES = [1, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

const Covid: React.FC<Props> = ({ moneyRaisedInUSD, isActive }) => {
  const currentMilestone = MILESTONES.find(v => v > moneyRaisedInUSD) || 1
  const { formatMessage } = useIntl()

  return (
    <div className="fill-height">
      <h3 style={{ lineHeight: 1.33 }}>
        {formatMessage({ id: "youHaveCollected" })}
        <span className="text-gradient">${moneyRaisedInUSD}</span>
      </h3>

      <span>
        {formatMessage({ id: "collect" })}${currentMilestone - moneyRaisedInUSD}
        {formatMessage({ id: "moreToReachMilestoneOf" })}${currentMilestone}!
      </span>

      {isActive ? (
        <ProgressBar
          color="secondary"
          variant="determinate"
          value={Math.round((moneyRaisedInUSD / currentMilestone) * 100)}
          className="m-t-10"
        />
      ) : null}
    </div>
  )
}

export default Covid
