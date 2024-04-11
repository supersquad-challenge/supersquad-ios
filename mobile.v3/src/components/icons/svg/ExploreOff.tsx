import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function ExploreOffIcon(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_8_2405)">
        <Path
          d="M20 31a11 11 0 100-22 11 11 0 000 22zm2.178-8.03l-6.2 2.384c-.833.322-1.654-.498-1.332-1.332l2.385-6.2c.142-.366.425-.65.79-.791l6.2-2.385c.834-.322 1.655.498 1.333 1.332l-2.385 6.2a1.366 1.366 0 01-.79.791zM21.375 20a1.375 1.375 0 10-2.75 0 1.375 1.375 0 002.75 0z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8_2405">
          <Path fill="#fff" transform="translate(9 9)" d="M0 0H22V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default ExploreOffIcon