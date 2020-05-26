import { useEffect } from "react"

export const useServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js")
    }
  }, [])
}
