import React from "react"
import dynamic from "next/dynamic"

type Props = {
  moneyRaisedInUSD: number
  isActive: boolean
}

const ProgressBar = dynamic(() => import("../../../ui/ProgressBar"), {
  ssr: false
})

const MILESTONES = [1, 10, 25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

const AnimalsSufferingReduction: React.FC<Props> = ({ moneyRaisedInUSD, isActive }) => {
  const currentMilestone = MILESTONES.find(v => v > moneyRaisedInUSD) || 1

  return (
    <div className="fill-height">
      <h3 style={{ lineHeight: 1.33 }}>
        You have collected: <span className="text-gradient">${moneyRaisedInUSD}</span>
      </h3>

      <span>
        Collect ${currentMilestone - moneyRaisedInUSD} more to reach milestone of $
        {currentMilestone}!
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

export default AnimalsSufferingReduction
