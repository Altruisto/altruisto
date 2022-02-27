import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import "../../lib/canvas-confetti/confetti"

const ThankYou = () => {
  const router = useRouter()

  useEffect(() => {
    const confetti = (window as any).confetti

    var count = 200
    var defaults = {
      origin: { y: 0.7 }
    }

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio)
        })
      )
    }

    setTimeout(() => {
      fire(0.25, {
        spread: 26,
        startVelocity: 55
      })
      fire(0.2, {
        spread: 60
      })
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      })
    }, 100)
  })
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
