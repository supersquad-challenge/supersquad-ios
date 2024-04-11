import { View } from "react-native";
import React from "react";
import { MyOnIcon } from "@/src/components/icons";
import { MyOffIcon } from "@/src/components/icons";

type Props = {
  type: boolean;
};

const MyChallengeIcon = ({ type }: Props) => {
  return <View>{type ? <MyOnIcon /> : <MyOffIcon />}</View>;
};

export default MyChallengeIcon;
