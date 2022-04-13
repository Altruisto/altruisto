import { StandardLayout } from "../../components/layouts"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import "../../lib/canvas-confetti/confetti"
import { GIVEAWAYS, POLISH_GIVEAWAYS } from "data/ukraineGiveaways"
import { api2 } from "utils/api-url"
import { useSnackbar } from "notistack"
import { Modal } from "@material-ui/core"
import { useIntl } from "translations/useIntl"
import navigatorLanguages from "navigator-languages"

type GiveAwayName = typeof GIVEAWAYS[number]["name"] | typeof POLISH_GIVEAWAYS[number]["name"]

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
  const [currentTextInstructions, setCurrentTextInstructions] = useState<string>("")

  const { formatMessage } = useIntl()
  const userLocale = useMemo(() => navigatorLanguages() || ["en"], [])

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
      | "Wczesnoszkolni.pl"
      | "Concepts (iOS)"
      | "OurFlat (iOS)"
      | "OurFlat (Android)"
      | "Food List Tracking & Shopping"
      | "Stock and Inventory Simple"
      | "Taskito"
      | "Bazaart"
      | "Neo (iOS)"
      | "Neo (Android)"
      | "Timelog Plus (Pro) - Android"
  ) => {
    const map = {
      "Bear App (iOS)": "bearIOS",
      "Bear App (Mac)": "bearMac",
      Pixitca: "pixitca",
      "Focus - Time Management for iOS": "focus",
      "Attentive - Screen Time Control for iOS": "attentive",
      "Filter - App & Website Blocker for Mac": "filter",
      "Wczesnoszkolni.pl": "wczesnoszkolni",
      "Concepts (only iOS app)": "concepts",
      "OurFlat (iOS)": "ourFlatIOS",
      "OurFlat (Android)": "ourFlatAndroid",
      "Food List Tracking & Shopping": "foodList",
      "Stock and Inventory Simple": "stock",
      Taskito: "taskito",
      Bazaart: "bazaart",
      "Neo (iOS)": "neoIOS",
      "Neo (Android)": "neoAndroid",
      "Timelog Plus (Pro) - Android": "timelog"
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

  const claimUTalk = async () => {
    try {
      const result = await api2.post("/direct-donation/claim/promo-code", {
        token: router.query.token,
        claimType: "utalk"
      })
      router.push("/ukraine/utalk-instructions?code=" + result.data)
    } catch (e) {
      e.response.data.errors.forEach((error) => {
        handleError(error.type, enqueueSnackbar)
      })
    }
  }

  const claimMyTasksApp = async () => {
    try {
      await api2.post("/direct-donation/claim/mytasksapp", {
        token: router.query.token
      })
      enqueueSnackbar(
        "You are now able to upgrade to premium account for free. Please read the instructions.",
        {
          variant: "success"
        }
      )
    } catch (e) {
      e.response.data.errors.forEach((error) => {
        handleError(error.type, enqueueSnackbar)
      })
    }
  }

  const claimMindspa = () => {
    setCurrentTextInstructions(
      "Please download th app and use the contact form in the app to request the free PTSD programme."
    )
  }

  const claimCkbk = async () => {
    const result = await api2.post("/direct-donation/claim/promo-code", {
      token: router.query.token,
      claimType: "ckbk"
    })
    const code = result.data

    if (typeof window !== "undefined") {
      window.location.href = `https://join.ckbk.com/gift/claim?voucher=${code}`
    }
  }

  const claimSlowly = async () => {
    try {
      await api2.post("/direct-donation/claim/slowly", {
        token: router.query.token
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
      case "Wczesnoszkolni.pl":
      case "Concepts (iOS)":
      case "OurFlat (iOS)":
      case "OurFlat (Android)":
      case "Food List Tracking & Shopping":
      case "Stock and Inventory Simple":
      case "Taskito":
      case "Bazaart":
      case "Neo (iOS)":
      case "Neo (Android)":
      case "Timelog Plus (Pro) - Android":
        claimPromoCode(name)
        break

      case "ABA English":
        claimAbaEnglish()
        break

      case "My Tasks App":
        claimMyTasksApp()
        break

      case "Mindspa":
        claimMindspa()
        break

      case "uTalk":
        claimUTalk()
        break

      case "Ckbk":
        claimCkbk()
        break

      case "Slowly":
        claimSlowly()
        break
    }
  }

  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <main className="ukraine">
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__info">
            <div className="">
              <h2>{formatMessage({ id: "yourGiveaways" })}:</h2>
            </div>
            {userLocale.includes("pl") &&
              POLISH_GIVEAWAYS.map((giveaway) => (
                <div key={giveaway.name}>
                  <strong>{giveaway.name}</strong>
                  <p>{giveaway.claimInstructions}</p>
                  <button className="button button--gray" onClick={() => claim(giveaway.name)}>
                    {formatMessage({ id: "claim" })}
                  </button>
                  <hr />
                </div>
              ))}

            {GIVEAWAYS.map((giveaway) => (
              <div key={giveaway.name}>
                <strong>{giveaway.name}</strong>
                <p>{giveaway.claimInstructions}</p>
                <button className="button button--gray" onClick={() => claim(giveaway.name)}>
                  {formatMessage({ id: "claim" })}
                </button>
                <hr />
              </div>
            ))}
            <hr />
            <div className=""></div>
          </div>
        </div>
      </main>
      <PromoCodeModal promoCode={currentPromoCode} onClose={() => setCurrentPromoCode("")} />
      <TextInstructionsModal
        text={currentTextInstructions}
        onClose={() => setCurrentTextInstructions("")}
      />
    </StandardLayout>
  )
}

type PromoCodeModalProps = {
  onClose: () => void
  promoCode: string
}

const PromoCodeModal = ({ onClose, promoCode }: PromoCodeModalProps) => {
  const { formatMessage } = useIntl()
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
            <h2>{formatMessage({ id: "yourPromoCode" })}</h2>
            <input type="text" value={promoCode} readOnly />
          </div>
        </div>
      </div>
    </Modal>
  )
}

const TextInstructionsModal = ({ onClose, text }: { onClose: () => void; text: string }) => {
  return (
    <Modal open={!!text} onClose={onClose}>
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
            <p>{text}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Claim
