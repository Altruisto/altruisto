import useragent from "express-useragent"
import { DefaultHead } from "../partials/DefaultHead"
import { Footer } from "../partials/Footer"
import "../../assets/scss/index.scss"
import { getCtaDestination } from "../../utils/get-cta-destination"
import { useEffect, useState } from "react"

type Props = {
  noCta?: boolean
}

export const StandardLayout: React.FC<Props> = ({ children, noCta = false }) => {
  const [cta, setCta] = useState("#")

  useEffect(() => {
    setCta(getCtaDestination(useragent.parse(window.navigator.userAgent)))
  }, [])

  return (
    <>
      <DefaultHead />
      <nav className="menu navbar navbar-expand-lg navbar-shrink fixed-top" id="mainNav">
        <div className="container">
          <div className="menu__top">
            <a className="menu__brand navbar-brand js-scroll-trigger" href="#page-top">
              <img
                src="/images/logo.svg"
                alt="Altruisto logo"
                title="Altruisto"
                className="menu__logo"
              />
            </a>
          </div>
          {noCta ? null : (
            <a href={cta} className="menu__cta button">
              Install now for free
            </a>
          )}
        </div>
      </nav>
      <div className="full-page">
        {children}
        <Footer />
      </div>
    </>
  )
}
