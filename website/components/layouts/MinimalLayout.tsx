import { DefaultHead } from "../partials/DefaultHead"
import { Footer } from "../partials/Footer"
import "../../assets/scss/index.scss"
import { useGoogleAnalytics } from "../../utils/use-google-analytics"
import { useServiceWorker } from "../../utils/useServiceWorker"

export const MinimalLayout: React.FC = ({ children }) => {
  useGoogleAnalytics()
  useServiceWorker()

  return (
    <>
      <DefaultHead />
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
