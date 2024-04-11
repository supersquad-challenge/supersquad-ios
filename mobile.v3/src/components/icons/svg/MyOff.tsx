import * as React from "react"
import Svg, { Rect, Circle, Path } from "react-native-svg"

function MyOffIcon(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x={10} y={11} width={19} height={19} rx={4} fill="#fff" />
      <Circle
        cx={27}
        cy={13}
        r={3.75}
        fill="#fff"
        stroke="#000"
        strokeWidth={1.5}
      />
      <Path
        d="M14 21.5h5m-5 4h9"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default MyOffIcon