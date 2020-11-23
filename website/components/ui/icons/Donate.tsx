import { FC } from "react"

type Props = {
  color?: string
}

const Donate: FC<Props> = ({ color }) => {
  const fill = color || "#000"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={fill}>
      <g id="g6" transform="matrix(0.08345779,0,0,0.07239967,-1.8328165,1.4586933e-5)">
        <g id="g4">
          <path
            d="m 298.761,57.093 -101.2,-54.8 c -9.6,-5.2 -22.8,-1.2 -28,8.4 l -59.2,110 h -72 c -9.2,0 -16.4,7.2 -16.4,16.4 v 28.8 149.2 c 0,9.2 7.2,16.4 16.4,16.4 h 230 c 9.2,0 16.4,-7.2 16.4,-16.4 v -41.6 h 6.8 c 3.6,0 6.4,-2.8 6.4,-6.4 v -47.6 c 0,-3.6 -2.8,-6.4 -6.4,-6.4 h -6.8 v -46.8 c 0,-7.6 -5.6,-14.4 -12.8,-16 l 35.2,-65.2 c 5.2,-10 1.6,-22.4 -8.4,-28 z m -72,-24.4 -63.2,117.2 h -18 l 67.6,-124.4 z m -45.6,-16 c 2,-3.6 6.8,-5.2 10.4,-3.2 l 10,5.6 -70.4,130.8 h -22 z m -146.8,120 c 0,-1.2 1.6,-3.2 3.6,-3.2 h 65.2 l -8.8,16 h -56.4 c -1.2,0 -2.4,0 -3.6,0.4 z m 237.2,178.4 c 0,2 -1.6,3.6 -3.6,3.6 h -230 c -2,0 -3.6,-1.6 -3.6,-3.6 v -148.8 c 0,-2 1.6,-3.6 3.6,-3.6 h 60.4 25.6 46.8 90 6.8 c 2,0 3.6,1.6 3.6,3.6 v 46.8 h -24.4 v 0 c -10.8,0 -19.2,8.8 -19.2,19.2 v 22 c 0,10.8 8.8,19.2 19.2,19.2 h 24.8 z m 12.8,-89.2 h 0.4 v 34.8 h -0.4 -37.6 c -3.6,0 -6.4,-2.8 -6.4,-6.4 v -22 c 0,-3.6 2.8,-6.4 6.4,-6.4 z m 11.2,-147.2 -38.4,71.2 h -79.2 l 60,-110.8 54.4,29.6 c 4,1.6 5.2,6.4 3.2,10 z"
            id="path2"
          />
        </g>
      </g>
      <g id="g12" transform="matrix(0.08345779,0,0,0.07239967,-1.8328165,1.4586933e-5)">
        <g id="g10">
          <path
            d="m 271.161,72.693 -3.2,-1.6 c -8,-4.4 -18.8,-1.2 -23.2,6.8 l -4,7.6 c -2,4 -2.8,8.8 -1.2,13.2 1.2,4.4 4.4,8 8.4,10 l 3.2,1.6 c 2.4,1.2 5.2,2 8,2 6.4,0 12,-3.6 15.2,-8.8 l 4,-7.6 c 4,-8.4 0.8,-18.8 -7.2,-23.2 z m -4.4,17.2 -4,7.6 c -1.2,2 -4,2.8 -6,1.6 l -3.2,-2 c -0.8,-0.4 -1.6,-1.6 -2,-2.4 -0.4,-1.2 -0.4,-2.4 0.4,-3.2 l 4,-7.6 c 0.8,-1.2 2.4,-2.4 4,-2.4 0.8,0 1.2,0 2,0.4 l 3.2,1.6 c 1.6,1.6 2.4,4 1.6,6.4 z"
            id="path8"
          />
        </g>
      </g>
    </svg>
  )
}

export default Donate