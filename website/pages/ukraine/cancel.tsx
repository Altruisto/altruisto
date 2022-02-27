import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import "../../lib/canvas-confetti/confetti"

const Cancel = () => {
  const router = useRouter()

  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <main className="ukraine">
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__info">
            <div className="">
              <h2>The payment has failed :(</h2>
              <p>Please try again.</p>
              <p>#StandWithUkraine</p>
            </div>
            <div className="">
              <button className="button button--gray" onClick={() => router.replace("/ukraine")}>
                Back to fundraiser page
              </button>
            </div>
          </div>
        </div>
      </main>
    </StandardLayout>
  )
}

export default Cancel
