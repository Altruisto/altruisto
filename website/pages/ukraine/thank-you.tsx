import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useState } from "react"
import "../../lib/canvas-confetti/confetti"
import ShareModal from "../../components/partials/ShareModal"
import { api2 } from "utils/api-url"
import Link from "next/link"
import { useIntl } from "translations/useIntl"

const ThankYou = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [token, setToken] = useState("")
  const { formatMessage } = useIntl()
  const getUrlToShare = () => {
    if (typeof window === "undefined") {
      return ""
    }
    return window.origin + "/ukraine"
  }
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
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const checkoutSessionId = urlParams.get("session_id")

    api2.get(`/direct-donation/token?checkoutSessionId=${checkoutSessionId}`).then((res) => {
      setToken(res.data)
    })
  }, [])

  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <div className="thank-you">
        <div className="thank-you__flag-top">
          <p>#StandWithUkraine</p>
          <h2>{formatMessage({ id: "thankYouForSupport" })}</h2>
        </div>
        <div className="thank-you__flag-bottom">
          <button
            className="button button--gray ukraine__share-button"
            onClick={() => setIsShareModalOpen(true)}
          >
            <img src="/images/share.svg" alt="Share icon" />
            {formatMessage({ id: "share" })}
          </button>

          <Link href={`/ukraine/claim?token=${token}`}>
            <button className="button button--gray ukraine__share-button" style={{ marginTop: 10 }}>
              {formatMessage({ id: "claimYourFreeApps" })}
            </button>
          </Link>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={getUrlToShare()}
      />
    </StandardLayout>
  )
}

export default ThankYou
