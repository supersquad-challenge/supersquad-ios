import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"

function HabitIcon(props) {
  return (
    <Svg
      width={44}
      height={47}
      viewBox="0 0 44 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0)" d="M0 0H44V47H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_161_128"
            transform="matrix(.00084 0 0 .00078 0 -.012)"
          />
        </Pattern>
        <Image
          id="image0_161_128"
          width={1196}
          height={1307}
        />
      </Defs>
    </Svg>
  )
}
export default HabitIcon