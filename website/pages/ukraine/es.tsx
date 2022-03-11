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
        title: "¡Ayudemos a Ucrania juntos!",
        description:
          "El conflicto en Ucrania supone un sufrimiento inimaginable para miles de personas inocentes. Aunque nosotros no tengamos el poder para detener la guerra, igualmente podemos actuar y ayudar, proporcionando nuestra asistencia a los necesitados y a quienes se han visto afectados por esta tragedia. "
      }}
      ogMetaTags={{
        title: "¡Ayudemos a Ucrania juntos!",
        description:
          "El conflicto en Ucrania supone un sufrimiento inimaginable para miles de personas inocentes. Aunque nosotros no tengamos el poder para detener la guerra, igualmente podemos actuar y ayudar, proporcionando nuestra asistencia a los necesitados y a quienes se han visto afectados por esta tragedia. ",
        image: "https://altruisto.com/images/ukraine-cover-es.png",
        url: "https://altruisto.com/ukraine/es"
      }}
      twitterMetaTags={{
        title: "¡Ayudemos a Ucrania juntos!",
        site: "@altruistoCom",
        description:
          "El conflicto en Ucrania supone un sufrimiento inimaginable para miles de personas inocentes. Aunque nosotros no tengamos el poder para detener la guerra, igualmente podemos actuar y ayudar, proporcionando nuestra asistencia a los necesitados y a quienes se han visto afectados por esta tragedia.",
        image: "https://altruisto.com/images/ukraine-cover-es.png",
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
            <h2>Ayuda humanitaria para las víctimas de la guerra en Ucrania</h2>
            <p>
              Recepción de fondos:{" "}
              <a href="https://www.pah.org.pl/en/">
                <u>Polish Humanitarian Action</u>
              </a>
            </p>
          </div>
        </div>
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__left-panel ukraine__left-panel--offset">
            <p>
              A raíz de los recientes acontecimientos y de la escalada del conflicto en Ucrania,
              iniciamos una campaña de recaudación de fondos para suministrar alimentos y productos
              de higiene personal a los habitantes de las provincias de Donetsk y Lugansk, que
              actualmente se encuentran en guerra. También queremos proporcionar alimentos y otras
              formas de ayuda a quienes se han visto forzados a huir de sus hogares, incluidos tanto
              quienes se trasladan al interior del país como los refugiados que escapan a Polonia.
            </p>
            <p>
              El conflicto en Ucrania supone un sufrimiento inimaginable para miles de personas
              inocentes. Aunque nosotros no tengamos el poder para detener la guerra, igualmente
              podemos actuar y ayudar, proporcionando nuestra asistencia a los necesitados y a
              quienes se han visto afectados por esta tragedia.
            </p>
            <p style={{ margin: 0 }}>
              La guerra en Ucrania comenzó en 2014 y nunca ha terminado. Los recientes
              acontecimientos demuestran que la agitación bélica ha llegado demasiado lejos, por lo
              que las próximas 5 semanas podrían ser clave para los 5 millones de personas que viven
              a lo largo de los 420 km que abarca la primera línea de defensa. Casi 3 millones de
              civiles necesitan ayuda humanitaria. La mayoría son ancianos solos y enfermos que no
              han querido o no han podido abandonar sus casas. También necesitan ayuda especializada
              los niños y adultos que han sufrido la explosión de una mina terrestre.
            </p>
            <img src="/images/ukraine1.png" alt="ukraine 1" className="ukraine__article-image" />
            <p>
              Habrá cada vez más víctimas. El tanque nunca ha sido un símbolo de paz. No podemos
              predecir lo que sucederá en los próximos días, pero los pronósticos no son optimistas
              y las personas necesitan ayuda inmediata.
            </p>
            <p>
              Esta campaña de recaudación de fondos se crea para recaudar dinero en modalidad de
              Fondo de ayuda a las víctimas de la guerra. El alcance de la asistencia dependerá de
              cómo se desarrolle del conflicto en Ucrania, por lo que se irá ajustando en función de
              los sucesos. No podemos predecir lo que sucederá en los próximos días, pero los
              posibles escenarios son pesimistas y los afectados precisan ayuda inmediata.
              Continuaremos monitorizando la situación y nos mantendremos en contacto constante con
              las organizaciones de ayuda humanitaria que trabajan en Ucrania. Cada hora nos llega
              nueva información y todo el contexto cambia dinámicamente. Les mantendremos informados
              sobre los próximos pasos a dar.
            </p>

            <p>
              Gracias a todos aquellos que no son indiferentes ante el sufrimiento de los demás.{" "}
            </p>

            <p style={{ margin: 0 }}>¡Ayudemos a Ucrania juntos!</p>

            <hr />
            <p>
              Estamos comprometidos con transparencia total, vean los recibos de transferencias{" "}
              <a href="/ukraine/receipts" target="_blank">
                <u>aquí.</u>
              </a>{" "}
            </p>
            <hr />

            <strong>
              Las siguientes empresas decidieron regalar sus productos de forma gratuita a todos los
              que donen:
            </strong>
            <DonateGiveAways />
            <p style={{ marginTop: 12 }}>
              ¿Quiere regalar también su producto? Póngase en{" "}
              <a href="mailto:luiza@altruisto.com">
                <u>contacto con nosotros.</u>
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
                  Donar
                </button>
                <button
                  className="button button--gray ukraine__share-button"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <img src="/images/share.svg" alt="Share icon" />
                  Compartir
                </button>
                <div className="ukraine__donate--supporters">
                  * El número se aproxima en función de los tipos de cambio actuales
                  <br />
                  ** Estamos comprometidos con transparencia total, vean los recibos de
                  transferencias{" "}
                  <a href="/ukraine/receipts" target="_blank">
                    <u>aquí</u>
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
        currency,
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
              Seleccione el monto de la donación
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
              Monto de donación
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
              Su nombre (opcional)
            </label>
            <OutlinedInput
              placeholder="Su nombre..."
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
              {isLoading ? "Procesando..." : "Donar"}
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
        <p className="ukraine__donate-list--title">Donaciones:</p>
        {mostRecentDonations.map((donation, index) => (
          <div className="ukraine__donate-list--item">
            <img src="/images/sygnet.svg" alt="Altruisto logotype" title="Altruisto" />
            <div className="ukraine__donate-list--item--name">
              <span>{donation.donor || "Anonymous"}</span>
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
        recaudados
        <br />
        de un objetivo de{" "}
        <strong>
          {formatNumber(goal, {
            style: "currency",
            currency: "usd"
          })}
        </strong>{" "}
      </p>
      <ProgressBar value={(100 * current) / goal} variant="determinate" />
      <div className="ukraine__donate--supporters">
        <img src="/images/family.svg" alt="family logo" />
        <span>Apoyado por {donorsCount} personas</span>
      </div>
    </>
  )
}

export default Ukraine
