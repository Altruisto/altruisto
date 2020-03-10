import React from "react"
import "./IconBox.scss"

interface Props {
  icon: React.ReactElement
}

const IconBox: React.FC<Props> = props => {
  return (
    <div className="iconbox">
      <div className="iconbox__icon">{props.icon}</div>
      <div className="iconbox__content">{props.children}</div>
    </div>
  )
}

export default IconBox
