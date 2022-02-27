import React, { useEffect, useState } from "react"
import LinearProgress, { LinearProgressProps } from "@material-ui/core/LinearProgress"
import { createStyles, withStyles } from "@material-ui/core/styles"

const styles = createStyles({
  determinate: {
    backgroundColor: "#DEDFE4",
    height: 6,
    borderRadius: 4
  },

  barColorPrimary: {
    background: "linear-gradient(136deg, #e70f74, #ff2525)"
  }
})
const StyledLinearProgress = withStyles(styles)(LinearProgress)

export const ProgressBar = (props: LinearProgressProps & { value: number }) => {
  const [timedValue, setTimedValue] = useState(0)
  const { value, ...rest } = props
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTimedValue(value)
    }, 300)

    return () => clearTimeout(timeOut)
  }, [value])

  return <StyledLinearProgress value={timedValue} {...rest} />
}

export default ProgressBar
