import { DefaultHead } from "../partials/DefaultHead"
import { useGoogleAnalytics } from "../../hooks/use-google-analytics"
import { useServiceWorker } from "../../hooks/use-service-worker"
import { MobileAppHeader } from "components/partials/MobileAppHeader"
import { MobileAppNavigation } from "components/partials/MobileAppNavigation"

export const MobileAppLayout: React.FC = ({ children }) => {
  useGoogleAnalytics()
  // useServiceWorker()

  return (
    <>
      <DefaultHead />
      <div className="full-page mobile-app">
        <MobileAppHeader />
        <div>{children}</div>
        <MobileAppNavigation />
      </div>
    </>
  )
}
