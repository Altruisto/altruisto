import { MetaTags } from "../partials/DefaultHead"
import { StandardLayout } from "./StandardLayout"
import { ReactNode } from "react"

type Props = {
  coverContent?: ReactNode
  backgroundImage?: string
  noCta?: boolean
} & MetaTags

export const WithFullCoverLayout: React.FC<Props> = ({
  coverContent,
  backgroundImage = "url(/images/hero-poster.jpg)",
  noCta = false,
  seoMetaTags,
  ogMetaTags,
  twitterMetaTags,
  children
}) => (
  <StandardLayout
    seoMetaTags={seoMetaTags}
    ogMetaTags={ogMetaTags}
    twitterMetaTags={twitterMetaTags}
    noCta={noCta}
  >
    <div className="hero-poster cover with-overlay" style={{ backgroundImage }}>
      {coverContent}
    </div>
    <div className="container pt-4 fill-height">{children}</div>
  </StandardLayout>
)
