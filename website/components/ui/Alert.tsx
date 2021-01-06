import React from "react"

type Props = {
  message: string
}

export const Alert: React.FC<Props &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props => {
  const { message, className, ...alertProps } = props
  return (
    <div className={`alert ${className}`} {...alertProps}>
      <p className="alert__message mb-0">{message}</p>
    </div>
  )
}
