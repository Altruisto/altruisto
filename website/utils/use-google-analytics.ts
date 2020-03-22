import ReactGA from "react-ga"
import { useEffect } from "react"

const initGA = () => {
  ReactGA.initialize("UA-79596452-2")
}

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const useGoogleAnalytics = () => {
  useEffect(() => {
    if (!(window as any).GA_INITIALIZED) {
      initGA()
      ;(window as any).GA_INITIALIZED! = true
    }
    logPageView()
  }, [])
}
