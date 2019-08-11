import React from "react"
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
              href="https://facebook.com"
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
              href="https://twitter.com"
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
                  copyToClipboard("/?ref=aE4tf")
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
              value="/?ref=aE4tf"
              onClick={event => {
                copyToClipboard("/?ref=aE4tf")
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
                <div className="share__invited-number">7 </div>
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
