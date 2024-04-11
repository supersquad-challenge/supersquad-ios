import { View } from "react-native";
import React from "react";
import { HomeOffIcon } from "@/src/components/icons";
import { HomeOnIcon } from "@/src/components/icons";

type Props = {
  type: boolean;
};

const HomeIcon = ({ type }: Props) => {
  return <View>{type ? <HomeOnIcon /> : <HomeOffIcon />}</View>;
};

export default HomeIcon;
