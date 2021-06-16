import React, { useState, useEffect, Fragment } from "react"
import { Partner } from "types/partner"
import { groupAplabetically } from "utils/group-alphabetically"
import Link from "next/link"
import Modal from "react-modal"
import { UserDetails } from "pages/app"
import { Loader } from "components/ui/Loader"
import { useIntl } from "translations/useIntl"

type Props = {
  partners: Partner[]
  partnersLoading: boolean
  userDetails: UserDetails
}

Modal.setAppElement("#__next")

export const ShopTab: React.FC<Props> = ({ partners, partnersLoading, userDetails }) => {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [searchedPartners, setSearchedPartners] = useState(partners)
  const [activePartner, setActivePartner] = useState<Partner | null>(null)
  const { formatMessage } = useIntl()

  const tracker = userDetails
    ? `${userDetails.ref || ""}-${userDetails.causeArea}-${userDetails.referredBy || ""}`
    : ""

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)"
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-30%",
      transform: "translate(-50%, -50%)",
      paddingLeft: "20px"
    }
  }

  useEffect(() => {
    if (searchPhrase) {
      setSearchedPartners(
        partners.filter(
          (partner) =>
            partner.name.toUpperCase().includes(searchPhrase.toUpperCase()) ||
            partner.domain.toUpperCase().includes(searchPhrase.toUpperCase())
        )
      )
    }
  }, [searchPhrase, partners])

  const searchResultsTranslation = formatMessage({ id: "searchResults" });

  const groupedPartners = searchPhrase
    ? {  [searchResultsTranslation] : searchedPartners }
    : groupAplabetically(partners, "name")

  return (
    <>
      <h1 className="web-app__partner-list-title">{formatMessage({ id: "partnersList" })}</h1>
      <div className="partners__search-wrapper web-app__search-wrapper input-group">
        <input
          type="text"
          className="partners__search-input web-app__search-input"
          placeholder={formatMessage({ id: "search" })}
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
        <div className="input-group-append">
          <button className="partners__search-button" type="button">
            <img src="/images/search.svg" 
              title={formatMessage({ id: "searchIcon" })} 
              alt={formatMessage({ id: "searchIcon" })} />
          </button>
        </div>
      </div>

      <div className="web-app__content web-app__partner-list">
        {partnersLoading ? (
          <div className="text-center fill-height">
            <Loader color="red" />
          </div>
        ) : null}

        {Object.entries(groupedPartners).map(([group, partnersInGroup]) => {
          return (
            <Fragment key={group}>
              <h2 className="mt-3">{group}</h2>
              <div>
                {(partnersInGroup as Partner[]).map((partner) => (
                  <Fragment key={partner.domain}>
                    <button
                      className="button-link web-app__partner-link"
                      onClick={() => setActivePartner(partner)}
                    >
                      {partner.name}
                    </button>
                    <br />
                  </Fragment>
                ))}
              </div>
            </Fragment>
          )
        })}
      </div>
      <Modal
        isOpen={activePartner !== null}
        onRequestClose={() => setActivePartner(null)}
        style={customModalStyles}
      >
        <p>
          {formatMessage({ id: "clickButtonBelowToActiveDonationFor" })}
          <strong>{activePartner && activePartner.name}</strong>
        </p>
        <a
          href={`https://api.altruisto.com/redirect?url=${
            activePartner ? activePartner.domain : ""
          }&tracker=${tracker}`}
          className="button"
          target="_blank"
        >
          {formatMessage({ id: "activeDonation" })}
        </a>
      </Modal>
    </>
  )
}
