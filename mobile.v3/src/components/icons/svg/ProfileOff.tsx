import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileOffIcon(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20 20a5.83 5.83 0 004.04-1.61 5.398 5.398 0 001.674-3.89 5.398 5.398 0 00-1.673-3.89A5.83 5.83 0 0020 9a5.83 5.83 0 00-4.04 1.61 5.398 5.398 0 00-1.674 3.89c0 1.459.602 2.858 1.673 3.89A5.83 5.83 0 0020 20zm-2.04 2.063c-4.398 0-7.96 3.428-7.96 7.66 0 .706.594 1.277 1.326 1.277h17.348c.732 0 1.326-.572 1.326-1.276 0-4.233-3.563-7.662-7.96-7.662h-4.08z"
        fill="#fff"
      />
    </Svg>
  )
}

export default ProfileOffIcon
