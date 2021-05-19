import { DefaultHead } from "../partials/DefaultHead"
import { Footer } from "../partials/Footer"
import { useGoogleAnalytics } from "../../hooks/use-google-analytics"
import { useServiceWorker } from "../../hooks/use-service-worker"

export const MobileFormLayout: React.FC = ({ children }) => {
  useGoogleAnalytics()
  useServiceWorker()

  return (
    <>
      <DefaultHead />
      <div className="full-page">
        <div className="container pt-4 fill-height">
          <div className="d-flex">
            <a href="/" className="d-flex">
              <img
                src="/images/sygnet.svg"
                alt="Altruisto logotype"
                title="Altruisto"
                className="web-app__form-logo"
              />
            </a>
          </div>
          <div className="small-container">{children}</div>
        </div>
        <Footer noLogo noLinks />
      </div>
    </>
  )
}
