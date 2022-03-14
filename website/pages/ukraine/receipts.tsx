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
              <p>
                <strong>07.03.2022</strong>
              </p>
              <p>
                <a href="/receipts/ukraine/receipt_eur_2022_03_07.pdf">EUR 296.61</a>
              </p>
              <p>
                <a href="/receipts/ukraine/receipt_usd_2022_03_07.pdf">USD 338.03</a>
              </p>
              <p>
                <strong>14.03.2022</strong>
              </p>
              <p>
                <a href="/receipts/ukraine/receipt_eur_2022_03_14.pdf">EUR 1000.25</a>
              </p>
              <hr />
              <p>The next transfer will be made on the 28th of March.</p>
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
