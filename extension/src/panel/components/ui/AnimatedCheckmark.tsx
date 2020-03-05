import React from "react"
import "./AnimatedCheckmark.scss"

export const AnimatedCheckmark: React.FC = () => {
  return (
    <div className="animated-checkmark">
      <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
        <g fill="none" strokeWidth="2">
          <circle cx="36" cy="36" r="35" />
          <path d="M17.417,37.778l9.93,9.909l25.444-25.393" />
        </g>
      </svg>
    </div>
  )
}
