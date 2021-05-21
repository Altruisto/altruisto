import { FC } from "react"

type Props = {
  color?: string
  width?: string
  height?: string
}

export const DonateV2: FC<Props> = ({ color = "#000", width = "14px", height = "13px" }) => (
  <svg width={width} height={height} viewBox="0 0 14 13" version="1.1" fill={color}>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="share" transform="translate(-576.000000, -140.000000)" fill={color} fillRule="nonzero">
        <g id="menu" transform="translate(575.000000, 99.000000)">
          <g id="2" transform="translate(0.000000, 40.000000)">
            <path
              d="M14,4 L2,4 L2,2.5 L13,2.5 L13,1.5 L2,1.5 C1.44771525,1.5 1,1.94771525 1,2.5 L1,13 C1,13.5522847 1.44771525,14 2,14 L14,14 C14.5522847,14 15,13.5522847 15,13 L15,5 C15,4.44771525 14.5522847,4 14,4 Z M2,13 L2,5 L14,5 L14,6.5 L10,6.5 C9.44771525,6.5 9,6.94771525 9,7.5 L9,10.5 C9,11.0522847 9.44771525,11.5 10,11.5 L14,11.5 L14,13 L2,13 Z M14,7.5 L14,10.5 L10,10.5 L10,7.5 L14,7.5 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default DonateV2
