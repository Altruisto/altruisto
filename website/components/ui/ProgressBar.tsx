import React, { useEffect, useState } from "react"
import LinearProgress, { LinearProgressProps } from "@material-ui/core/LinearProgress"
import { withStyles } from "@material-ui/core/styles"

const StyledLinearProgress = withStyles({
  determinate: {
    backgroundColor: "lightgrey",
    height: 6,
    borderRadius: 4
  }
})(LinearProgress)

export const ProgressBar = (props: LinearProgressProps & { value: number }) => {
  const [timedValue, setTimedValue] = useState(0)
  const { value, ...rest } = props
  useEffect(() => {
    setTimeout(() => {
      setTimedValue(value)
    }, 300)
  }, [])

  return <StyledLinearProgress value={timedValue} {...rest} />
}

export default ProgressBar
