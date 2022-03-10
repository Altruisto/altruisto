import { InputAdornment, Modal, OutlinedInput, TextField, useMediaQuery } from "@material-ui/core"
import { loadStripe } from "@stripe/stripe-js"
import { GIVEAWAYS } from "data/ukraineGiveaways"
import * as localeCurrency from "locale-currency"
import navigatorLanguages from "navigator-languages"
import dynamic from "next/dynamic"
import React, { FC, useEffect, useMemo, useState } from "react"
import { useIntl } from "translations/useIntl"
import { api2, getStripeApiKey } from "utils/api-url"
import { StandardLayout } from "../../components/layouts"
import ShareModal from "../../components/partials/ShareModal"
import {
  Donation,
  DonationEventData,
  subscribeToDonationsEvent
} from "../../utils/events-api/subscribeToDonationsEvent"

const ProgressBar = dynamic(() => import("../../components/ui/ProgressBar"), {
  ssr: false
})

const Ukraine = () => {
  const isMd = useMediaQuery("(min-width: 768px)")

  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const userLocale = useMemo(() => navigatorLanguages() || ["en"], [])
  const userCurrency = useMemo(() => localeCurrency.getCurrency(userLocale[0]) || "USD", [
    userLocale
  ])

  const [donations, setDonations] = useState<DonationEventData>({
    raised: {
      current: 0,
      goal: 5000,
      currency: userCurrency,
      donorsCount: 0
    },
    mostRecentDonations: []
  })

  const getUrlToShare = () => {
    if (typeof window === "undefined") {
      return ""
    }
    return window.location.href
  }

  // useEffect(() => {
  //   async function handleDonationsSubscription() {
  //     await subscribeToDonationsEvent(userCurrency, setDonations)
  //   }
  //   handleDonationsSubscription()
  // }, [userCurrency])

  useEffect(() => {
    api2.get("/direct-donation/ukraine").then(({ data }) => {
      setDonations(data)
    })
  }, [])

  return (
    <StandardLayout
      withMenu={true}
      withoutMenuBorder={true}
      seoMetaTags={{
        title: "Ensemble, aidons l'Ukraine!",
        description:
          "Le conflit en Ukraine est synonyme de souffrances inimaginables pour des milliers d'innocents. Bien que nous n'ayons pas le pouvoir d'arrêter la guerre, nous pouvons agir et aider comme nous le savons le mieux. Pour donner à ceux qui sont dans le besoin et qui ont été touchés par cette tragédie."
      }}
      ogMetaTags={{
        title: "Ensemble, aidons l'Ukraine!",
        description:
          "Le conflit en Ukraine est synonyme de souffrances inimaginables pour des milliers d'innocents. Bien que nous n'ayons pas le pouvoir d'arrêter la guerre, nous pouvons agir et aider comme nous le savons le mieux. Pour donner à ceux qui sont dans le besoin et qui ont été touchés par cette tragédie.",
        image: "https://altruisto.com/images/ukraine-cover-fr.png",
        url: "https://altruisto.com/ukraine/fr"
      }}
      twitterMetaTags={{
        title: "Ensemble, aidons l'Ukraine!",
        site: "@altruistoCom",
        description:
          "Le conflit en Ukraine est synonyme de souffrances inimaginables pour des milliers d'innocents. Bien que nous n'ayons pas le pouvoir d'arrêter la guerre, nous pouvons agir et aider comme nous le savons le mieux. Pour donner à ceux qui sont dans le besoin et qui ont été touchés par cette tragédie.",
        image: "https://altruisto.com/images/ukraine-cover-fr.png",
        card: "summary_large_image"
      }}
    >
      <main className="ukraine">
        <div
          className="ukraine__banner"
          style={{
            backgroundImage:
              "url(/images/ukraine-baner-3.jpg), linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))",
            backgroundPosition: "50% 30%"
          }}
        >
          <div className="ukraine__banner-content">
            <div className="ukraine__flag">
              <div className="ukraine__flag--top" />
              <div className="ukraine__flag--bottom" />
            </div>
            <h2>Aide aux victimes de la guerre en Ukraine</h2>
            <p>
              Bénéficiaire des fonds:{" "}
              <a href="https://www.pah.org.pl/en/">
                <u>Polish Humanitarian Action</u>
              </a>
            </p>
          </div>
        </div>
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__left-panel ukraine__left-panel--offset">
            <p>
              À la suite des derniers événements et de l'escalade du conflit en Ukraine, nous
              lançons une collecte de fonds pour fournir de la nourriture et des produits d'hygiène
              aux habitants des régions de Donetsk et de Louhansk qui sont actuellement en guerre.
              Nous voulons également fournir de la nourriture et d'autres moyens d'aide à ceux qui
              fuient leurs maisons, notamment les personnes qui se déplacent à l'intérieur du pays
              et les réfugiés qui s'échappent vers la Pologne.
            </p>
            <p>
              Le conflit en Ukraine est synonyme de souffrances inimaginables pour des milliers
              d'innocents. Bien que nous n'ayons pas le pouvoir d'arrêter la guerre, nous pouvons
              agir et aider comme nous le savons le mieux. Pour donner à ceux qui sont dans le
              besoin et qui ont été touchés par cette tragédie.
            </p>
            <p style={{ margin: 0 }}>
              La guerre en Ukraine a commencé en 2014 et ne s'est jamais terminée. Les récents
              événements ont montré que les troubles de la guerre sont allés trop loin et les 5
              prochaines semaines pourraient s'avérer critiques pour les 5 millions de personnes
              vivant le long de la ligne de front longue de 420 km. Près de 3 millions de civils ont
              besoin d'aide humanitaire. Dans une large mesure, il s'agit de personnes âgées malades
              et isolées qui n'ont pas voulu ou pu quitter leur maison. Les enfants et les adultes
              qui ont souffert de l'explosion d'une mine terrestre ont également besoin d'un soutien
              particulier.
            </p>
            <img src="/images/ukraine1.png" alt="ukraine 1" className="ukraine__article-image" />
            <p>
              Il y aura de plus en plus de victimes. Le char n'a jamais été un symbole de paix. Nous
              ne pouvons prédire ce qui se passera dans les jours à venir, mais les scénarios ne
              sont pas optimistes, et les gens ont besoin d'une aide immédiate.
            </p>
            <p>
              Cette collecte de fonds a été créée afin de pouvoir récolter de l'argent sous la forme
              d'un fond destiné à aider les victimes de la guerre. L'ampleur de l'aide dépendra de
              l'évolution du conflit en Ukraine et sera adaptée en conséquence. Nous ne pouvons
              prédire ce qui se passera dans les prochains jours, mais les scénarios ne sont pas
              optimistes, et les personnes touchées ont besoin d'une aide immédiate. Nous
              continuerons à surveiller la situation, et restons en contact permanent avec les
              organisations d'aide travaillant en Ukraine. Chaque heure nous apporte de nouvelles
              informations, et tout évolue de manière dynamique. Nous vous tiendrons informés des
              prochaines étapes.
            </p>

            <p>Merci à tous ceux qui ne sont pas indifférents à la souffrance des autres. </p>

            <p style={{ margin: 0 }}>Ensemble, aidons l'Ukraine!</p>

            <hr />
            <p>
              Nous nous engageons à une transparence totale, voir les reçus des virements{" "}
              <a href="/ukraine/receipts" target="_blank">
                <u>ici.</u>
              </a>
            </p>
            <hr />

            <strong>
              Les entreprises suivantes ont décidé de donner leurs produits gratuitement à quiconque
              fait un don :
            </strong>
            <DonateGiveAways />
            <p style={{ marginTop: 12 }}>
              Souhaitez-vous également donner votre produit ?{" "}
              <a href="mailto:luiza@altruisto.com">
                <u>Contactez-nous.</u>
              </a>
            </p>
            <hr />
          </div>
          <div className="ukraine__right-panel">
            <div className="ukraine__donate">
              <div className="ukraine__donate--container">
                <DonateInfo
                  current={donations.raised.current / 100}
                  goal={donations.raised.goal / 100}
                  donorsCount={donations.raised.donorsCount}
                />
                <button className="button" onClick={() => setIsDonateModalOpen(true)}>
                  Faire un don
                </button>
                <button
                  className="button button--gray ukraine__share-button"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <img src="/images/share.svg" alt="Share icon" />
                  Partager
                </button>
                <div className="ukraine__donate--supporters">
                  * Le nombre est approximatif sur la base des taux de change actuels.
                  <br />
                  ** Nous nous engageons à une transparence totale, voir les reçus des virements{" "}
                  <a href="/ukraine/receipts" target="_blank">
                    <u>ici</u>
                  </a>
                </div>
              </div>
            </div>
            {isMd && <DonationList mostRecentDonations={donations.mostRecentDonations} />}
            {/* <div className="ukraine__donate" style={{ marginTop: 20 }}>
              <div
                className="ukraine__donate--container"
                style={{ paddingTop: 16, paddingBottom: 16 }}
              >
                The following companies decided to giveaway their products for free to anyone who
                donates:
              </div>
              {GIVEAWAYS.map(({ name, logo, perk }) => (
                <div className="ukraine__donate-list--item">
                  <img src={logo} alt="Altruisto logotype" title="Altruisto" />
                  <div className="ukraine__donate-list--item--name">
                    <span>
                      <strong>{name}</strong>
                    </span>
                    <span>{perk}</span>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <img
          src="/images/ukraine2.png"
          style={{ width: "100%", height: "100%", padding: "40px 0" }}
        />
        <div className="ukraine__centered-content">
          {!isMd && <DonationList mostRecentDonations={donations.mostRecentDonations} />}
          <div className="ukraine__left-panel">
            <div className="ukraine__article-image-container">
              <img
                src="/images/ukraine3.png"
                alt="ukraine 1"
                className="ukraine__article-image ukraine__article-image--inline"
              />
              <img
                src="/images/ukraine4.png"
                alt="ukraine 1"
                className=" ukraine__article-image ukraine__article-image--inline"
              />
            </div>
          </div>
          {isMd && <div className="ukraine__right-panel" />}
        </div>
      </main>
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
        currency={userCurrency}
        locale={userLocale}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={getUrlToShare()}
      />
    </StandardLayout>
  )
}

const DonateGiveAways = () => {
  return (
    <div className="ukraine__products row">
      {GIVEAWAYS.map((giveaway) => (
        <div className="col-6 col-md-4" key={giveaway.name}>
          <div className="ukraine__product ">
            <img src={giveaway.logo} alt={giveaway.name} className="ukraine__product-logo" />
            <p className="ukraine__product-name">{giveaway.name}</p>
            <div style={{ width: "100%" }}>
              <p className="ukraine__product-perk">{giveaway.perk}</p>
              <div className="ukraine__product-description">
                <p>{giveaway.description}</p>

                <p className="ukraine__product-website">
                  <a href={giveaway.website} target="_blank">
                    Visit Website
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

type DonateModalProps = {
  isOpen: boolean
  onClose: () => void
  currency: string
  locale: string
}

const DonateModal: FC<DonateModalProps> = ({ isOpen, onClose, currency, locale }) => {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState<number | string>(25)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setMerrorMsg] = useState<string>()
  const { formatNumber, formatNumberToParts } = useIntl()
  const getCurrencySymbol = () => {
    const result = formatNumberToParts(1, {
      style: "currency",
      currency,
      currencyDisplay: "symbol"
    })
    const symbol = result.find(({ type }) => type === "currency").value
    return symbol
  }

  const handleAmountChange = (value: string) => {
    console.log("v", value, typeof value)
    if (!!errorMsg) {
      setMerrorMsg(undefined)
    }

    if (value === "") {
      setAmount("")
      return
    }

    const numericValue = Number(value)
    if (numericValue < 0) {
      return
    }
    setAmount(numericValue)
  }

  const handleDonation = async () => {
    setIsLoading(true)
    setMerrorMsg(undefined)
    if (amount <= 0) {
      setIsLoading(false)
      setMerrorMsg("Amount must be greater than 0")
      return
    }
    try {
      const stripe = await loadStripe(getStripeApiKey())
      const supportedLocale = [
        "bg",
        "cs",
        "da",
        "de",
        "el",
        "en",
        "en-GB",
        "es",
        "es-419",
        "et",
        "fi",
        "fil",
        "fr",
        "fr-CA",
        "hr",
        "hu",
        "id",
        "it",
        "ja",
        "ko",
        "lt",
        "lv",
        "ms",
        "mt",
        "nb",
        "nl",
        "pl",
        "pt",
        "pt-BR",
        "ro",
        "ru",
        "sk",
        "sl",
        "sv",
        "th",
        "tr",
        "vi",
        "zh",
        "zh-HK"
      ]
      const usersLocale = locale[0]

      const targetLocale = supportedLocale.includes(usersLocale) ? usersLocale : "en"

      const response = await api2.post("/direct-donation", {
        amount: Math.round((typeof amount === "string" ? parseInt(amount) : amount) * 100),
        fundraiser: "Donation for Polish Humanitarian Action",
        subPath: "ukraine",
        donor: name,
        currency: "NOK",
        locale: targetLocale
      })
      await stripe.redirectToCheckout({
        sessionId: response.data
      })
      setIsLoading(false)
    } catch (e) {
      if (e.data) {
        setMerrorMsg(e.data.raw.message)
      } else {
        setMerrorMsg(e.message)
      }
      setIsLoading(false)
      //TODO: handle errors
    }
  }
  return (
    <Modal open={isOpen} onClose={onClose}>
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
            <h2
              style={{
                fontSize: "32px",
                marginBottom: "24px"
              }}
            >
              Sélectionnez le montant du don
            </h2>
            <div style={{ display: "flex", marginBottom: "12px" }}>
              <button
                className="button button--gray"
                onClick={() => setAmount(10)}
                style={{ marginRight: "8px" }}
              >
                {formatNumber(10, { style: "currency", currency })}
              </button>
              <button
                className="button button--gray"
                onClick={() => setAmount(50)}
                style={{ marginRight: "8px" }}
              >
                {formatNumber(50, {
                  style: "currency",
                  currency
                })}
              </button>
              <button className="button button--gray" onClick={() => setAmount(100)}>
                {formatNumber(100, {
                  style: "currency",
                  currency
                })}
              </button>
            </div>
            <label htmlFor="amount" style={{ marginBottom: "8px" }}>
              Montant du don
            </label>
            <TextField
              variant="outlined"
              type="number"
              id="amount"
              value={amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{getCurrencySymbol()}</InputAdornment>
                )
              }}
              onChange={(e) => handleAmountChange(e.target.value)}
              error={!!errorMsg}
              helperText={errorMsg}
            />
            <label htmlFor="name" style={{ marginTop: "12px", marginBottom: "8px" }}>
              Votre nom (facultatif)
            </label>
            <OutlinedInput
              placeholder="Votre nom..."
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              disabled={isLoading}
              className="button"
              style={{ marginTop: "32px" }}
              onClick={handleDonation}
            >
              {isLoading ? "Traitement du don..." : "Faire un don"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const DonationList = ({ mostRecentDonations }: { mostRecentDonations: Donation[] }) => {
  const { formatNumber } = useIntl()

  return (
    <div className="ukraine__donate-list">
      <div className="ukraine__donate-list--container">
        <p className="ukraine__donate-list--title">Derniers dons :</p>
        {mostRecentDonations.map((donation, index) => (
          <div className="ukraine__donate-list--item">
            <img src="/images/sygnet.svg" alt="Altruisto logotype" title="Altruisto" />
            <div className="ukraine__donate-list--item--name">
              <span>{donation.donor || "Anonyme"}</span>
              <span>
                <strong>
                  {formatNumber(donation.amount / 100, {
                    style: "currency",
                    currency: donation.currency
                  })}
                </strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const DonateInfo = ({ current, goal, donorsCount }) => {
  const { formatNumber } = useIntl()
  const userLocale = useMemo(() => navigatorLanguages() || ["en"], [])
  const userCurrency = useMemo(() => localeCurrency.getCurrency(userLocale[0]) || "USD", [
    userLocale
  ])

  return (
    <>
      <p className="ukraine__donate--text">
        <span className="ukraine__donate--current">
          {formatNumber(current, {
            style: "currency",
            currency: "usd"
          })}
        </span>{" "}
        levé
        <br />
        de l'objectif{" "}
        <strong>
          {formatNumber(goal, {
            style: "currency",
            currency: "usd"
          })}
        </strong>
      </p>
      <ProgressBar value={(100 * current) / goal} variant="determinate" />
      <div className="ukraine__donate--supporters">
        <img src="/images/family.svg" alt="family logo" />
        <span>Soutenu par {donorsCount} personnes</span>
      </div>
    </>
  )
}

export default Ukraine
