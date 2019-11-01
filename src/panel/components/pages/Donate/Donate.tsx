import * as browser from "webextension-polyfill"
import React, { useMemo, useState } from "react"
import IconBox from "../../ui/IconBox"
import { WalletIcon } from "../../icons/WalletIcon"
import transformUsdToBeingsSaved from "../../../common/utils/transform-usd-to-beings-saved"
import { extractDomain } from "../../../../helpers/extract-domain.js"
import { StorageData } from "../../../../types/types"
import { isAlreadyActivated } from "../../../../helpers/is-already-activated"
import { AnimatedCheckmark } from "../../ui/AnimatedCheckmark"

type CurrentWebsite = {
  domain: string
  isPartner: boolean
  isAlreadyActivated: boolean
}

const classesToString = (classes: { [k: string]: boolean }) =>
  Object.keys(classes)
    .filter(key => classes[key])
    .join(" ")

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
  const getCurrentTab = browser.tabs.query({
    active: true,
    lastFocusedWindow: true
  })
  const getLocalStorage = browser.storage.local.get({
    activatedAffiliates: [],
    partners: []
  })
  Promise.all([getCurrentTab, getLocalStorage]).then(([tabs, items]) => {
    const domain = extractDomain(tabs[0].url)
    setCurrentWebsite({
      domain,
      isPartner: items.partners.includes(domain),
      isAlreadyActivated: isAlreadyActivated(items.activatedAffiliates, domain)
    })
  })

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
            <div className="col-12 justify-center items-center text-center">
              <AnimatedCheckmark />
              <span className="text-accent p-t-10">
                The donation for {currentWebsite.domain} is active! When you buy
                something charities will get donations!
              </span>
            </div>
          ) : (
            <>
              <button
                className={classesToString({
                  button: true,
                  "m-b-20": true,
                  "button--disabled": !currentWebsite.isPartner
                })}
                disabled={!currentWebsite.isPartner}
              >
                Activate donation for:
                <br />
                {currentWebsite.domain}
              </button>
              <div className="d-flex justify-space-between">
                {currentWebsite.isPartner ? (
                  <span>
                    This site is our{" "}
                    <strong className="text-accent">partner!</strong>
                  </span>
                ) : (
                  <span>
                    This site is not our <strong>partner!</strong>
                  </span>
                )}

                <a
                  href="https://altruisto.com/partners"
                  className="uppercase-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View All
                </a>
              </div>
            </>
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
