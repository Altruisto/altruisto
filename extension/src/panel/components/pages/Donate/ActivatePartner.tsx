import React from "react"
import { browser } from "webextension-polyfill-ts"

type Props = {
  domain: string
  url: string
  tracker: string
}

export const ActivatePartner = (props: Props) => (
  <>
    <a
      className="button m-b-20"
      href={`${BASE_URL}/redirect?url=${props.url}&tracker=${props.tracker}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      {browser.i18n.getMessage('activatePartnerAnchorActivate')}
      <br />
      {props.domain}
    </a>
    <div className="d-flex justify-space-between">
      <span>
        {browser.i18n.getMessage('activatePartnerThisSiteIsOur')}
        <strong className="text-accent">{browser.i18n.getMessage('activatePartnerPartner')}</strong>
      </span>

      <a
        href="https://altruisto.com/partners"
        className="uppercase-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {browser.i18n.getMessage('activatePartnerAnchorViewAll')}
      </a>
    </div>
  </>
)
