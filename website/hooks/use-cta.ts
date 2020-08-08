import { useEffect, useState } from "react"
import useragent from "express-useragent"
import { getCtaDestination } from "utils/get-cta-destination"

export const useCta = () => {
  const [cta, setCta] = useState("#")
  useEffect(() => {
    setCta(getCtaDestination(useragent.parse(window.navigator.userAgent)))
  }, [])

  return cta
}
