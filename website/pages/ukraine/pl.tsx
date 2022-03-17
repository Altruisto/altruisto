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
        title: "Pomóżmy ofiarom wojny na Ukrainie",
        description:
          "Konflikt na Ukrainie oznacza niewyobrażalne cierpienie tysięcy niewinnych ludzi. Nie mamy możliwości powstrzymania wojny ale możemy postarać się pomóc ofiarom wojny."
      }}
      ogMetaTags={{
        title: "Pomóżmy ofiarom wojny na Ukrainie",
        description:
          "Konflikt na Ukrainie oznacza niewyobrażalne cierpienie tysięcy niewinnych ludzi. Nie mamy możliwości powstrzymania wojny ale możemy postarać się pomóc ofiarom wojny.",
        image: "https://altruisto.com/images/ukraine-cover-pl.png",
        url: "https://altruisto.com/ukraine/pl"
      }}
      twitterMetaTags={{
        title: "Pomóżmy ofiarom wojny na Ukrainie",
        site: "@altruistoCom",
        description:
          "Konflikt na Ukrainie oznacza niewyobrażalne cierpienie tysięcy niewinnych ludzi. Nie mamy możliwości powstrzymania wojny ale możemy postarać się pomóc ofiarom wojny.",
        image: "https://altruisto.com/images/ukraine-cover-pl.png",
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
            <h2>Pomoc dla ofiar wojny na Ukrainie</h2>
            <p>
              Zbiórka na rzecz:{" "}
              <a href="https://www.pah.org.pl">
                <u>Polskiej Akcji Humanitarnej</u>
              </a>
            </p>
          </div>
        </div>
        <div className="ukraine__centered-content ukraine__overlap-content">
          <div className="ukraine__left-panel ukraine__left-panel--offset">
            <p>
              Mamy za sobą pierwsze tygodnie wojny. W tym czasie ponad milion osób opuściło swoje
              domy. Tysiące osób i zwierząt zginęło. Szpitale, lotniska, szkoły zostały
              zbombardowane i zniszczone. Jednak najgorsze może dopiero nadejść.
            </p>
            <p>
              Obserwowanie odpowiedzi społeczeństwa na ten kryzys humanitarny podnosi na duchu. W
              ciągu pierwszych godzin ludzie samodzielnie zorganizowali pomoc - bezpieczne
              schronienie, jedzenie, środki medyczne, pomoc prawną. Prawdziwe zwycięstwo
              człowieczeństwa.
            </p>
            <p style={{ margin: 0 }}>
              Jednak zakres potrzeb, którymi będzie należało się zająć będzie tylko rósł wraz z
              przedłużającą się walką. Kolejne miliony ludzi uciekną z miejsc objętych wojną, a ci,
              którzy już to zrobili będą potrzebować stałego domu, pracy, pomocy medycznej, dostępu
              do edukacji dla swoich dzieci.
            </p>
            <img src="/images/ukraine1.png" alt="ukraine 1" className="ukraine__article-image" />
            <p>
              Uważamy, że niezwykle ważne jest, by pomoc dostarczana była w sposób ciągły przez
              kolejne tygodnie i miesiące. Musimy zakasać rękawy i po początkowej fali pomocy
              przygotować się na konieczność systematycznej dalszej pracy i zorganizowania stale
              płynącej pomocy finansowej.
            </p>
            <p>
              Dlatego zdecydowaliśmy się zorganizować zbiórkę na rzecz Polskiej Akcji Humanitarnej
              we współpracy ze start-upami, które zdecydowały się przekazać swoje produkty każdemu
              darczyńcy. Chcemy w ten sposób stworzyć dodatkowe źródło finansowania pomocy
              humanitarnej dla Ukrainy, które będzie mogło funkcjonować przez kolejne tygodnie,
              również wtedy gdy pierwsze emocje opadną.
            </p>

            <p>
              Polska Akcja Humanitarna jest obecna na miejscu od początku konfliktu. Pieniądze ze
              zbiórki pozwolą na zaopatrzenie w żywność i artykuły higieniczne najbardziej
              zagrożonych wojną mieszkańców obwodów donieckiego i ługańskiego.
            </p>

            <p>Dziękujemy wszystkim, którzy są wrażliwi na cierpienie innych.</p>

            <p style={{ margin: 0 }}>Pomóżmy Ukrainie!</p>

            <hr />
            <p>
              Zależy nam na pełnej transparentności, potwierdzenia przelewów można zobaczyć{" "}
              <a href="/ukraine/receipts" target="_blank">
                <u>tutaj</u>
              </a>{" "}
              a kod źródłowy strony{" "}
              <a href="https://github.com/altruisto/altruisto" target="_blank">
                <u>tutaj</u>
              </a>
              .
            </p>
            <hr />

            <strong>
              Poniższe firmy zdecydowały się przekazać każdemu darczyńcy swoje produkty:
            </strong>
            <DonateGiveAways />
            <p style={{ marginTop: 12 }}>
              Czy chcesz, zeby Twój produkt również się tu znalazł?{" "}
              <a href="mailto:luiza@altruisto.com">
                <u>Skontatkuj się z nami.</u>
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
                  Wesprzyj zbiórkę
                </button>
                <button
                  className="button button--gray ukraine__share-button"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <img src="/images/share.svg" alt="Share icon" />
                  Udostępnij
                </button>
                <div className="ukraine__donate--supporters">
                  * Podane liczby są estymowane na podstawie dzisiejszych kursów walut
                  <br />
                  ** Zależy nam na pełnej transparentności, potwierdzenia przelewów mozna znaleźć{" "}
                  <a href="/ukraine/receipts" target="_blank">
                    <u>tutaj</u>
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
    if (amount <= 9.99) {
      setIsLoading(false)
      setMerrorMsg("Minimalna darowizna to 10 PLN")
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
      } else if (
        e &&
        e.response &&
        e.response.data &&
        e.response.data.errors &&
        e.response.data.errors[0].type === "invalid_amount"
      ) {
        setMerrorMsg("Minimalna darowizna to 10 PLN")
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
              Proszę podać kwotę darowizny
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
              Kwota
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
              Twoje imię (w przypadku anonimowej darowizny proszę pozostawić puste)
            </label>
            <OutlinedInput
              placeholder="Twoje imię..."
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
              {isLoading ? "Przetważanie..." : "Przekaż darowiznę"}
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
        <p className="ukraine__donate-list--title">Ostatnie darowizny:</p>
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
        Zebrano{" "}
        <span className="ukraine__donate--current">
          {formatNumber(current, {
            style: "currency",
            currency: "usd"
          })}
        </span>{" "}
        <br />z planowanych{" "}
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
        <span>Wsparło {donorsCount} osób</span>
      </div>
    </>
  )
}

export default Ukraine
