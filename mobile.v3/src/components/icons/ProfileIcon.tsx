import { View } from "react-native";
import React from "react";
import { ProfileOnIcon } from "@/src/components/icons";
import { ProfileOffIcon } from "@/src/components/icons";

type Props = {
  type: boolean;
};

const ProfileIcon = ({ type }: Props) => {
  return <View>{type ? <ProfileOnIcon /> : <ProfileOffIcon />}</View>;
};

export default ProfileIcon;
