import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import "../../lib/canvas-confetti/confetti"
import { GIVEAWAYS } from "data/ukraineGiveaways"
import { api2 } from "utils/api-url"
import { useSnackbar } from "notistack"
import { Modal } from "@material-ui/core"

type GiveAwayName = typeof GIVEAWAYS[number]["name"]

const handleError = (
  type: string,
  enqueueSnackbar: ReturnType<typeof useSnackbar>["enqueueSnackbar"]
) => {
  switch (type) {
    case "already_claimed":
      enqueueSnackbar("You have already claimed this product", { variant: "error" })
      break
    case "unum_api_user_not_found":
      enqueueSnackbar(
        "No UNUM account found. Please register your account with the same email address from which you made a donation",
        { variant: "error" }
      )
      break
    case "donation_not_confirmed":
      enqueueSnackbar("Your donation has not been confirmed yet", { variant: "error" })
      break
    case "no_available_codes":
      enqueueSnackbar("No more codes are available for this product :(", { variant: "error" })
      break
    default:
      enqueueSnackbar(
        "Something went wrong. Please try again and if the problem persists contact our support at hello@altruisto.com",
        {
          variant: "error"
        }
      )
      break
  }
}

const Claim = () => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [currentPromoCode, setCurrentPromoCode] = useState<string>("")

  const claimUnum = async () => {
    try {
      await api2.post("/direct-donation/claim/unum", {
        token: router.query.token
      })
      enqueueSnackbar("Your account has been upgraded to Elite", { variant: "success" })
    } catch (e) {
      e.response.data.errors.forEach((error) => {
        handleError(error.type, enqueueSnackbar)
      })
    }
  }

  const claimBetterMe = async (name: "BetterMe Health Coaching" | "BetterMe Mental Health") => {
    const map = {
      "BetterMe Mental Health": "betterMeMentalHealth",
      "BetterMe Health Coaching": "betterMeFitness"
    }
    try {
      await api2.post("/direct-donation/claim/better-me", {
        token: router.query.token,
        product: map[name]
      })
      enqueueSnackbar(
        "Request to upgrade your account has been sent. It may takes up to a few hours for your account to be upgraded.",
        { variant: "success" }
      )
    } catch (e) {
      e.response.data.errors.forEach((error) => {
        handleError(error.type, enqueueSnackbar)
      })
    }
  }

  const claimPromoCode = async (
    name:
      | "Bear App (iOS)"
      | "Bear App (Mac)"
      | "Pixitca"
      | "Focus - Time Management for iOS"
      | "Attentive - Screen Time Control for iOS"
      | "Filter - App & Website Blocker for Mac"
  ) => {
    const map = {
      "Bear App (iOS)": "bearIOS",
      "Bear App (Mac)": "bearMac",
      Pixitca: "pixitca",
      "Focus - Time Management for iOS": "focus",
      "Attentive - Screen Time Control for iOS": "attentive",
      "Filter - App & Website Blocker for Mac": "filter"
    }
    try {
      const result = await api2.post("/direct-donation/claim/promo-code", {
        token: router.query.token,
        claimType: map[name]
      })
      setCurrentPromoCode(result.data)
    } catch (e) {
      e.response.data.errors.forEach((error) => {
        handleError(error.type, enqueueSnackbar)
      })
    }
  }

  const claimAbaEnglish = async () => {
    try {
      const result = await api2.post("/direct-donation/claim/promo-code", {
        token: router.query.token,
        claimType: "abaEnglish"
      })
      router.push("/ukraine/aba-instructions?code=" + result.data)
    } catch (e) {
      e.response.data.errors.forEach((error) => {
        handleError(error.type, enqueueSnackbar)
      })
    }
  }

  const claim = (name: GiveAwayName) => {
    switch (name) {
      case "UNUM":
        claimUnum()
        break

      case "BetterMe Health Coaching":
      case "BetterMe Mental Health":
        claimBetterMe(name)
        break

      case "Bear App (iOS)":
      case "Bear App (Mac)":
      case "Pixitca":
      case "Focus - Time Management for iOS":
      case "Attentive - Screen Time Control for iOS":
      case "Filter - App & Website Blocker for Mac":
        claimPromoCode(name)
        break

      case "ABA English":
        claimAbaEnglish()
    }
  }

  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <main className="ukraine">
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__info">
            <div className="">
              <h2>Your giveaways:</h2>
            </div>
            {GIVEAWAYS.map((giveaway) => (
              <div key={giveaway.name}>
                <strong>{giveaway.name}</strong>
                <p>{giveaway.claimInstructions}</p>
                <button className="button button--gray" onClick={() => claim(giveaway.name)}>
                  Claim
                </button>
                <hr />
              </div>
            ))}
            <div className=""></div>
          </div>
        </div>
      </main>
      <PromoCodeModal promoCode={currentPromoCode} onClose={() => setCurrentPromoCode("")} />
    </StandardLayout>
  )
}

type PromoCodeModalProps = {
  onClose: () => void
  promoCode: string
}

const PromoCodeModal = ({ onClose, promoCode }: PromoCodeModalProps) => {
  return (
    <Modal open={!!promoCode} onClose={onClose}>
      <div className="modal-content">
        <div style={{ background: "white", position: "relative" }}>
          <button onClick={onClose} className="modal-content__close-button">
            <img src="/images/close.svg" alt="Cross icon" />
          </button>
          <div
            style={{
              padding: "40px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h2>Your promo code</h2>
            <input type="text" value={promoCode} readOnly />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Claim
