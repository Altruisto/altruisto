import * as browser from "webextension-polyfill"
import React, { useEffect, useState } from "react"
import facebook from "../../../assets/facebook.svg"
import twitter from "../../../assets/twitter.svg"
import copy from "../../../assets/copy.svg"
import copyToClipboard from "copy-to-clipboard"
import { useSnackbar } from "notistack"
import { TwitterCarousel } from "./TwitterCarousel"

import "./Share.scss"

export const Share: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const refferalsNumber = 0
  const [ref, setRef] = useState(null)
  useEffect(() => {
    if (ref === null) {
      browser.storage.sync
        .get({ ref: "1337" })
        .then(storage => setRef(storage.ref))
    }
  }, [])

  return (
    <div className="page">
      <div className="container">
        <div className="page__title m-b-0">
          <h1>Together</h1>
          <h1 className="text-gradient">we can do more!</h1>
        </div>
        <div className="fill-height">
          <p className="share__explanation">
            If every user invited <strong>just three of their friends</strong>,
            in a few short weeks we would be{" "}
            <strong>helping hundreds of thousands of people</strong> experience
            what's best in life, instead of suffering, pain, helplessness.
          </p>
          <p className="share__explanation">
            <strong>
              Help your friends discover altruisto
              <br />
              and do even more good:
            </strong>
          </p>
          <div className="share__buttons m-b-20">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//altruisto.com?ref=${ref}&source=facebook_share`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-no-decoration"
            >
              <button className="share-button share-button--facebook">
                <img
                  src={facebook}
                  alt="Facebook"
                  title="Facebook"
                  className="share-button__icon"
                />{" "}
                {/* Share */}
              </button>
            </a>
            <a
              href={`https://twitter.com/home?status=Install%20an%20extension%20and%20when%20you%20buy%20stuff%20online,%20people%20in%20extreme%20poverty%20will%20get%20medicines,%20bed nets,%20or%20money%20https://altruisto.com?ref=${ref}source=twittter_share`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-no-decoration"
            >
              <button className="share-button share-button--twitter">
                <img src={twitter} alt="Twitter" title="Twitter" />
                {/* Share */}
              </button>
            </a>
          </div>
          <div className="field m-t-10">
            <h1 className="m-b-20">Your referral link:</h1>
            <span className="field__appendix share__copy-icon">
              <button
                className="button-link"
                onClick={() => {
                  copyToClipboard(`https://altruisto.com/?ref=${ref}`)
                  enqueueSnackbar("Copied to clipboard!", {
                    variant: "info",
                    autoHideDuration: 900
                  })
                }}
              >
                <img src={copy} alt="Copy ref link" title="Copy icon" />
              </button>
            </span>
            <input
              className="field__input share__ref-link"
              type="text"
              id="ref-link"
              name="ref-link"
              value={`https://altruisto.com/?ref=${ref}`}
              onClick={event => {
                copyToClipboard(`https://altruisto.com/?ref=${ref}`)
                enqueueSnackbar("Copied to clipboard!", {
                  variant: "info",
                  autoHideDuration: 900
                })
                event.target.blur()
              }}
            />
          </div>
          <div className="m-t-30">
            {refferalsNumber ? (
              <>
                <div className="share__invited-number">{refferalsNumber} </div>
                <div className="share__invited-people">
                  people joined thanks to you
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <h1 className="container">Talking about us:</h1>
      <TwitterCarousel />
    </div>
  )
}
