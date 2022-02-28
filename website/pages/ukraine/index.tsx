import { InputAdornment, Modal, OutlinedInput, TextField, useMediaQuery } from "@material-ui/core"
import { loadStripe } from "@stripe/stripe-js"
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
      goal: 5_000,
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
              Fundraiser organizer:{" "}
              <a href="https://www.pah.org.pl/en/">
                <u>Polish Humanitarian Action</u>
              </a>
            </p>
          </div>
        </div>
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__left-panel ukraine__left-panel--offset">
            <p>
              In the wake of the latest events and the escalation of conflict in Ukraine, we are
              starting a fundraiser to supply food and hygiene products to the inhabitants of the
              Donetsk and Luhansk oblasts who are currently at war. We also want to provide those
              who are fleeing their homes with food and other means of help, including the people
              moving inside the country, and refugees escaping to Poland.
            </p>
            <p>
              The conflict in Ukraine means unimaginable suffering for thousands of innocent people.
              Although we do not have the power to stop the war, we can act and help how we know
              best. To give to those in need and who have been affected by this tragedy.
            </p>
            <p style={{ margin: 0 }}>
              The war in Ukraine started in 2014 and never ended. The recent events have shown that
              the war turmoil has gone too far and the next 5 weeks could prove to be critical for
              the 5 million people living along the 420 km-long front line. Nearly 3 million
              civilians are in need of humanitarian aid. To a larger extent, they are sick, lonely
              elders who did not want to or could not leave their homes. Children and adults who
              have suffered as a result of a landmine explosion also need special support.
            </p>
            <img src="/images/ukraine1.png" alt="ukraine 1" className="ukraine__article-image" />
            <p>
              There will be more and more victims. The tank has never been a symbol of peace. We
              cannot predict what will happen in the coming days, but the scenarios are not
              optimistic, and people need immediate help.
            </p>
            <p style={{ margin: 0 }}>
              This fundraiser was created to be able to raise money in the form of a fund to help
              the victims of war. The scope of assistance will depend on the development of the
              conflict in Ukraine and will be adjusted accordingly. We cannot predict what will
              happen in the coming days, but the scenarios are not optimistic, and those impacted
              need immediate help. We will continue to monitor the situation, and remain in constant
              contact with aid organizations working in Ukraine. Every hour provides us with new
              information, and everything is changing dynamically. We will keep you informed about
              the next steps.
            </p>

            <p style={{ margin: 0 }}>
              Thank you to everyone who is not indifferent to the suffering of others.
            </p>

            <p style={{ margin: 0 }}>Let’s help Ukraine together!</p>
          </div>
          <div className="ukraine__right-panel">
            <div className="ukraine__donate">
              <div className="ukraine__donate--container">
                <DonateInfo
                  current={donations.raised.current}
                  goal={donations.raised.goal}
                  donorsCount={donations.raised.donorsCount}
                />
                <button className="button" onClick={() => setIsDonateModalOpen(true)}>
                  Donate
                </button>
                <button
                  className="button button--gray ukraine__share-button"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <img src="/images/share.svg" alt="Share icon" />
                  Share
                </button>
                <div className="ukraine__donate--supporters">
                  * The number is approximated based on today's currency exchange rates
                </div>
              </div>
            </div>
            {isMd && <DonationList mostRecentDonations={donations.mostRecentDonations} />}
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
      const response = await api2.post("/direct-donation", {
        amount: Math.round((typeof amount === "string" ? parseInt(amount) : amount) * 100),
        fundraiser: "Donation for Polish Humanitarian Action",
        subPath: "ukraine",
        donor: name,
        currency,
        locale: locale[0]
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

const DonationList = ({ mostRecentDonations }: { mostRecentDonations: Donation[] }) => {
  const { formatNumber } = useIntl()

  return (
    <div className="ukraine__donate-list">
      <div className="ukraine__donate-list--container">
        <p className="ukraine__donate-list--title">Donations:</p>
        {mostRecentDonations.map((donation, index) => (
          <div className="ukraine__donate-list--item">
            <img src="/images/sygnet.svg" alt="Altruisto logotype" title="Altruisto" />
            <div className="ukraine__donate-list--item--name">
              <span>{donation.donor || "Anonymous"}</span>
              <span>
                <strong>
                  {formatNumber(donation.amount, {
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
            currency: userCurrency
          })}
        </span>{" "}
        raised
        <br />
        of{" "}
        <strong>
          {formatNumber(goal, {
            style: "currency",
            currency: userCurrency
          })}
        </strong>{" "}
        goal
      </p>
      <ProgressBar value={(100 * current) / goal} variant="determinate" />
      <div className="ukraine__donate--supporters">
        <img src="/images/family.svg" alt="family logo" />
        <span>Supported by {donorsCount} people</span>
      </div>
    </>
  )
}

export default Ukraine
