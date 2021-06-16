import { browser } from "webextension-polyfill-ts"
import React, { useEffect, useState } from "react"
import facebook from "../../../assets/facebook.svg"
import twitter from "../../../assets/twitter.svg"
import copy from "../../../assets/copy.svg"
import copyToClipboard from "copy-to-clipboard"
import { useSnackbar } from "notistack"
import { TwitterCarousel } from "./TwitterCarousel"
import { useAuthContext } from "../../../common/auth"
import axios from "../../../../helpers/api"
import { getNumberOfPeople } from "../../../../../../shared/getNumberOfPeople"

import "./Share.scss"
import { storage } from "../../../../helpers/storage"

type Props = {
  isActive: boolean
}

export const Share: React.FC<Props> = ({ isActive }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [referralsNumber, setReferralsNumber] = useState<number | null>(null)
  const [ref, setRef] = useState<string | null>(null)
  const auth = useAuthContext()

  useEffect(() => {
    if (ref === null) {
      storage.get("sync", "ref").then(fromSync => setRef(fromSync.ref))
    }

    if (isActive && referralsNumber === null) {
      // TODO: add typings for axios response
      const getReferralsNumber = auth.user
        ? axios.get("/user", { headers: { "X-AUTH-TOKEN": auth.user.apiKey } })
        : storage
            .get("local", "installationId")
            .then(({ installationId }) => axios.get(`/installations/${installationId}`))

      getReferralsNumber.then(response => {
        setReferralsNumber(response.data.referrals_count)
      })
    }
  }, [isActive, referralsNumber, ref])

  return (
    <div className="page">
      <div className="container">
        <div className="page__title m-b-0">
          <h1>
            {browser.i18n.getMessage("together")}
            <span className="page__title-second-line text-gradient">{browser.i18n.getMessage("weCanMore")}</span>
          </h1>
        </div>
        <div className="fill-height">
          <p className="share__explanation">
          {browser.i18n.getMessage("ifEveryUserInvited")}
          <strong>{browser.i18n.getMessage("justThreeFriends")}</strong>
          {browser.i18n.getMessage("inFewWeeksWeWouldBe")}
          <strong>{browser.i18n.getMessage("helpingHundredsOfThousandsOfPeople")}</strong>
          {browser.i18n.getMessage("experienceWhatIsBestInLife")}
          </p>
          <p className="share__explanation">
            <strong>
              {browser.i18n.getMessage("helpYourFriendsDiscoverAltruisto")}
              <br />
              {browser.i18n.getMessage("andDoMoreGood")}
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
              href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Faltruisto.com%2F%3Fref%3D${ref}%26source=twitter_share&text=Install%20an%20extension%20and%20when%20you%20buy%20stuff%20online%2C%20people%20in%20extreme%20poverty%20will%20get%20medicines%2C%20bed%20nets%2C%20or%20money%20`}
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
          {ref ? (
            <div className="field m-t-10">
              <h1 className="m-b-20">{browser.i18n.getMessage("yourReferralLink")}</h1>
              <span className="field__appendix share__copy-icon">
                <button
                  className="button-link"
                  onClick={() => {
                    copyToClipboard(`https://altruisto.com/?ref=${ref}`)
                    enqueueSnackbar(browser.i18n.getMessage("copiedToClipboard"), {
                      variant: "info",
                      autoHideDuration: 900
                    })
                  }}
                >
                  <img src={copy} 
                    alt={browser.i18n.getMessage("copyRefLink")} 
                    title={browser.i18n.getMessage("copyIcon")} 
                  />
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
                  enqueueSnackbar(browser.i18n.getMessage("copiedToClipboard"), {
                    variant: "info",
                    autoHideDuration: 900
                  })
                  const input = event.target as HTMLInputElement
                  input.blur()
                }}
              />
            </div>
          ) : null}
          {referralsNumber !== null ? (
            <div className="m-t-20 m-b-10 ">
              <div className="share__invited-number">{referralsNumber} </div>
              <div className="share__invited-people">
                {getNumberOfPeople(
                  referralsNumber, 
                  browser.i18n.getMessage("personJoinedThanksToYou"),
                  browser.i18n.getMessage("peopleJoinedThanksToYou"),
                  browser.i18n.getMessage("anotherVariantOfPeopleJoinedThanksToYou")
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <h1 className="container m-t-30">{browser.i18n.getMessage("talkingAboutUs")}</h1>
      <TwitterCarousel />
    </div>
  )
}
