import { DefaultHead, MetaTags } from "../partials/DefaultHead"
import { Footer } from "../partials/Footer"
import "../../assets/scss/index.scss"
import { useGoogleAnalytics } from "hooks/use-google-analytics"
import { useServiceWorker } from "hooks/use-service-worker"
import { useCta } from "hooks/use-cta"
import Menu from "components/partials/Menu"

type Props = {
  noCta?: boolean
  withMenu?: boolean
} & MetaTags

export const StandardLayout: React.FC<Props> = ({
  children,
  withMenu,
  noCta = false,
  seoMetaTags,
  ogMetaTags,
  twitterMetaTags
}) => {
  useGoogleAnalytics()
  useServiceWorker()

  const cta = useCta()

  return (
    <>
      <DefaultHead
        seoMetaTags={seoMetaTags}
        ogMetaTags={ogMetaTags}
        twitterMetaTags={twitterMetaTags}
      />
      <nav className="menu navbar navbar-expand-lg navbar-shrink fixed-top" id="mainNav">
        <div className="container">
          {withMenu ? (
            <Menu />
          ) : (
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
          )}
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
