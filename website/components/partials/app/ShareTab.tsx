import React, { useState } from "react"
import copyToClipboard from "copy-to-clipboard"
import { useSnackbar } from "notistack"
import { useEffectWithAuth } from "hooks/use-auth"
import { api } from "utils/api-url"
import { TwitterCarousel } from "./TwitterCarousel"

type Props = {
  isActive: boolean
}

export const ShareTab: React.FC<Props> = ({ isActive }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [referralsNumber, setReferralsNumber] = useState<number | null>(null)
  const [ref, setRef] = useState<string | null>(null)

  useEffectWithAuth(
    auth => {
      if (isActive) {
        api
          .get("/user", { headers: { "X-AUTH-TOKEN": auth.user.apiKey } })
          .then(response => {
            setRef(response.data.ref)
            setReferralsNumber(response.data.referrals_count)
          })
          .catch(() => {
            enqueueSnackbar("Something went wrong.", {
              variant: "error"
            })
          })
      }
    },
    [isActive]
  )

  return (
    <div className="mobile-app__content fill-height">
      <h1 className="mobile-app__title">Together</h1>
      <h1 className="text-gradient">we can do more!</h1>
      <p className="mt-4">
        If every user invited <strong>just three of their friends</strong>, in a few short weeks we
        would be <strong>helping hundreds of thousands of people</strong> experience what's best in
        life, instead of suffering, pain, helplessness.
      </p>
      <p className="mt-4">
        <strong>
          Help your friends discover altruisto
          <br />
          and do even more good:
        </strong>
      </p>
      <div className="d-flex justify-content-between">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//altruisto.com?ref=${ref}&source=facebook_share`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-no-decoration"
        >
          <button className="mobile-app__share-button mobile-app__share-button--facebook">
            <img src="/images/facebook.svg" alt="Facebook" title="Facebook" />{" "}
          </button>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Faltruisto.com%2F%3Fref%3D${ref}%26source=twitter_share&text=Install%20an%20extension%20and%20when%20you%20buy%20stuff%20online%2C%20people%20in%20extreme%20poverty%20will%20get%20medicines%2C%20bed%20nets%2C%20or%20money%20`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-no-decoration"
        >
          <button className="mobile-app__share-button mobile-app__share-button--twitter">
            <img src="/images/twitter.svg" alt="Twitter" title="Twitter" />
          </button>
        </a>
      </div>
      {ref && (
        <>
          <h1 className="mobile-app__title mt-5 mb-4">Your referral link:</h1>
          <div className="field m-t-10">
            <span className="field__appendix mobile-app__copy-icon">
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
                <img src="/images/copy.svg" alt="Copy ref link" title="Copy icon" />
              </button>
            </span>
            <input
              className="field__input share__ref-link"
              type="text"
              id="ref-link"
              name="ref-link"
              value={`https://altruisto.com/?ref=${ref}`}
              readOnly
              onClick={event => {
                copyToClipboard(`https://altruisto.com/?ref=${ref}`)
                enqueueSnackbar("Copied to clipboard!", {
                  variant: "info",
                  autoHideDuration: 900
                })
                const input = event.target as HTMLInputElement
                input.blur()
              }}
            />
          </div>
          {referralsNumber !== null ? (
            <div className="mt-4 mb-2">
              <div className="mobile-app__invited-number">{referralsNumber} </div>
              <div className="mobile-app__invited-people">
                {referralsNumber === 1 ? "person" : "people"} joined thanks to you
              </div>
            </div>
          ) : null}
        </>
      )}
      <h1 className="mobile-app__title mt-5 mb-4">Talking about us:</h1>
      <TwitterCarousel />
    </div>
  )
}
