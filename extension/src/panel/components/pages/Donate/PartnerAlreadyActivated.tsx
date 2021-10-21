import { browser } from "webextension-polyfill-ts"
import React from "react"
import { AnimatedCheckmark } from "../../ui/AnimatedCheckmark"

type Props = {
  domain: string
}

export const PartnerAlreadyActivated = (props: Props) => (
  <div className="col-12 justify-center items-center text-center">
    <AnimatedCheckmark />
    <span className="text-accent p-t-10">
      {browser.i18n.getMessage("donationIsActive", props.domain)}
    </span>
  </div>
)
