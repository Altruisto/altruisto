import React from "react"
import { AnimatedCheckmark } from "../../ui/AnimatedCheckmark"

type Props = {
  domain: string
}

export const PartnerAlreadyActivated = (props: Props) => (
  <div className="col-12 justify-center items-center text-center">
    <AnimatedCheckmark />
    <span className="text-accent p-t-10">
      The donation for {props.domain} is active! When you buy something
      charities will get donations!
    </span>
  </div>
)
