import React, { useEffect } from "react"
import copyToClipboard from "copy-to-clipboard"
import { useSnackbar } from "notistack"
import { TwitterCarousel } from "./TwitterCarousel"
import { UserDetails } from "pages/app"
import { useIntl } from "translations/useIntl"
import { getNumberOfPeople } from "../../../../utils/getNumberOfPeople"

type Props = {
  userDetails: UserDetails
}

export const ShareTab: React.FC<Props> = ({ userDetails }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { formatMessage } = useIntl()
  const ref = userDetails && userDetails.ref ? userDetails.ref : ""

  return (
    <div className="web-app__content fill-height">
      <h3 className="web-app__title">{formatMessage({ id: "together" })}</h3>
      <h3 className="text-gradient">{formatMessage({ id: "weCanDoMore" })}</h3>
      <p className="mt-4">
        {formatMessage(
          { 
            id: "ifEveryUserInvitedJustThreeOfTheirFriends" 
          },
          {
            strong: (...chunks: string[]) => (
              <strong>
                {chunks}
              </strong>
            ),
          }
        )}
      </p>
      <p className="mt-4">
        <strong>
          {formatMessage(
              { 
                id:  "helpYourFriendsDiscoverAltruistoAndDoEvenMoreGood" 
              },
              {
                br: () => (<br></br>)
              }
          )}
        </strong>
      </p>
      <div className="d-flex justify-content-between">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//altruisto.com?ref=${ref}&source=facebook_share`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-no-decoration"
        >
          <button className="web-app__share-button web-app__share-button--facebook">
            <img src="/images/facebook.svg" alt="Facebook" title="Facebook" />{" "}
          </button>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Faltruisto.com%2F%3Fref%3D${ref}%26source=twitter_share&text=Install%20an%20extension%20and%20when%20you%20buy%20stuff%20online%2C%20people%20in%20extreme%20poverty%20will%20get%20medicines%2C%20bed%20nets%2C%20or%20money%20`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-no-decoration"
        >
          <button className="web-app__share-button web-app__share-button--twitter">
            <img src="/images/twitter.svg" alt="Twitter" title="Twitter" />
          </button>
        </a>
      </div>
      {ref && (
        <>
          <h3 className="web-app__title mt-5 mb-4">{formatMessage({ id: "yourReferralLink" })}</h3>
          <div className="field m-t-10">
            <span className="field__appendix web-app__copy-icon">
              <button
                className="button-link"
                onClick={() => {
                  copyToClipboard(`https://altruisto.com/?ref=${ref}`)
                  enqueueSnackbar(formatMessage({ id: "copiedToClipboard" }), {
                    variant: "info",
                    autoHideDuration: 900
                  })
                }}
              >
                <img src="/images/copy.svg" 
                  alt={formatMessage({ id: "copyRefLink"})} 
                  title={formatMessage({ id: "copyIcon" })}
                />
              </button>
            </span>
            <input
              className="field__input share__ref-link"
              type="text"
              id="ref-link"
              name="ref-link"
              value={`https://altruisto.com/?ref=${ref}`}
              readOnly
              onClick={(event) => {
                copyToClipboard(`https://altruisto.com/?ref=${ref}`)
                enqueueSnackbar(formatMessage({ id: "copiedToClipboard" }), {
                  variant: "info",
                  autoHideDuration: 900
                })
                const input = event.target as HTMLInputElement
                input.blur()
              }}
            />
          </div>
          {userDetails && userDetails.referralsCount !== null ? (
            <div className="mt-4 mb-2">
              <div className="web-app__invited-number">{userDetails.referralsCount} </div>
              <div className="web-app__invited-people">
                {getNumberOfPeople(
                  userDetails.referralsCount, 
                  formatMessage({ id: "personJoinedThanksToYou" }),
                  formatMessage({ id: "peopleJoinedThanksToYou" }),
                  formatMessage({ id: "anotherVariantOfPeopleJoinedThanksToYou" })
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
      <h3 className="web-app__title mt-5 mb-4">{formatMessage({ id: "talkingAboutUs" })}</h3>
      <TwitterCarousel />
      <div className="mb-2"></div>
    </div>
  )
}
