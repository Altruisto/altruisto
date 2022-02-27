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
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
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
            <h2>Help for victims of war in Ukraine</h2>
            <p>
              Fundraiser for: <a href="https://www.pah.org.pl/en/">Polish Humanitarian Action</a>
            </p>
          </div>
        </div>
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__left-panel ukraine__left-panel--offset">
            <p>
              The conflict in Ukraine is unimaginable suffering for thousands of innocent people.
              There is a war...
            </p>
            <p>
              We looked with particular concern at the east of Ukraine and what any moment could
              befall innocent people living in areas threatened by armed conflict - then barely a
              thousand kilometers from Poland. Unfortunately, the worst has happened. There are
              bombs, fire, guns and victims.
            </p>
            <p style={{ margin: 0 }}>
              And there will be more and more victims. The tank has never been a symbol of peace. We
              cannot predict what will happen in the coming days, but the scenarios are not
              optimistic, and people need help.
            </p>
            <img src="/images/ukraine1.png" alt="ukraine 1" className="ukraine__article-image" />
            <p>
              Armed conflicts fomented in the cabinets at the highest levels of government most
              affect the smallest and most vulnerable - civilians, women, children, the elderly.
            </p>
            <p style={{ margin: 0 }}>
              The one in eastern Ukraine has been ongoing since 2014, but the events of recent days
              show that the war turmoil has gone too far. We wish we had the power to say stop.
              However, we can act and do what we know best. To bring help where there is suffering.
            </p>
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
            <p>
              This collection was created to be able to raise money in the form of a fund to help
              victims of war. The scope of assistance will depend on the development of the conflict
              in Ukraine and will be adjusted to the needs. We monitor the situation, we will be in
              constant contact with aid organizations working for Ukraine, which will come to us
              with a request for support. Every hour means new information, everything is changing
              dynamically.
            </p>
            <p>Thank you to everyone who is not indifferent to the injustice of others.</p>
            <p>#SiepomagaUkraine</p>
            <p>
              If you can and want to join us.... let's do it together! If you can't help, please
              support us with a good thought and keep your fingers crossed. The war is a huge drama.
              Let's stand together with our neighbors.
            </p>
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
