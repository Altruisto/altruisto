import React from "react"

type Props = {
  domain: string
}

export const NotAPartner = (props: Props) => (
  <>
    <button className="button m-b-20 button--disabled" disabled>
      Activate donation for:
      <br />
      {props.domain}
    </button>
    <div className="d-flex justify-space-between">
      <span>
        This site is not our <strong>partner!</strong>
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
