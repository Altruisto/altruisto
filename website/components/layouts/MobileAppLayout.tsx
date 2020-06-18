import { DefaultHead } from "../partials/DefaultHead"
import { useGoogleAnalytics } from "../../hooks/use-google-analytics"
import { useServiceWorker } from "../../hooks/use-service-worker"
import { MobileAppHeader } from "components/partials/MobileAppHeader"

export const MobileAppLayout: React.FC = ({ children }) => {
  useGoogleAnalytics()
  // useServiceWorker()

  return (
    <>
      <DefaultHead />
      <div className="full-page">
        <MobileAppHeader />
        <div>{children}</div>
        {/* <MobileAppNavigation /> */}
      </div>
    </>
  )
}
