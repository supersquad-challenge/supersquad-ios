import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
function MentalIcon(props) {
  return (
    <Svg
      width={46}
      height={40}
      viewBox="0 0 46 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0)" d="M0 0H46V40H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_161_125"
            transform="matrix(.00063 0 0 .00072 -.01 0)"
          />
        </Pattern>
        <Image
          id="image0_161_125"
          width={1620}
          height={1383}
        />
      </Defs>
    </Svg>
  )
}
export default MentalIcon