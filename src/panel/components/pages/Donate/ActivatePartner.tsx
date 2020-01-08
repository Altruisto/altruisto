import React from "react"
import { BASE_URL } from "../../../../helpers/api.js"

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
      Activate donation for:
      <br />
      {props.domain}
    </a>
    <div className="d-flex justify-space-between">
      <span>
        This site is our <strong className="text-accent">partner!</strong>
      </span>

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
)
