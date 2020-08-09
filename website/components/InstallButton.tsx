import React from "react"
import { useCta } from "hooks/use-cta"

const InstallButton: React.FC = () => {
  const cta = useCta()
  return (
    <a href={cta} className="button install-button">
      Start helping
    </a>
  )
}

export default InstallButton
