import React from "react"
import "./Alert.scss"

type Props = {
  message: string
}

export const Alert: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = props => {
  const { message, className, ...alertProps } = props
  return (
    <div className={`alert ${className}`} {...alertProps}>
      <p className="alert__message">{message}</p>
    </div>
  )
}
