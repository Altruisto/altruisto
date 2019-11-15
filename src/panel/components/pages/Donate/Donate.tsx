import * as browser from "webextension-polyfill"
import React, { useMemo, useState, useEffect } from "react"
import IconBox from "../../ui/IconBox"
import { WalletIcon } from "../../icons/WalletIcon"
import transformUsdToBeingsSaved from "../../../common/utils/transform-usd-to-beings-saved"
import { extractDomain } from "../../../../helpers/extract-domain.js"
import { isAlreadyActivated } from "../../../../helpers/is-already-activated"
import { getTracker } from "../../../../helpers/get-tracker"
import { PartnerAlreadyActivated } from "./PartnerAlreadyActivated"
import { NotAPartner } from "./NotAPartner"
import { ActivatePartner } from "./ActivatePartner"

type CurrentWebsite = {
  domain: string
  url: string
  isPartner: boolean
  isAlreadyActivated: boolean
}

const getRandomImpactHighlight = () => {
  function asLiterals<T extends string>(arr: T[]): T[] {
    return arr
  }
  const charities = asLiterals(["AMF", "SCI"])
  const randomItem = Math.floor(Math.random() * charities.length)
  const beingsSaved = transformUsdToBeingsSaved(
    100 * 0.03,
    charities[randomItem]
  )

  switch (charities[randomItem]) {
    case "AMF":
      return `protect ${beingsSaved} ${
        beingsSaved === 1 ? "person" : "people"
      } from malaria`

    case "SCI":
      return `${beingsSaved} children get cured from parasites`
  }
}

export const Donate: React.FC = () => {
  const memoizedImpactHighlight = useMemo(() => getRandomImpactHighlight(), [])
  const [currentWebsite, setCurrentWebsite] = useState<CurrentWebsite | null>(
    null
  )
  const [linkTracker, setLinkTracker] = useState("")

  useEffect(() => {
    const getCurrentTab = browser.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    const getLocalStorage = browser.storage.local.get({
      activatedAffiliates: [],
      partners: []
    })

    Promise.all([getCurrentTab, getLocalStorage, getTracker]).then(
      ([tabs, items, tracker]) => {
        console.log(tabs, items, tracker)
        if (tabs.length !== 0) {
          const domain = extractDomain((tabs[0] && tabs[0].url) || "")
          setCurrentWebsite({
            domain,
            url: tabs[0].url,
            isPartner: items.partners.includes(domain),
            isAlreadyActivated: isAlreadyActivated(
              items.activatedAffiliates,
              domain
            )
          })
        }
        setLinkTracker(tracker)
      }
    )
  }, [])

  if (currentWebsite === null) {
    return (
      <div className="page">
        <div className="container fill-height"></div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container fill-height">
        <div className="page__title m-b-0">
          <h1>Help others</h1>
          <h1 className="text-gradient">with just one click!</h1>
        </div>
        <div className="justify-center fill-height">
          {currentWebsite.isPartner && currentWebsite.isAlreadyActivated ? (
            <PartnerAlreadyActivated domain={currentWebsite.domain} />
          ) : currentWebsite.isPartner ? (
            <ActivatePartner
              domain={currentWebsite.domain}
              url={currentWebsite.url}
              tracker={linkTracker}
            />
          ) : (
            <NotAPartner domain={currentWebsite.domain} />
          )}
        </div>
      </div>
      <IconBox icon={<WalletIcon />}>
        For every <strong>$100</strong> you spent with our partner you help:
        <br />
        <strong>{memoizedImpactHighlight}</strong> (on average)
      </IconBox>
    </div>
  )
}
