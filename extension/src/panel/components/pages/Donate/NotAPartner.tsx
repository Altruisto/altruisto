import { browser } from "webextension-polyfill-ts"
import React from "react"

type Props = {
  domain: string
}

export const NotAPartner = (props: Props) => (
  <>
    <button className="button m-b-20 button--disabled" disabled>
    {browser.i18n.getMessage('activateDonationFor')}
      <br />
      {props.domain}
    </button>
    <div className="d-flex justify-space-between">
      <span>
        {browser.i18n.getMessage('thisSiteIsNotOur')}
        <strong>{browser.i18n.getMessage('partner')}</strong>
      </span>

      <a
        href="https://altruisto.com/partners"
        className="uppercase-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {browser.i18n.getMessage('viewAll')}
      </a>
    </div>
  </>
)
