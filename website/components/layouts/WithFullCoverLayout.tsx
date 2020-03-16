import { StandardLayout } from "./StandardLayout"
import { ReactNode } from "react"

type Props = {
  coverContent?: ReactNode
  noCta?: boolean
}

export const WithFullCoverLayout: React.FC<Props> = ({ coverContent, children, noCta = false }) => (
  <StandardLayout noCta={noCta}>
    <div
      className="hero-poster cover with-overlay"
      style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
    >
      {coverContent}
    </div>
    <div className="container pt-4 fill-height">{children}</div>
  </StandardLayout>
)
