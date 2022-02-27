import { StandardLayout } from "../../components/layouts"
import React from "react"
import { useRouter } from "next/router"

const ThankYou = () => {
  const router = useRouter()
  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <div className="thank-you">
        <div className="thank-you__flag-top">
          <p>#StandWithUkraine</p>
          <h2>Thank you for your support!</h2>
        </div>
        <div className="thank-you__flag-bottom">
          <button className="button button--gray" onClick={() => router.replace("/ukraine")}>
            Back to homepage
          </button>
        </div>
      </div>
    </StandardLayout>
  )
}

export default ThankYou
