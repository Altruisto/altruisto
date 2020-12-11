import { DefaultHead } from "../partials/DefaultHead"
import { Footer } from "../partials/Footer"
import { useGoogleAnalytics } from "../../hooks/use-google-analytics"
import { useServiceWorker } from "../../hooks/use-service-worker"
import { LayoutComponent } from "."

export const MinimalLayout: LayoutComponent = ({
  children,
  seoMetaTags,
  ogMetaTags,
  twitterMetaTags
}) => {
  useGoogleAnalytics()
  useServiceWorker()

  return (
    <>
      <DefaultHead
        seoMetaTags={seoMetaTags}
        ogMetaTags={ogMetaTags}
        twitterMetaTags={twitterMetaTags}
      />
      <div className="full-page">
        <div className="container pt-4 fill-height">
          <a href="/" className="d-flex justify-content-center">
            <img src="/images/logo.svg" alt="Altruisto logo" title="Altruisto" className="logo" />
          </a>
          <hr className="mt-4 mb-5" />
          <div className="small-container">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  )
}
