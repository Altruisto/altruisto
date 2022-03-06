import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import "../../lib/canvas-confetti/confetti"

const Receipts = () => {
  const router = useRouter()

  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <main className="ukraine">
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__info">
            <div className="">
              <h2>Receipts</h2>
              <p>The first transfer will be made on the 14th of March.</p>
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

export default Receipts
