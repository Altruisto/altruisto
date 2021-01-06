import { DefaultHead } from "../partials/DefaultHead"
import { useGoogleAnalytics } from "../../hooks/use-google-analytics"
import { useServiceWorker } from "../../hooks/use-service-worker"
import { MobileAppHeader } from "components/partials/MobileAppHeader"
import dynamic from "next/dynamic"

type MobileAppLayoutProps = {
  onMenuClick: (index: number) => void
  active: number
}

const MobileAppNavigation = dynamic(() => import("../partials/MobileAppNavigation"), {
  ssr: false
})

export const MobileAppLayout: React.FC<MobileAppLayoutProps> = ({
  children,
  onMenuClick,
  active
}) => {
  useGoogleAnalytics()
  // useServiceWorker()

  return (
    <>
      <DefaultHead />
      <div className="full-page mobile-app">
        <MobileAppHeader />
        <div>{children}</div>
        <MobileAppNavigation active={active} onChange={onMenuClick} />
      </div>
    </>
  )
}
