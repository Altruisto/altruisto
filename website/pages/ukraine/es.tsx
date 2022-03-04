import React, { FC, useEffect, useMemo, useState } from "react"
import { StandardLayout } from "../../components/layouts"
import { loadStripe } from "@stripe/stripe-js"
import dynamic from "next/dynamic"
import { InputAdornment, Modal, OutlinedInput, TextField, useMediaQuery } from "@material-ui/core"
import navigatorLanguages from "navigator-languages"
import * as localeCurrency from "locale-currency"
import { api2 } from "utils/api-url"
import { useIntl } from "translations/useIntl"
import { FormattedNumber } from "react-intl"

const ProgressBar = dynamic(() => import("../../components/ui/ProgressBar"), {
  ssr: false
})

const Ukraine = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMd = useMediaQuery("(min-width: 768px)")

  const userLocale = useMemo(() => navigatorLanguages() || ["en"], [])
  const userCurrency = useMemo(() => localeCurrency.getCurrency(userLocale[0]) || "USD", [
    userLocale
  ])

  const { formatNumber } = useIntl()

  return (
    <StandardLayout withMenu={false} withoutMenuBorder={false} noCta={true}>
      <main className="ukraine">
        <div
          className="ukraine__banner"
          style={{ backgroundImage: "url(/images/ukraine-banner.png)" }}
        >
          <div className="ukraine__banner-content">
            <div className="ukraine__flag">
              <div className="ukraine__flag--top" />
              <div className="ukraine__flag--bottom" />
            </div>
            <h2>Ayuda humanitaria para las víctimas de la guerra en Ucrania</h2>
            <p>
              Organizador de la campaña de recaudación de fondos:{" "}
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
            <p style={{ margin: 0 }}>
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

            <p style={{ margin: 0 }}>
              Gracias a todos aquellos que no son indiferentes ante el sufrimiento de los demás.
            </p>

            <p style={{ margin: 0 }}>¡Ayudemos a Ucrania juntos!</p>
          </div>
          <div className="ukraine__right-panel">
            <div className="ukraine__donate">
              <div className="ukraine__donate--container">
                <p className="ukraine__donate--text">
                  <span className="ukraine__donate--current">
                    {formatNumber(500, { style: "currency", currency: userCurrency })}
                  </span>{" "}
                  raised
                  <br />
                  of{" "}
                  <strong>
                    {formatNumber(5000, { style: "currency", currency: userCurrency })}
                  </strong>{" "}
                  goal
                </p>
                <ProgressBar value={89} variant="determinate" />
                <div className="ukraine__donate--supporters">
                  <img src="/images/family.svg" alt="family logo" />
                  <span>Supported by 20 people</span>
                </div>
                <button className="button" onClick={() => setIsOpen(true)}>
                  Donate
                </button>
                <button className="button button--gray ukraine__share-button">
                  <img src="/images/share.svg" alt="Share icon" />
                  Share
                </button>
                <div className="ukraine__donate--supporters">
                  * The number is approximated based on today's currency exchange rates
                </div>
              </div>
            </div>
            {isMd && <DonationList />}
          </div>
        </div>
        <img
          src="/images/ukraine2.png"
          style={{ width: "100%", height: "100%", padding: "40px 0" }}
        />
        <div className="ukraine__centered-content">
          {!isMd && <DonationList />}
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
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currency={userCurrency}
        locale={userLocale}
      />
    </StandardLayout>
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
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      const response = await api2.post("/direct-donation", {
        amount: Math.round((typeof amount === "string" ? parseInt(amount) : amount) * 100),
        fundraiser: "Donation for Polish Humanitarian Action",
        subPath: "ukraine",
        donor: name,
        currency,
        locale
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
      <div
        style={{
          maxWidth: "424px",
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px"
        }}
      >
        <div style={{ background: "white", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              right: "16px",
              top: "16px",
              border: "none",
              background: "transparent"
            }}
          >
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
              Select amount
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
              Amount
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
              Your name (leave blank if you want your donation to be anonymous)
            </label>
            <OutlinedInput
              placeholder="Your name..."
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
              {isLoading ? "Submitting..." : "Donate"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const DonationList = () => {
  return (
    <div className="ukraine__donate-list">
      <div className="ukraine__donate-list--container">
        <p className="ukraine__donate-list--title">Donations:</p>
        {[...Array(5).keys()].map((key) => (
          <div key={key} className="ukraine__donate-list--item">
            <img src="/images/sygnet.svg" alt="Altruisto logotype" title="Altruisto" />
            <div className="ukraine__donate-list--item--name">
              <span>Matka Teresa</span>
              <span>
                <strong>$60</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ukraine
