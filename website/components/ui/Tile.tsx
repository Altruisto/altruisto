import React from "react"

type Props = {
  icon?: React.ReactElement
  title: string | React.ReactElement
  body?: string | React.ReactElement
  className?: string
}

const Tile: React.FC<Props> = props => {
  return (
    <div className={`tile ${typeof props.className !== "undefined" && props.className}`}>
      <div className="tile__icon">{props.icon}</div>
      <div className="tile__content">
        <div className="tile__title">{props.title}</div>
        <div className="tile__body">{props.children}</div>
      </div>
    </div>
  )
}

export default Tile
