import { DefaultHead } from "../partials/DefaultHead"
import { useGoogleAnalytics } from "../../hooks/use-google-analytics"
import { useServiceWorker } from "../../hooks/use-service-worker"
import { WebAppHeader } from "components/partials/WebAppHeader"
import dynamic from "next/dynamic"
import WebAppNavigationDesktop from "components/partials/WebAppNavigationDesktop"

type WebAppLayoutProps = {
  onMenuClick: (index: number) => void
  active: number
}

const WebAppNavigation = dynamic(() => import("../partials/WebAppNavigation"), {
  ssr: false
})

export const WebAppLayout: React.FC<WebAppLayoutProps> = ({ children, onMenuClick, active }) => {
  useGoogleAnalytics()
  // useServiceWorker()

  return (
    <>
      <DefaultHead />
      <div className="full-page web-app">
        <WebAppHeader />
        <div className="web-app__container">
          <WebAppNavigationDesktop active={active} onChange={onMenuClick} />
          <div className="web-app__view">{children}</div>
        </div>
        <WebAppNavigation active={active} onChange={onMenuClick} />
      </div>
    </>
  )
}
