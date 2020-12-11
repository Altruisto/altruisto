import { CSSProperties } from "react"

type Props = {
  color?: string
  speed?: number // to be implemented
  size?: number
  style?: CSSProperties
}

export const Loader: React.FC<Props> = props => {
  const style: CSSProperties = {
    border: props.color ? `2px solid ${props.color}` : undefined,
    height: props.size ? `${props.size}px` : undefined,
    width: props.size ? `${props.size}px` : undefined,
    borderBottom: "2px solid transparent",
    ...props.style
  }
  // if (props.color) {
  //   style.border = `2px solid ${props.color}`;
  // }
  // if (props.size) {

  // }

  return (
    <div className="ball-clip-rotate">
      <div style={style} />
    </div>
  )
}
