import React, { FC, useState } from "react"
import { StandardLayout } from "../../components/layouts"
import { loadStripe } from "@stripe/stripe-js"
import dynamic from "next/dynamic"
import { InputAdornment, Modal, OutlinedInput } from "@material-ui/core"
import axios from "axios"

const ProgressBar = dynamic(() => import("../../components/ui/ProgressBar"), {
  ssr: false
})

const Ukraine = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <StandardLayout withMenu={true} withoutMenuBorder={true}>
      <main className="ukraine">
        <div
          className="ukraine__banner"
          style={{ backgroundImage: "url(images/ukraine-banner.png)" }}
        >
          <div className="ukraine__banner-content">
            <div className="ukraine__flag">
              <div className="ukraine__flag--top" />
              <div className="ukraine__flag--bottom" />
            </div>
            <p style={{ fontWeight: 700, fontSize: "16px", margin: 0 }}>Purpose of collection:</p>
            <p style={{ fontWeight: 400, fontSize: "48px", marginBottom: "20px" }}>
              Help for victims of war in Ukraine
            </p>
            <p style={{ fontWeight: 700, fontSize: "16px", margin: 0 }}>
              Collection organizer:{" "}
              <a href="https://mui.com/api/linear-progress/#main-content">LINK GOES HERE</a>
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
            <img src="images/ukraine1.png" alt="ukraine 1" className="ukraine__article-image" />
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
                  <span className="ukraine__donate--current">$500</span> raised of $5.000 goal
                </p>
                <ProgressBar value={89} variant="determinate" />
                <div className="ukraine__donate--supporters">
                  {/*TODO: use family icon <span>FAMILY</span>*/}
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
            <div className="ukraine__donate-list">
              <div className="ukraine__donate-list--container">
                <p className="ukraine__donate-list--title">
                  Donations: <strong>$500</strong>
                </p>
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
          </div>
        </div>
        <img
          src="images/ukraine2.png"
          style={{ width: "100%", height: "100%", padding: "40px 0" }}
        />
        <div className="ukraine__centered-content">
          <div className="ukraine__left-panel">
            <div style={{ display: "flex" }}>
              <img
                src="images/ukraine3.png"
                alt="ukraine 1"
                className="ukraine__article-image--inline"
              />
              <img
                src="images/ukraine4.png"
                alt="ukraine 1"
                className="ukraine__article-image--inline"
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
          <div className="ukraine__right-panel" />
        </div>
      </main>
      <DonateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </StandardLayout>
  )
}

type DonateModalProps = {
  isOpen: boolean
  onClose: () => void
}

const DonateModal: FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleAmountChange = (value: string) => {
    setAmount(Number(value))
  }

  const handleDonation = async () => {
    setIsLoading(true)
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      const response = await axios.post(
        "https://altruisto-api-playground.herokuapp.com/v2/direct-donation",
        {
          amount: Math.round(amount * 100),
          fundraiser: "Donation for Polish Humanitarian Action",
          subPath: "ukraine",
          donor: name
        }
      )
      const result = await stripe.redirectToCheckout({
        sessionId: response.data
      })
      setIsLoading(false)
      console.log("RESPONSE", result)
    } catch (e) {
      setIsLoading(false)
      console.error(e)
      //TODO: handle errors
    }
  }
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          background: "white",
          maxWidth: "384px",
          width: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
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
              $10
            </button>
            <button
              className="button button--gray"
              onClick={() => setAmount(50)}
              style={{ marginRight: "8px" }}
            >
              $50
            </button>
            <button className="button button--gray" onClick={() => setAmount(100)}>
              $100
            </button>
          </div>
          <label htmlFor="amount" style={{ marginBottom: "8px" }}>
            Amount
          </label>
          <OutlinedInput
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <label htmlFor="name" style={{ marginTop: "12px", marginBottom: "8px" }}>
            Add your name if you wanna
          </label>
          <OutlinedInput
            placeholder="Add name..."
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
    </Modal>
  )
}

export default Ukraine
