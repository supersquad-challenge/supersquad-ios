import { View } from "react-native";
import React from "react";
import { ExploreOnIcon } from "@/src/components/icons";
import { ExploreOffIcon } from "@/src/components/icons";

type Props = {
  type: boolean;
};

const ExploreIcon = ({ type }: Props) => {
  return <View>{type ? <ExploreOnIcon /> : <ExploreOffIcon />}</View>;
};

export default ExploreIcon;
