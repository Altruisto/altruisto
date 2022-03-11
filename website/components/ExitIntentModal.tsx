import Link from "next/link"
import React, { useState, useEffect } from "react"
import Modal from "react-modal"

const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    zIndex: 2147483646
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-30%",
    transform: "translate(-50%, -50%)",
    paddingLeft: "20px",
    maxWidth: 570,
    zIndex: 2147483647
  }
}

Modal.setAppElement("body")

const ExitIntent = () => {
  const [isMouseOut, setMouseOut] = useState(false)
  const [email, setEmail] = useState("")

  const mouseOut = () => {
    setMouseOut(true)
    document.removeEventListener("mouseleave", mouseOut)
  }

  useEffect(() => {
    document.addEventListener("mouseleave", mouseOut)

    return () => {
      document.removeEventListener("mouseleave", mouseOut)
    }
  }, [setMouseOut])

  // @TODO this is only temporary
  return (
    <Modal
      isOpen={isMouseOut}
      style={customModalStyles}
      onRequestClose={() => {
        setMouseOut(false)
      }}
    >
      <h2>Let's help the victims of war in Ukraine</h2>
      <p>
        We created a fundraiser for Polish Humanitarian Action and partnered with several startups
        that decided to give away their products to anyone who donates (and more partnerships are
        coming). In this way, we want to create an additional source of financing humanitarian aid
        for Ukraine, which will be able to function for the upcoming weeks, even when the first
        emotions subside.
      </p>
      <Link href="/ukraine">
        <button
          className="button install-button"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          I want to help!
        </button>
      </Link>
      <button className="button-link uppercase-link mt-4" onClick={() => setMouseOut(false)}>
        No, thanks.
      </button>
    </Modal>
  )

  return (
    <Modal isOpen={isMouseOut} style={customModalStyles}>
      <h2>Get weekly good news about saving lives and keeping animals happy.</h2>
      <p>
        Weekly newsletter filled with content we consider valuable, whether it be informative,
        inspiring or simply amusing!
      </p>

      <div id="mc_embed_signup" style={{ width: "100%" }}>
        <form
          action="https://altruisto.us11.list-manage.com/subscribe/post?u=f12e591f7f693dc0afcd3f188&amp;id=0c047e44bf"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
        >
          <div id="mc_embed_signup_scroll">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              name="EMAIL"
              className="required email form-control"
              id="mce-EMAIL"
              required
              placeholder="Your email address"
            />
            <input type="hidden" value="try_index" name="MMERGE3" className="" id="mce-MMERGE3" />

            <div className="clear mt-2">
              <input
                type="submit"
                value="Join now!"
                name="subscribe"
                id="mc-embedded-subscribe"
                style={{ fontSize: "16px;" }}
                className="button"
              />
            </div>
          </div>
        </form>
      </div>

      <button className="button-link uppercase-link mt-4" onClick={() => setMouseOut(false)}>
        No, thanks.
      </button>
    </Modal>
  )
}

export default ExitIntent
